# ajax
# 题目
## 手动编写一个ajax，不依赖第三方库

## 跨域的几种实现方式


# 知识点
## XMLHttpRequest
```js
var xhr = new XMLHttpRequest()
xhr.open("GET", "/api", false)
xhr.onreadystatechange = function () {
    // 这里的函数异步执行
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            alert(xhr.responseText)
        }
    }
}
xhr.send(null) 
```
### IE兼容性问题
- 不做解答

## 状态码说明
### readyState
- 0 (未初始化)还没有调用send()方法
- 1 (载入)已调用send()方法，正在发送请求
- 2 (载入完成)send()方法执行完成，已经接受到全部响应内容
- 3 (交互)正在解析响应内容
- 4 (完成)响应内容解析完成，可以在客户端调用了

### status
- 2xx 表示成功处理请求。如 200
- 3xx 需要重定向，浏览器直接跳转
- 4xx 客户端请求错误，如404
- 5xx 服务器端错误

## 跨域
### 什么是跨域
- 浏览器有同源策略，不允许 ajax 访问其他域接口
- 跨域条件：协议、域名、端口，有一个不同就算跨域

#### 可以跨域的三个标签
- 但是有三个标签允许跨域加载资源
- `<img src="xxx">`
- `<link href="xxx">`
- `<script src="xxx">`

#### 三个标签的场景
- `<img>` 用于打点统计，统计网站可能是其他域
- `<link>` `<script>` 可以使用CDN， CDN的也可以是其他域
- `<script>` 可以用于JSONP

#### 跨域注意事项
- 所有的跨域请求都必须经过信息提供方允许
- 如果未经允许即可获取，那是浏览器同源策略出现漏洞

### JSONP
```html
<script>
window.callback = function (data) {
    console.log(data)
}
</script>
<script src="http://coding.m.com/api.js"></script>

```
## 服务端设置http header
- 解决跨域的简介方法，需要服务器端来做
