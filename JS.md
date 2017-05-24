## ECMAScript DOM

## “DOM2级事件” 事件流包括三个阶段：
- 事件捕获 (Document -> html -> body -> div)
- 处于目标阶段 (div)
- 事件冒泡 (div -> body -> html -> Document)

## addEventListener(处理的事件名称, 事件处理程序, 布尔值)
- 布尔值 如果是 true: 表示在捕获阶段调用事件处理程序，false：表示在冒泡阶段调用事件处理程序。
- 所有主流浏览器都支持addEventListener()方法，除了 IE 8 及更早 IE 版本。  
  可以使用 `attachEvent`

```javascript
var x = document.getElementById("myBtn");
if (x.addEventListener)
{
    x.addEventListener("click", myFunction);
} else if (x.attachEvent)
{
    x.attachEvent("onclick", myFunction);
}
function myFunction()
{
    alert("Hello World!");
}
```

## 正则表达式
- regexObj.test(str) 测试正则表达式与制定字符串是否匹配 返回 true or false  
  /12345678/.test('x12345678x');
- 锚点：匹配一个`位置`
  - ^ : 起始位置 `/^http:/` 以 http: 起始的字符串
  - $ : 结尾位置 `/\.jpg$/` 以 .jpg 结尾的字符串
  - \b: 单词边界 `/\bis\b/` demo /\bis\b/.test('that is tom'); // true
- 字符类
  - 匹配一类字符中的`一个`
  - [abc]: a或b或c
  - [0-9]: 一个数字 [^0-9]: 非数字的一个字符
  - [a-z]: 一个字母
  - .    : 任一字符（换行除外）
- 元字符
  - 具有特殊


## IE 6/7/8 不支持事件捕获

## domContentLoaded事件早于onload事件


## 关闭浏览器标签或关闭浏览器
- 代码
```javascript
// ie6和7关闭的时候会提示。
window.opener = null;       // 关闭ie6不提示
window.open('', '_self', '');   // 关闭ie7不提示
window.close();   // 关闭操作
```
- firefox 不能关闭  
  在地址栏输入 `about:config`
  找到 `dom.allow_scripts_to_close_windows` 这项并改为true。