## for (var 数组元素变量 in 数组)
```js
var arr = [1,2,3,4,5,6,7];
for (var i in arr) {
    console.log(i);
}
var data = {
    "1":122,
    "2":22,
    "3":223,
    "4":4
};
// 循环对象的时候，取出的是 key 值
for (var a in data) {
    console.log(data[a]);
}

```