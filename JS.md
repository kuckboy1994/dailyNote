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
  - 具有特殊意义的字符
    - ^、$、\b
    - \d : [0-9]  -->   \D : [^\d]
    - \s : 空白符  -->   \S : [^\s]
    - \w : [A-Za-z0-9_] \W : [^\w]
- 量词
  - 出现的次数
    - `{m,n}: m到n次`
    - `* ：{0,} 0到无穷`
    - `? : {0,1} 0到1次`
    - `+ : {1,1} 1到无穷`
    - `{10} 出现10次`
- 转义符  
  需要匹配的字符是元字符
  - `/^http:\/\//`
  - `/@163\.com$/`
- 多选分支
  - `/thi(c|n)k/` === `/thi[cn]k/`
  - `/\.(png|jpg|jpeg|gif)$/`
- 捕获
  - () : 捕获 `/(.+)@(163|126|188)\.com$/`
  - (?:) : 不捕获
  - 使用：
    - $1、$2,...
    - api参数或返回值
- str.match(regexp)
  - 获取匹配的字符串
- str.replace()
  - 替换一个子串
  ```javascript
var str = 'The price of tomato is 5.';
str.replace(/(\d+)/,'$1.00');
  ```
- regexpObj.exec(str)
  - 更强大的检索
    - 更详尽的结果: index
    - 过程的状态：lastIndex


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


## 获取Object对象长度
```
var nums = {
  "a": "1",
  "b": "2",
  "c": "3"
};
var arr = Object.keys(nums);
console.log(arr); //["a", "b", "c"]
console.log(arr.length) // 3
```

## JSON.parse()
- string -> json Object

## JSON.stringify()
- JSON Object -> string

``` javascript
//方法一：
<!–[if lt IE 7]>
<script  type=”text/javascript” src=”./json2.js”></script>
<![endif]–>

//方法二：
if(!window.JSON){
	window.JSON = {
		// JSON格式转换成对象格式
		parse : function (JsonStr) {
			return eval("("+JsonStr+")");
		}
		// 对象格式转换成JSON格式
		stringfy : function (obj) {
			var result = "";
			for(var key in obj){
				// 下面判断都需要将key值(属性名)加上双引号即"\""+key+"\": = “key:”
				//1. 属性值是String类型eg.var obj = {name:"value",...}

				if(typeof obj[key] == "string"){
					result+="\""+key+"\":\""+obj[key]+"\",";
				}
				//2. 属性值是RegEXP正则表达式变为如下形式“key:{}”,
				else if(obj[key] instanceof RegExp){
					result+="\""+key+"\":{},";
				}
				//3. 属性值是undefined或Function类型则忽略
				else if(typeof obj[key]=="undefined" || obj[key] instanceof Function){

				}
				//4. 如果属性值是一个数组 eg. arr:[]
				else if(obj[key] instanceof Array){
					result+="\""+key+"\":[";
					var arr = obj[key];
					//对属性值数组arr遍历：
					for(var item in arr){
						//4.1 如果数组项是string类型 ["string",....]
						if(typeof arr[item] == "string"){
							result += "\"" + arr[item] + "\",";
						}
						//4.2 如果数组项是正则表达式eg. [/[]/,...]，只保留一对空大括号{}
						else if(arr[item] instanceof RegExp){
							result += "{},";
						}
						//4.3 如果数组项是undefined或函数, 则显示null。
						else if(typeof arr[item] == "undefined" || arr[item] instanceof Function){
							result += null +",";
						}
						// 4.5 如果数组项是对象(非正则，非函数，非null)
						else if(arr[item] instanceof Object){
							result += this.stringify(arr[item]) +",";
						}
						//4.6
						else {
							result += arr[item] + ",";
						}
					}
					result = result.slice(0,-1)+"],"
				}
				//5. 如果属性值是对象(非null，非函数，非数组，非正则)
				else if(obj[key] instanceof Object){
					result += "\"" + key + "\":" + this.stringify(obj[key]) + ",";
				}
				//6. 其他情况
				else {
					result += "\"" + key + "\":" + obj[key] + ",";
				}
			}
			//  最后遍历完毕后去除最后一个逗号,两边加{}
			return "{" + result.slice(0,-1) + "}";
		}
	}
}
```

## end
