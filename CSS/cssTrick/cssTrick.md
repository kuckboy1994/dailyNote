# cssTrick

## img&margin
`<img>` 标签是inline元素，所以不能设置`margin: 0 auto;`。  
但是可以设置 margin-top/bottom 和 inline 元素的特性不符。  
原因是 img 属于inline, 是replaced element,相当于inline-block的效果  
p、span 标签属于inline, 是non-replaced element。
