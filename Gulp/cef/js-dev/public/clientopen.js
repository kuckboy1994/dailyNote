// @charset "utf-8";

define(function(require, exports, module) {
	var clientApi = require('./clientapi');
	var clientOpen = {
		/**
		 *  客户端页面切换传入数字
		 */
		switchPage: function(pid) {
			var newStr = pid.toString();
			var tempArr = newStr.split('|');
			pid = tempArr[0];
			var code = tempArr[1] ? tempArr[1] : '';
			pid = parseInt(pid);
			var param = '';
			try {
				if (code === '' || code.length !== 6) {
					param = {
						'id': pid,
						'code': '600000',
						'scheme': ''
					};
				} else {
					param = {
						'id': pid,
						'code': code,
						'scheme': ''
					};
				}
				clientApi.thsQuote.switchPage(param);
			} catch (e) {}
		},
		/**
		 *  打开客户端置顶窗口（如快捷选股、内参）
		 */
		openClientTopFrame: function(url) {
			try {
				clientApi.thsUtil.showWebDlg({
					url: url,
					modeless: 1
				});
			} catch (e) {}
		},
		/**
		 *  打开客户端特定的应用-置顶窗口（如短线精灵）
		 */
		openClientApp: function(appName) {
			try {
				clientApi.thsUtil.postCommandByName(appName);
			} catch (e) {}
		},
		/**
		 *  用指标平台蓝色框打开
		 */
		openByClientBlueBrowser: function(url) {
			try {
				clientApi.thsUtil.openURL(url, 3);
			} catch (e) {}
		},
		/**
		 *  用客户端浏览器打开
		 */
		openByClientBrowser: function(url) {
			try {
				clientApi.thsUtil.openURL(url, 2);
			} catch (e) {}
		},
		openUrl: function(url) {
			try {
				clientApi.thsUtil.openURL(url, 4);
			} catch (e) {}
		},
		/**
		 *  打开客户端特定的应用-小财神（以后类似功能也会用这个接口）
		 */
		openClientAppNew: function(id) {
			try {
				clientApi.thsUtil.postCommand(1, id);
			} catch (e) {}
		},
		/**
		 * 切换股票代码
		 */
		switchCode: function(code) {
			try {
				clientApi.thsQuote.switchCode(code);
			} catch (e) {}
		},
		/**
		 * 跳转K线页面，也可以用
		 * switchPageObj(65, code);来实现
		 */
		switchToKLine: function(stockCode) {
			location.href = "hxa://hexin.exe 'opt=13&param=" + stockCode + "|1'";
		},
		/**
		 *  用资讯框打开
		 */
		openByZxFrame: function(url) {
			try {
				clientApi.thsUtil.openURL(url, 1);
			} catch (e) {}
		},
		/**
		 *  打开应用添加框
		 */
		openAppAddFrame: function(url) {
			try {
				clientApi.thsUtil.openAppCenterIndexDlg(url);
			} catch (e) {}
		},
		switchPageAndSelectTab: async function(url) {
			var pageid = url.split('|')[0] || '',
				tabName = url.split('|')[1] || '';
			if (await clientApi.getClientVersion() >= '84080') {
				clientApi.thsQuote.switchPage({
					id: pageid,
					tabname: tabName,
					code: '600000'
				});
			} else {
				try {
					clientApi.thsQuote.switchPage(pageid);
					setTimeout(function() {
						clientApi.thsQuote.switchTab(tabName);
					}, 500);
				} catch (e) {

				}
			}
		},
		openAppAddFrame: function(url) {
			try {
				clientApi.thsUtil.openAppCenterIndexDlg(url);
			} catch (e) {

			}
		},

		openApp: function(url, type) {
			type = parseInt(type);
			var self = this;
			switch (type) {
				case 1:
					//页面切换(pid形式)
					self.switchPage(url);
					break;
				case 2:
					//模态窗口
					self.openClientTopFrame(url);
					break;
				case 3:
					//客户端特定功能弹框(字符串)
					self.openClientApp(url);
					break;
				case 4:
					//蓝色弹框
					self.openByClientBlueBrowser(url);
					break;
				case 5:
					//客户端浏览器打开
					self.openUrl(url);
					break;
				case 6:
					//客户端打开特定功能（小财神）
					self.openClientAppNew(url);
					break;
				case 7:
					//打开外部需要统计的应用
					self.openClientTopFrame(url);
					break;
				case 8:
					try {
						//根据版本判断是否要隐藏无边框功能
						if (!clientApi.versionCompare(clientApi.version, clientApi.version60)) {
							clientApi.thsUtil.openNoFrameWebDlg(url);
						} else {
							//模态窗口
							if (clientApi.versionCompare(clientApi.version, clientApi.version42)) {
								self.openClientTopFrame(url);
							} else {
								self.openAppAddFrame(url);
							}
						}
					} catch (e) {
						//模态窗口
						if (clientApi.versionCompare(clientApi.version, clientApi.version42)) {
							self.openClientTopFrame(url);
						} else {
							self.openAppAddFrame(url);
						}
					}
					break;
				case 9:
					self.switchCode(url);
					break;
				case 10:
					self.switchToKLine(url);
					break;
				case 11:
					self.switchPageAndSelectTab(url);
					break;
				default:
					return false;
			}
		}
	};

	module.exports = clientOpen;
});