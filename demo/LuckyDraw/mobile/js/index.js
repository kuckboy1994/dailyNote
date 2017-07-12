$(function(){
				var position = [
					['10%','0%'],['25%','0%'],['40%','0%'],['54%','0%'],['68%','0%'],['82%','0%'],
					['82%','12%'],['82%','22%'],['82%','33%'],['82%','42%'],['82%','53%'],
					['66%','53%'],['66%','42%'],['66%','33%'],['66%','22%'],
					['66%','13%'],['52%','13%'],['38%','13%'],['24%','13%'],
					['24%','23%'],['24%','33%'],['24%','43%'],
					['23%','53%'],['7%','53%'],
					['7%','43%'],['7%','33%'],['7%','23%'],['7%','11%']
				];
//				var position = [
//					['0%','0%'],['15%','0%'],['15%','0%'],['14%','0%'],['14%','0%'],['14%','0%'],
//					['82%','12%'],['82%','22%'],['82%','33%'],['82%','42%'],['82%','53%'],
//					['66%','53%'],['66%','42%'],['66%','33%'],['66%','22%'],
//					['66%','13%'],['52%','13%'],['38%','13%'],['24%','13%'],
//					['24%','23%'],['24%','33%'],['24%','43%'],
//					['23%','53%'],['7%','53%'],
//					['7%','43%'],['7%','33%'],['7%','23%'],['7%','11%']
//				];
				var begin = 0;
				var time = 0;
				var is_login = false;//判断用户是否登录
				//初始化函数
//				//掷骰子
				var is_moving = false;
//				$('#shake_dice').('click',function(){
//					//判断是否登录（暂未写）
//					if(is_moving || $('#count').text() == 0)
//					return;
//					
//					
//				});
				//地标移动
				function move(step,callback){
					var left = position[step][0];
					var top = position[step][1];
//					for(var i = 0;i < step;i++){
//		                (function(i){
//		                    setTimeout(function(){
//		                        $('.move')[0].style.webkitTransform = 'translate3d('+position[i][0]+','+position[i][1]+',0)';
//		                        $('.move')[0].style.transform = 'translate3d('+position[i][0]+','+position[i][1]+',0)';
//		                        time--;
//		                        
//		                    },500*time);
//		                    time++;
//		                })(i);
//					}
//					for(var i = 1; i <= step; i++){
//						console.log(i);
//						console.log($('.move').css('left'));
//						
//						$('.move')[0].style.webkitTransform = 'translate3d('+position[i][0]+','+position[i][1]+',0)';
//		                $('.move')[0].style.transform = 'translate3d('+position[i][0]+','+position[i][1]+',0)';
//					}
					
					$('.move').css('left',left).css('top',top);
					

				}
				//让骰子移动
//				function move(num,callback){
//			       
//			        var left = position[step][0];
//					var top = position[step][1];
//  			}
				//致筛子 
				function scroll(){
					for( var i = 0; i < 20; i++){
						(function(i){
							setTimeout(function(){
								var rand = Math.floor(Math.random()*10);
								switch(rand){
									case 0:
									$('.roll_dice')[0].style.backgroundPositionY = '111%';
									break;
									case 1:
									$('.roll_dice')[0].style.backgroundPositionY = '122%';
									break;
									case 2:
									$('.roll_dice')[0].style.backgroundPositionY = '133%';
									break;
									case 3:
									$('.roll_dice')[0].style.backgroundPositionY = '144%';
									break;
									case 4:
									$('.roll_dice')[0].style.backgroundPositionY = '155%';
									break;
									case 5:
									$('.roll_dice')[0].style.backgroundPositionY = '166%';
									break;
									case 6:
									$('.roll_dice')[0].style.backgroundPositionY = '177%';
									break;
									case 7:
									$('.roll_dice')[0].style.backgroundPositionY = '189%';
									break;
									case 8:
									$('.roll_dice')[0].style.backgroundPositionY = '200%';
									break;
									case 9:
									$('.roll_dice')[0].style.backgroundPositionY = '211%';
									break;
								}
							},200*i)
						})(i)
					}
					
				}
//				$('.roll_dice').on('click',function(){
//					
//					move(6,function(){
//						console.log(1);
//					});
//				});
//				scroll();
				
				var index = 0;
				var moveOneStep = function () {
					index ++;
					if (index === 30) {
						index = 0;
					}
					$('.move').animate({
						left: position[index][0],
						top: position[index][1]
					}, 0);
				}
				$('.roll_dice').on('click', function () {
					var step = parseInt(Math.random(0,1)*10)%6 + 1;	// 生成随机的点数，之后的内容可以放到ajax请求之后的success 中
					console.log(step);
					
					var i = 0;
					var inter = setInterval(function () {
						console.log(i);
						moveOneStep();
						if (++i === step) {
							window.clearInterval(inter);
						}
					}, 3000);
					
					
				});
				
				
			})