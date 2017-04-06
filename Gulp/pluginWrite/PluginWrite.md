## 流(Stream)
first：
``` javascript
gulp.task("copyfiles",function(){
    return gulp.src("/src/*.*")
               .pipe(gulp.dest("/dist"));
});
```
这段代码的作用是将 `/src` 文件夹下的文件不经任何处理拷贝到 `/dist` 文件夹下

如果要对这些文件进行操作,比如说 压缩,就在中间加多一个插件
``` javascript
var minify = require("gulp-xxxx"); //这是我假想的
var minify2 = require("gulp-ssss"); //这是我假想的
gulp.task("copyfiles",function(){
    return gulp.src("/src/*.*")
               .pipe(minify()); //假想插件
               .pipe(minify2()); //假想插件
               .pipe(gulp.dest("/dist"));
});
```

- **一个入口** : 你需要对哪些文件进行处理

- **要进行什么处理*** : 通常都是插件,上文中的minify(),minify2(),可以有多个

- **一个出口** : 处理后要把这些文件放在哪里

这个过程比较像生产零件一样一步又一步,最终装仓库.


## `pipe()` 函数
pipe() 就是一个传送带,他帮你传送上一个功能处理好的东西到下一个地方去

## 传送带里的东西















