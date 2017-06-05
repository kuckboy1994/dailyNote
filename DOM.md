## Document Object Model
- DOM Core
- DOM HTML
- DOM Style
- DOM Event

## node
- .parentNode
- .firstNode
- .lastChild
- .previousSibling
- .nextSilbing

## 节点类型
- element_node(元素遍历)  
  - .firstElementChild
  - .lastElementChild
  - .nextElementSilbing
  - .previousElementSilbing
- text_node
- comment_node
- document_type_node

## 事件流
- capture phase 事件捕获
- target phase 目标事件
- bubble phase 事件冒泡

## 事件注册
- eventTarget.addEventListener(type, listener[, useCapture]);
```js
var elem = document.getElementById('div1');
var clickHandler = function (event) {
  // TODO
}
elem.addEventListener('click', clickHandler, false);
elem.onclick = clickHandler;
```
- addEventListener 和 onclick 的区别？
  - 通过 addEventListener 添加多个 click 事件，每个事件都会执行，但是 onclick 只执行最后的一个事件。
  - jquery 的 .on('click', func); 就是通过 addEventListener 来事件。
- eventTarget.removeEventListener(type, listener[, useCapture]);
```js
elem.removeEventListener('click', clickHandler, false);
elem.onclick = null;
```
- 事件触发
  - eventTarget.dispatchEvent(type);
    ```js
    elem.dispatchEvent('click');
    ```
- ie6、7、8
  - 事件注册与取消
    - attchEvent/detachEvent
  - 事件触发
    - fireEvent(e)
  - no capture

## 事件对象
```js
var elem = document.getElementById('div1');
var clickHandler = function (event) {
  event = event || window.event;  // ie低版本兼容
  // TODO
}
elem.addEventListener('click', clickHandler, false);
```
- 属性
  - type 
    click
  - target(srcElement)
    - 点击或被操作的对象
  - currentTarget
    - 事件注册的对象
- 方法
  - stopPropagation (阻止事件转播)
  ```js
  event.stopPropagation() (W3C)
  event.cancalBubble = true (IE)
  event.stopImmediatePropagation() (W3C)
  // 效果和1相同，同时会阻止之后注册的事件
  ```
  - preventDefault (默认行为)
  ```js
  Event.preventDefault() (W3C)
  Event.returnValue = false (IE)
  ```
## 事件分类
- ![](JS/images/5.png)
- ![](JS/images/MouseEvent.png)
  - 属性
    - clientX, clientY 距离浏览器的距离
    - srceenX, srceenY 距离屏幕的距离
    - ctrlKey, shiftKey, altKey, metaKey
    - button(0,1,2)
  - 顺序
    - 从元素A上方移过
      -mouse`move`->mouse`over`(A)->mouse`enter`(A)->mouse`move`->mouse`out`(A)->mouse`leave`(A)
    - 点击元素
      -mouse`down`->[mouse`move`]->mouse`up`->`click`
    - 栗子：拖拽div  
    HTML
    ```html
    <div id="div1"></div>
    ```
    CSS
    ```css
    #div1 {
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #000;
      width: 100px;
      height: 100px;
    }
    ```
    JS
    ```js
    var elem = document.getElementById('div1');
    var clientX, clientY, moving;
    var mouseDownHandler = function (event) {
    }
    var mouseMoveHandler = function (event) {
    }
    var mouseUpHandler = function (event) {
    }
    addEvent(elem, 'mousedown', mouseDownHandler);
    addEvent(elem, 'mousemove', mouseDownHandler);
    addEvent(elem, 'mouseup', mouseDownHandler);
    ```
- ![](JS/images/WheelEvent.png)
  - 属性
    - deltaMode
    - deltaX
    - deltaY
    - deltaZ
- ![](JS/images/FocusEvent.png)
  - 属性
    - relatedTarget
- ![](JS/images/InputEvent.png)
  - onpropertychange(IE)
- ![](JS/images/KeyboardEvent.png)
  - 属性
    - key 按下了什么键
    - code
    - ctrlKey, shiftKey, altKey, metaKey
    - repeat
    - keyCode
    - charCode
    - which
- ![](JS/images/Event.png)
  - window
    - load
    - unload
    - error
    - abort
  - Image
    - load
    - error
    ```html
    <img alt="photo" src="JS/images.png" onerror="this.src='JS/error.png'"/>
    ```
    - abort
- ![](JS/images/UIEvent.png)
## 事件代理
- 将事件注册到元素的父节点上

## HTTP事务
## 请求报文格式
- 请求报文
  - 头行
    - http的方法
      - GET
      - POST
    - 主机地址
      - baidu.com
    - http的版本
      - http/1.1
  - 头部
    - Accept(接收的类型)
      - Accept: text/html,application/xhtml+xml,application.xml;q=0.9,image/webp,*/*;q=0.8
    - Accept-Encoding(接收类型编码方式)
      - Accept-Encoding:gzip,deflate,sdch
    - Accept-Language(浏览器端可以接收的类型)
      - Accept-Language:en-US,en;q=0.8,zh-CN;
    - Cache-Control(缓存的策略)
      - Cache-Control: no-cache
    - Connection()
      - Connection: keep-alive
    - Cookie() 
      - Cookie: visited=true;playlist=6523423DNT:1
    - Host()
      - Host: baidu.com
    - Pragma()
      - Pragma: no-cache
    - User-Agent(当前浏览器的版本) 
      - User-Agent: Mozilla/5.0(Windows NT 6.1; WOW64) AppleWebKit/537.36(KHTML, like Geoko) Chrome/41.0.2272.118 Safari/537.36
  - 主体
- 响应报文
 - 头行
   - http版本
   - 状态码
   - 状态码描述
   - HTTP/1.1 200 OK
 - 头部
   - Expires(缓存的时间)
     - Expires:Thu, 01 Jan 1970 00:00:00 GMT
   - server(服务器)
     - server: nginx
 - 主体
   - html文件

## 常用HTTP方法
- ![](JS/images/6.png)

## URL构成
![](JS/images/7.png)

## HTTP版本
![](JS/images/8.png)

## 常见的HTTP状态码
![](JS/images/9.png)

## ajax 
![](JS/images/10.png)
- open
  ![](JS/images/11.png)
- setRequestHeader
  ![](JS/images/12.png)
- send
  ![](JS/images/13.png)
  ![](JS/images/14.png)
- 同源策略
  ![](JS/images/15.png)
- 跨域资源访问
  ![](JS/images/16.png)
## end
