// @charset "utf-8";

define(function(require, exports, module) {
	var drawChart = {
		chartPie: function(content, data, title) {
			if (eval(data.join('+')) === 0) {
				data.push(1);
			}
			$('.' + content).highcharts({
				chart: {
					type: 'pie',
					backgroundColor: 'rgba(0,0,0,0)',
					plotShadow: false,
					style: {
						fontFamily: 'arial, Microsoft yahei'
					}
				},
				credits: {
					enabled: false
				},
				title: {
					text: title,
					verticalAlign: 'middle',
					useHTML: true,
					y: 4,
					style: {
						color: "#c0c0c0",
						fontSize: "12px",
						fontFamily: 'arial, Microsoft yahei'
					}
				},
				tooltip: {
					enabled: false,
					backgroundColor: "#000",
					style: {
						color: "#fff"
					},
					userHTML: true,
					formatter: function() {
						return '<p>' + this.key + ':' + this.y + '</p>';
					}
				},
				pane: {
					background: {}
				},
				plotOptions: {
					pie: {
						size: 74,
						borderWidth: 4,
						innerSize: 52,
						colors: ['#ff3232', '#01d600', '#5a5b5a', '#5a5b5a'],
						borderColor: '#242529',
						dataLabels: {
							enabled: false
						}
					}
				},
				series: [{
					startAngle: 0,
					data: data,
					states: {
						hover: {
							enabled: false
						}
					}
				}]

			});
		},
		chartColumn : function (content, data, dataclass) {
			var maxData = Math.max.apply(null, data) + 200;
			var isshowlabels = true;
			var total = 0;
			for (var i = 0; i < data.length -1; i++) {
				total += data[i];
			}
			if (total == 0) { isshowlabels = false; }
			var isShowTooltip = false;
			if (dataclass && dataclass != '') {
				isShowTooltip = true;
			}
			$('#'+ content).highcharts({
				credits: {
					enabled: false
				},
				title: {
					text: ''
				},
				chart: {
					backgroundColor: "rgba(0,0,0,0)",
					style: {
						fontFamily: "arial"
					},
					marginLeft: 36,
					marginBottom: 24
				},
				series: [{
					name: '涨跌停',
					type: 'column',
					marker: {
						enabled: false
					},
					data: data
				}],
				plotOptions: {
					column: {
						borderWidth: 0,
						pointPlacement: 'between',
						colorByPoint: true,
						colors: ['#ff3232', '#ff3232', '#ff3232', '#ff3232', '#ff3232', '#00e600', '#00e600', '#00e600', '#00e600', '#00e600']
					},
					series: {
						dataLabels: {
							enabled: isshowlabels,
							color: '#808080',
							style: {
								fontWeight: 'normal',
								textShadow: 'null'
							},
							backgroundColor: null,
							shadow: false,
							y: 4
						}
					}
				},
				labels: {
					style: {
						fontFamily: "simsun",
						fontSize: 12
					}
				},
				xAxis: {
					tickmarkPlacement: 'on',
					lineWidth: 1,
					tickLength: 4,
					lineColor: '#808080',
					tickColor: '#808080',
					useHtml: true,
					tickInterval: 1,
					title: {
						text: ''
					},
					categories: ['涨停', '9', '5', '3', '1', '0', '-1', '-3', '-5', '-9', '跌停'],
					gridLineWidth: 0,
					labels: {
						align: 'center',
						rotation: '0',
						style: {
							color: '#afafaf',
							fontFamily: "simsun",
							fontSize: 12
						},
						useHTML: true,
						formatter: function() {
							if (this.value > 0 || this.value === '涨停') {
								return '<span style="color:#ff3232">' + this.value + '</span>';
							} else if (this.value === '0') {
								return this.value;
							} else {
								return '<span style="color:#00e600">' + this.value + '</span>';
							}
						}
					}
				},
				yAxis: {
					lineWidth: 1,
					tickColor: '#808080',
					tickPosition: 'outside',
					gridLineWidth: 0,
					tickLength: 4,
					tickWidth: 1,
					title: {
						text: ''
					},
					lineColor: '#808080',
					labels: {
						format: '{value}',
						style: {
							color: '#afafaf'
						},
						x: -7
					},
					max: maxData
					// tickInterval: 500
				},
				legend: {
					enabled: false
				},
				tooltip: {
					enabled: isShowTooltip,
					backgroundColor: '#535559',
					style: {
						color: '#fff',
						padding: 4,
						fontSize: 12
					},
					shadow: false,
					borderRadius: 0,
					borderColor: '#242529',
					formatter: function() {
						var xVal = this.x;
						var xArr = ['涨停', '9', '5', '3', '1', '0', '-1', '-3', '-5', '-9', '跌停'];
						var index = -1;
						for (var i = 0;i < xArr.length; i++) {
							if (xArr[i] == xVal) {
								index = i;
							}
						}
						if (dataclass && dataclass !== '') {
							var zb = dataclass[index]['zb'];
							var zxb = dataclass[index]['zxb'];
							var cyb = dataclass[index]['cyb'];
							return '<span>主板：' + zb + '</span><br/>' +
								'<span>中小：' + zxb + '</span><br/>' +
								'<span>创业：' + cyb + '</span>';
						}
					}
				}
			});
		}
	};

	module.exports = drawChart;
});
