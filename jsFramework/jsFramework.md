# JS框架

## 说明
**对文中提及的点有不赞同的欢迎[提出 issues](https://github.com/kuckboy1994/dailyNote/issues/new)（请添加 `jsFramework` 标签）讨论。还可提出需要帮助（ `help wanted` 标签）或反馈问题( `bug` 标签)。**

## 何为框架何为库？
- 库：类似jquery中的ajax这类的接口，供你调用的。库包含更够完成特定功能的可重用的代码。你告诉库你想做什么，库会帮你做好，你不在乎库是怎么做的，库不知道你做这件事的意图。
- 框架：就像整个程序的骨架，拥有默认的有意义的行为，或者说知道在特定的情况下应该做什么样的事情。你可以通过特定的方式（比如类的继承）替代这些默认行为，从而以这个框架为基础进行扩展。在适当的时候，框架则会调用你的代码。这样整个程序就实现了你想实现的功能。
- 最重要的区别：控制反转（inversion of control）。整个程序的控制流程不是你，而是框架。
![](images/libAndFramework.png)
```
You call Library.
    Framework calls you.
```





## 参考
- [哪些JS框架和库最有发展前途？—— 知乎](https://www.zhihu.com/question/28696660)
- [What is the difference between a framework and a library? —— stockoverflow](https://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library/233765#233765)