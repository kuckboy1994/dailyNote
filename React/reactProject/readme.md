## 虚拟dom的结构
app <=> React Virtual DOM <=> DOM

## 为什么快？
复杂程度会从O(n^3) 降低到 O(n)

## 如何实现的？
先做一个diff操作，对比出区别之后再进行渲染。
[github地址](https://github.com/Matt-Esch/virtual-dom)

## React组件
划分为组件的话，就可以复用。
