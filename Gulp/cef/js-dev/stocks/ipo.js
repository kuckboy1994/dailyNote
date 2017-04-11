// @charset "utf-8";

define(function(require, exports, module) {
	var clientApi = require('../public/clientapi');
	var ipoModule = {
		init: function() {
			this.request();
		},
		request: function() {
			var self = this;
			var url = '/zx/freeclient/homepage/xgsg.json';
			var onready = function(result) {
					if (result == '[]') {
						self.render('');
					} else {
						self.render(result);
					}
				}
			var bool = clientApi.thsQuote.requestZxData({
				url: url,
			}).then(onready);
		},
		render: function(result) {
			if (result != '') {
				var resultData = JSON.parse(result);
				var ipoData = resultData.data;
				var ipoHtml = [];
				if (ipoData.length) {
					ipoData.reverse();
					var trhtml = '';
					var curtime = clientApi.serverTime();
					$.each(ipoData, function(i, val) {
						var date;
						if (val.date == curtime) {
							date = '<a href="###" class="icon apply-btn"></a>';
						} else {
							date = val.date.substr(4, 2) + '-' + val.date.substr(6, 2);
						}
						trhtml = '<tr data-code="">' +
							'<td class="txt-c col70">' + val.name + '</td>' +
							'<td class="txt-c col60">' + date + '</td>' +
							'<td class="txt-c col70">' + val.stockcode + '</td>' +
							'<td class="col60 pdr12">' + val.price + '</td>' +
							'<td class="col65 pdr18">' + Math.floor(val.number) + '</td>' +
							'</tr>';
						ipoHtml.push(trhtml);
					});
					$('#ipo_container').html(ipoHtml.join(''));
				} else {
					ipoHtml = '<tr>' +
						'<td style="text-align:center;height: 124px;">当前暂无新股申购</td>' +
						'</tr>';
					$('#ipo_container').html(ipoHtml);
				}
			} else {
				ipoHtml = '<tr>' +
					'<td style="text-align:center;height: 124px;">当前暂无新股申购</td>' +
					'</tr>';
				$('#ipo_container').html(ipoHtml);
			}
		}
	};

	module.exports = ipoModule;
});