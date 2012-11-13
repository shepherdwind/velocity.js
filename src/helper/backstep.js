var utils = require('../utils');
var Helper = require('./index');

function BackStep(){
  this.init.apply(this, arguments);
}

var TRIM = /[\t\n\r]+/g;

BackStep.prototype = {
  constructor: BackStep,

  init: function(asts, html){
    this.context = {};
    this.asts = asts;
    this.position = -1;
    this.html = html.replace(TRIM, '');
    this.references = [];
    this.local = {};
    this.conditions = [];

    utils.forEach(this.asts, this._trim, this);
    this._mergeTree(this.asts);
    debugger;
    this._render(this.asts);
  },

  /**
   * 合并字符串
   */
  _mergeTree: function(asts){
    var len = asts.length;
    var begin = false;
    var end = false;

    for (var i = 0; i < len; i++) {
      var ast = asts[i];
      if (typeof ast === 'string') {
        if (begin === false) {
          begin = i;
        } else {
          end = i;
        }
      } else {
        if (begin !== false && end !== false){
          for (var j = begin + 1; j <= end; j++) {
            asts[begin] += asts[j];
            asts[j] = '';
          }
        }
        begin = false;
        end = false;
      }
      asts[i];
    }

  },

  _trim: function(ast, i){
    var asts = this.asts;
    var _ast = asts[i];
    if (typeof _ast === 'string' && _ast.slice(0, 1) === "\n") {
      asts[i] = _ast.slice(1);
    }
  },

  _render: function(asts){

    var block = [];
    var index = 0;

    utils.forEach(asts, function(ast){

      switch(ast.type) {
        case 'references':
        if (index) {
          block.push(ast);
        } else {
          this.getReferences(ast);
        }
        break;

        case 'set':
        if (index) {
          block.push(ast);
        } else {
          this.setValue(ast);
        }
        break;

        case 'comment':
        break;

        case 'break':

        if (!index){
          this.setBreak = true;
        } else {
          block.push(ast);
        }

        break;

        case 'macro':
        case 'if':
        case 'foreach':
        block.push(ast);
        index++;
        break;

        case 'macro_call':
        if (index) {
          block.push(ast);
        } else {
          this.getMacro(ast);
        }

        break;

        case 'end':
        index--;
        if (!index){
          //使用slide获取block的拷贝
          this.getBlock(block.slice());
          block = [];
        } else {
          block.push(ast);
        }

        break;

        default:
        if (index) {
          block.push(ast);
        } else {
          if (utils.isArray(ast)) {
            this.getBlock(ast);
          } else {
            this.compare(ast);
          }
        }
        break;
        // code
      }
    }, this);

  },

  compare: function(ast){
    if (!ast) return;
    var html     = this.html;
    var position = this.position + 1;
    var references = this.references;
    ast = ast.replace(TRIM, '').replace(/^\s+|\s+$/g, '');
    var index = html.indexOf(ast, position);

    //console.log([position, index]);
    var text = html.slice(position, index);
    if (references.length === 1) {
      this.storeValue(references[0], text);
      this.references = [];
    }

    this.position = index + ast.length - 1;
  },

  getContext: function(ref){
    var text1 = Helper.getRefText(ref);
    var len = this.conditions.length;
    if (len) {
      var context = this.conditions[len - 1];
      var local   = this.local[context];
    } else {
      return this.context;
    }
  },

  getLocal: function(){
    var len = this.conditions.length;
    if (len) {
      var context = this.conditions[len - 1];
      var local   = this.local[context];
      return local;
    } else {
      return {};
    }
  },

  storeValue: function(ref, val){
    //var context = this.getContext(ref);
    var context = this.context;
    var local = this.getLocal();

    if (!ref.path) {

      context[ref.id] = val;
      if (local.type && local.type === 'foreach' && local.variable.indexOf(ref.id) > -1) {
        local.value = val;
      }

    } else {

      var baseRef = context[ref.id];
      if (typeof baseRef != 'object') {
        baseRef = {};
      }

      context[ref.id] = baseRef;
      var len = ref.path ? ref.path.length: 0;

      //console.log(val);
      utils.forEach(ref.path, function(exp, i){

        var isEnd = len === i + 1;
        var key = exp.id;
        if (exp.type === 'index')  key = key.value;
        baseRef[key] = isEnd? val: {};
        baseRef = baseRef[key];

      });

    }
  },

  getBlock: function(block) {
    var ast = block[0];
    var ret = '';
    var _block = [ast];
    var _inBlock = [];
    var index = 0;
    var blockTypes = ['if', 'foreach', 'macro'];

    /**
     * 处理block嵌套，重新构造_block，把block中有嵌套的放入数组_inBlock,
     * _inBlock 最后成为_block的一个元素，_inBlock数组作为一个block数组，求值
     * 过程中，可以通过递归求值，进入下一层嵌套
     */
    utils.forEach(block, function(ast, i){
      if (i) {
        if (blockTypes.indexOf(ast.type) !== -1) {
          index ++;
          _inBlock.push(ast);
        } else if (ast.type === 'end') {
          index --;
          if (index) {
            _inBlock.push(ast);
          } else {
            _block.push(_inBlock.slice());
            _inBlock = [];
          }
        } else {
          index ? _inBlock.push(ast) : _block.push(ast);
        }
      }
    });

    if (ast.type === 'if') {
      ret = this.getBlockIf(_block);
    } else if (ast.type === 'foreach') {
      ret = this.getBlockEach(_block);
    } else if (ast.type === 'macro') {
      this.setBlockMacro(_block);
    }

    return ret;
  },

  getBlockEach: function(block){
    var ast = block[0];
    var guid = utils.guid();
    var contextId = 'foreach:' + guid;
    var local = {
      ast: ast.from,
      type: 'foreach',
      variable: [ast.to],
      value: undefined
    };

    this.local[contextId] = local;
    this.conditions.push(contextId);

    var asts = block.slice(1);
    var times = this.countLoopTimes(asts);

    var value = [];
    for (var i=0; i < times; i++) {
      this._render(asts);
      value.push(local.value);
    }

    this.storeValue(ast.from, value);
    this.conditions.pop();
  },

  /**
   * 计算foreach循环次数
   */
  countLoopTimes: function(asts){
    var html     = this.html;
    var position = this.position + 1;
    var len = html.length;
    var ret = 0;

    var isNotPass = false;
    do {
      utils.forEach(asts, function(ast){
        if (typeof ast === 'string') {
          ast = ast.replace(TRIM, '').replace(/^\s+|\s+$/g, '');
          var index = html.indexOf(ast, position);
          if (index > -1) {
            position = index + ast.length - 1;
          } else {
            isNotPass = true;
          }
        }

        if (position > len) isNotPass = true;
      });

      if (!isNotPass) ret = ret + 1;
    } while(!isNotPass);

    return ret;
  },

  getReferences: function(ast){
    this.references.push(ast);
  }

};

require('../compile/expression')(BackStep, utils);
require('../compile/literal')(BackStep, utils);
require('../compile/set')(BackStep, utils);
module.exports = BackStep;
