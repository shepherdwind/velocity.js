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
    this.macros = {};
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

  getLocal: function(ref){
    var ret = this.context;
    utils.some(this.conditions, function(content){
      var local = this.local[content];
      if (local.variable.indexOf(ref.id) > -1){
        ret = local.context;
        return true;
      }
    }, this);

    return ret;
  },

  storeValue: function(ref, val){
    //var o = this.getLocal(ref);
    //var local = o.local;
    var context = this.getLocal(ref);

    if (!ref.path) {

      context[ref.id] = val;

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

  getBlockIf: function(block){
    var str = '';
    var asts = [];
    var condition = block[0].condition;

    utils.some(block, function(ast, i){

      if (!i) return;

      var ret = false;
      if (ast.condition || ast.type === 'else') {
        if (asts.length) {
          ret  = this._tryIf(asts, condition);
          asts = [];
          condition = ast.condition || 'else';
        }
      } else {
        asts.push(ast);
      }

      return ret;

    }, this);

    if (asts.length) this._tryIf(asts, condition);
  },

  _setCondiction: function(condition, value){
    var type = condition.type;
    var exp= condition.expression;
    if (type == 'math') {
      //处理一个变量和一个字符串，数字比较
      if (exp.length === 2 && exp[0].type === 'references' &&
        exp[1].value !== undefined && value) {
        var val = this.getExpression(exp[1]);
        switch(condition.operator) {
          case '==':
            this.storeValue(exp[0], value);
            break;
          case '>':
            this.storeValue(exp[0], val + 1);
            break;
          case '<':
            this.storeValue(exp[0], val - 1);
            break;
          default:
            return;
        }
      }
    }
  },

  _tryIf: function(asts, condition){

    var isPass = this.countLoopTimes(asts);

    if (isPass) {
      this._render(asts);
      this._setCondiction(condition, true);
    } else {
      this._setCondiction(condition, false);
    }

    return isPass;
  },

  /**
   * define macro
   */
  setBlockMacro: function(block){
    var ast = block[0];
    var _block = block.slice(1);
    var macros = this.macros;

    macros[ast.id] = {
      asts: _block,
      args: ast.args
    };
  },

  getBlockEach: function(block){
    var ast = block[0];
    var guid = utils.guid();
    var contextId = 'foreach:' + guid;
    var local = {
      type: 'foreach',
      variable: [ast.to],
      context: {}
    };

    this.local[contextId] = local;
    this.conditions.push(contextId);

    var asts = block.slice(1);
    var times = this.countLoopTimes(asts);

    var value = [];
    for (var i=0; i < times; i++) {
      this._render(asts);
      value.push(local.context[ast.to]);
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

    var isOver = false;
    var maxTimes = 10000;
    var t = 0;
    do {
      debugger;
      t = t + 1;
      utils.forEach(asts, function(ast){

        if (typeof ast === 'string') {

          ast = ast.replace(TRIM, '').replace(/^\s+|\s+$/g, '');

          if (!ast) return;

          var index = html.indexOf(ast, position);
          if (index > -1) {
            position = index + ast.length - 1;
          } else {
            isOver = true;
          }
        }

        if (position > len) isOver = true;
      });

      if (!isOver) ret = ret + 1;
      if (t > maxTimes) {
        console.log('Error, max time runed!');
        break;
      }
    } while(!isOver);

    return ret;
  },

  getReferences: function(ast){
    this.references.push(ast);
  },

  getMacro: function(ast){
    var macro = this.macros[ast.id];
    var guid = utils.guid();
    var contextId = 'macro:' + guid;
    var local = {
      type: 'macro',
      variable: this._getArgus(macro.args),
      context: {}
    };

    this.local[contextId] = local;
    this.conditions.push(contextId);
    this._render(macro.asts);

    utils.forEach(macro.args, function(actual, i){
      this.storeValue(ast.args[i], local.context[actual.id]);
    }, this);

    this.conditions.pop();
  },

  _getArgus: function(args){
    var ret = [];
    utils.forEach(args, function(arg){
      ret.push(arg.id);
    });
    return ret;
  }

};

require('../compile/expression')(BackStep, utils);
require('../compile/literal')(BackStep, utils);
require('../compile/set')(BackStep, utils);
module.exports = BackStep;
