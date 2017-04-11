// @charset "utf-8";

define(function(require, exports, module) {
	var publicBase = require('./public');
	try {
		var indexQuoteObj = new ThsQuote();
		var futuresQuoteObj = new ThsQuote();
	} catch (e) {
		alert('need in client');
	}
	function ReqQuote() {
		this.quote = 'NEW, ZHANGDIEFU';
		this.period = 'now';
		this.init.apply(this, arguments);
	}
	ReqQuote.prototype = {

		init: function(params) {
			this.stocks = params.stocks;
			this.quote = params.quote || this.quote;
			this.period = params.period || this.period;

			this.callback = params.callback;
			this.inPage = true;
			this.isNeedPush = params.isNeedPush || false;
			this.hqData = {};
			try {
				this.thsQuote = params.qType == 1 ? futuresQuoteObj : indexQuoteObj;
			} catch (e) {
				alert('need in client');
			}
		},
		request: function() {
			var self = this;
			var stocks = this.stocks,
				quote = this.quote;
				var reqParam = {
					code: this.stocks,
					type: this.quote,
					period: this.period,
					onready: function(p) {
						console.log(p);
						self.getData(stocks, quote);
					}
				};
				self.thsQuote.request2(reqParam);
			// var reqParam = {
			// 	code: this.stocks,
			// 	type: this.quote,
			// 	period: this.period,
			// };
			// var onready = function(p) {
			// 	self.getData(stocks, quote);
			// }
			// self.thsQuote.request(reqParam).then(onready);
			if (self.isNeedPush) {
				self.resisterPush(stocks);
			}
		},
		resisterPush: function(stocks) {
			var self = this;
			stocks = stocks || self.stocks;
			self.thsQuote.registerPush({code:stocks}, publicBase.throttle(self.getData, 3800, self));
		},
		unregisterPush: function() {
			this.thsQuote.unregisterPush();
		},
		getData: async function(stocks, type) {
			var self = this;
			stocks = self.stocks;
			type = self.quote;

			var params = {
				code: stocks,
				mode: 'maexact',
				type: type
			};
			var rstData = await self.thsQuote.getData2(params);
			rstData = eval('(' + rstData + ')');
			// alert(rstData);
			// alert(typeof rstData);
			// return;
			// var typeArr = type.split(',');

			// var rstData = {};
			// $.each(typeArr, function(i, t) {
			// 	var params = {
			// 		code: stocks,
			// 		mode: 'maexact',
			// 		type: t
			// 	};
			// 	var tmpStr = self.thsQuote.getData(params);
			// 	var tmpObj = eval('(' + tmpStr + ')');
			// 	var codeData = {};
			// 	$.each(tmpObj, function(j, o) {
			// 		codeData[j] = o[t];

			// 	});
			// 	rstData[t] = codeData;
			// });
			// alert(JSON.stringify(rstData));
			self.callback(rstData);
		}
	};

	module.exports = ReqQuote;
});
