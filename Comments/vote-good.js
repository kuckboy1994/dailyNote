// @charset "utf-8";
/**
 * @author: shanchao<shanchao@myhexin.com>
 * @date: 2017-04-17
 * @description: level2首页顶部顶砸模块
 */

define(function(require, exports, module) {
	var publicBase = require('../public/public');
	var clientApi = require('../public/clientapi');
	// 客户端读写本地文件数据的对象
	var storage = require('../public/storage');

	var vote = {
		prefix: 'level2_vote_',		// 投票使用的key前缀
		fileName: 'voted.log',		// 保存投票信息的文件
		fileDateName: 'votedate.log',	// 保存最近一个交易日日期
		riseNum: 0,					// 赞同的数量
		fallNum: 0,					// 反对的数量
		init: function() {
			var oThis = this;
			$("#vote_rise_btn").unbind('click').on("click", function() {
				var flag = storage.getFileContent(oThis.fileName);	// 取出文件中的数据，看今天是否投票过了。
				if (flag ===  false || flag == '0') {
					TA.log({id: 'l2sy_57d623b6_356'});
					oThis.getUpdown(1, 1);
				} else {
					// 取出的值为1，或2
					oThis.getUpdown(1, 1);
					// oThis.getUpdown(2);	//获取投票的数量
				}
			});

			$("#vote_fall_btn").unbind('click').on("click", function() {
				var flag = storage.getFileContent(oThis.fileName);	// 取出文件中的数据，看今天是否投票过了。
				if (flag ===  false || flag == '0') {
					TA.log({id: 'l2sy_57d623b6_356'});
					oThis.getUpdown(1, -1);
				} else {
					// 取出的值为1，或2
					oThis.getUpdown(1, -1);
					// oThis.getUpdown(2);	//获取投票的数量
				}
			});
			setTimeout(function(){
				oThis.getUpdown(2);
			}, 500);
			//初始化的时候，获取投票的数量
			oThis.setIntervalRequest();
		},

		/**
		 * 投票相关的先行操作1 获取交易日期
		 * @param  {Number} type    1: 投票操作 2: 获取投票数量
		 * @param  {Number} operate 1: 赞同 -1: 反对
		 */
		getUpdown: function(type, operate) {
			var oThis = this;
			var tradeDay = publicBase.getTradeDayAndNextTradeDay(function(tradeday, nexttradeday){
				if (type == 1) {
					oThis.getToken(tradeday, operate);
				} else {
					oThis.getUpdownNum(tradeday);
				}
			});
		},

		/**
		 * 投票的先行操作2 获取token
		 * @param  {Date} 	tradeday 最近的一个交易日
		 * @param  {Number} operate  1: 赞同 -1: 反对
		 */
		getToken: function(tradeday, operate) {
			var oThis = this;
			$.ajax({
				type: "GET",
				url: 'http://sp.10jqka.com.cn/api/evaluation/getlevel2token/app/10/key/'
					+ oThis.prefix + tradeday + '/return/jsonp',
				cache: true,
				dataType: 'jsonp',
				jsonp: false,
				jsonpCallback: 'callback',
				success: function(result) {
					if (result.errorcode === 0) {
						var token = result.result;
						oThis.updownSave(tradeday, token, operate);
					}
				},
				error: function(e) {
				}
			});

		},

		/**
		 * 投票
		 * @param  {Date} 	tradeday 最近的一个交易日
		 * @param  {String} token    密钥
		 * @param  {Number} operate  1: 赞同 -1: 反对
		 */
		updownSave: function(tradeday, token, operate) {
			var oThis = this;
			var key = oThis.prefix + tradeday;
			app = 10;
			$.ajax({
				type: "GET",
				url: 'http://sp.10jqka.com.cn/api/evaluation/save/return/jsonp/',
				cache: false,
				dataType: 'jsonp',
				data: {
					'operate' : operate,
					"key"	: key,
					"token"	: token,
					"app"	: app
				},
				jsonpCallback: 'callbackofgetevaluations',
				success: function(result) {
					var filename = storage.getFileContent(oThis.fileName);
					if (filename === false || filename == '0') {
						alert("投票成功！");
					} else {
						alert("您已经投过票了！");
					}
					if (result.errorcode === 0) {
						if (operate === 1) {
							$(".vote-rise-btn").addClass("vote-rised-btn");
							$(".vote-rise-btn").attr("title", "已看涨");
							$(".vote-fall-btn").addClass("vote-unfall-btn");
							$(".vote-fall-btn").attr("title", "已看涨");
							storage.writeFileContent(oThis.fileName, "1");
							storage.writeFileContent(oThis.fileDateName, tradeday);
						} else {
							$(".vote-rise-btn").addClass("vote-unrise-btn");
							$(".vote-rise-btn").attr("title", "已看跌");
							$(".vote-fall-btn").addClass("vote-falled-btn");
							$(".vote-fall-btn").attr("title", "已看跌");
							storage.writeFileContent(oThis.fileName, "2");
							storage.writeFileContent(oThis.fileDateName, tradeday);
						}
					} else {
						if (operate === 1) {
							if (filename === false || filename == '0') {
								//
								$(".vote-rise-btn").attr("title", "已看涨");
								$(".vote-fall-btn").attr("title", "已看涨");
								storage.writeFileContent(oThis.fileName, "1");
								storage.writeFileContent(oThis.fileDateName, tradeday);
							}
						} else {
							if (filename === false || filename == '0') {
								$(".vote-rise-btn").attr("title", "已看跌");
								$(".vote-fall-btn").attr("title", "已看跌");
								storage.writeFileContent(oThis.fileName, "2");
								storage.writeFileContent(oThis.fileDateName, tradeday);
							}
						}
					}
					oThis.getUpdown(2);		// 投完票，更新投票数据
				},
				error: function() {

				}
			});
		},

		/**
		 * 获取投票的数量
		 * @param  {Date} 	tradeday 最近的一个交易日
		 */
		getUpdownNum: function(tradeday) {
			$("#vote_date").html(tradeday.substr(0,4) + '-' + tradeday.substr(4,2) + '-' + tradeday.substr(6,2) + ' ');
			var oThis = this;
			var app = 10;
			key = oThis.prefix + tradeday;
			$.ajax({
				type: "GET",
				url: 'http://sp.10jqka.com.cn/api/evaluation/get/return/jsonp/',
				cache: false,
				dataType: 'jsonp',
				data: {
					"key"	: key,
					"app"	: app
				},
				jsonpCallback: 'callback',
				success: function(result) {
					if (result.errorcode === 0) {
						oThis.riseNum = result.result.supports;
						oThis.fallNum = result.result.oppositions;
						oThis.setVoteNumber(oThis.riseNum, oThis.fallNum);

						// 刷新的时候，如果取到的交易日期比保存在本地的日期大的时候，文件更新保存的交易日期和状态
						var date = storage.getFileContent(oThis.fileDateName);
						if (date < tradeday || date ===  false) {
							storage.writeFileContent(oThis.fileName, '0');
							storage.writeFileContent(oThis.fileDateName, tradeday);
						}

						// 取出文件中的数据，看今天是否投票过了。
						var flag = storage.getFileContent(oThis.fileName);

						// TODO(shanchao@myhexin.com): 优化代码，提高效率
						/*
						if (flag == '1') {
							$(".vote-rise-btn").addClass("vote-rised-btn");
							$(".vote-rise-btn").attr("title", "已看涨");
							$(".vote-fall-btn").addClass("vote-unfall-btn");
							$(".vote-fall-btn").attr("title", "已看涨");
						} else if (flag == '2'){
							$(".vote-rise-btn").addClass("vote-unrise-btn");
							$(".vote-rise-btn").attr("title", "已看跌");
							$(".vote-fall-btn").addClass("vote-falled-btn");
							$(".vote-fall-btn").attr("title", "已看跌");
						} else if (flag == '0') {
							$(".vote-rise-btn").removeClass("vote-unrise-btn");
							$(".vote-fall-btn").removeClass("vote-falled-btn");
							$(".vote-rise-btn").removeClass("vote-rised-btn");
							$(".vote-fall-btn").removeClass("vote-unfall-btn");
							$(".vote-rise-btn").attr("title", "我看涨");
							$(".vote-fall-btn").attr("title", "我看跌");
						} */

						// modify begin by <shanchao2@myhexin.com>
						/**
						 * 减少dom查找
						 */
						 if (flag == '1') {
 							$(".vote-rise-btn").addClass("vote-rised-btn").attr("title", "已看涨");
 							$(".vote-fall-btn").addClass("vote-unfall-btn").attr("title", "已看涨");
 						} else if (flag == '2'){
 							$(".vote-rise-btn").addClass("vote-unrise-btn").attr("title", "已看跌");
 							$(".vote-fall-btn").addClass("vote-falled-btn").attr("title", "已看跌");
 						} else if (flag == '0') {
 							$(".vote-rise-btn").removeClass("vote-unrise-btn").removeClass("vote-rised-btn").attr("title", "我看涨");
 							$(".vote-fall-btn").removeClass("vote-falled-btn").removeClass("vote-unfall-btn").attr("title", "我看跌");
 						}
						// end modify
					}
				},
				error: function() {
				}
			});
		},

		/**
		 * 设置定时器，定时去请求最近的下个交易日的日期
		 */
		setIntervalRequest: function() {
			var oThis = this;
			oThis.interval = window.setInterval(function() {
				publicBase.getTradeDayAndNextTradeDay(function(tradeday, nexttradeday) {
					oThis.getUpdownNum(tradeday);
				});
			}, 600000);
		},

		/**
		 * 进度条的动画
		 * @param {Number} percentageWidth 进度条的百分比
		 */
		setBar: function(percentageWidth) {
			$(".vote-rise-bar").animate({width:percentageWidth});
		},

		/**
		 * 渲染进度条和数据
		 * @param {Number} riseNum 同意的人数
		 * @param {Number} fallNum 反对的人数
		 */
		setVoteNumber: function(riseNum, fallNum) {
			var oThis = this;
			$("#vote_rise_num").html(riseNum);
			$("#vote_fall_num").html(fallNum);
			if (riseNum+fallNum == 0) {
				oThis.setBar("50%");
			} else {
				oThis.setBar(Math.floor(riseNum / (riseNum + fallNum) * 100) + '%');
			}
		}
	};

	module.exports = vote;
});
