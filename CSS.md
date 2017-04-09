## display
- display: block;  
display:block 就是将元素显示为块级元素，一般是其他元素的容器，可容纳内联元素和其他块状元素，**块状元素排斥其他元素与其位于同一行，宽度(width)高度(height)起作用。**常见块状元素为div和p。

- display: inline;  
display:inline 就是将元素显示为`内联元素(行内元素)`，**内联元素只能容纳文本或者其他内联元素，它允许其他内联元素与其位于同一行，但宽度(width)高度(height)不起作用。**常见内联元素为“a”

- display: inline-block  
display:inline-block 将对象呈递为内联对象，但是对象的内容作为块对象呈递。旁边的内联对象会被呈递在同一行内，允许空格。(准确地说，应用此特性的**元素呈现为内联对象，周围元素保持在同一行，但可以设置宽度和高度地块元素**的属性)

## 块级元素与行内元素的区别
1. 块级元素会独占一行，其宽度自动填满其父元素宽度；
行内元素不会独占一行，相邻的行内元素会排列在同一行，直至一行排不下才会换行，其宽度随元素的内容而变化。
2. 块级元素可以包含行内元素和块级元素；行内元素不能包含块级元素。
3. 行内元素设置width、height、margin-top、margin-bottom、padding-top、padding-bottom无效。

## clear
```
clear: none | left | right | both;
```
clear 定义了元素的哪边上不予许出现浮动元素。
对于CSS的清除浮动(clear)，一定要牢记：这个规则**只能影响使用清除元素本身，不能影响其他元素。**


## margin
当margin-top、padding-top的值是百分比时，分别是如何计算的？  
相对父级元素的width，相对自身的width

>可以对元素的margin设置百分数，百分数是相对于父元素的width计算，不管是margin-top/margin-bottom还是margin-left/margin-right。（padding同理）

>如果没有为元素声明width，在这种情况下，元素框的总宽度包括外边距取决于父元素的width，这样可能得到“流式”页面，即元素的外边距会扩大或缩小以适应父元素的实际大小。如果对这个文档设置样式，使其元素使用百分数外边距，当用户修改浏览窗口的宽度时，外边距会随之扩大或缩小。

>为什么margin-top/margin-bottom的百分数也是相对于width而不是height呢？

>CSS权威指南中的解释：

>我们认为，正常流中的大多数元素都会足够高以包含其后代元素（包括外边距），如果一个元素的上下外边距时父元素的height的百分数，就可能导致一个无限循环，父元素的height会增加，以适应后代元素上下外边距的增加，而相应的，上下外边距因为父元素height的增加也会增加。












end
