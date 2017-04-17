// @charset "utf-8";

define(function(require, exports, module) {
	var publicBase = require('../public/public');
	var clientApi = require('../public/clientapi');
	var thsClientCache = require('../public/clientcache');
	var storage = require('../public/storage');

	var userInfo = {
		advObejct: '',
		Version: null,
		today: '',
		loadTabInterval: '',
		init: function() {
			var oThis = this;
			oThis.version = oThis.getVersion();
			oThis.today = clientApi.serverTime('-');

			$(".tab_menu ul li").unbind("click").on("click", function() {
				$(this).addClass("on").siblings().removeClass("on");
				var index=$(this).index();
				$(".tab_box > div").eq(index).show().siblings().hide();
				if (index == 1) {
					oThis.loadCourseInfo();
				} else {
					oThis.loadTabInfo();
				}
			});

			oThis.advObejct = {
				thousand: {
					top	: 527,
					buy	: 538,
					xufei: 539,
					leveltwo: 540,
					jdal: 541,
					jrjq: 542,
					three: 1236
				},
				lightning: {
					top	: 916,
					buy	: 529,
					xufei: 528,
					leveltwo: 530,
					jdal: 531,
					jrjq: 532,
					three: 1236
				},
				base: {
					top	: 913,
					buy	: 512,
					xufei: 510,
					leveltwo: 513,
					jdal: 514,
					jrjq: 515,
					three: 1236
				},
				cloud: {
					top	: 917,
					buy	: 524,
					xufei: 523,
					leveltwo: 525,
					jdal: 526,
					jrjq: 527,
					three: 1236
				},
				referintell: {
					top	: 915,
					buy	: 534,
					xufei: 533,
					leveltwo: 535,
					jdal: 536,
					jrjq: 537,
					three: 1236
				}
			};

			setTimeout(function() {
				oThis.initSecond();
			}, 200);
		},
		initSecond: function() {
			var oThis = this;
			oThis.loadAndRenderUserName();
			oThis.loadAndRenderUserLeftDays();
			oThis.loadTabInfo();

			oThis.loadTabInterval = setInterval(function() {
				oThis.loadTabInfo();
			}, 60000);
		},
		clearLoadTabInterval: function() {
			var oThis = this;
			window.clearInterval(oThis.loadTabInterval);
		},
		loadAndRenderUserName: function() {
			try {
				var userid = clientApi.thsPassport.get('userid');
				userid = 'http://u.thsi.cn/avatar/' + Number(userid) % 10000 + '/' + userid + '.gif';
				$('.portrait').attr("src", userid);
				$('#username').html(clientApi.thsPassport.get('account'));

			} catch (e) {
				$('#username').html('用户');
			}
		},
		loadAndRenderUserLeftDays: function() {
			var userLeftDays	= thsClientCache.getCache('userLeftDays');
			if (userLeftDays) {
				$('#leftDays').html(userLeftDays.leftDays);
				$('#leftDate').html(userLeftDays.leftDate);
			} else {
				setTimeout(function () {
					$.clientAjax({
						url : 'http://sp.10jqka.com.cn/ca/userpro/getleftdays/sid/36',
						type : "GET",
						dataType : "jsonp",
						success	: function (result) {
							if (!result.errorcode) {
								$('#leftDays').html(result.result.leftDays);
								$('#leftDate').html(result.result.leftDate);
								thsClientCache.setCache('userLeftDays', result.result);
							}
						}
					});
				}, 3000);
			}
		},
		loadTabInfo: function() {
			var oThis = this;
			var advsArr = [
					['28-527', '28-538', '28-539', '28-540', '28-541', '28-542', '28-1236'],
					['28-916', '28-529', '28-528', '28-530', '28-531', '28-532', '28-1236'],
					['28-913', '28-512', '28-510', '28-513', '28-514', '28-515', '28-1236'],
					['28-917', '28-524', '28-523', '28-525', '28-526', '28-527', '28-1236'],
					['28-915', '28-534', '28-533', '28-535', '28-536', '28-537', '28-1236']
				];
			if (oThis.version == 'cloud') {
				advsStr = advsArr[3];
			} else if (oThis.version == 'thousand') {
				advsStr = advsArr[0];
			} else if (oThis.version == 'referintell') {
				advsStr = advsArr[4];
			} else if (oThis.version == 'lightning') {
				advsStr = advsArr[1];
			} else if (oThis.version == 'base') {
				advsStr = advsArr[2];
			}
			advsStr = advsStr.join(',');
			var url = 'http://sp.10jqka.com.cn/ads/api/get/adinfo/' + advsStr + '/return/jsonp/callback/callback/';
			$.ajax({
				url	: url,
				type : "GET",
				dataType : "jsonp",
				jsonp : false,
				jsonpCallback : "callback",
				cache : false,
				success	: function (result) {
					oThis.xlTabInfo(result);
				}
			});
		},
		updateNewInfo: function() {
			var oThis = this;
			
			try{
				var read2 = storage.getFileContent("read2.log");
			} catch (e) {
				storage.writeFileContent("read2.log", '0');
				read2 = '0';
			}
			try{
				var read3 = storage.getFileContent("read3.log");
			} catch (e) {
				storage.writeFileContent("read3.log", '0');
				read3 = '0';
			}
			try{
				var read4 = storage.getFileContent("read4.log");
			} catch (e) {
				storage.writeFileContent("read4.log", '0');
				read4 = '0';
			}
			try{
				var read5 = storage.getFileContent("read5.log");
			} catch (e) {
				storage.writeFileContent("read5.log", '0');
				read5 = '0';
			}
			try{
				var read6 = storage.getFileContent("read6.log");
			} catch (e) {
				storage.writeFileContent("read6.log", '0');
				read6 = '0';
			}
			try{
				var read7 = storage.getFileContent("read7.log");
			} catch (e) {
				storage.writeFileContent("read7.log", '0');
				read7 = '0';
			}
			try{
				var read8 = storage.getFileContent("read8.log");
			} catch (e) {
				storage.writeFileContent("read8.log", '0');
				read8 = '0';
			}

			var read2date = oThis.getFormatDate($("#tab-line-2").attr("data-time"));
			var read3date = oThis.getFormatDate($("#tab-line-3").attr("data-time"));
			var read4date = oThis.getFormatDate($("#tab-line-4").attr("data-time"));
			var read5date = oThis.getFormatDate($("#tab-line-5").attr("data-time"));
			var read6date = oThis.getFormatDate($("#tab-line-6").attr("data-time"));
			var read7date = oThis.getFormatDate($("#tab-line-7").attr("data-time"));
			var read8date = oThis.getFormatDate($("#tab-line-8").attr("data-time"));
			if(read2 === false || read2 == '0') {
				$("#tab-line-2 .message-tip").addClass("message-icon-new");
			} else if (read2 < read2date) {
				storage.writeFileContent("read2.log", '0');
				$("#tab-line-2 .message-tip").addClass("message-icon-new");
			} else {
				$("#tab-line-2 .message-tip").removeClass("message-icon-new");
			}
			if(read3 === false || read3 == '0') {
				$("#tab-line-3 .message-tip").addClass("message-icon-new");
			} else if (read3 < read3date) {
				$("#tab-line-3 .message-tip").addClass("message-icon-new");
				storage.writeFileContent("read3.log", '0');
			} else {
				$("#tab-line-3 .message-tip").removeClass("message-icon-new");
			}
			if(read4 === false || read4 == '0') {
				$("#tab-line-4 .message-tip").addClass("message-icon-new");
			} else if (read4 < read4date) {
				$("#tab-line-4 .message-tip").addClass("message-icon-new");
				storage.writeFileContent("read4.log", '0');
			} else {
				$("#tab-line-4 .message-tip").removeClass("message-icon-new");
			}
			if(read5 === false || read5 == '0') {
				$("#tab-line-5 .message-tip").addClass("message-icon-new");
			} else if (read5 < read5date) {
				$("#tab-line-5 .message-tip").addClass("message-icon-new");
				storage.writeFileContent("read5.log", '0');
			} else {
				$("#tab-line-5 .message-tip").removeClass("message-icon-new");
			}
			if(read6 === false || read6 == '0') {
				$("#tab-line-6 .message-tip").addClass("message-icon-new");
			} else if (read6 < read6date) {
				$("#tab-line-6 .message-tip").addClass("message-icon-new");
				storage.writeFileContent("read6.log", '0');
			} else {
				$("#tab-line-6 .message-tip").removeClass("message-icon-new");
			}
			if(read7 === false || read7 == '0') {
				$("#tab-line-7 .message-tip").addClass("message-icon-new");
			} else if (read7 < read7date) {
				$("#tab-line-7 .message-tip").addClass("message-icon-new");
				storage.writeFileContent("read7.log", '0');
			} else {
				$("#tab-line-7 .message-tip").removeClass("message-icon-new");
			}
			if(read8 === false || read8 == '0') {
				$("#tab-line-8 .message-tip").addClass("message-icon-new");
			} else if (read8 < read8date) {
				$("#tab-line-8 .message-tip").addClass("message-icon-new");
				storage.writeFileContent("read8.log", '0');
			} else {
				$("#tab-line-8 .message-tip").removeClass("message-icon-new");
			}
			oThis.sortByTime();
		},
		sortByTime: function() {
			var oThis = this;
			var messageOrder = $(".message-order");
			var tempArr = new Array();
			var i;
			for (i = 0; i < messageOrder.length; i++) {
				tempArr[i] = {time:messageOrder.eq(i).attr("data-time"),id:messageOrder.eq(i).attr("id")};
			}

			tempArr.sort(function(a, b) {
				return b.time.localeCompare(a.time);
			});
			var html = '';
			html += ('<div class="message-tab-line" id="tab-line-0">' + $("#tab-line-0").html() + '</div>');
			html += ('<div class="message-tab-line" id="tab-line-1">' + $("#tab-line-1").html() + '</div>');
			for (var i = 0; i < tempArr.length; i++) {
				'<div class="message-tab-line message-order" id="tab-line-2" data-time="">';
				html += ('<div class="message-tab-line message-order" id="' + tempArr[i].id + '" data-time="' +
					tempArr[i].time.substr(0, tempArr[i].time.length) +
					'">' + $("#" + tempArr[i].id).html()) + '</div>';
			}
			$(".message-tab").eq(0).html(html);
		},
		xlTabInfo: function(result) {
			var oThis = this;
			if (result.errorcode == 0) {
				if (typeof result.result == 'object') {
					$.each(result.result, function(advk, advObj) {
						switch (parseInt(advObj.case_id)) {
							case oThis.advObejct[oThis.version]['top'] :
								$('#ad_top').unbind('click').on('click', function() {
									window.open(advObj.data.ad[0].ad_url);
								});
								$('#ad_top').html(advObj.data.ad[0].text);
								$('#ad_top').css("cursor", "pointer");
								break;
							case oThis.advObejct[oThis.version]['buy'] :
								$('#buylabel').unbind('click').on('click', function() {
									TA.log({id : 'l2sy_57d61d69_510'});
									window.open(advObj.data.ad[0].ad_url);
								});
								$('#buylabel').html(advObj.data.ad[0].text);
								$('#buylabel').css("cursor", "pointer");
								break;
							case oThis.advObejct[oThis.version]['xufei'] :
								$('.lijixufei').eq(0).unbind('click').on('click', function() {
									TA.log({id : 'l2sy_57d61d87_248'});
									window.open(advObj.data.ad[0].ad_url);
								});
								$('.lijixufei').eq(0).html(advObj.data.ad[0].text);
								break;
							case oThis.advObejct[oThis.version]['leveltwo'] :
								$('#message_a_0').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d61e1d_489'});
									window.open(advObj.data.ad[0].ad_url);
								});
								$('#tab-line-0 .message-tab-line-right-title').eq(0).html(advObj.data.ad[0].text).css("cursor","pointer");
								$('#tab-line-0 .message-tab-line-right-span').eq(0).html(advObj.data.ad[0].name);

								$('#message_a_1').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d61e3d_145'});
									window.open(advObj.data.ad[1].ad_url);
								});
								$('#tab-line-1 .message-tab-line-right-title').eq(0).html(advObj.data.ad[1].text).css("cursor","pointer");
								$('#tab-line-1 .message-tab-line-right-span').eq(0).html(advObj.data.ad[1].name);
								break;
							case oThis.advObejct[oThis.version]['jdal'] :
								$('#message_a_6').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d62135_745'});
									$("#tab-line-6 .message-tip").removeClass("message-icon-new");
									storage.writeFileContent("read6.log", oThis.getFormatDate($("#tab-line-6").attr("data-time")));
									window.open(advObj.data.ad[0].ad_url);
								});
								$('#tab-line-6').attr("data-time", advObj.data.ad[0].mtime);
								$('#tab-line-6 .message-tab-line-right-title').eq(0).html(advObj.data.ad[0].text).css("cursor","pointer");
								$('#tab-line-6 .message-tab-line-title').eq(0).html(advObj.data.ad[0].name.substr(0,4));
								var time = oThis.today == advObj.data.ad[0].mtime.substr(0,10) ?
									advObj.data.ad[0].mtime.substr(11,5) : advObj.data.ad[0].mtime.substr(5,5);
								$('#tab-line-6 .message-time').eq(0).html(time);

								$('#message_a_7').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d62159_502'});
									$("#tab-line-7 .message-tip").removeClass("message-icon-new");
									storage.writeFileContent("read7.log", oThis.getFormatDate($("#tab-line-7").attr("data-time")));
									window.open(advObj.data.ad[1].ad_url);
								});
								$('#tab-line-7').attr("data-time", advObj.data.ad[1].mtime);
								$('#tab-line-7 .message-tab-line-right-title').eq(0).html(advObj.data.ad[1].text).css("cursor","pointer");
								$('#tab-line-7 .message-tab-line-title').eq(0).html(advObj.data.ad[1].name.substr(0,4));
								var time = oThis.today == advObj.data.ad[1].mtime.substr(0,10) ?
									advObj.data.ad[1].mtime.substr(11,5) : advObj.data.ad[1].mtime.substr(5,5);
								$('#tab-line-7 .message-time').eq(0).html(time);

								$('#message_a_8').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d6217b_45'});
									$("#tab-line-8 .message-tip").removeClass("message-icon-new");
									storage.writeFileContent("read8.log", oThis.getFormatDate($("#tab-line-8").attr("data-time")));
									window.open(advObj.data.ad[2].ad_url);
								});
								$('#tab-line-8').attr("data-time", advObj.data.ad[2].mtime);
								$('#tab-line-8 .message-tab-line-right-title').eq(0).html(advObj.data.ad[2].text).css("cursor","pointer");
								$('#tab-line-8 .message-tab-line-title').eq(0).html(advObj.data.ad[2].name.substr(0,4));
								var time = oThis.today == advObj.data.ad[2].mtime.substr(0,10) ?
									advObj.data.ad[2].mtime.substr(11,5) : advObj.data.ad[2].mtime.substr(5,5);
								$('#tab-line-8 .message-time').eq(0).html(time);
								break;
							case oThis.advObejct[oThis.version]['jrjq'] :
								$('#message_a_3').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d61f99_928'});
									$("#tab-line-3 .message-tip").removeClass("message-icon-new");
									storage.writeFileContent("read3.log", oThis.getFormatDate($("#tab-line-3").attr("data-time")));
									window.open(advObj.data.ad[0].ad_url);
								});
								$('#tab-line-3').attr("data-time", advObj.data.ad[0].mtime);
								$('#tab-line-3 .message-tab-line-right-title').eq(0).html(advObj.data.ad[0].name).css("cursor","pointer");
								$('#tab-line-3 .message-tab-line-title').eq(0).html('投资秘籍');
								var time = oThis.today == advObj.data.ad[0].mtime.substr(0,10) ?
									advObj.data.ad[0].mtime.substr(11,5) : advObj.data.ad[0].mtime.substr(5,5);
								$('#tab-line-3 .message-time').eq(0).html(time);
								break;
							case oThis.advObejct[oThis.version]['three'] :
								$('#message_a_4').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d61e8a_838'});
									$("#tab-line-4 .message-tip").removeClass("message-icon-new");
									storage.writeFileContent("read4.log", oThis.getFormatDate($("#tab-line-4").attr("data-time")));
									window.open(advObj.data.ad[0].ad_url);
								});
								$('#tab-line-4').attr("data-time", advObj.data.ad[0].mtime);
								$('#tab-line-4 .message-tab-line-right-title').eq(0).html(advObj.data.ad[0].text).css("cursor","pointer");
								$('#tab-line-4 .message-tab-line-title').eq(0).html(advObj.data.ad[0].name.substr(0,4));
								var time = oThis.today == advObj.data.ad[0].mtime.substr(0,10) ?
									advObj.data.ad[0].mtime.substr(11,5) : advObj.data.ad[0].mtime.substr(5,5);
								$('#tab-line-4 .message-time').eq(0).html(time);
								$('#message_a_5').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d61f2e_270'});
									$("#tab-line-5 .message-tip").removeClass("message-icon-new");
									storage.writeFileContent("read5.log", oThis.getFormatDate($("#tab-line-5").attr("data-time")));
									window.open(advObj.data.ad[1].ad_url);
								});
								$('#tab-line-5').attr("data-time", advObj.data.ad[1].mtime);
								$('#tab-line-5 .message-tab-line-right-title').eq(0).html(advObj.data.ad[1].text).css("cursor","pointer");
								$('#tab-line-5 .message-tab-line-title').eq(0).html(advObj.data.ad[1].name.substr(0,4));
								var time = oThis.today == advObj.data.ad[1].mtime.substr(0,10) ?
									advObj.data.ad[1].mtime.substr(11,5) : advObj.data.ad[1].mtime.substr(5,5);
								$('#tab-line-5 .message-time').eq(0).html(time);

								$('#message_a_2').die('click').live('click', function () {
									TA.log({id : 'l2sy_57d61ecf_544'});
									$("#tab-line-2 .message-tip").removeClass("message-icon-new");
									storage.writeFileContent("read2.log", oThis.getFormatDate($("#tab-line-2").attr("data-time")));
									window.open(advObj.data.ad[2].ad_url);
								});
								$('#tab-line-2').attr("data-time", advObj.data.ad[2].mtime);
								$('#tab-line-2 .message-tab-line-right-title').eq(0).html(advObj.data.ad[2].text).css("cursor","pointer");
								$('#tab-line-2 .message-tab-line-title').eq(0).html(advObj.data.ad[2].name.substr(0,4));
								var time = oThis.today == advObj.data.ad[2].mtime.substr(0,10) ?
									advObj.data.ad[2].mtime.substr(11,5) : advObj.data.ad[2].mtime.substr(5,5);
								$('#tab-line-2 .message-time').eq(0).html(time);
								break;
						}
					});
				}
			}
			oThis.updateNewInfo();
		},
		loadCourseInfo: function() {

			var url = 'http://school.10jqka.com.cn/interface/getVideoList/params/limit/1/callback/courseExcellent/cateid/368/';
			publicBase.ajaxJsonp({
				url : url,
				type : "GET",
				jsonpCallback : 'courseExcellent',
				cache : true,
				callback : function (result) {
					if (result.length > 0) {
						$(".course-tab-line-title").eq(0).html(result[0].title);
						$(".course-tab-line-title").eq(0).off("click");
						$(".course-tab-line-title").eq(0).on("click", function() {
							TA.log({id : 'l2sy_57d62261_685'});
							window.open(result[0].url);
						})
					}
				}
			});
		},
		getVersion : function () {
			var sid;
			try {
				sid = clientApi.thsPassport.get('sid');
			} catch (e) {
				sid = '7,10101111011,40;44,11,40;6,1,40;5,1,40;';
			}
			var sidArr = sid.split(';');
			var sidObj = {};
			for (i in sidArr) {
				var funccode = (sidArr[i].split(','))[0];
				if (funccode) {
					var busscode = (sidArr[i].split(','))[1];
					var funIdArr = busscode.split('');
					for (j in funIdArr) {
						var funId = funIdArr[j];
						var ywFunId = funccode + ':' + (parseInt(j) + 1);
						sidObj[ywFunId] = parseInt(funId);
					}
				}
			}

			var userAuth = 'base';
			if (sidObj['58:4'] == 1 && sidObj['8:13']) {
				return 'referintell';
			}
			if (sidObj['36:16'] == 1 && sidObj['8:13']) {
				return 'lightning';
			}
			if (sidObj['36:1'] == 1 && sidObj['36:16']) {
				return 'base';
			}
			if (sidObj['36:1'] == 1 && sidObj['8:13']) {
				return 'cloud';
			}
			if (sidObj['36:1'] == 1) {
				return 'thousand';
			}
			return userAuth;
		},
		getFormatDate: function(strDate) {
			var year = strDate.substr(0, 4);
			var month = strDate.substr(5, 2);
			var day = strDate.substr(8, 2);
			var hour = strDate.substr(11, 2);
			var min = strDate.substr(14, 2);
			var second = strDate.substr(17, 2);
			return year + month + day + hour + min + second;
		}
	};

	module.exports = userInfo;
});