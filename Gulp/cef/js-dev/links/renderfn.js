// @charset "utf-8";

define(function(require, exports, module) {
	var publicBase = require('../public/public');
	var clientApi = require('../public/clientapi');
	var resetSize = require('../public/resetsize');
	var renderFn = {

		appVersion: '',
		init: async function() {
			this.appVersion = await this.getVersion();
			this.loadFunctionList();
		},
		getVersion: async function() {
			var sid;
			try {
				sid = await clientApi.thsPassport.get('sid');
			} catch (e) {
				sid = '7,10101111011,40;44,11,40;6,1,40;5,1,40;';
			}
			//格式化用户权限
			var sidArr = sid.split(';');
			var sidObj = {};
			for (var i in sidArr) {
				var funccode = (sidArr[i].split(','))[0];
				if (funccode) {
					var busscode = (sidArr[i].split(','))[1];
					var funIdArr = busscode.split('');
					for (var j in funIdArr) {
						var funId = funIdArr[j];
						var ywFunId = funccode + ':' + (parseInt(j) + 1);
						sidObj[ywFunId] = parseInt(funId);
					}
				}
			}

			//获取最高权限
			var userAuth = 'base';
			if (sidObj['58:4'] == 1 && sidObj['8:13']) {
				return 'referintell'; //内参智能版
			}
			if (sidObj['36:16'] == 1 && sidObj['8:13']) {
				return 'lightning'; //闪电版
			}
			if (sidObj['36:1'] == 1 && sidObj['36:16']) {
				return 'base'; //基础版
			}
			if (sidObj['36:1'] == 1 && sidObj['8:13']) {
				return 'cloud'; //云端版
			}
			if (sidObj['36:1'] == 1) {
				return 'thousand'; //千元版(极速版)
			}
			return userAuth;
		},

		//加载功能
		renderFunctionList: function(data) {
			var config = data['config'] || {},
				cate = data['cate'] || {},
				app = data['app'] || {},

				charact = config['charact'] || 0,
				core = config['core'] || 0,
				charactname = config['charactname'] || '',
				corename = config['corename'] || '';

			// 指标功能
			var charactStr = '';
			if (charactname !== '') {
				$('#fnindex_name').text(charactname);
			}
			if (typeof cate[charact] == 'object') {
				$.each(cate[charact], function(key, value) {
					if (typeof app[value] != 'undefined') {
						try {
							var name = app[value]['name'] || '',
								openStyle = app[value]['open_style'] || 0,
								urlInfo = app[value]['url_info'] || '',
								version = app[value]['version'] || '',
								tid = app[value]['tid'] || '',
								topicon = app[value]['topicon'] || 0,
								iconUrl = app[value]['l2_logo'] || 'images/logo.jpg',
								hotornewHtml = '';

							if (topicon == '1') {
								hotornewHtml = '<i class="icon icon-new"></i>';
							} else if (topicon == '2') {
								hotornewHtml = '<i class="icon icon-hot"></i>';
							} else {
								hotornewHtml = '';
							}
							var nomarginClass = '';
							if ((key + 1) % 6 === 0) {
								nomarginClass = 'nomargin';
							}
							charactStr += '<a href="###" class="fn-btn ' + nomarginClass + '" taid="' + tid + '" openStyle="' + openStyle + '" urlInfo="' + urlInfo + '">' +
								hotornewHtml +
								'<b class="fnicon" style="background-image:url(' + iconUrl + ');"></b>' +
								'<p>' + name + '</p>' +
								'</a>';

						} catch (e) {

						}
					}
				});
				$('#fnindex_content').html(charactStr);
			} else {
				$('#fnindex_content').hide();
				$('#cache_fnindex').show();
			}
			// 选股功能
			var coreStr = '';
			if (corename !== '') {
				$('#fnselect_name').text(corename);
			}
			if (typeof cate[core] == 'object') {
				$.each(cate[core], function(key, value) {
					if (typeof app[value] != 'undefined') {
						try {
							var name = app[value]['name'] || '',
								openStyle = app[value]['open_style'] || 0,
								urlInfo = app[value]['url_info'] || '',
								version = app[value]['version'] || '',
								tid = app[value]['tid'] || '',
								topicon = app[value]['topicon'] || 0,
								iconUrl = app[value]['l2_logo'] || 'images/logo.jpg',
								hotornewHtml = '';

							if (topicon == '1') {
								hotornewHtml = '<i class="icon icon-new"></i>';
							} else if (topicon == '2') {
								hotornewHtml = '<i class="icon icon-hot"></i>';
							} else {
								hotornewHtml = '';
							}
							var nomarginClass = '';
							if ((key + 1) % 6 === 0) {
								nomarginClass = 'nomargin';
							}
							coreStr += '<a href="###" class="fn-btn ' + nomarginClass + '" taid="' + tid + '" openStyle="' + openStyle + '" urlInfo="' + urlInfo + '">' +
								hotornewHtml +
								'<b class="fnicon" style="background-image:url(' + iconUrl + ');"></b>' +
								'<p>' + name + '</p>' +
								'</a>';
						} catch (e) {

						}
					}
				});
				$('#fnselect_content').html(coreStr);
			} else {
				$('#fnselect_content').hide();
				$('#cache_fnselect').show();
			}

			resetSize.changeSize();
		},
		loadFunctionList: function() {
			var self = this;
			var version = self.appVersion + 'new';
			var url = 'http://appcenter.10jqka.com.cn/api/level2/version/' + version + '/return/jsonp/';
			publicBase.ajaxJsonp({
				url: url,
				jsonpCallback: 'appcentercallback',
				callback: function(result) {
					self.renderFunctionList(result);
				},
				errorCallback: function() {
					// 读取缓存？
					$('#fnindex_content').hide();
					$('#fnselect_content').hide();
					$('#cache_fnindex').show();
					$('#cache_fnselect').show();
				}
			});
		}

	};

	module.exports = renderFn;
});