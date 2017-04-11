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


gulp.task("copyDir",function(){
    gulp.src("./*/*.js")
        .pipe(gulp.dest("./js-cef/"));
    console.log(gulp);
});

gulp.task("copyfiles2",function(){
    return gulp.src("/src/*.*")
               .pipe(gulp.dest("/dist"));
});

// =========== default ====================
gulp.task('default', ['copyDir']);