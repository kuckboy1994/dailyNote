## 安装
```
npm install --save react react-dom babelify babel-preset-react
```
## webpack 热加载配置
### webpack 安装
```
npm install -g webpack
webpack -v
```

### 安装 webpack 服务器
```
npm install -g webpack-dev-server
webpack-dev-server -v
```


## 自动编译
-- watch

## 自动刷新
webpack-dev-server
启动服务器

能实现自动化刷新的地址是：http://localhost:8080/webpack-dev-server/

要是想要在http://localhost:8080/ 下访问且实现上面的功能
使用如下代码：
```
webpack-dev-server --content-base ./ --inline --hot
```
--content-base ./ 路径  
--inline  
--hot  这个配置 在我使用的时候会报错，在 https://github.com/webpack/loader-utils/issues/56 这issues中，这个问题好像不能被解决，要么就是等下个版本出来的时候说不定能解决。要是还是使用上面的 `webpack-dev-server` 这个命令来实现热刷新的效果。  

## 热刷新最终的办法(不需要查看元素内容的只是看效果的话)
开两个进程  
1. webpack --watch
2. webpack-dev-server
3. http://localhost:8080/webpack-dev-server/

这个模式下，在页面里面内建了一个iframe 实际上是刷新了iframe中的内容。

其他的话就是直接访问 http://localhost:8080/ 
