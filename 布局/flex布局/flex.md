## 说明
**对文中提及的点有不赞同的欢迎[提出 issues](https://github.com/kuckboy1994/dailyNote/issues/new)（请添加 `flex` 标签）讨论。还可提出需要帮助（ `help wanted` 标签）或反馈问题( `bug` 标签)。**

## Flex布局
详细的解释在阮一峰老师的博客上已经有了。这里我就不做搬运工了。[地址](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)。

## 布局实例
阮一峰老师实例教程。[地址](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## 以下是可能遇到的问题
## 内部的元素设置高度之后，设置 `flex:1` 的页面，当一个元素内部设置内容的时候。页面的均分状态就消失了。        
原理解释：  
`flex:1` 其实是 `flex-grow:1` 的简写。代表的是每个子元素的增长比例，都是1，所以在开始的时候大家都是均分的。当页面中一个子元素的有内容的时候，页面就是去平衡的原因是 `flex-basis` 属性，代表基础增长值。也就是 `flex-grow` 增长基数。
解决方法:  
- 所以我们只要把这个值设置为一样的话页面就又均分了。比如 `flex-basis: 0`  
  [demo](https://kuckboy1994.github.io/dailyNote/布局/flex布局/demo/demo1.html)
- 设置子元素为 `relative` ，增加一个容器 设置为 `absolute`。
	[demo](https://kuckboy1994.github.io/dailyNote/布局/flex布局/demo/demo2.html)
  

## 参考资料
- [Flex 布局教程：语法篇——阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇——阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
- [FlexBox-弹性盒子详解——网易云课堂](https://study.163.com/course/courseMain.htm?courseId=1003164044)
