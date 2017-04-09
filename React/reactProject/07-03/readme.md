## 虚拟dom的结构
app <=> React Virtual DOM <=> DOM

## 为什么快？
复杂程度会从O(n^3) 降低到 O(n)

## 如何实现的？
先做一个diff操作，对比出区别之后再进行渲染。
[github地址](https://github.com/Matt-Esch/virtual-dom)

## React组件
划分为组件的话，就可以复用。

- 组件是 React 的一个主要的特性
- 组件的 return 函数里面返回的html节点必须是一个
- 可以给外部使用的组件定义:  
`export default class ComponentHeader extends React.Component {}`
- 入口的定义：  
`ReactDOM.render(<Index/>, document.getElementById('example'))`
