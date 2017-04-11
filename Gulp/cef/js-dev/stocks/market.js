// @charset "utf-8";
define(function(require, exports, module) {
	var clientApi = require('../public/clientapi');
	var clientQuote = require('../public/clientquote');
	var indexModule = {
		isClientInitComplete: false,
		init: function() {
			var self = this;
			// var thsQuote = external.createObject("Quote");
			// var initTimer = setInterval(function() {
			// 	if (!self.isClientInitComplete) {
			// 		thsQuote.request({
			// 			code: '1A0001',
			// 			type: 'new',
			// 			onready: function() {
			// 				self.isClientInitComplete = true;
			// 				clearInterval(initTimer);
			// 				initTimer = null;
			// 				self.request();
			// 				self.requestFutures();
			// 			}
			// 		});
			// 	} else {
			// 		clearInterval(initTimer);
			// 		initTimer = null;
			// 		self.request();
			// 		self.requestFutures();
			// 	}
			// }, 200);
			self.request();
			self.requestFutures();
		},
		reqIndexQuote: null,
		request: function() {
			var self = this;
			var code = '1A0001,399001,399006';
			var quote = 'ZQMC,NEW,ZHANGDIEFU,money,SETTLE,PRE,203,209,204,210';
			var reqCallback = function(data) {
				// alert(JSON.stringify(data));
				var indexHtml = [];
				// var hoverCode = '';
				var selectCode = '';
				// if ($('.wrap-left').find('.tr-hover').length) {
				// 	hoverCode = $('.wrap-left').find('.tr-hover').attr('data-code');
				// }
				if ($('.wrap-left').find('.tr-select').length) {
					selectCode = $('.wrap-left').find('.tr-select').attr('data-code');
				}
				$.each(code.split(','), function(i, val) {
					var zqmc = data[val]['ZQMC'];
					if (zqmc == 'NUL' || !zqmc) {
						zqmc = '--';
					}
					var newprice = '--';
					if (data[val]['NEW'] && data[val]['NEW'] != 'NUL') {
						newprice = parseFloat(data[val]['NEW']).toFixed(2);
					}

					var zdf = '--';
					var zdfT = '--';
					if (data[val]['ZHANGDIEFU'] != 'NUL' && data[val]['ZHANGDIEFU']) {
						zdf = parseFloat(data[val]['ZHANGDIEFU']).toFixed(2);
						zdfT = parseFloat(data[val]['ZHANGDIEFU']).toFixed(2) + '%';
					}

					var money = '--';
					if (data[val]['money'] != 'NUL' && data[val]['money']) {
						money = (parseFloat(data[val]['money']) / 100000000).toFixed(2) + '亿';
					}

					var bbd = '--';
					var bbdNum = 0;
					if (data[val]['203'] != 'NUL' && data[val]['209'] != 'NUL' && data[val]['204'] != 'NUL' && data[val]['210'] != 'NUL') {
						var data203 = parseFloat(data[val]['203']);
						var data209 = parseFloat(data[val]['209']);
						var data204 = parseFloat(data[val]['204']);
						var data210 = parseFloat(data[val]['210']);
						var bbd = (data203 + data209 - data204 - data210);
						bbd = (bbd / 100000000).toFixed(2);
						bbdNum = bbd;
						if (isNaN(bbd)) {
							bbd = '--';
							bbdNum = '--';
						} else {
							bbd = bbd + '亿';
						}
					}

					var color = '';
					if (zdf > 0) {
						color = 'red';
					} else if (zdf < 0) {
						color = 'green';
					}
					var bbdColor = '';
					if (bbdNum > 0) {
						bbdColor = 'red';
					} else if (bbdNum < 0) {
						bbdColor = 'green';
					}
					// var trhover = '';
					var trselect = '';
					// if (val == hoverCode) {
					// 	trhover = 'tr-hover';
					// }
					if (val == selectCode) {
						trselect = 'tr-select';
					}
					var html = '<tr class="' + trselect + '" data-code="' + val + '">' +
						'<td class="yellow txt-l pdl8">' + zqmc + '</td>' +
						'<td class="' + color + '">' + newprice + '</td>' +
						'<td class="' + color + '">' + zdfT + '</td>' +
						'<td class="yellow">' + money + '</td>' +
						'<td class="pdr8 ' + bbdColor + '">' + bbd + '</td>' +
						'</tr>';
					indexHtml.push(html);
				});

				$('#index_container').html(indexHtml.join(''));
			};
			var params = {
				stocks: code,
				quote: quote,
				period: 'now',
				callback: reqCallback,
				isNeedPush: true,
				qType: 0
			};
			try {
				self.reqIndexQuote = new clientQuote(params);
				self.reqIndexQuote.request();
			} catch (e) {
				// alert(e.message);
			}
		},
		getFuturesCode: async function() {
			var code = await clientApi.thsUtil.getBlockStockByID(55304);
			var codeArr = code.split(',');
			var futuresCode = [];
			$.each(codeArr, function(i, val) {
				if (val.indexOf('129') != -1) {
					var arr = val.split(':');
					// futuresCode.push(arr[1]);
					if (arr[1].indexOf('IF') != -1) {
						futuresCode[0] = arr[1];
					}
					if (arr[1].indexOf('IH') != -1) {
						futuresCode[1] = arr[1];
					}
					if (arr[1].indexOf('IC') != -1) {
						futuresCode[2] = arr[1];
					}
				}
			});
			return futuresCode;
		},
		reqFuturesQuote: null,
		requestFutures: async function() {
			var self = this;
			var futuresCode = await this.getFuturesCode();
			code = futuresCode.concat('1B0016', '1B0905', '399300');
			var quote = 'ZQMC,NEW,QHZDF,QHZD,money,pre,SETTLE';
			var reqCallback = function(data) {
				var futuresHtml = [];
				// var hoverCode = '';
				var selectCode = '';
				// if ($('.wrap-left').find('.tr-hover').length) {
				// 	hoverCode = $('.wrap-left').find('.tr-hover').attr('data-code');
				// }
				if ($('.market-box').find('.tr-select').length) {
					selectCode = $('.market-box').find('.tr-select').attr('data-code');
				}

				var isih = data['1B0016']['NEW'] || 'NUL';
				var isic = data['1B0905']['NEW'] || 'NUL';
				var isif = data['399300']['NEW'] || 'NUL';
				$.each(futuresCode, function(i, val) {
					var zqmc = data[val]['ZQMC'];
					if (zqmc == 'NUL' || !zqmc) {
						zqmc = '--';
					}
					var newprice = parseFloat(data[val]['NEW']);
					var newpriceT = parseFloat(data[val]['NEW']).toFixed(1);
					if (isNaN(newprice)) {
						newpriceT = '--';
						newprice = '--';
					}

					var zdf = parseFloat(data[val]['QHZDF']).toFixed(2);
					var zdfT = parseFloat(data[val]['QHZDF']).toFixed(2) + '%';
					if (isNaN(zdf)) {
						zdf = '--';
						zdfT = '--';
					}
					var pre = parseFloat(data[val]['pre']);
					var settle = parseFloat(data[val]['SETTLE']);

					var zd = '--';
					var qxc = '--';
					if (newprice != '--' && isih != 'NUL' && isic != 'NUL' && isif != 'NUL') {
						if (val.indexOf('IH') != -1) {
							qxc = newprice - isih;
						} else if (val.indexOf('IC') != -1) {
							qxc = newprice - isic;
						} else {
							qxc = newprice - isif;
						}
						qxc = parseFloat(qxc).toFixed(1);
					}
					var qxcColor = '';
					if (qxc > 0) {
						qxcColor = 'red';
					} else if (qxc < 0) {
						qxcColor = 'green';
					}

					if (newprice != '--' && !isNaN(settle)) {
						zd = parseFloat(newprice - settle).toFixed(1);
					} else if (newprice != '--' && !isNaN(pre)) {
						zd = parseFloat(newprice - pre).toFixed(1);
					}
					var zdColor = '';
					if (zd > 0) {
						zdColor = 'red';
					} else if (zd < 0) {
						zdColor = 'green';
					}
					var color = '';
					if (zdf > 0) {
						color = 'red';
					} else if (zdf < 0) {
						color = 'green';
					}
					// var trhover = '';
					var trselect = '';
					// if (val == hoverCode) {
					// 	trhover = 'tr-hover';
					// }
					if (val == selectCode) {
						trselect = 'tr-select';
					}
					var html = '<tr class="' + trselect + '" data-code="' + val + '">' +
						'<td class="yellow txt-l pdl8">' + zqmc + '</td>' +
						'<td class="' + color + '">' + newpriceT + '</td>' +
						'<td class="' + color + '">' + zdfT + '</td>' +
						'<td class="' + zdColor + '">' + zd + '</td>' +
						'<td class="pdr8 ' + qxcColor + '">' + qxc + '</td>' +
						'</tr>';
					futuresHtml.push(html);
				});


				$('#futures_container').html(futuresHtml.join(''));

			};
			var params = {
				stocks: code,
				quote: quote,
				period: 'now',
				callback: reqCallback,
				isNeedPush: true,
				qType: 1
			};
			try {
				self.reqFuturesQuote = new clientQuote(params);
				self.reqFuturesQuote.request();
			} catch (e) {
				// alert(e.message);
			}
		}
	};

	module.exports = indexModule;
});