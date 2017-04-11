"use strict";

function isIE() {
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}

if (isIE()) {
	loadScript('../common/scripts/jquery-1.7.1.min.js', function () {
		loadScript('../common/scripts/highcharts-4.1.5.min.js', function () {
			loadScript('../common/scripts/json2.min.js', function () {
				loadScript('../common/scripts/ta.min.js', function () {
					loadScript('../common/scripts/jquery.clientlogin.min.js', function () {
						loadScript('../common/scripts/screenerror.min.js', function () {
							loadScript('../common/scripts/sea.min.js', function () {
								loadScript('js/app.min.js', function () {
									seajs.use('dist/app');
								});
							});
						});
					});
				});
			});
		});
	});

} else {
	loadScript('../common/scripts/thsApi.js', function () {
		loadScript('../common/scripts/jquery-1.7.1.min.js', function () {
			loadScript('../common/scripts/highcharts-4.1.5.min.js', function () {
				loadScript('../common/scripts/json2.min.js', function () {
					loadScript('../common/scripts/ta.min.js', function () {
						loadScript('../common/scripts/jquery.clientlogin.min.js', function () {
							loadScript('../common/scripts/screenerror.min.js', function () {
								loadScript('../common/scripts/sea.min.js', function () {
									seajs.use('./js-dev/app');
								});
							});
						});
					});
				});
			});
		});
	});
}

function loadScript (src, callback) {
	var body= document.getElementsByTagName('body')[0];  
	var script= document.createElement('script');  
	script.type= 'text/javascript';  
	script.onload = script.onreadystatechange = function() {  
	    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") { 
	        callback ? callback() : '';
	        script.onload = script.onreadystatechange = null;  
	    }
	};
	script.src= src;  
	body.appendChild(script);  
}

