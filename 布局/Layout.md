## 水平居中
1. inline-block + text-align `兼容ie6+`
  - [demo](https://kuckboy1994.github.io/dailyNote/Layout/horizontally_1.html)
2. margin: 0 auto; `兼容ie6+`
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/horizontally_2.html)
	- [demo](http://sp.10jqka.com.cn/liuyan/index/keyboarddemonstration/)
  - 适合用来做活动页
3. 绝对定位 + margin `兼容ie6+`
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/horizontally_3.html)
	- 适合用来做弹窗等需要绝对定位的
4. background: url() no-repeat center; `兼容ie6+`
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/horizontally_4.html)
	- 适合用来做活动页
5. 决定定位 + transform
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/horizontally_5.html)
	- 使用CSS3 低版本浏览器不支持
6. flex + justify-content
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/horizontally_5.html)
	- 使用CSS3 低版本浏览器不支持

## 垂直居中
1. table-cell + vertical-align
  - [demo](https://kuckboy1994.github.io/dailyNote/Layout/verticalli_1.html)
2. absolute + transform
  - [demo](https://kuckboy1994.github.io/dailyNote/Layout/verticalli_2.html)
3. flex + align-items
  - [demo](https://kuckboy1994.github.io/dailyNote/Layout/verticalli_3.html)

## 上下左右都居中
1. [demo](https://kuckboy1994.github.io/dailyNote/Layout/middle_1.html)
2. [demo](https://kuckboy1994.github.io/dailyNote/Layout/middle_2.html)
3. [demo](https://kuckboy1994.github.io/dailyNote/Layout/middle_3.html)
4. [demo](https://kuckboy1994.github.io/dailyNote/Layout/middle_4.html)


## 两列布局
1. float + margin
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/twocolumns_1.html)
	- ie6 下有bug
	- clearfix 清除浮动存在bug
2. float + margin + (fix)
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/twocolumns_2.html)
3. float + overflow
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/twocolumns_3.html)
4. table
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/twocolumns_4.html)
5. flex
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/twocolumns_5.html)

## 三列布局
1. float + hidden
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/threecolumns_1.html)

## 不定宽 + 自适应
1. float + overflow
2. table 
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/customize_1.html)
3. flex

## 等分布局
1. flat + %
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/equal_1.html)
2. table + table-cell + (fix)
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/equal_2.html)
3. flex
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/equal_3.html)

## 全屏布局
1. position
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/fullpage_1.html)
2. flex
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/fullpage_2.html)
3. flex 全部自适应
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/fullpage_3.html)


## 响应式
- viewport
`<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">`
> 手机的视窗的宽度都会比实际的设备宽度大，比如：iphone4 是 980像素。通过某种比例使页面缩小。
设置页面的宽度为设备的宽度。viewport的宽度设置为设备宽度，320像素。
初始缩放为1.0。
防止用户自己手动缩放。
- @media
```css
@media screen and (max-width: 320px) {
	/*视窗宽度 <= 320px*/
}

@media screen and (min-width: 769) {
	/*视窗宽度 >= 769px*/
}

@media screen and (min-width: 320px) and (max-width: 769) {
	/*视窗宽度 >= 320px 并且 视窗宽度 <= 769px*/
}
```
- 响应式demo
	- [demo](https://kuckboy1994.github.io/dailyNote/Layout/responsive_1.html)
- 我们把一个图标做成CSS中的背景图，在视网膜屏上预览时会发现图标是模糊的，所以我们会同时准备一个2倍大小的图标给高清屏，如何实现？
```css
.pic {
    background-image: url(pic1.jpg);
}
/* 高清屏幕 */   
@media screen and(-webkit-min-device-pixel-ratio:2.0) {
    .pic {
        background-image: url(pic2.jpg);
    }
/*这里pixel-ratio应该是2.0*/
```