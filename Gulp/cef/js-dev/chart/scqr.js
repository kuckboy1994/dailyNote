// @charset "utf-8";

define(function(require, exports, module) {
	var publicBase = require('../public/public');
	var drawChart = require('../chart/drawchart');
	var scqrModule = {
		init: function() {
			this.request();
		},
		request: function() {
			$.support.cors = true;
			var self = this;
			var url = 'http://hqstats.10jqka.com.cn/scqr.php';
			publicBase.ajaxJsonp({
				url: url,
				jsonpCallback: 'scqr',
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
			drawChart.chartColumn('scqr-container', chartData, '');

			$('#scqr_col1_data1').text('--');
			$('#scqr_col1_data2').text('--');
			$('#scqr_col1_data3').attr('class', function(i, cls) {
				return cls.replace(/level-\d+/g, 'level-0');
			});
			drawChart.chartPie('scqr-pie-1', [0, 0], '涨停比');


			drawChart.chartPie('scqr-pie-2', [0, 0, 0], '涨跌比');
			$('#scqr_col2_data1').text('--');
			$('#scqr_col2_data2').text('--');
			$('#scqr_col2_data3').attr('class', function(i, cls) {
				return cls.replace(/level-\d+/g, 'level-0');
			});

			drawChart.chartPie('scqr-pie-3', [0, 0], '封板率');
			$('#scqr_col3_data1').text('--');
			$('#scqr_col3_data2').text('--');
			$('#scqr_col3_data3').attr('class', function(i, cls) {
				return cls.replace(/level-\d+/g, 'level-0');
			});

			$('#scqr_starlevel').text('--');
		},
		render: function(result) {
			var levels = result['data']['levels'];

			var chartData = [];
			$.each(levels, function(i, val) {
				chartData.push(val.all);
			});
			chartData.push('');
			drawChart.chartColumn('scqr-container', chartData, levels);

			// 画圆环图1
			var limitUpDown = result['data']['limitUpDown'];
			var limitUpNum = limitUpDown['limitUpNum'];
			var limitDownNum = limitUpDown['limitDownNum'];
			var star = limitUpDown['star'];
			var data1 = [limitUpNum, limitDownNum];
			drawChart.chartPie('scqr-pie-1', data1, '涨停比');
			$('#scqr_col1_data1').text(limitUpNum);
			$('#scqr_col1_data2').text(limitDownNum);
			var starLevel1 = 'level-' + star;
			$('#scqr_col1_data3').attr('class', function(i, cls) {
				return cls.replace(/level-\d+/g, starLevel1);
			});

			// 画圆环图2
			var zhangdie = result['data']['zhangdie'];
			var upNums = zhangdie['upNums'];
			var downNums = zhangdie['downNums'];
			var plateNums = zhangdie['plateNums'];
			var star2 = zhangdie['star'];
			var data2 = [upNums, downNums, plateNums];
			drawChart.chartPie('scqr-pie-2', data2, '涨跌比');
			$('#scqr_col2_data1').text(upNums);
			$('#scqr_col2_data2').text(downNums);
			var starLevel2 = 'level-' + star2;
			$('#scqr_col2_data3').attr('class', function(i, cls) {
				return cls.replace(/level-\d+/g, starLevel2);
			});

			// 画圆环图3
			var limitUpDown3 = result['data']['limitUpPercent'];
			var limitUpNum3 = limitUpDown3['limitUpNum'];
			// var limitDownNum3 = limitUpDown3['limitDownNum'];
			var everLimitUp = limitUpDown3['everLimitUp'];
			var star3 = limitUpDown3['star'];
			var data3 = [limitUpNum3, everLimitUp];
			drawChart.chartPie('scqr-pie-3', data3, '封板率');

			$('#scqr_col3_data1').text(limitUpNum3);
			$('#scqr_col3_data2').text(everLimitUp);
			var starLevel3 = 'level-' + star3;
			$('#scqr_col3_data3').attr('class', function(i, cls) {
				return cls.replace(/level-\d+/g, starLevel3);
			});

			var index = -1;
			var levels = ['极强','强','偏强','偏弱','弱','极弱'];
			index = $.inArray(result['data']['starLevel'], levels);
			if (index == -1) {
				$('.scqr-levels').find('li').removeClass('level-on');
			} else {
				$('.scqr-levels').find('li').eq(index).addClass('level-on')
				.siblings().removeClass('level-on');
			}
			// $('#scqr_starlevel').text(result['data']['starLevel']);
		}
	};

	module.exports = scqrModule;
});