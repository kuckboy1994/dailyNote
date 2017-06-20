/* @charset "UTF-8" */
/*
 * @author 山超<shanchao@myhexin.com>
 * @create 2017-06-20
 */
(function ($) {
	//默认参数
	var defaluts = {
		"starkPic": 'images/stark2.png',
		"starPic": 'images/stars2.png',
		"starWidth": "32px",
		"starHeigt": "21px",
		"index": 0,
		"noclick": false
	};

	$.fn.extend({
		rating: function (options) {
			var self = this;
			var options = $.extend({}, defaluts, options);
			
			this.options = options;
			self._getBaseData();
			self._setPlaceHolder();
			self._initCss();
			if (!options.noclick) {
				self._initJs();
			} else {
				self._initShow();
			}
		},
		/**
		 * 初始化页面样式。
		 * 主要是为了减少一个样式文件的引入，改用js渲染
		 */
		_initCss: function () {
			$(this[0]).find('.k-rating').css({
				"list-style": "none",
				"backgroundColor": this.options.backgroundColor,
				"overflow": "hidden"
			});
			$(this[0]).find('.k-rating li').css({
				"float": "left",
				"width": this.options.starWidth,
				"height": this.options.starHeigt,
				"backgroundImage": "url(" + this.options.starkPic + ")"
			});
		},
		/**
		 * 获取页面中原始的数据信息，减少DOM节点的操作
		 */
		_getBaseData: function () {
			var liDom = this.find('li');
			var data = [];
			$.each(liDom, function (key, value) {
				data.push({
					"value": $(value).attr('data-kvalue'),
					"text": $(value).attr('title')
				});
			});
			this.length = liDom.length;
			this.data = data;
			this.placeholder = this.find('.k-rating-score').attr('data-kplaceholder');
			this.newPlaceholder = this.placeholder;
		},
		setStar: function (dom) {
			$(dom).css("backgroundImage", "url(" + this.options.starPic + ")");
		},
		setStark: function (dom) {
			$(dom).css("backgroundImage", "url(" + this.options.starkPic + ")");
		},
		/**
		 * 改变输出的文字
		 */
		_setPlaceHolder: function (text) {
			if (text) {
				$(this[0]).find('.k-rating-score').html(text);
			} else {
				$(this[0]).find('.k-rating-score').html(this.newPlaceholder);
			}
		},
		/**
		 * 初始化鼠标移入移出和点击事件
		 */
		_initJs: function () {
			var self = this;
			var listDom = $(this[0]).find('li');
			$(this[0]).find('li').on('mouseenter', function () {
				var index = $(this).index();
				for (var i = 0; i < self.length; i++) {
					if (i <= index) {
						self.setStar(listDom.eq(i));
					} else {
						self.setStark(listDom.eq(i));
					}
				}
				self._setPlaceHolder(self.data[index].text);
			}).on('click', function () {
				self.index = $(this).index() + 1;
				self.newPlaceholder = self.data[$(this).index()].text;
				self.options.clickFuc(self.data[$(this).index()]);
			});

			$(this[0]).find('.k-rating').on('mouseleave', function () {
				for (var i = 0; i < self.length; i++) {
					if (i < self.index) {
						self.setStar(listDom.eq(i));
					} else {
						self.setStark(listDom.eq(i));
					}
				}
				self._setPlaceHolder();
			});
		},
		_initShow: function () {
			var self = this;
			// self.newPlaceholder = self.data[self.options.index].text;
			self._setPlaceHolder(self.options.text);
			var listDom = $(this[0]).find('li');
			for (var i = 0; i <= self.options.index; i++) {
				self.setStar(listDom.eq(i));
			}
		}
	});
	
})(jQuery);

