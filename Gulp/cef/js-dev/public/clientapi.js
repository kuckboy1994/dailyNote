// @charset "utf-8";

define(function(require, exports, module) {
	var clientApi = {
		thsQuote: null,
		thsCache: null,
		thsUtil: null,
		thsPassport: null,
		init: function() {
			var self = this;
			self.thsQuote = new ThsQuote();
			self.thsCache = new ThsCache();
			self.thsUtil = new ThsUtil();
			self.thsPassport = new ThsPassport();
		},
		version: '',
		version42: '8.40.30',
		version60: '8.50.60',
		setVersion: async function(style) {
			style = 'brief';
			var ret = "E020.00.00";
			try {
				ret = await ThsUtil.getHxVer();
			} catch (e) {
				//alert('请使用同花顺客户端登陆');
			}

			if (style == 'brief') {
				var versionArr = ret.split('.');
				ret = versionArr[0].substr(3) + "." + versionArr[1] + "." + versionArr[2];
			}

			this.version = ret;
		},

		//获取客户端版本
		getVersion: function() {
			return this.version;
		},
		getClientVersion: async function() {
			var self = this;
			var versionStr = "";
			try {
				versionStr = await ThsUtil.getHxVer();
			} catch (e) {
				versionStr = "";
			}
			if (versionStr == "" || typeof(versionStr) == 'undefined') {
				versionStr = 'E020.00.00';
			}
			var versionArr = versionStr.split('.');
			return versionArr[0].substr(3) + "" + versionArr[1] + "" + versionArr[2];
		},
		judgeIntime: async function(arr) {
			var d;
			try {
				var timeStamp = await ThsQuote.getServerTime();
				d = new Date(timeStamp * 1000);
			} catch (e) {
				d = new Date();
			}
			var current = d.getHours() * 60 + d.getMinutes();
			var arrBegin = arr[0].split(':');
			var arrEnd = arr[1].split(':');
			var b = parseFloat(arrBegin[0], 10) * 60 + parseFloat(arrBegin[1], 10);
			var e = parseFloat(arrEnd[0], 10) * 60 + parseFloat(arrEnd[1], 10);
			if (current >= b && current <= e) {
				return true;
			} else {
				return false;
			}
		},

		//版本比较
		versionCompare: function(a, b) {
			var clientVer = parseInt(a.replace(/\./g, ""));
			var appVer = parseInt(b.replace(/\./g, ""));
			var flag = false;
			if (clientVer < appVer) {
				flag = true;
			}
			return flag;
		},
		serverTime: async function(cut) {
			cut = cut || '';
			var time;
			try {
				var timeStamp = await ThsQuote.getServerTime();
				time = new Date(timeStamp * 1000);
			} catch (e) {
				time = new Date();
			}
			var YY = time.getFullYear();
			var MM = (time.getMonth() + 1 < 10 ? '0' +
				(time.getMonth() + 1) : time.getMonth() + 1).toString();
			var DD = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
			var date = YY + cut + MM + cut + DD;
			return date;
		},
		serverHour: async function(cut) {
			cut = cut || '';
			var time;
			try {
				var timeStamp = await ThsQuote.getServerTime();
				time = new Date(timeStamp * 1000);
			} catch (e) {
				time = new Date();
			}
			var HH = (time.getHours() < 10 ? '0' +
				time.getHours() : time.getHours()).toString();
			var SS = (time.getMinutes() < 10 ? '0' +
				time.getMinutes() : time.getMinutes()).toString();
			var date = HH + cut + SS;
			return date;
		},
		getTradingDay: async function() {
			var today = await this.serverTime();
			var tradingDay = await ThsQuote.getSHTradeDate(today);
			return tradingDay;
		}
	};

	module.exports = clientApi;
});