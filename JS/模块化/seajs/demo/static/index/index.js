define(function(require, exports, module) {

    console.log(1);
  // 通过 require 引入依赖
  var $ = require('jquery');

  var a = [1,2,3];
  $.each(a, function (key, value) {
      console.log(value);
  })
//   var Spinning = require('./spinning');

  // 通过 exports 对外提供接口
//   exports.doSomething = ...

  // 或者通过 module.exports 提供整个接口
//   module.exports = ...

});