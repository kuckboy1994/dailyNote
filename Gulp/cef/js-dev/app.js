// @charset "utf-8";

define(function(require, exports, module) {
	/**
	 * 初始化客户端接口
	 */
	(async()=>{

		var info = new ThsInfo();
		var param = {
			infoid:14339,
			code:"JD",
			industry:"",
			period:-1,
			start:0,
			end:0,
		}
		info.requestInfo(param).then(function(data){
			console.log('info requestInfo data=', data);
		});
		var clientApi = require('./public/clientapi');
		clientApi.init();
		await clientApi.setVersion();

		/**
		 * 渲染功能列表+logo
		 */
		var renderfn = require('./links/renderfn');
		await renderfn.init();
		var appVersion = renderfn.appVersion;
		if (appVersion == 'referintell') {
			$('.logo').addClass('logo-znb');
		} else if (appVersion == 'lightning') {
			$('.logo').addClass('logo-sdb');
		} else if (appVersion == 'cloud') {
			$('.logo').addClass('logo-ydb');
		} else if (appVersion == 'thousand') {
			$('.logo').addClass('logo-jsb');
		} else {
			$('.logo').addClass('logo-jcb');
		}

		/**
		 * 重置尺寸
		 */
		if ($(window).height() > 840) {
			$('body').addClass('larger-size');
		}
		var resetSize = require('./public/resetsize');
		resetSize.init();

		/**
		 * 交互事件
		 */
		var interactive = require('./public/interactive');
		interactive.init();

		/**
		 * 大盘指数
		 */
		var indexModule = require('./stocks/market');
		/**
		 * 自选股
		 */
		var stocksModule = require('./stocks/stocks');
		/**
		 * 股票池
		 */
		var stockPool = require('./stocks/stockpool');

		var isClientInitComplete = false;
		var initTimer = setInterval(function() {
			if (!isClientInitComplete) {
				var onready = async function() {
						var params = {
							code: '1A0001,399001,399006',
							type: 'NEW'
						};
						var tmpStr = await clientApi.thsQuote.getData2(params);
						var tmpObj = eval('(' + tmpStr + ')');
						var codeArr = [];
						$.each(tmpObj, function(i, val) {
							codeArr.push(i);
						});
						if (codeArr.length === 3) {
							isClientInitComplete = true;
							clearInterval(initTimer);
							initTimer = null;
							indexModule.init();
							await stocksModule.init();
							stockPool.init();
							checkZxgTimer = setInterval(function() {
								if (isInPage) {
									checkSelfStocks();
								}
							}, 3000);

						}
				};
				clientApi.thsQuote.request({
					code: '1A0001,399001,399006',
					type: 'NEW',
				}).then(onready);
			}
		}, 200);

		var scqrModule = require('./chart/scqr');
		var zqxyModule = require('./chart/zqxy');
		scqrModule.init();

		/**
		 * 投票
		 */
		var voteModule = require('./vote/vote');
		voteModule.init();

		var picAd = require('./info/slideshow');
		await picAd.init();

		var userInfo = require('./info/info');
		await userInfo.init();

		var checkSelfStocks = async function(isback) {
			// check stocks
			var stocksStr = await clientApi.thsPassport.selfStocks();
			var _selfStocks = eval(stocksStr);
			if (stocksModule.selfStocks.join(',') != _selfStocks.join(',') || isback) {
				stocksModule.selfStocks = _selfStocks;
				var stockPoolCode = [];
				$('#stockpool_container tr').each(function(i, val) {
					stockPoolCode.push($(this).attr('data-code'));
				});
				$.each(stockPoolCode, function(i, val) {
					if (stocksModule.selfStocks.join(',').indexOf(val) != -1) {
						$('#stockpool_container tr[data-code="' + val + '"] td').eq(0).removeClass('yellow');
					} else {
						$('#stockpool_container tr[data-code="' + val + '"] td').eq(0).addClass('yellow');
					}
				});
				await stocksModule.fillstockName();
				stocksModule.requestCur();
			}
			//  else {
			// 	if (isback) {
			// 		stocksModule.requestQuote();
			// 	}
			// }
		};
		var scqrTimer = null,
			poolTimer = null,
			checkZxgTimer = null;

		var isInPage = true,
			isRuning = true;
		var backHomePage = async function() {
			await checkSelfStocks(true);
			// stockPool
			if ($('[data-tab="pool"]').hasClass('title-active')) {
				stockPool.getStockCode();
			}
			// index
			indexModule.reqFuturesQuote.request();
			indexModule.reqIndexQuote.request();
			// vote
			voteModule.clearIntervalRequest();
			voteModule.init();
			// info
			userInfo.clearLoadTabInterval();
			await userInfo.initSecond();
			// picAd
			// picAd.dida();
			// userInfo.loadAndRenderUserName();
			clearInterval(scqrTimer);
			clearInterval(checkZxgTimer);
			clearInterval(poolTimer);

			refreshScqr();
			scqrTimer = setInterval(function() {
				if (isInPage) {
					refreshScqr();
				}
			}, 60000);

			checkZxgTimer = setInterval(function() {
				if (isInPage) {
					checkSelfStocks();
				}
			}, 3000);
			refreshPool();
			poolTimer = setInterval(function() {
				if (isInPage) {
					refreshPool();
				}
			}, 600000);
			isRuning = true;
		};
		var leaveHomepage = function() {
			// stockPool
			stockPool.unregisterPush();
			clearInterval(scqrTimer);
			clearInterval(checkZxgTimer);
			clearInterval(poolTimer);
			// stocks
			stocksModule.stocksThsQuote.unregisterPush();
			// index
			if (indexModule.reqFuturesQuote != null) {
				indexModule.reqFuturesQuote.unregisterPush();
			}
			if (indexModule.reqIndexQuote != null) {
				indexModule.reqIndexQuote.unregisterPush();
			}
			// vote
			voteModule.clearIntervalRequest();
			// info
			userInfo.clearLoadTabInterval();
			// picAd
			// picAd.clearCount();
			isRuning = false;
		};

		var inPageTimer = null;
		try {
			var onshow = function(inPage) {
					if (inPage) {
						isInPage = true;
						if (!isRuning) {
							$('#stocks_container').scrollTop(0);
							clearTimeout(inPageTimer);
							inPageTimer = setTimeout(function() {
								backHomePage();
							}, 200);
						}
					} else {
						isInPage = false;
						clearTimeout(inPageTimer);
						setTimeout( function () {
							if (!isInPage) {
								leaveHomepage();
							}
						}, 3000);
					}
			};
			ThsExternal.registerEvent('onshow', onshow)
		} catch (e) {}

		// var autoDo = function(callback, delay) {
		// 	setInterval(function() {
		// 		if (isInPage) {
		// 			callback();
		// 		}
		// 	}, delay);
		// };
		// 60000
		async function refreshScqr() {
			var isTrading = await clientApi.judgeIntime(['08:55', '11:35']) || clientApi.judgeIntime(['12:55', '15:05']);
			var tradeDay = await clientApi.getTradingDay();
			var isTradeDay = tradeDay == await clientApi.serverTime();
			if (isTradeDay && isTrading && $('.scqr-box').find('.title-active').index() === 0) {
				scqrModule.init();
			} else if (isTradeDay && isTrading) {
				zqxyModule.init();
			}
		}
		scqrTimer = setInterval(function() {
			if (isInPage) {
				refreshScqr();
			}
		}, 60000);
		// 600000
		async function refreshPool() {
			var isTrading = clientApi.judgeIntime(['09:20', '11:40']) || clientApi.judgeIntime(['12:50', '15:20']);
			var tradeDay = clientApi.getTradingDay();
			var isTradeDay = tradeDay == await clientApi.serverTime();
			if (isTradeDay && isTrading && $('[data-tab="pool"]').hasClass('title-active')) {
				stockPool.getStockCode();
			}
		}
		poolTimer = setInterval(function() {
			if (isInPage) {
				refreshPool();
			}
		}, 600000);
		// 3000

	})();

});
