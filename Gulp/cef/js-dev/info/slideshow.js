// @charset "utf-8";

define(function(require, exports, module) {
	var clientApi = require('../public/clientapi');
	var picAd = {
		width : 292,
		height : 194,
		playtime : 2000,
		count : 1,
		num : 0,
		stop : null,
		// 先加载数据
		init: async function() {
			var oThis = this;
			// setTimeout(function() {
				await oThis.initB();
			// }, 300);
		},
		initB: async function() {
			var oThis = this;
			oThis.version = await oThis.getVersion();
			// alert(version);
			var adinfo = '144-1235';
			if (oThis.version === 'cloud') {
				adinfo = '144-1231';
			} else if (oThis.version === 'referintell') {
				adinfo = '144-1234';
			} else if (oThis.version === 'lightning') {
				adinfo = '144-1232';
			} else if (oThis.version === 'base') {
				adinfo = '144-1235';
			} else if (oThis.version === 'thousand') {
				adinfo = '144-1233';
			}
			// alert(adinfo);
			var url = 'http://sp.10jqka.com.cn/ads/api/get/adinfo/' + adinfo + '/return/jsonp';
			$.ajax({
				url	: url,
				type : "GET",
				dataType : "jsonp",
				jsonp : false,
				jsonpCallback : "callback",
				cache : true,
				success	: function (result) {
					// alert(result.errorcode);
					if (result.errorcode === 0) {
						if (typeof result.result == 'object') {
							$.each(result.result, function(advk, advObj) {
								// alert(advObj.data.ad.length);
								var liHtml = '';
								oThis.liNum = advObj.data.ad.length;
								for (var i = 0; i <= advObj.data.ad.length - 1; i++) {
									liHtml += ('<a href="'+advObj.data.ad[i].ad_url+'" target="_blank" class="slideshow-box-a" taid="l2sy_57d622a9_295"><img class="slideshow-box-img" src="'+advObj.data.ad[i].image+'"></a>');
								}
								$("#slideshow_box").html(liHtml);
							})
						}
						setTimeout(function() {
							oThis.initA();
						}, 300);
					}
				}
			});
		},
		// 初始化数据，开始计时
		initA: function(options) {
			var oThis = this;
			var slideshowDom = oThis.getElementsByClassName(document, "slideshow");

			// 初始化全局点
			var slideshowBoxDom = oThis.getElementsByClassName(document, "slideshow-box");
			var slideshowImg = slideshowBoxDom[0].getElementsByTagName("img");
			var imgnum = slideshowImg.length;
			oThis.count = imgnum - 1;


			var oLi;
			var oUl = document.createElement('ul');
			oUl.className = "adul";

			for (var i = 0; i < imgnum; i++) {
				if (imgnum <= 1) {
					break;
				}
				oLi = document.createElement("li");
				if (i == 0) {
					oLi.className = "slideshow-item slideshow-selected";
				} else {
					oLi.className = "slideshow-item";
				}
				oLi.innerHTML = i + 1;
				oUl.appendChild(oLi);
			}

			//计算全局点的位置
			oUl.className = "slideshow-list-point-after-" + imgnum;
			slideshowDom[0].appendChild(oUl);
			if (imgnum > 1) {
				// oThis.dida();
			}
			oThis.initFuc();
		},
		// 初始化所需的事件
		initFuc: function() {
			var oThis = this;
			$(".slideshow").mouseover(function() {
				oThis.clearCount();
				if(oThis.liNum > 1) {
					$(".slideshow-btn-right").show();
					$(".slideshow-btn-left").show();
				}
			});

			$(".slideshow").mouseout(function() {
				if (oThis.stop == null) {
					// oThis.dida();
				}
				$(".slideshow-btn-right").hide();
				$(".slideshow-btn-left").hide();
			});

			$(".slideshow-btn-left").click(function() {
				oThis.clearCount();
				oThis.huan(-1);
			});

			$(".slideshow-btn-right").click(function() {
				oThis.clearCount();
				oThis.huan(1);
			});

			$('.slideshow-item').click(function() {
				oThis.clearCount();
				oThis.num = Number($(this).text()) - 1;
				oThis.xiaoguo2(oThis.num);
			});
		},
		// 计时器
		dida: function() {
			var oThis = this;
			if (oThis.count >= 1) {
				oThis.stop = setInterval(function() {
					oThis.num++;
					if (oThis.num > oThis.count) {
						oThis.num = 0;
					}
					oThis.xiaoguo2(oThis.num);
				}, oThis.playtime);
			}
		},
		// 清除计时器
		clearCount: function() {
			var oThis = this;
			window.clearInterval(oThis.stop);
			oThis.stop = null;
		},
		// 图片点击切换效果
		xiaoguo: function(n) {
			var oThis = this;
			$('.slideshow-item').css({
				'background-color': '#808080'
			})
			$('.slideshow-item').eq(n).css({
				'background-color': '#b61b1f'
			})
			$('.slideshow-box').animate({
				'margin-left': -n * oThis.width + 'px'
			}, 0, function() {
				if (n == oThis.count) {
					$('.box').css({
						'margin-left': 0 + 'px'
					})
				}
			})
		},
		// 图片自动切换效果
		xiaoguo2: function(n) {
			var oThis = this;
			$('.slideshow-item').css({
				'background-color': '#808080'
			})
			$('.slideshow-item').eq(n).css({
				'background-color': '#b61b1f'
			})
			$('.slideshow-box').animate({
				'margin-left': -n * oThis.width + 'px'
			}, 500, function() {
				if (n == oThis.count) {
					$('.box').css({
						'margin-left': 0 + 'px'
					})
				}
			})
		},
		// 计算当前这个点所在的位置
		huan: function(n) {
			var oThis = this;
			oThis.num += n;
			if (oThis.num < 0) {
				oThis.num = oThis.count;
			}
			if (oThis.num > oThis.count) {
				oThis.num = 0;
			}
			oThis.xiaoguo(oThis.num);
		},
		getVersion : async function () {
			var sid;
			try {
				sid = await clientApi.thsPassport.get('sid');
			} catch (e) {
				sid = '7,10101111011,40;44,11,40;6,1,40;5,1,40;';
			}
			//格式化用户权限
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
		getElementsByClassName : function(root, className) {
			var oThis = this;
			if (root.getElementsByClassName) {
				return root.getElementsByClassName(className);
			} else {
				var elements = root.getElementsByTagName("*"); //获取所有的后代元素
				// console.log(elements);
				var result = [];
				for (var i = 0, element; element = elements[i]; i++) {
					if (oThis.hasClassName(element, className)) {
						result.push(element);
					}
				}
			}
			return result;
		},

		hasClassName : function(obj, cls) {
			var obj_class = obj.className; //获取 class 内容.
			var obj_class_lst = obj_class.split(/\s+/); //通过split空字符将cls转换成数组.
			var x = 0;
			for (x in obj_class_lst) {
				if (obj_class_lst[x] == cls) { //循环数组, 判断是否包含cls
					// console.log(obj_class_lst[x]);
					return true;
				}
			}
			return false;
		}
	};

	module.exports = picAd;
});