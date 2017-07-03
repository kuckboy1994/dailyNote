var gulp = require('gulp');
var cmdPack = require('gulp-cmd-pack');
var uglify = require('gulp-uglify');
 
gulp.task('cmd', function () {
    gulp.src('static/app/index.js') //main文件 
        .pipe(cmdPack({
            mainId: '../dist/index/index', //初始化模块的id 
            base: "sea-modules/", //base路径
            alias: {
                "jquery": "jquery/3.2.1/jquery.min.js",
                "echarts": "echarts/3.6.2/echarts.min.js"
            },
            ignore: ['echarts', 'jquery'] //这里的模块将不会打包进去 
        }))
        .pipe(uglify())
        // .pipe(uglify({ //压缩文件，这一步是可选的 
        //     mangle: {
        //         except: ['require']
        //     }
        // }))
        .pipe(gulp.dest('dist/index/'));//输出到目录 
});