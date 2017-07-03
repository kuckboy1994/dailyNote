define(function(require, exports, module) {
	var $ = require('jquery');
	var chartModule = require('../views/chart.js');

	var table = {
		init: function () {
			console.log('table module -> init');
			var arr = [1,2,3,4];
			$.each(arr, function (key, value) {
				console.log('$.each echo ' + value);
			});
			this.renderTable();
			chartModule.init();
		},
		renderTable: function () {
			console.log('table module -> renderTable');
		}
	};

	module.exports = table;
});