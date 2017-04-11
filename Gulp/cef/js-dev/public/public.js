// @charset "utf-8";

define(function(require, exports, module) {
	var clientApi = require('../public/clientapi');
	var publicBase = {
		ajaxJson: function(paramobj) {
			var defaultparam = {
				type: 'GET',
				url: '',
				data: {},
				cache: false,
				callback: ''
			};
			var param = $.extend(defaultparam, paramobj);
			$.ajax({
				type: param.type,
				url: param.url,
				data: param.data,
				cache: param.cache,
				dataType: 'json',
				success: function(result) {
					param.callback(result);
				},
				error: function(e) {
					param.callback({});
				}
			});
		},
		ajaxJsonp: function(paramobj) {
			var defaultparam = {
				url: '',
				data: {},
				cache: false,
				jsonpCallback: '',
				callback: ''
			};
			var param = $.extend(defaultparam, paramobj);
			$.ajax({
				type: 'GET',
				url: param.url,
				data: param.data,
				cache: param.cache,
				dataType: 'jsonp',
				jsonp: false,
				jsonpCallback: param.jsonpCallback,
				success: function(result) {
					param.callback(result);
				},
				error: function(e) {
					param.callback({});
				}
			});
		},
		getTradeDayAndNextTradeDay: async function(callbackfn) {
			var serverTime = await clientApi.serverTime();
			var serverHour = await clientApi.serverHour();
			this.ajaxJsonp({
				url: 'http://sp.10jqka.com.cn/api/tradeday/get/date/' + serverTime + '/offset/3/isrange/1/return/jsonp/callback/gettradeday/',
				jsonpCallback: 'gettradeday',
				callback: function(result) {
					var tradeDay, nextTradeDay;
					if (result.errorcode === 0) {
						if (serverHour >= '1500' && serverTime >= result.result[0]) {
							tradeDay = result.result[1];
							nextTradeDay = result.result[2];
						} else {
							tradeDay = result.result[0];
							nextTradeDay = result.result[1];
						}
						callbackfn(tradeDay, nextTradeDay);
					}
				}
			});
		},
		throttle: function(fn, threshhold, scope) {
			threshhold = threshhold || 250;
			var lastPub,
				timerPub;
			return function() {
				var context = scope || this;
				var now = +new Date(),
					args = arguments;
				if (lastPub && now - lastPub < threshhold) {
					clearTimeout(timerPub);
					var delay = threshhold - (now - lastPub);
					timerPub = setTimeout(function() {
						lastPub = +new Date();
						fn.apply(context, args);
					}, delay);
				} else {
					lastPub = now;
					fn.apply(context, args);
				}
			};
		}
	};

	module.exports = publicBase;
});