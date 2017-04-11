// @charset "utf-8";

define(function(require, exports, module) {
	var resetSize = {
		init: function() {
			var self = this;
			self.changeSize();
			$(window).on('resize', function() {
				self.resizeEvent(self.changeSize, 180)();
			});
		},
		resizeTimer: null,
		resizeEvent: function(callback, delay, context) {
			var self = this;
			context = context || this;
			return function() {
				clearTimeout(self.resizeTimer);
				self.resizeTimer = setTimeout(function() {
					callback.apply(context, arguments);
				}, delay || 180);
			};
		},
		changeSize: function() {
			var windowHeight = $(window).height();
			var windowWidth = $(window).width();
			if (windowWidth <= 1280) {
				windowWidth = 1280;
			}
			$('body').width(windowWidth);
			$('.wrap-top-nav li').width(Math.floor((windowWidth - 10) / 7));
			$('.fn-btn').width(Math.floor((windowWidth - 365 - 310 - 10 - 5 * 5 - 6 * 2) / 6));
		}
	};

	module.exports = resetSize;
});