# 题目
## DOM 是哪种基本的数据结构？
- 树
## DOM 操作的常用API有哪些？
- 获取 DOM 节点，以及节点的 property 和 Attribute
- 获取父节点，获取子节点
- 新增节点，删除节点
## DOM 节点的 attr 和 property 
- property 知识一个JS对象的属性的修改
- Attribute 是对 html 标签属性的修改


# 知识点
## DOM 的本质
## DOM 节点操作
- 获取 DOM 节点
```js
var div1 = document.getElementById('div1')      // 元素
var divList = document.getElmentsByTagName('div')       // 集合
console.log(divList.length)
console.log(divList[0])

var containerList = document.getElmentsByClassName('.container')    // 集合
var pList = document.querySelectorAll('p')                          // 集合
```
- prototype
```js
var pList = document.querySelectorAll('p')
var p = pList[0]
console.log(p.style.width)  // 获取 样式
p.style.width = '100px'     // 修改 样式
console.log(p.className)    // 获取 class
p.className = 'p1'          // 修改 class

// 获取 nodeName 和 nodeType
console.log(p.nodeName)     // "P"
console.log(p.nodeType)     // 1
/*
删除节点的时候需要判断nodeType的类型
1	ELEMENT_NODE
2	ATTRIBUTE_NODE
3	TEXT_NODE
4	CDATA_SECTION_NODE
5	ENTITY_REFERENCE_NODE
6	ENTITY_NODE
7	PROCESSING_INSTRUCTION_NODE
8	COMMENT_NODE
9	DOCUMENT_NODE
10	DOCUMENT_TYPE_NODE
11	DOCUMENT_FRAGMENT_NODE
12	NOTATION_NODE

nodeName
text    #text
element element_type
*/
```
- Attribute
```js
var pList = document.querySelectorAll('p')
var p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'aaa')
p.getAttribute('style')
p.setAttribute('style', 'font-size: 20px;')
```
## DOM 结构操作
- 新增节点
```js
var div1 = document.getElementById('div1')
// 添加节点
var p1 = document.creatElement('p')
p1.innerHTML = 'this is p1'
div1.appendClild(p1)    // 添加新创建的元素
// 移动已有节点!!!!!!!!!!!!!!!!!!!!!
var p2 = document.getElementById('p2')
div1.appendChild(p2)
```
- 获取父元素
- 获取子节点
- 删除节点
```js
var div1 = document.getElmentById('div1')
var parent = div1.parentElement
var child  = div1.childNode
div1.removeChild(child[0])      // 这边根据需求删除“对应”的节点
```

