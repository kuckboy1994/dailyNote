# vuejs 学习

## 安装 vue-cli 脚手架
```
### 安装脚手架程序
sudo npm install -g vue-cli
### 初始化程序，下载初始化需要的内容
vue init webpack my-first-vue-project
### 进入项目
cd my-first-vue-project
### 安装依赖包
npm install
### 运行（服务器、热刷新、webpack）
npm run dev
```

## 模板指令
- 数据渲染：`v-text`、`v-html`、`{{}}`
```
<p>{{a}}</p>
<p v-text="a"></p>
<p v-html="a"></p>

new Vue({
    data: {
        a: 1
    }
})
```
- 控制模块隐藏 `v-if`、`v-show`
```
false 直接不渲染
<p v-if="isShow"></p>
false 设置display为none
<p v-show="isShow"></p>

new Vue({
    data: {
        isShow: true
    }
})
```
- 渲染循环列表 `v-for`
```
<ul>
    <li v-for="item in items">
        <p v-text="item.label"></p>
    </li>
</ul>

new Vue({
    data: {
        items: {
            {
                label: 'apple'
            },
            {
                label: 'banana'
            }
        }
    }
})
```
- 事件绑定 `v-on`
```
<button v-on:click="doThis"></button>
<button @click="doThis"></button>

new Vue({
    methods: {
        doThis: function (someThing) {

        }
    }
})
```
- 属性绑定 `v-bind`
```
<img v-bind:src="imageSrc">

<div :class="{red: isRed}"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, {classB: isB, classC: isC}]"></div>
```

## vuejs 功能
1. 数据渲染/数据同步
2. 组件化/模块化
3. 其他功能：路由，ajax，数据流

## 单文件组件
- html
    - 可以在.vue文件中加入html代码。可以设置`<template lang="jade">`
- js
- css
    - 可以在.vue中间中加入css代码。可以设置`<style lang="less">`

## import
import 是 es6 的一种语法。
```
import App from './App'
```
等价于 
```
var App = require('./App')
```

## export
```
export default {
  name: 'app'
}
```
相当于
```
module.export = {

}
```

## 父子之间数据传递
