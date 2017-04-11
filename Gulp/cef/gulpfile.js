//获取刚刚安装的gulp
var gulp = require('gulp');
//获取刚刚安装的gulp-uglify模块
var uglify = require('gulp-uglify');
//压缩 js 文件
//在命令行使用 gulp uglifyscript 启动此任务
gulp.task('uglifyscript', function() {
    // 1. 找到文件
    gulp.src('src/js/*.js')
    // 2. 压缩文件
        .pipe(uglify())
    // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'));
});

gulp.task('auto', function () {
    //检查指定目录中的指定文件,如果有发生变动,就执行 "uglifyscript" 命令
    gulp.watch('src/js/*.js', ['uglifyscript'])
});

gulp.task("copyfiles",function(){
    return gulp.src("/src/*.*")
               .pipe(gulp.dest("/dist"));
});

gulp.task('streamtest',function(){
    //test.txt 中的内容是 "hello gulp!"
    gulp.src('./src/test.txt').on('data', function(file) { //监听data事件
        console.log(JSON.stringify(file));
    });
});

gulp.task('streamtest2',function(){
    gulp.src('./src/test.txt').on('data', function(file) { //监听data事件
        buffer = file.contents;
        // console.log(buffer);
        str = buffer.toString("utf-8");
        console.log(str);
        //控制台输出 "hello gulp!"
    });
});

///////**********泡一杯咖啡demo***********//////

var through = require("through2");
gulp.task('makecoffee', function(){
    gulp.src('./js/app.min.js')
        .pipe(addcoffeebean()) //加咖啡豆
        .pipe(addwater()) //加水
        .pipe(addmilk()) //加奶
        .pipe(gulp.dest("./js-d/")); //输出到原来的目录覆盖文件
});
//加咖啡豆
function addcoffeebean(){
    return through.obj(function (file, enc, cb) {
      console.log(enc);
        var str = file.contents.toString('utf-8');
        // var str = file.contents.toString(enc);
        // var str = file.contents;
        str = str+" coffeebean";
        file.contents = new Buffer(str);
        // this.push(file);
        // cb();
        cb(null, file);
    });
}
//加咖啡豆
function addwater(){
    return through.obj(function (file, enc, cb) {
        var str = file.contents.toString('utf-8');
        str = str+" water";
        file.contents = new Buffer(str);
        this.push(file);
        cb();
    });
}
//加奶
function addmilk(){
    return through.obj(function (file, enc, cb) {
        var str = file.contents.toString('utf-8');
        str = str+" milk";
        file.contents = new Buffer(str);
        this.push(file);
        cb();
    });
}
//////////////////////
// 复制整个js路径下的代码
// 创建pk.js
// 修改html文件
// 修改pk.js的内容
//////////////////////

var gulp = require('gulp');
var rename = require('gulp-rename');

var template = '"use strict";\
function isIE() {\
	if (!!window.ActiveXObject || "ActiveXObject" in window)\
		return true;\
	else\
		return false;\
}\
if (isIE()) {\
    $IEContent\
} else {\
    $ChromeContent\
}\
function loadScript (src, callback) {\
	var body= document.getElementsByTagName("body")[0];\
	var script= document.createElement("script");\
	script.type= "text/javascript";\
	script.onload = script.onreadystatechange = function() {\
	    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {\
	        callback ? callback() : "";\
	        script.onload = script.onreadystatechange = null;\
	    }\
	};\
	script.src= src;\
	body.appendChild(script);\
}';


/**
 * 需要拷贝的路径，自己手动配置
 * @type {Array}
 */
var basePath = ['js', 'js-dev'];
var enterFile = ['index.html'];
var ieContent = '';
var chromeContent = '';

/**
 * 拷贝文件
 * @return {[type]} [description]
 */
gulp.task("copyDir",function(){
    for (var i = 0; i < basePath.length; i++) {
        gulp.src("./" + basePath[i] + "/**/*.js")
            .pipe(gulp.dest("./" + basePath[i] + "-cef/"));
    }
});

/**
 * 获取文件中script的内容
 * @return {[type]} [description]
 */
function getScriptContent () {
    return through.obj(function (file, enc, cb) {
        var str = file.contents.toString('utf-8');
        // console.log(str);
        console.log(str.length);
        // file.contents = new Buffer(str);
        // this.push(file);
        cb();
    });
}
// <script[^>]*>.*(?=<\/script>)<\/script>
// http://tool.oschina.net/regex/


/**
 * 对文件添加内容
 * @return {[type]} [description]
 */
function addCotents(){
    return through.obj(function (file, enc, cb) {
        var str = file.contents.toString('utf-8');
        str = template;
        file.contents = new Buffer(str);
        this.push(file);
        cb();
    });
}

gulp.task("createPKjs", function () {
    for (var i = 0; i < enterFile.length; i++) {
        gulp.src("./" + enterFile[i])
            .pipe(getScriptContent())
            .pipe(addCotents())
            .pipe(rename("pk2.js"))
            .pipe(gulp.dest("./"));
    }
});

// =========== default ====================
gulp.task('default', ['copyDir', 'createPKjs']);
