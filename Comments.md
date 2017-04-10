# 注释规范
此为开发团队遵循和约定的`注释规范`，意在降低后期维护的代价。

## 说明
**还未定稿，对规范中提及的点有不赞同的欢迎[提出 issues](https://github.com/kuckboy1994/dailyNote/issues/new)（请添加 `comments` 标签）讨论。**

## 为什么要写代码注释？
- 编码规范中有一条就是——见名知意。但有的时候直白的函数名不能表达完整的意思，这时候就是注释就可以很好的帮助我们解释和说明了。
- 请确保你的代码能够自描述、注释良好并且易于他人理解。
- 好的代码注释能够传达上下文关系和代码目的。

## 注释中写什么？
- 难于理解的代码段
- 可能存在错误的代码段
- 浏览器特殊的HACK代码
- 想吐槽的产品逻辑
- 业务逻辑强相关的代码

对这些内容写一些注释对于自己或帮助他人理解是非常有帮助的。

## 什么时候写注释？
- 在写代码前添加注释
  - 这时候你脑子里是清晰完整的思路。
- 在写完代码之后添加注释
  - 你是在整理或者总结。
  - 它可能要花费你更多的时间。
    就好比做需求分析一样，你确认好了需求，直接写完。如果写完或者边写边确认需求，你将花费更多的时间。

## 注释尽量使用英文来描述 （不是必须的）
使用中文注释的弊端：  
在文件编码改变的时候中文会变成乱码的问题。  

> 用英文注释还是用中文注释, it is a problem, 但不管怎样, 注释是为了**让别人看懂**, 难道是为了炫耀编程语言之外的你的母语或外语水平吗；

## 注释的详解
注释一般的写法，遵从这个规范方便大家理解，解决强迫症的问题。。。

### 圣战—— tab vs space
![](http://i.imgur.com/ow6DnXf.png)  
千万不要tab和space混用，还有什么比生命更加重要呢？    
[优酷视频链接](http://v.youku.com/v_show/id_XMTYzMDQ3ODgxMg==.html)  
`o(*￣︶￣*)o` 个人比较喜欢tab，这里的tab指四个空格。

### 单行注释
- 双斜线后，必须跟注释内容保留一个空格
- 可独占一行, 前边不许有空行, 缩进与下一行代码保持一致
- 可位于一个代码行的末尾，注意这里的格式
``` javascript
// Good
if (condition) {
    // if you made it here, then all security checks passed
    allowed();
}
var zhangsan = "zhangsan";    // 双斜线距离分号一个tab（或多个tab，用于对齐），双斜线后始终保留一个空格
```

### 多行注释
- 最少三行, 格式如下
- 前边留空一行
``` javascript
/**
 * 注释的内容
 */
```

**定义类型：** 都是以`{`开始, 以`}`结束。

**使用说明：** 提供参数的说明. 使用完整的句子, 并用第三人称来书写方法说明.

**栗子：**
``` javascript
/**
 * [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */

// 以下的代码是 jquery-3.1.1.js 中的一段代码
/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
  var cur = b && a,
  diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

  // Use IE sourceIndex if available on both nodes
  if ( diff ) {
    return diff;
  }

  // Check if b follows a
  if ( cur ) {
    while ( (cur = cur.nextSibling) ) {
      if ( cur === b ) {
        return -1;
      }
    }
  }
  return a ? 1 : -1;
}

//
/**
 * 函数功能简述
 * 具体描述一些细节
 * @param    {string}  address     地址
 * @param    {array}   com         商品数组
 * @param    {string}  pay_status  支付方式
 * @returns  void
 *
 * @date     2017-04-10
 * @author   name<name@myheixn.com>
 */
```

### 单行注释和多行注释的使用规范
- 方法前面使用多行注释。
- 方法内部使用单行注释，如果内容比较多，使用多个单行注释。

### 文档注释
``` javascript
/**
 * @author: who are you
 * @date: when you write it
 * @description: the function of this file.
 */
```

#### 标签
- 各类标签 `@param`、`@method` 等 参考 [@use JSDoc](http://usejsdoc.org/)
- 用在哪里
  - 所有的方法
  - 所有的构造函数
  - 所有的全局变量
- 常用tag
  @author、@callback、@copyright、@default、@description、@throws 、@todo、@param、@returns

- 后端常用的
  @namespace、@class、@extends、@public、@protected、@private

#### @author 标识开发者信息（非常重要）
**注释一般出自author之手，对代码和项目最了解的人。**

开发者信息能够体现开发人员对文件的贡献，并且能够让遇到问题或希望了解相关信息的人找到维护人。通常情况文件在被创建时标识的是创建者。随着项目的进展，越来越多的人加入，参与这个文件的开发，新的作者应该被加入 `@author` 标识。

`@author` 标识具有多人时，原则是按照 `责任` 进行排序。通常的说就是如果有问题，就是找第一个人应该比找第二个人有效。比如文件的创建者由于各种原因，模块移交给了其他人或其他团队，后来因为新增需求，其他人在新增代码时，添加 `@author` 标识应该把自己的名字添加在创建人的前面。

`@author` 中的名字不允许被删除。任何劳动成果都应该被尊重。

业务项目中，一个文件可能被多人频繁修改，并且每个人的维护时间都可能不会很长，不建议为文件增加 `@author` 标识。通过版本控制系统追踪变更，按业务逻辑单元确定模块的维护责任人，通过文档与wiki跟踪和查询，是更好的责任管理方式。

对于业务逻辑无关的技术型基础项目，特别是开源的公共项目，应使用 `@author` 标识。

示例：
``` javascript
/**
 * @author author-name(mail-name@myhexin.com)
 *         author-name2(mail-name2@myhexin.com)
 * @date: when you write it
 * @description: the function of this file.
 */
```

#### TODO 注释
> 对那些临时的, 短期的解决方案, 或已经够好但仍不完美的代码使用 `TODO` 注释.

`TODO` 注释要使用全大写的字符串 `TODO`, 在随后的圆括号里写上你的大名, 邮件地址, 或其它身份标识. 冒号是可选的. 主要目的是让添加注释的人 (也是可以请求提供更多细节的人) 可根据规范的 `TODO` 格式进行查找. 添加 `TODO` 注释并不意味着你要自己来修正.

``` javascript
// TODO(shanchao@myheixn.com): Use a "*" here for concatenation operator.
// TODO(keke@myhexin.com) change this to use relations.
```

### 多人合作注释
同一个文件的代码可能被多个人修改，这个时候需要标识出谁改动了哪些部分。

**格式：** `// add begin by` 作者名 ,一个分号`;`，再加上原因 `Reason`

代码添加的最后加上： `//add end`

`Example`
``` javascript
// add begin by liuxing ; Init post's id
var postId = 1;
// end add
```
或者
``` javascript
// add begin by liuxing
/**
 * 多行注释来说明原因
 */
var postId = 1;
// end add
```

## 参考
- [编程注释规范](http://www.jianshu.com/p/822aa0077595)
- [JavaScript编码规范](https://github.com/fex-team/styleguide/blob/master/javascript.md)
- [ Google 开源项目风格指南 - 注释](http://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/comments/#)
- [强迫症->js注释规范](https://segmentfault.com/a/1190000000502593)
- [为什么缩进用 tab 比用 space 好？](http://www.jianshu.com/p/dc0986b3e68a)
- [代码注释规范](http://www.cnblogs.com/yiyumeng/archive/2012/01/18/2325298.html)
- [为何 Emacs 和 Vim 被称为两大神器](https://linuxtoy.org/archives/why-emacs-vim-good.html)
- [用 Tab 还是 Space？谷歌程序员分析了10亿份代码](http://blog.jobbole.com/105381/)
