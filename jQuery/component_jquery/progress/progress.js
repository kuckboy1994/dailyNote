


!function(emitter){
  // 帮助函数
  // ----------



  var COLOR_END = '#5cb85c';
  var COLOR_START = '#5bc0de';

  // 将HTML转换为节点
  function html2node(str){
    var container = document.createElement('div');
    container.innerHTML = str;
    return container.children[0];
  }

  // 赋值属性
  // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
  function extend(o1, o2){
    for(var i in o2) if(typeof o1[i] === 'undefined'){
      o1[i] = o2[i]
    } 
    return o1
  }

  // 颜色相关的处理
  function mix(c1, c2, weight){
    var p = weight,
        a = 0,
        w = p * 2 -1,
        w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0,
        w2 = 1 - w1,
        channels = [
            parseInt(c1[0] * w1 + c2[0] * w2, 10),
            parseInt(c1[1] * w1 + c2[1] * w2, 10),
            parseInt(c1[2] * w1 + c2[2] * w2, 10)
        ];
    return channels;
  }

  // hash -> [r, g, b, a]
  function rgb( hash ){

    hash = hash.charAt(0) === '#'? hash.slice(1) : hash;

    var channels;

    if (hash.length === 6) {
      channels = [
        parseInt(hash.substr(0, 2), 16), 
        parseInt(hash.substr(2, 2), 16), 
        parseInt(hash.substr(4, 2), 16) 
      ];
    }else {
      var r = hash.substr(0, 1);
      var g = hash.substr(1, 1);
      var b = hash.substr(2, 1);
      channels = [
          parseInt(r + r, 16), 
          parseInt(g + g, 16), 
          parseInt(b + b, 16)
      ];
    }

    return channels;
  }

  
  // Progress
  // -------

  var template = 
  '<div class="progress animated" >\
    <div class="progress-bar progress-bar-striped" role="progressbar" ></div>\
  </div>';





  function Progress(options){

    options = options || {};

    this.container = options.container;
    this.element = this._layout.cloneNode(true);
    // body 用于插入自定义内容
    this.bar = this.element.querySelector('.progress-bar');

    if(options.className){
      this.element.className += " " + options.className;
    }

  }



  extend(Progress.prototype, {

    defaultColors: {
      startColor: COLOR_START,
      endColor: COLOR_END
    },

    _layout: html2node(template),



    start: function(options){

      options = options || {};

      this.container.appendChild(this.element);
      // 触发背景动画
      this.bar.className = this.bar.className + ' active';

      this.startColor = options.startColor || this.defaultColors.startColor;
      this.endColor = options.endColor || this.defaultColors.endColor;
      this.ratio = options.ratio

      var ratio  = options.ratio || 0;

      // 暴露事件 start
      this.emit('start');
      this._startTimer();
      return this;


    },

    // 显示弹窗
    end: function(options){


      options = options || {};
      
      if(options.endColor){
        this.endColor = options.endColor;
      }
      this.ratio = 1;
      
      this._applyStyle();

      // 暴露事件 end
      this.emit('end');
      clearTimeout(this.timer);


      this.bar.className = this.bar.className.replace('active', '');
      return this;

    },

    // 虽然主功能是随机伪造的进度条， 
    // 但是我们仍然需要暴露精确的moveTo接口以应对
    // 需求可能的变化
    moveTo: function( ratio ){

      if(ratio === 1) return this.end();

      this.ratio = ratio;
      this._applyStyle();
      return this;
    },

    _applyStyle: function(){
      var barNode = this.bar;
      barNode.style.backgroundColor = this._currentColor();
      barNode.style.width = this.ratio * 100 + '%';
    },
    _currentColor: function(  ){
      var channels = mix( rgb( this.startColor ), rgb(this.endColor),  1 - this.ratio );
      return "rgb(" + channels[0] + "," + channels[1] + "," +channels[2] + ")";
    },

    // 模拟随机
    _startTimer: function(){
      var ratio = this.ratio || 0;
      this.moveTo(ratio + (1 - ratio) * (Math.random() * 0.2))

      this.timer = setTimeout(
        this._startTimer.bind(this) , Math.random() * 500 + 1000
      );

    }

  })

  // 使用混入Mixin的方式使得Slider具有事件发射器功能
  extend(Progress.prototype, emitter);



  //          5.Exports
  // ----------------------------------------------------------------------
  // 暴露API:  Amd || Commonjs  || Global 
  // 支持commonjs
  if (typeof exports === 'object') {
    module.exports = Progress;
    // 支持amd
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return Progress
    });
  } else {
    // 直接暴露到全局
    window.Progress = Progress;
  }


}(emitter)

