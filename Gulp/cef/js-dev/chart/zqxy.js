// @charset "utf-8";

define(function(require, exports, module) {
	var publicBase = require('../public/public');
	var drawChart = require('../chart/drawchart');
	var zqxyModule = {
		init: function() {
			this.request();
		},
		request: function() {
			$.support.cors = true;
			var self = this;
			var url = 'http://hqstats.10jqka.com.cn/zqxy.php';
			publicBase.ajaxJsonp({
				url: url,
				jsonpCallback: 'zqxy',
				callback: function(result) {
					self.render(result);
				},
				errorCallback: function() {
					self.renderEmpty();
				}
			});
		},
		renderEmpty: function() {
			var chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''];
			drawChart.chartColumn('zqxy-container', chartData, '');

			drawChart.chartPie('zqxy-pie-1', [0, 0], '涨跌比');
			$('#zqxy_col1_data1').text('--');
			$('#zqxy_col1_data2').text('--');
			$('#zqxy_col1_data3').text('--');
			$('#zqxy_col1_data3').removeClass('green red');

			drawChart.chartPie('zqxy-pie-2', [0, 0, 0], '涨跌比');
			$('#zqxy_col2_data1').text('--');
			$('#zqxy_col2_data2').text('--');
			$('#zqxy_col2_data3').text('--');
			$('#zqxy_col2_data3').removeClass('green red');

			drawChart.chartPie('zqxy-pie-3', [0, 0], '阴阳线');
			$('#zqxy_col3_data1').text('--');
			$('#zqxy_col3_data2').text('--');
			$('#zqxy_col3_data3').text('--');
			$('#zqxy_col3_data3').removeClass('green red');

			$('#zqxy_starlevel').text('--');
		},
		render: function(result) {
			var levels = result['data']['levels'];

			var chartData = [];
			$.each(levels, function(i, val) {
				chartData.push(val.all);
			});
			chartData.push('');
			drawChart.chartColumn('zqxy-container', chartData, levels);

			// 画圆环图1
			var preLimitZhangDie = result['data']['preLimitZhangDie'];
			var upNums1 = preLimitZhangDie['upNums'];
			var downNums1 = preLimitZhangDie['downNums'];
			var profit1 = parseFloat(preLimitZhangDie['profit']).toFixed(2) + '%';
			var data1 = [upNums1, downNums1];
			drawChart.chartPie('zqxy-pie-1', data1, '涨跌比');
			$('#zqxy_col1_data1').text(upNums1);
			$('#zqxy_col1_data2').text(downNums1);
			$('#zqxy_col1_data3').text(profit1);
			$('#zqxy_col1_data3').removeClass('green red');
			if (preLimitZhangDie['profit'] > 0) {
				$('#zqxy_col1_data3').addClass('red');
			} else if (preLimitZhangDie['profit'] < 0) {
				$('#zqxy_col1_data3').addClass('green');
			}

			// 画圆环图2
			var preZhangDie = result['data']['preZhangDie'];
			var upNums2 = preZhangDie['upNums'];
			var downNums2 = preZhangDie['downNums'];
			var plateNums2 = preZhangDie['plateNums'];
			var profit2 = parseFloat(preZhangDie['profit']).toFixed(2) + '%';
			var data2 = [upNums2, downNums2, plateNums2];
			drawChart.chartPie('zqxy-pie-2', data2, '涨跌比');
			$('#zqxy_col2_data1').text(upNums2);
			$('#zqxy_col2_data2').text(downNums2);
			$('#zqxy_col2_data3').text(profit2);
			$('#zqxy_col2_data3').removeClass('green red');
			if (preZhangDie['profit'] > 0) {
				$('#zqxy_col2_data3').addClass('red');
			} else if (preZhangDie['profit'] < 0) {
				$('#zqxy_col2_data3').addClass('green');
			}

			// 画圆环图3
			var openNew = result['data']['openNew'];
			var upNums3 = openNew['upNums'];
			var downNums3 = openNew['downNums'];
			var profit3 = parseFloat(openNew['profit']).toFixed(2) + '%';
			var data3 = [upNums3, downNums3];
			drawChart.chartPie('zqxy-pie-3', data3, '阴阳线');

			$('#zqxy_col3_data1').text(upNums3);
			$('#zqxy_col3_data2').text(downNums3);
			$('#zqxy_col3_data3').text(profit3);

			$('#zqxy_col3_data3').removeClass('green red');
			if (openNew['profit'] > 0) {
				$('#zqxy_col3_data3').addClass('red');
			} else if (openNew['profit'] < 0) {
				$('#zqxy_col3_data3').addClass('green');
			}

			var index = -1;
			var levels = ['极强','强','偏强','偏差','差','极差'];
			index = $.inArray(result['data']['starLevel'], levels);
			if (index == -1) {
				$('.zqxy-levels').find('li').removeClass('level-on');
			} else {
				$('.zqxy-levels').find('li').eq(index).addClass('level-on')
				.siblings().removeClass('level-on');
			}
			// $('#zqxy_starlevel').text(result['data']['starLevel']);
		}
	};

	module.exports = zqxyModule;
});