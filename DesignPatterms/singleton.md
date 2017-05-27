## 单例设计模式
单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

- 使用对象字面量的方法，其字面量里可以包含大量的属性和方法
```js
var mySingleton = {
    property1: "something",
    property2: "something else",
    method1: function () {
        console.log('hello world');
    }
};
```
项目中使用可以使用如下的结构：
```js
/**
 * 基础模块
 */
var baseModel = {};
/**
 * 数据模型
 * 根据数据模型去渲染显示的逻辑
 */
var dataModel = {};
/**
 * 题目的相关操作
 */
var topicModel = {};
/**
 * 模板类，用于渲染题目
 */
var templeteModel = {};
/**
 * 侧边栏模块
 */
var scheduleModel = {};
/**
 * 启动文件
 */
var entry = {
    start: function () {
        var self = this;

        // 调用上面的模块

        self.resize();
        $(window).resize(function() {
            self.resize();
        });
    },
    resize : function () {
    }
};
entry.start();
```
- 如果以后要扩展该对象，你可以添加自己的私有成员和方法，然后使用闭包在其内部封装这些变量和函数声明。只暴露你想暴露的public成员和方法，样例代码如下：
```js
var mySingleton = function () {

    /* 这里声明私有变量和方法 */
    var privateVariable = 'something private';
    function showPrivate() {
        console.log(privateVariable);
    }

    /* 公有变量和方法（可以访问私有变量和方法） */
    return {
        publicMethod: function () {
            showPrivate();
        },
        publicVar: 'the public can see this!'
    };
};

var single = mySingleton();
single.publicMethod();  // 输出 'something private'
console.log(single.publicVar); // 输出 'the public can see this!'
```
- 只有在使用的时候才初始化,为了节约资源,可以创建一个构造函数里来初始化这些代码：
```js
var Singleton = (function () {
    var instantiated;
    function init() {
        /*这里定义单例代码*/
        return {
            publicMethod: function () {
                console.log('hello world');
            },
            publicProperty: 'test'
        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();

/*调用公有的方法来获取实例:*/
Singleton.getInstance().publicMethod();
```

## 单列最佳实践
```js
var SingletonTester = (function () {

    //参数：传递给单例的一个参数集合
    function Singleton(args) {

        //设置args变量为接收的参数或者为空（如果没有提供的话）
        var args = args || {};
        //设置name参数
        this.name = 'SingletonTester';
        //设置pointX的值
        this.pointX = args.pointX || 6; //从接收的参数里获取，或者设置为默认值
        //设置pointY的值
        this.pointY = args.pointY || 10;

    }

    //实例容器
    var instance;

    var _static = {
        name: 'SingletonTester',

        //获取实例的方法
        //返回Singleton的实例
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    };
    return _static;
})();

var singletonTest = SingletonTester.getInstance({ pointX: 5 });
console.log(singletonTest.name);    // SingletonTester 
console.log(singletonTest.pointX);  // 输出 5 
```

- 其他实现方式
```js
function Universe() {

    // 判断是否存在实例
    if (typeof Universe.instance === 'object') {
        return Universe.instance;
    }

    // 其它内容
    this.start_time = 0;
    this.bang = "Big";

    // 缓存
    Universe.instance = this;

    // 隐式返回this
}

// 测试
var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2); // true
```


## 参考
- [深入理解JavaScript系列（25）：设计模式之单例模式](http://www.cnblogs.com/TomXu/archive/2012/02/20/2352817.html)