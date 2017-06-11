## 页面优化

## 为什么要优化？
- 提示网页响应速度
- 对搜索引擎、屏幕阅读器友好
- 提高可读性，可维护

## 优化
- 减少请求
  - 图片合并
  - css文件合并
  - 避免使用import的方式引入css文件
    - 请求是同步的
- 减少图片大小
  - 选择合适的图片格式
    - PNG
    - JPG
  - 压缩图片
    - ImageOptim
    - ImageAlpha
    - JPEGmini
    - ...
- css值缩写
```css
p {
  margin-top:5px;
  margin-right:10px;
  margin-bottom:5px;
  margin-left:10px;
}
p {
  margin:5px 10px;
}

```
- css省略0的单位
- 颜色值最短表示
  - red
  - #333
- css选择器合并
- 文件压缩
  - YUI Compressor
  - cssmin

- 加载顺序
  - css 放在 head 中。
  - js 放在 body 底部。
- 减少标签的数量
- 选择器长度
- 耗性能属性
  - expression
    ```css
    .class{
      width: expression(this.width>100?'100px':'auto');}
    }
    ```
  - filter
    ```css
    .class{filter:alpha(opacity=50);;}
    ```
  - border-radius
  - box-shadow
  - gradients
- 图片设置宽高
  - 没有设置宽高的话，会在回流和从绘阶段耗费性能。
- 所有表现用CSS实现。
- 可读性、可维护性
  - 规范
  - 语义化
  - 尽量避免Hack
  - 模块化
  - 注释

