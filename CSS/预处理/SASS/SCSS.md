## 什么是SASS
- SASS是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。

## 安装
- 安装ruby，sass是由ruby编写的。mac自带ruby。
- 运行命令安装sass，mac下加上sudo

```
gem install sass
```

## 使用
- 文件的后缀名为 `.scss` 或 `.sass`。
  - `.sass` 文件是`老`的文件格式，有比较严格的代码缩进，使用的是ruby的代码书写规范，对于纯前端人员来说比较困难。
  - `.scss` 文件是`新`的文件格式，格式和 `.css` 是一致的，`.css` 文件的代码可以直接在 `.scss` 文件中运行.（推荐使用）
- 将 `.scss` 文件转 `.css` 代码。

```
//单文件转换命令
sass input.scss output.css

//单文件监听命令
sass --watch input.scss:output.css

//如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
sass --watch app/sass:public/stylesheets
```

## 编译风格
- 1. nested：嵌套缩进的css代码，它是默认值。
  2. expanded：没有缩进的、扩展的css代码。
  3. compact：简洁格式的css代码。
  4. compressed：压缩后的css代码。
- 生产环境中，一般使用最后一个选项。

```
//编译格式
sass --watch input.scss:output.css --style compact

//编译添加调试map
sass --watch input.scss:output.css --sourcemap

//选择编译格式并添加调试map
sass --watch input.scss:output.css --style expanded --sourcemap

//开启debug信息
sass --watch input.scss:output.css --debug-info
```

## 监听某个文件或目录，一旦源文件有变动，就自动编译。
```
// watch a file
sass --watch input.scss:output.css
// watch a directory
sass --watch app/sass:public/stylesheets
```

## 嵌套
- 嵌套是css更加有结构的感觉，像是在写html一样，在css中能了解html的结构。
- SASS允许选择器嵌套

```
div {
    hi {
        color:red;
    }
}
```
- 属性也可以嵌套，比如border-color属性

```
p {
    border: {
        color: red;
    }
}
```
- 在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类，可以写成：

```
a {
    &:hover { color: #ffb3ff; }
}
```

## 注释
- 标准的CSS注释 `/* comment */`，会保留到编译后的文件。
- 单行注释 `// comment`，只保留在SASS源文件中，编译后被省略。
- 在 `/*后面加一个感叹号`，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

```
/*!
    重要注释！
*/
```

## 继承
- SASS允许一个选择器，继承另一个选择器。比如，现有class1：

```
.class1 {
    border: 1px solid #ddd;
}
```
- class2要继承class1，就要使用@extend命令：

```
.class2 {
    @extend .class1;
    font-size:120%;
}
```

## Mixin
- Mixin有点像C语言的宏（macro），是可以重用的代码块。  
使用@mixin命令，定义一个代码块。

```
@mixin left {
　　　　float: left;
　　　　margin-left: 10px;
　　}
```

- 使用@include命令调用这个`mixin`。

```sass
div {
	@include left;
}
```
- mixin的强大之处，在于可以指定参数和缺省值。

```
@mixin left($value: 10px) {
　　float: left;
　　margin-right: $value;
}
```

- 下面是一个mixin的实例，用来生成浏览器前缀。

```
　　@mixin rounded($vert, $horz, $radius: 10px) {
　　　　border-#{$vert}-#{$horz}-radius: $radius;
　　　　-moz-border-radius-#{$vert}#{$horz}: $radius;
　　　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;
　　}
```

## 颜色函数




## 插入文件
- @import命令，用来插入外部文件。

```
@import "path/filename";
```
可以省略.sass  
- 如果插入的是.css文件，则等同于css的import命令。

```
@import "foo.css";
```


## 条件语句
- @if可以用来判断：

```
　　p {
　　　　@if 1 + 1 == 2 { border: 1px solid; }
　　　　@if 5 < 3 { border: 2px dotted; }
　　}
```
- 配套的还有@else命令：

```
　　@if lightness($color) > 30% {
　　　　background-color: #000;
　　} @else {
　　　　background-color: #fff;
　　}
```
- `@if` 后面跟 `{}` 即表示判断语句的结束。

## 循环语句
- SASS支持for循环：

```
　　@for $i from 1 to 10 {
　　　　.border-#{$i} {
　　　　　　border: #{$i}px solid blue;
　　　　}
　　}
```
- 也支持while循环：

```
　　$i: 6;
　　@while $i > 0 {
　　　　.item-#{$i} { width: 2em * $i; }
　　　　$i: $i - 2;
　　}
```
- each命令，作用与for类似：

```
　　@each $member in a, b, c, d {
　　　　.#{$member} {
　　　　　　background-image: url("/image/#{$member}.jpg");
　　　　}
　　}
```


## 自定义函数
- SASS允许用户编写自己的函数。

```
　　@function double($n) {
　　　　@return $n * 2;
　　}
　　#sidebar {
　　　　width: double(5px);
　　}
```





## 变量使用下划线和中划线都是一样的
- 在sass中的变量名，使用中划线还是下划线都是可以的，但是在sass中下划线和中划线是一样的。比如：

```
$link-color: red;
a {
    color: $link_color;
}
// 输出的是
a {
    color: red;
}

$link_color: blue;
$link-color: red;
a {
    color: $link_color;
}
// 输出的是：
a {
    color: red;
}
```
发现及时 `$link_color` 及时存在这个变量，也还是会被 `$link-color` 这个感觉不一样的变量给替换了名字。  
在上例中，$link-color和$link_color其实指向的是同一个变量。
- 在 sass 的拓展中也同样支持上面的说明。


## 资源
- [sass在线转换](https://www.sassmeister.com/)

## 参考资料
- [SASS官网-快速入门](https://www.sass.hk/guide/)
- [阮一峰的网络日志-SASS用法指南](http://www.ruanyifeng.com/blog/2012/06/sass.html)

## end
