// @charset "utf-8";

define(function(require, exports, module) {
	var publicBase = require('../public/public');
	var clientApi = require('../public/clientapi');
	// var clientQuote = require('../public/clientquote');
	var stockPool = {
		init: function() {
			var self = this;
			this.getStockCode();
			this.poolThsQuote = new ThsQuote();

			$('.sortbtn').unbind('click').on('click', function() {
				var that = this;
				self.changeSortBy(that);
			});
		},
		stockPoolCode: [],
		stockPoolObj: {},
		poolThsQuote: null,
		isClientInitComplete: false,
		getStockCode: function() {
			var self = this;
			var url = 'http://vis.10jqka.com.cn/tszbxg/api/homedata/datatype/jsonp/callback/getzb/';
			publicBase.ajaxJsonp({
				url: url,
				jsonpCallback: 'getzb',
				callback: function(resultData) {
					if (resultData.errorcode === 0) {
						var result = resultData.result;
						if (!result || result.length === 0) {
							return;
						}
						var stockPoolCode = [];
						var stockPoolObj = {};
						$.each(result, function(i, val) {
							if ($.inArray(val.stockcode, stockPoolCode) == -1) {
								stockPoolCode.push(val.stockcode);
							} else {
								return true;
							}
							stockPoolObj[val['stockcode']] = val['desc'];
						});
						self.stockPoolCode = stockPoolCode;
						self.stockPoolObj = stockPoolObj;
						self.requestQuote();
						// var initTimer = setInterval(function() {
						// 	if (!self.isClientInitComplete) {
						// 		self.poolThsQuote.request({
						// 			code: '1A0001',
						// 			type: 'new',
						// 			onready: function() {
						// 				self.isClientInitComplete = true;
						// 				clearInterval(initTimer);
						// 				initTimer = null;
						// 				self.requestQuote();
						// 			}
						// 		});
						// 	} else {
						// 		clearInterval(initTimer);
						// 		initTimer = null;
						// 		self.requestQuote();
						// 	}
						// }, 200);
					}

				},
				errorCallback: function() {
					// alert('error-stockpool');
				}
			});
		},
		quote: 'ZQMC,NEW,ZHANGDIEFU,money,SETTLE,PRE',
		requestQuote: function() {
			var self = this;
			if (self.stockPoolCode.length === 0) {
				return;
			}
			var quote = 'ZQMC,NEW,ZHANGDIEFU,money,SETTLE,PRE';
			var stocks = self.stockPoolCode.join(',');
			var reqParam = {
				code: stocks,
				type: quote,
				period: 'now',
			};
			self.poolThsQuote.request(reqParam).then(self.getData(stocks, quote));
			self.registerPush();
		},
		registerPush: function() {
			var self = this;
			var stocks = self.stockPoolCode.join(',');
			self.poolThsQuote.registerPush({
				code: stocks,
				// onready: function(p) {
				// 	self.getData(stocks, quote);
				// }
			}, publicBase.throttle(self.getData, 3600, self));
		},
		unregisterPush: function() {
			this.poolThsQuote.unregisterPush();
		},
		getData: async function(stocks, type) {
			var self = this;
			stocks = self.stockPoolCode.join(',');
			type = self.quote;

			var params = {
				code: stocks,
				mode: 'maexact',
				type: type
			};
			var rstData = await self.poolThsQuote.getData2(params);
			rstData = eval('(' + rstData + ')');
			// var typeArr = type.split(',');
			// var rstData = {};
			// $.each(typeArr, function(i, t) {
			// 	var params = {
			// 		code: stocks,
			// 		mode: 'maexact',
			// 		type: t
			// 	};
			// 	var tmpStr = self.poolThsQuote.getData(params);
			// 	var tmpObj = eval('(' + tmpStr + ')');
			// 	var codeData = {};
			// 	$.each(tmpObj, function(j, o) {
			// 		codeData[j] = o[t];
			// 	});
			// 	rstData[t] = codeData;
			// });
			// alert(JSON.stringify(rstData));
			self.getSortData(rstData, stocks);
		},
		getSortData: function(data, stocks) {
			var self = this;
			var sortDataArr = [];
			$.each(stocks.split(','), function(i, val) {
				var zbdata = self.stockPoolObj[val] || '--';

				var zdf = parseFloat(data[val]['ZHANGDIEFU']);
				if (isNaN(zdf)) {
					zdf = -999;
				}
				var xj = parseFloat(data[val]['NEW']);
				if (isNaN(xj)) {
					xj = -999;
				}
				var tempObj = {
					code: val,
					zqmc: data[val]['ZQMC'] || '--',
					zdf: zdf,
					xj: xj,
					money: data[val]['money'],
					zb: zbdata
				};
				sortDataArr.push(tempObj);
			});
			self.sortData = sortDataArr;
			self.renderData();
		},

		renderData: async function() {
			var self = this;
			// alert(JSON.stringify(self.sortData));
			var data = [];
			if (self.sortData.length > 1) {
				data = self.sortData.sort(self.sortTableFun(self.sortType, self.sortBy));
			} else {
				data = self.sortData;
			}
			var stockPoolHtml = [];
			// var hoverCode = '';
			var selectCode = '';
			// if ($('.wrap-left').find('.tr-hover').length) {
			// 	hoverCode = $('.wrap-left').find('.tr-hover').attr('data-code');
			// }
			if ($('#stockpool_container').find('.tr-select').length) {
				selectCode = $('#stockpool_container').find('.tr-select').attr('data-code');
			}
			var stocksStr = await clientApi.thsPassport.selfStocks();
			var selfStocks = eval(stocksStr);
			$.each(data, function(i, val) {
				var code = val['code'] == 'NUL' ? '' : val['code'];

				var zqmc = val['zqmc'] == 'NUL' ? '--' : val['zqmc'];

				var newprice = parseFloat(val['xj']).toFixed(2);
				if (isNaN(newprice) || newprice == -999) {
					newprice = '--';
				}
				// var newprice = val['xj'] == 'NUL' ? '--' : val['xj'];
				// var zdf = val['zdf'] == 'NUL' ? '--' : val['zdf'];
				var zdf = parseFloat(val['zdf']).toFixed(2);
				var zdfT = zdf + '%';
				if (isNaN(zdf) || zdf == -999) {
					zdf = '--';
					zdfT = '--';
				}
				// var money = val['money'] == 'NUL' ? '--' : val['money'];
				var money = '--';
				if (!isNaN(val['money'])) {
					money = self.getUnit(parseFloat(val['money']), 2);
				}

				var zbdata = val['zb'];

				var color = '';
				if (zdf > 0) {
					color = 'red';
				} else if (zdf < 0) {
					color = 'green';
				}
				if (zdf != '--') {
					zdf = parseFloat(zdf).toFixed(2) + '%';
				}
				// var trhover = '';
				var trselect = '';
				// if (code == hoverCode) {
				// 	trhover = 'tr-hover';
				// }
				if (code == selectCode) {
					trselect = 'tr-select';
				}

				var nameColor = 'yellow';
				if ($.inArray(code, selfStocks) != -1) {
					nameColor = '';
				}
				// var html = '<tr class="' + trhover + ' ' + trselect + '" data-code="' + code + '">' +
				var html = '<tr class="' + trselect + '" data-code="' + code + '">' +
					'<td class="txt-l pdl8 ' + nameColor + '">' + zqmc + '</td>' +
					'<td class="' + color + '">' + zdfT + '</td>' +
					'<td class="' + color + '">' + newprice + '</td>' +
					'<td class="yellow">' + money + '</td>' +
					'<td class="yellow pdr18" data-zb="">' + zbdata + '</td>' +
					'</tr>';
				stockPoolHtml.push(html);
			});
			$('#stockpool_container').html(stockPoolHtml.join(''));
		},

		getUnit: function(data, dec) {
			dec = dec || 2;
			var sign = '';
			if (data < 0) {
				sign = '-';
				data = Math.abs(data);
			}
			var units = ['万', '亿'];
			var unitIndex = -1;
			while (data > 10000) {
				data /= 10000;
				unitIndex++;
			}
			var unit = '';
			if (unitIndex != -1) {
				unit = units[unitIndex];
			}
			if (unitIndex === 0) {
				dec = 0;
			}
			return sign + data.toFixed(dec) + unit;
		},
		sortBy: 'zdf',
		sortType: 'desc',
		sortData: [],
		changeSortBy: function(that) {
			var self = this;
			var $this = $(that);
			$('.sortbtn i').hide();
			if ($this.attr('isshow')) {
				$this.attr('isShow', '');
				$this.find('i').show();
				$this.find('i').text('↑');
				self.sortType = 'asc';
			} else {
				$this.attr('isshow', 'isshow');
				$this.find('i').show();
				$this.find('i').text('↓');
				self.sortType = 'desc';
			}
			self.sortBy = $this.attr('sortby');
			self.renderData();
		},
		sortTableFun: function(sortType, sortBy) {
			var ordAlpah = (sortType == 'asc') ? '>' : '<';
			if (sortBy == 'zqmc') {
				var compare = new Function('a', 'b', 'return a.' + sortBy + '.localeCompare(b.' + sortBy + ')' + ordAlpah + '0 ? -1 : 1');
				return compare;
			} else {
				var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + ' ? 1 : -1');
				return sortFun;
			}
		}
	};

	module.exports = stockPool;
});