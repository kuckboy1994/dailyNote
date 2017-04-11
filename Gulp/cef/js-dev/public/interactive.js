// @charset "utf-8";

define(function(require, exports, module) {
	var clientApi = require('../public/clientapi');
	var clientOpen = require('../public/clientopen');
	var storage = require('../public/storage');

	var ipoModule = require('../stocks/ipo');
	var stockPool = require('../stocks/stockpool');
	var scqrModule = require('../chart/scqr');
	var zqxyModule = require('../chart/zqxy');

	var interactive = {
		init: function() {
			this.theEvent();
		},
		theEvent: function() {
			var self = this;
			// $('tr').live({
			// 	mouseenter: function() {
			// 		$(this).addClass('tr-hover');
			// 	},
			// 	mouseleave: function() {
			// 		$(this).removeClass('tr-hover');
			// 	}
			// });

			$('tr').live('click', function() {
				$('tr').removeClass('tr-select');
				$(this).addClass('tr-select');
				var $parentTbody = $(this).parent('tbody').attr('data-type');
				if ($parentTbody === 'index') {
					TA.log({id: 'l2sy_57d618a7_412'});
				} else if ($parentTbody === 'futures') {
					TA.log({id: 'l2sy_57d618fa_987'});
				} else if ($parentTbody === 'stockpool') {
					TA.log({id: 'l2sy_57d61b55_671'});
				} else if ($parentTbody === 'selfstocks') {
					TA.log({id: 'l2sy_57d61b08_869'});
				}
			});

			$('.wrap-top-nav').on('click', 'li', function() {
				var index = $(this).index();
				switch (index) {
					case 0:
						clientOpen.switchPage(392);
						TA.log({id: 'l2sy_57d61935_547'});
						break;
					case 1:
						clientOpen.switchPage(4341);
						TA.log({id: 'l2sy_57d6195f_360'});
						break;
					case 2:
						clientOpen.switchPage(982);
						TA.log({id: 'l2sy_57d61988_472'});
						break;
					case 3:
						clientOpen.switchPage(4378);
						TA.log({id: 'l2sy_57d619b4_463'});
						break;
					case 4:
						window.open('http://t.10jqka.com.cn/circle/17499/');
						TA.log({id: 'l2sy_57d619d8_319'});
						break;
					case 5:
						clientOpen.switchPage(4197);
						TA.log({id: 'l2sy_57d619f8_981'});
						break;
					case 6:
						clientOpen.switchPage(1246);
						TA.log({id: 'l2sy_57d61aad_415'});
						break;
					default:
						break;
				}
			});

			$('.wrap-top-nav li').hover(function() {
				$(this).addClass('nav-hover');
			}, function() {
				$(this).removeClass('nav-hover');
			});

			$('.course-tab-line-title').eq(1).on('click', function () {
				TA.log({id : 'l2sy_57d62261_685'});
				window.open('http://school.10jqka.com.cn/vip/play_18740.html');
			});
			$('.course-tab-line-title').eq(2).on('click', function () {
				TA.log({id : 'l2sy_57d62261_685'});
				window.open('http://school.10jqka.com.cn/vip/play_18714.html');
			});
			$('.course-tab-line-title').eq(3).on('click', function () {
				TA.log({id : 'l2sy_57d62261_685'});
				window.open('http://school.10jqka.com.cn/vip/play_18637.html');
			});
			$('.course-more').on('click', function () {
				TA.log({id : 'l2sy_57d62261_685'});
				window.open('http://school.10jqka.com.cn/vip/level/');
			});

			$('.vote-rise-btn').hover(async function() {
				var flag = await storage.getFileContent("voted.log");
				if (flag === false || flag == '0') {
					$(this).addClass("vote-onrise-btn");
				} else {
					$(this).addClass("vote-rised-btn");
				}
			}, async function() {
				var flag = await storage.getFileContent("voted.log");
				if (flag === false || flag == '0') {
					$(this).removeClass("vote-onrise-btn");
				}
			});
			$('.vote-fall-btn').hover(async function() {
				var flag = await storage.getFileContent("voted.log");
				if (flag === false || flag == '0') {
					$(this).addClass("vote-onfall-btn");
				} else {
					$(this).addClass("vote-falled-btn");
				}
			}, async function() {
				var flag = await storage.getFileContent("voted.log");
				if (flag === false || flag == '0') {
					$(this).removeClass("vote-onfall-btn");
				}
			});

			// $('#cache_fnindex .fn-btn, #cache_fnselect .fn-btn').live({
			// 	mouseenter: function() {
			// 		$(this).addClass('fn-btn-hover');
			// 	},
			// 	mouseleave: function() {
			// 		$(this).removeClass('fn-btn-hover');
			// 	}
			// });
			$('.fn-btn').live('click', async function() {
				var url = $(this).attr('urlInfo'),
					openType = $(this).attr('openStyle'),
					taid = $(this).attr('taid');
				clientOpen.openApp(url, openType);
				TA.log(taid);
			});

			// $('#fnindex_content .fn-btn, #fnselect_content .fn-btn').live({
			// 	mouseenter: function() {
			// 		$(this).addClass('fn-btn-hover');
			// 		$(this).find('.fnicon').css('background-position', '0 -45px');
			// 	},
			// 	mouseleave: function() {
			// 		$(this).removeClass('fn-btn-hover');
			// 		$(this).find('.fnicon').css('background-position', '0 0');
			// 	}
			// });

			$('.portrait').on('click', async function() {
				var userid = await clientApi.thsPassport.get('userid');
				clientOpen.openApp('http://i.10jqka.com.cn/' + userid + '/infocenter/grzl#avatar', 5);
				TA.log({id: 'l2sy_57d61d2e_69'});
			});


			$('.title>.title-item').on('click', function() {
				if (!$(this).hasClass('title-active')) {
					$(this).addClass('title-active').siblings().removeClass('title-active');
					var index = $(this).index();
					var dataTab = $(this).attr('data-tab');
					if (dataTab == 'scqr') {
						scqrModule.init();
						TA.log({id: 'l2sy_57d61bc2_89'});
					} else if (dataTab == 'zqxy') {
						zqxyModule.init();
						TA.log({id: 'l2sy_57d61be8_690'});
					} else if (dataTab == 'pool') {
						stockPool.getStockCode();
					} else if (dataTab == 'ipo') {
						ipoModule.init();
						TA.log({id: 'l2sy_57d61b73_747'});
					}
					$(this).parent('.title').next('div').find('.tab-box').eq(index).show().
					siblings('.tab-box').hide();
				}

			});
			$('.tiwen').on('click', function() {
				$('.wrap-ask').show();
				TA.log({id : 'l2sy_57d61dd3_180'});
			});
			$('.ask-close').on('click', function() {
				$('.wrap-ask').hide();
			});

			// 提问的事件
			var placeholder = '请输入您的问题';
			$('#question-input').on('focus', function() {
				if ($('#question-input').val() == placeholder) {
					$('#question-input').val('');
				}
			});

			$('#question-input').on('blur', function() {
				if ($('#question-input').val() === '') {
					$('#question-input').val(placeholder);
				}
			});
			$('#question-input').on('keyup', function(e) {
				e = e || window.event;
				var text = $.trim($('#question-input').val());
				var maxLimit = 80;
				if (text.length > maxLimit) {
					text = text.substring(0, maxLimit);
					$('#question-input').val(text);
				}
				// if (e.keyCode == 13 && text != '') {
				// 	self.askQuestion();
				// 	TA.log({
				// 		id: '110'
				// 	});
				// }
			});
			$('#ask_btn').on('click', function() {
				if ($('#question-input').val() !== placeholder) {
					self.askQuestion();
					TA.log({
						id: '110'
					});
				}
			});

			$('.apply-btn').live('click', function() {
				clientApi.thsUtil.setNewWeituoBtnClicked("button_clicked=41");
			});

			$('[data-stat]').live('click', function() {
				var statId = $(this).attr('data-stat');
				TA.log(statId);
			});
			$('[taid]').live('click', function() {
				var statId = $(this).attr('taid');
				TA.log(statId);
			});

			$('tr').live('dblclick', async function() {
				var code = $(this).attr('data-code');
				var $parentTbody = $(this).parent('tbody').attr('data-type');
				if ($parentTbody === 'selfstocks') {
					var stockList = await clientApi.thsPassport.selfStocks();
					var stockListArr = eval(stockList);
					clientApi.thsQuote.syncStockList({
						id: 379,
						code: code,
						stocklist: stockListArr.join("|")
					});
					TA.log({id: 'l2sy_57d61b08_869'});
				} else {
					if (code == '' || !code) {
						return;
					}
					clientApi.thsQuote.switchPage({
						id: 379,
						code: code
					});
					if ($parentTbody === 'index') {
						TA.log({id: 'l2sy_57d618a7_412'});
					} else if ($parentTbody === 'futures') {
						TA.log({id: 'l2sy_57d618fa_987'});
					} else if ($parentTbody === 'stockpool') {
						TA.log({id: 'l2sy_57d61b55_671'});
					}

				}
				// try {
				// 	var url = "hxa://hexin.exe 'opt=13&param=" + code + "'";
				// 	location.href = url;
				// } catch (e) {
				// 	return false;
				// }
			});

		},
		askQuestion: function() {
			var text = $.trim($('#question-input').val());
			text = encodeURI(text);
			var url = 'http://sp.10jqka.com.cn/liuyan/index/index/projectid/74/question/' + text + '/';
			clientApi.thsUtil.openURL(url, 9);
		}
	};

	module.exports = interactive;
});