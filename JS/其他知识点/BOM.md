# BOM
Browser Object Model

# 题目
## 如何检测浏览器的类型
- 见知识点
## 拆解url的各部分
- 见知识点

# 知识点
## navigator
```js
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```
## screen
```js
console.log(screen.width)
console.log(screen.height)
```
## location
```js
console.log(location.href)      // 全部的链接
console.log(location.protocal)  // 'http:' 'https:'
console.log(location.host)      // '域名'
console.log(location.pathname)  // 'api/getusername'
console.log(location.search)    // '?id=1123'
console.log(location.hash)      // '#type=top'
```
## history
```js
history.back()
history.forward()
```
