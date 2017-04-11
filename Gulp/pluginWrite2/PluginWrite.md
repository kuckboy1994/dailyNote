# 流(Stream)
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
我们可以通过监听 data 事件来查看所谓的 "流" 当中,到底流的是什么。
``` javascript
gulp.task('streamtest',function(){
    //test.txt 中的内容是 "hello gulp!"
    gulp.src('./src/test.txt').on('data', function(file) { //监听data事件
        console.log(JSON.stringify(file));
    });
});
```
执行上面这个 task 会在命令行输出一个这样的东西:
``` json
{
    "history": ["D:\\src\\test.txt"],
    "cwd": "D:\\",
    "base": "D:\\src\\",
    "stat": {
        "dev": 1794573763,"mode": 33206,"nlink": 1,
        "uid": 0,"gid": 0,"rdev": 0,
        "ino": 969399819791932800,"size": 11,
        "atime": "2017-01-10T07: 38: 19.412Z",
        "mtime": "2017-01-10T07: 38: 25.133Z",
        "ctime": "2017-01-10T07: 38: 25.133Z",
        "birthtime": "2017-01-10T07: 38: 19.412Z"
    },
    "_contents": {
        "type": "Buffer",
        "data":[104,101,108,108,111,32,103,117,108,112,33]
    }
}
```
这是一个 **虚拟文件对象(vinyl)** , 上面这个东西就是在 `pipe()` 中流动的东西!
它记载了需要处理的文件路径,工作目录,文件状态,还有文件内容等等的信息.

**_contents** 下面的 **data** 就是这个文件的 **源数据(buffer)**
> Gulp 中默认的数据类型都是 Buffer ,也记载在了 **_contents** 下面的 **type** 里面

## 转化源数据
我们可以利用以下的语句来实现 源数据(buffer)转为字符串(string),或者反过来。
``` javascript
string = buffer.toString("utf-8"); //使用utf-8编码来将buffer变为string
buffer = new Buffer(string);       //将string转化为buffer
```
输出到控制台
``` javascript
gulp.task('streamtest2',function(){
    gulp.src('./src/test.txt').on('data', function(file) { //监听data事件
        buffer = file.contents;
        str = buffer.toString("utf-8");
        console.log(str);
        //控制台输出 "hello gulp!"
    });
});
```

# 让我们来泡一杯咖啡(demo)
现在大部分的插件都依赖于 [through2](https://www.npmjs.com/package/through2)
有了这个东西,做很多事情都会很方便,而且不需要再去苦苦地找插件啦!自己就能完成!

## 准备一个 coffee.txt
在src目录下放一个coffee.txt。内容随意。

## 编写一个task和若干个小步骤
``` javascript
var through = require("through2");
gulp.task('makecoffee',function(){
    gulp.src('./src/coffee.txt')
        .pipe(addcoffeebean()) //加咖啡豆
        .pipe(addwater()) //加水
        .pipe(addmilk()) //加奶
        .pipe(gulp.dest("./src")); //输出到原来的目录覆盖文件
});
//加咖啡豆
function addcoffeebean(){
    return through.obj(function (file, enc, cb) {
      console.log(enc);
        var str = file.contents.toString('utf-8');
        // var str = file.contents.toString(enc);
        // var str = file.contents;
        str = str + " coffeebean";
        file.contents = new Buffer(str);
        this.push(file);
        cb();
    });
}
//加咖啡豆
function addwater(){
    return through.obj(function (file, enc, cb) {
        var str = file.contents.toString('utf-8');
        str = str+" water";
        file.contents = new Buffer(str);
        // this.push(file);
        // cb();
        cb(null, file);
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
```

## 运行
`gulp makecoffee` 运行。
coffee.txt文件变成
```
coffeebean water milk
```

## 详解
通过上面的观察,我们会发现我们自己写的函数返回了一个 `through.obj()`
它帮助我们返回 **vinyl对象** , 只不过这个函数为我们提供了很多功能
它的三个参数分别是

- file : 当前传送带上的东西,即 vinyl对象本身

- enc : 文件编码,传进来的这个文件本身是什么编码的,可以用在转化为字符串上

- cb : 回调函数,当完成了你的操作之后必须执行这个方法让系统知道你已经做完这件事情了.

上面的例子中有一句话
``` javascript
this.push(file);
```
**不添加这句话的话,他不会把你处理好的东西再放回我所说的传送带上**
所以你可以利用一些条件判断,来决定一个文件到底要不要继续放到传送带上.
(不是咖啡?!倒掉倒掉)

每当你对这个文件操作完成之后,必须执行 `cb()` 来告诉系统你做完了!

上面两个小语句还可以改写成这样:
``` javascript
this.push(file);
cb();
// 改写成这样-->
cb(null,file); //其中第一个参数是用来抛出错误的
```

# 参考
- 本文参考 [Gulp <我又重新认识了它>](http://www.trickyedecay.me/archives/17/)
