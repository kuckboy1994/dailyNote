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

console.log(gulp);