// @charset "utf-8";

define(function(require, exports, module) {
	var clientApi = require('../public/clientapi');
	var publicBase = require('../public/public');
	var stocksModule = {
		stocksThsQuote: null,
		initFinished: false,
		init: async function() {
			var self = this;
			await this.getUserStocks();
			await this.fillstockName();
			this.stocksThsQuote = new ThsQuote();
			this.requestCur();

			var delayTimer = null;
			$('#stocks_container').scroll(function() {
				if (delayTimer) {
					clearTimeout(delayTimer);
					delayTimer = null;
				}
				delayTimer = setTimeout(function() {
					self.requestCur();
				}, 300);
			});
			initFinished = true;
		},
		selfStocks: [],
		getUserStocks: async function() {
			var stocksStr = await clientApi.thsPassport.selfStocks();
			this.selfStocks = eval(stocksStr);
		},
		getStockName: async function() {
			var self = this;
			var selfStocksStr = this.selfStocks.join(',');
			var selfStockNameStr = await clientApi.thsQuote.getData2({
				'code': selfStocksStr,
				'type': 'zqmc'
			});
			var selfStockName = eval('(' + selfStockNameStr + ')');

			var stockNameObj = {};
			$.each(self.selfStocks, function(i, val) {
				if (selfStockName[val]) {
					stockNameObj[val] = selfStockName[val]['zqmc'];
				}
				// else {
				// for (var i = 0; i <= self.selfStocks.length; i++) {
				// 	if (self.selfStocks[i] == val) {
				// 		self.selfStocks.splice(i, 1);
				// 	}
				// }
				// stockNameObj[val] = '--';
				// }

			});
			// alert(JSON.stringify(stockNameObj));
			// self.selfStocks = newSelfStocks;
			return stockNameObj;
		},
		fillstockName: async function() {
			var self = this;
			var stockNameObj = await this.getStockName();
			var emptyStockHtml = '';
			$.each(self.selfStocks, function(i, val) {
				if (stockNameObj[val]) {
					emptyStockHtml += '<tr data-code="' + val + '">' +
						'<td class="txt-l pdl8">' + stockNameObj[val] + '</td>' +
						'<td>--</td>' +
						'<td>--</td>' +
						'<td class="yellow">--</td>' +
						'<td class="yellow pdr18">--</td>' +
						'</tr>';
				}
			});
			$('#stocks_container tbody').html(emptyStockHtml);
		},
		requestCur: function() {
			var self = this;
			if (self.selfStocks.length !== 0) {
				self.getVisibleStocks();
			}
		},
		quote: 'ZQMC,NEW,ZHANGDIEFU,money,vol,SETTLE,PRE',
		requestQuote: function() {
			var self = this;
			var quote = 'ZQMC,NEW,ZHANGDIEFU,money,vol,SETTLE,PRE';
			var stocks = self.curStockCode.join(',');
			var reqParam = {
				code: stocks,
				type: quote,
				period: 'now',
			};
			var onready = function(p) {
					self.getData(stocks, quote);
			}
			self.stocksThsQuote.request(reqParam).then(onready);
			self.registerPush();
		},
		registerPush: function() {
			var self = this;
			var stocks = self.curStockCode.join(',');
		
			self.stocksThsQuote.registerPush({
				code: stocks,
				// onready: function(p) {
				// 	self.getData(stocks, quote);
				// }
				
			}, publicBase.throttle(self.getData, 4000, self));
		},
		getData: async function(stocks, type) {
			var self = this;
			stocks = self.curStockCode;
			type = self.quote;

			var params = {
				code: stocks,
				mode: 'maexact',
				type: type
			};
			var rstData = await self.stocksThsQuote.getData2(params);
			rstData = eval('(' + rstData + ')');
			// var typeArr = type.split(',');
			// var rstData = {};
			// $.each(typeArr, function(i, t) {
			// 	var params = {
			// 		code: stocks,
			// 		mode: 'maexact',
			// 		type: t
			// 	};
			// 	var tmpStr = self.stocksThsQuote.getData(params);
			// 	var tmpObj = eval('(' + tmpStr + ')');
			// 	// tmpObj = ({'300033': {'time':0,'ZHANGDIEFU':'-0.9576'},'600600': {'time':0,'ZHANGDIEFU':'-1.9097'}})
			// 	var codeData = {};
			// 	$.each(tmpObj, function(j, o) {
			// 		codeData[j] = o[t];

			// 	});
			// 	rstData[t] = codeData;
			// });
			// alert(JSON.stringify(rstData));
			self.renderData(rstData, stocks);
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
		renderData: function(data, stocks) {
			var self = this;
			// alert(JSON.stringify(data));
			$.each(stocks, function(i, val) {
				var newprice = parseFloat(data[val]['NEW']);
				var zdf = parseFloat(data[val]['ZHANGDIEFU']);
				var money = parseFloat(data[val]['money']);
				var cjl = parseFloat(data[val]['vol']);
				var $td = $('#stocks_container').find('[data-code="' + val + '"]').find('td');
				var color = '';
				if (zdf > 0) {
					color = 'red';
				} else if (zdf < 0) {
					color = 'green';
				}
				if (isNaN(newprice)) {
					newprice = '--';
				} else {
					newprice = parseFloat(newprice).toFixed(2);
				}
				if (isNaN(zdf)) {
					zdf = '--';
				} else {
					zdf = parseFloat(zdf).toFixed(2) + '%';
				}
				if (isNaN(money)) {
					money = '--';
				} else {
					money = self.getUnit(money, 2);
				}
				if (isNaN(cjl)) {
					cjl = '--';
				} else {
					cjl = self.getUnit(cjl, 2);
				}
				$td.eq(1).removeClass('red green').addClass(color)
					.text(newprice);
				$td.eq(2).removeClass('red green').addClass(color)
					.text(zdf);
				$td.eq(3).text(money);
				$td.eq(4).text(cjl);
			});
		},

		curStockCode: [],
		getVisibleStocks: function() {
			var stocksDomArr = this.getVisibleStocksDom();
			var curStockCode = [];
			$.each(stocksDomArr, function(i, val) {
				curStockCode.push(val.attr('data-code'));
			});
			this.curStockCode = curStockCode;
			this.requestQuote();
		},

		getVisibleStocksDom: function() {
			// var mainHeight = $('body').height() || 750;
			var containerOffsetTop = $('#stocks_container').offset().top;
			var containerHeight = $('#stocks_container').height();
			// $('#stocks_container').css('height', mainHeight - containerOffsetTop + 20);
			function getFirstVisibleDom($trDoms) {
				if ($trDoms.length === 0) {
					return undefined;
				}
				var low = 0;
				var high = $trDoms.length;
				var mid = parseInt((high + low) / 2);

				var hasSearchSuccess = false;
				do {
					var $tr = $trDoms.eq(mid);
					var trOffsetTop = $tr.offset().top;
					var trHeight = $tr.height();

					if (trOffsetTop - containerOffsetTop < -trHeight) {
						low = mid;
					} else if (trOffsetTop - containerOffsetTop <= containerHeight + trHeight) {
						hasSearchSuccess = true;
						break;
					} else {
						high = mid;
					}
					mid = parseInt((high + low) / 2);
				} while (mid > low && mid < high && low < high);


				if (hasSearchSuccess) {
					for (var i = mid; i >= 0; i--) {
						var $tr = $trDoms.eq(i);
						var trOffsetTop = $tr.offset().top;
						var trHeight = $tr.height();

						if (trOffsetTop - containerOffsetTop >= -trHeight && trOffsetTop - containerOffsetTop <= containerHeight + trHeight) {
							continue;
						} else {
							return i + 1;
						}
					}

					return 0;
				} else {
					return undefined;
				}
			}
			var $trDoms = $('#stocks_container tbody tr');

			var firstVisibleDomNum = getFirstVisibleDom($trDoms);
			if (firstVisibleDomNum === undefined) {
				return [];
			}
			var visibleStockDoms = [];

			for (var i = firstVisibleDomNum, trNum = $trDoms.length; i < trNum; i++) {
				var $tr = $trDoms.eq(i);
				var trOffsetTop = $tr.offset().top;
				var trHeight = $tr.height();

				// tr的实际offset.Top在当前的自选股框内算是可以看到的自选股列表（上下修正一个tr的高度，防止有一半的股票没数据）
				if (trOffsetTop - containerOffsetTop >= -trHeight && trOffsetTop - containerOffsetTop <= containerHeight + trHeight) {
					visibleStockDoms.push($tr);
				} else {
					break;
				}
			}
			return visibleStockDoms;
		}
	};

	module.exports = stocksModule;
});