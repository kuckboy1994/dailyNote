# 下载与安装
## node 环境
安装好node.js之后就安装好了`npm`, `npm`是node.js的一个包管理工具。

## 初始化
```
npm install
```
会生成package.json的文件。
> 为什么要有这么一个文件?因为你以后会用到很多很多的gulp插件,这个文件会记录你用了哪些插件的哪些版本,如果以后有人要对你的项目进行二次开发,就可以一目了然地看到你使用了哪些插件

## 安装 Gulp 到项目中
```
npm install gulp --save-dev
```
> `--save-dev` 有了这个参数之后会把安装的插件记录到package.json这个文件中。下次只要拷贝 package.json 这个文件 `npm install` 之后，就会自动安装 package.json 中的全部插件了

> 项目名不能是 gulp,要不然这一步会失败

安装后的插件会放置到 /node_module/ 下。

## 建立 gulpfile.js 文件
在项目中建立一个 gulpfile.js,之后就用这个文件来写一些自动化构建的脚本。
当前我的项目的目录结构:
```
gulptest/
   ├ dist/
   ├ src/
      └ js/
         └ hello.js
   ├ gulpfile.js
   └ package.json
```
## 全局变量不能设置的问题
`没有问题就不用看了`
> 以下的方法是针对window自带的控制台生效。

可以使用本项目下的gulp.cmd 文件放置到项目下。
代码如下：
```
@IF EXIST "%~dp0\node.exe" (
	"%~dp0\node.exe" "%~dp0\node_modules\gulp\bin\gulp.js" %*
) ELSE (
	@SETLOCAL
	@SET PATHEXT=%PATHEXT:;.JS;=;%
	node "%~dp0\node_modules\gulp\bin\gulp.js" %*
)
```

# 写脚本
## 准备插件
为了压缩js,我们需要一个插件: `gulp-uglify`,安装就是用命令行模式进入到项目目录然后输入
```
npm install gulp-uglify --save-dev
```

## 编写代码
gulpfile.js
``` javascript
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
```

- gulp.task(name, fn) - 给一个任务起名字,第一个参数是任务名,第二个参数一个函数,定义这个函数要做什么.

- gulp.src(path) - 选择文件,参数是文件路径.

- gulp.dest(path) - 输出文件,参数是文件路径.

- gulp.pipe() - 就是把几个任务排队,然后顺序运行.

## 执行代码
`gulp uglifyscript` 执行

生成后的目录结构
```
gulptest/
   ├ dist/
      └ js/
         └ hello.js
   ├ src/
      └ js/
         └ hello.js
   ├ gulpfile.js
   └ package.json
```

## 自动检测变更
gulp 提供的 `gulp.watch(src, fn)` 可以自动检查到是否发生变更，自动执行任务。

``` javascript
gulp.task('auto', function () {
    //检查指定目录中的指定文件,如果有发生变动,就执行 "uglifyscript" 命令
    gulp.watch('src/js/*.js', ['uglifyscript'])
})
```
运行 `gulp auto` 修改脚本后， gulpfile的中的 `uglifyscript` 任务就会自动执行了。

## 默认任务
gulp还默认了一个任务,就是当你在命令行只输入 gulp 的时候,他会执行一个叫做 default 的任务.
``` javascript
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

如果想让这个默认任务执行其他我们自己写的任务,就像上面所写的 uglifyscript,可以写成这样:

``` javascript
//多个任务之间可以用逗号隔开
gulp.task('default',['uglifyscript','auto']);
```

## 查看更多的信息
可以使用 `console.log()` 打印更多的信息

# 一些常用的gulp插件
- gulp-uglify - 压缩js文件([官网](https://github.com/terinjokes/gulp-uglify))

- gulp-clean-css - 压缩css文件([官网](https://github.com/scniro/gulp-clean-css))

- gulp-less - 编译less文件([官网](https://github.com/plus3network/gulp-less))

- gulp-imagemin - 压缩图片([官网](https://github.com/sindresorhus/gulp-imagemin))

- gulp-watch-path - 检测特定文件以执行命令([官网](https://github.com/nimojs/gulp-watch-path))

- gulp-autoprefixer - 为css自动添加一些前缀([官网](https://github.com/sindresorhus/gulp-autoprefixer))



# 参考
- 本文参考 [Gulp入门笔记](http://trickyedecay.me/archives/8/) 