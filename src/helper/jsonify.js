var utils = require('../utils');
var Helper = require('./index');

function Jsonify(){
  this.init.apply(this, arguments);
}

var TRIM = /[\t\n\r]+/g;
var BLOCK_TYPES = ['if', 'foreach', 'macro', 'noescape'];

Jsonify.prototype = {

  constructor: Jsonify,

  init: function(asts){

    this.context = {
      objects : {},
      methods : {},
      strings : {}
    };

    this.asts       = asts;
    this.local      = {};
    this.macros     = {};
    this.conditions = [];

    this._render(this.asts);
  },

  toVTL: function(){
  },

  _render: function(asts){

    var block = [];
    var index = 0;

    utils.forEach(asts, function(ast){
      var type = ast.type;

      //foreach if macro时，index加一
      if (BLOCK_TYPES.indexOf(type) > -1) index ++;

      if (type === 'comment') return;

      if (index) {
        type === 'end' && index--;
        if (index) {
          block.push(ast);
          return;
        }
      }

      switch(type) {
        case 'references':
        this.getReferences(ast);
        break;

        case 'set':
        //this.setValue(ast);
        break;

        case 'macro_call':
        this.getMacro(ast);
        break;

        case 'end':
        //使用slice获取block的拷贝
        this.getBlock(block.slice());
        block = [];
        break;

        default:
        if (utils.isArray(ast)) this.getBlock(ast);
        break;
        // code
      }
    }, this);

  },

  getLocal: function(ref){

    var ret = { context: this.context.strings, isGlobal: true };

    utils.some(this.conditions, function(content){

      var local = this.local[content];
      var index = local.variable.indexOf(ref.id);

      if (index > -1) {
        ret = local;
        ret['isGlobal'] = false;
        ret['real'] = ret.maps? ret.maps[index]: ref;
        return true;
      }

    }, this);

    return ret;
  },

  getBlock: function(block) {
    var ast = block[0];
    var ret = '';
    var _block = [ast];
    var _inBlock = [];
    var index = 0;

    /**
     * 处理block嵌套，重新构造_block，把block中有嵌套的放入数组_inBlock,
     * _inBlock 最后成为_block的一个元素，_inBlock数组作为一个block数组，求值
     * 过程中，可以通过递归求值，进入下一层嵌套
     */
    utils.forEach(block, function(ast, i){
      if (i) {
        if (BLOCK_TYPES.indexOf(ast.type) !== -1) {
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
    //console.log(condition);
    this.getExpression(condition);
    utils.forEach(block, function(ast, i){
      if (ast.type === 'elseif') {
        this.getExpression(ast.condition);
      } else if (ast.type !== 'else' && i) {
        asts.push(ast);
      }
    }, this);

    this._render(asts);
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
      variable: [ast.to, 'velocityCount'],
      ast : ast,
      context: {}
    };

    this.local[contextId] = local;
    this.conditions.push(contextId);

    var asts = block.slice(1);

    this._render(asts);

    var len = ast.from.path && ast.from.path.length;
    var last = len && ast.from.path[len - 1];

    if (last && last.type === 'method' ) {

      if (last.id === 'keySet') {
        return;
      } else {
        var text = this._getObject(ast, null, '$' + ast.to);
        this.getReferences(ast.from, text, this.context.methods);
        return;
      }

    }

    this.getReferences(ast.from, this._setEachVTL(ast, local), this.context.objects);

    this.conditions.pop();
  },

  _setEachVTL: function(ast, local){

    var from = this.getLocal(ast.from)['real'];
    
    if (from === undefined) from = ast.from;

    var endPart = " #end ]";
    var value = '[#foreach($' + ast.to + ' in ' + Helper.getRefText(from) + ")";
    //ast.to取值
    var vm = local.context[ast.to];
    if (typeof vm === 'string') {
      value += vm + ' #if( $foreach.hasNext ), #end';
    } else {
      value += JSON.stringify(vm) + '#if( $foreach.hasNext ), #end';
    }
    value += endPart;
    return value;
  },

  isMethodCall: function(ast){

    if (ast.args !== undefined) {
      return true;
    } else if (ast.path) {

      var i = 0;
      var num = 0;
      var len = ast.path.length - 1;

      utils.forEach(ast.path, function(_ast, _i){
        if (_ast.type === 'method' && _ast.id.indexOf('get') !== 0) {
          i ++;
          num = _i;
        }
      });

      //如果只有一个方法调用，并且是最后一个，形如: $foo.bar($name)形式
      if (i === 1 && num === len) {
        return true;
      } else if (i) {
        return false;
      }
    }

  },

  getReferences: function(ast, spyData, context){

    var local = this.getLocal(ast);
    var isMethod;

    if (context === undefined) {
      context = local.context;
      var isMethod = this.isMethodCall(ast);
      if (isMethod === true) {
        isMethod = true;
        context = this.context.methods;
      } else if (isMethod === false) {
        // 如果形如$foo.bar().bar() $foo.bar().title 不做处理
        return;
      }
    } 

    var _ast = local.isGlobal? ast: local['real'];
    spyData = spyData !== undefined ? spyData: Helper.getRefText(_ast);

    if (ast.path) {

      context[ast.id] = context[ast.id] || {};
      var ret = context[ast.id];
      var len = ast.path.length;

      utils.forEach(ast.path, function(property, i){

        var isEnd = len === i + 1;
        var spy = isEnd? spyData: {};

        if (isMethod && property.type === 'method') {

          ret[property.id] = ret[property.id] || [];
          ret = ret[property.id];
          var self = this;
          var foreach = false;

          var args;

          if (utils.isArray(property.args)) {

            args = property.args.map(function(ast){

              if (ast.type === 'references') {
                var local = self.getLocal(ast);
                if (local.isGlobal === false && local.type === 'foreach') {
                  foreach = local.ast;
                }
                return Helper.getRefText(ast);
              } else {
                return ast.id;
              }

            });

          } else {
            args = [property.args];
          }

          if (foreach) {
            ret.push(this._getObject(foreach, args, spy));
          } else {
            ret.push(args.concat(spy));
          }

        } else {
          ret = this._setAttributes(property, ret, spy);
        }

      }, this);
    } else {
      //强制设值
      if (spyData !== 'string'){
        context[ast.id] = spyData;
      } else {
        context[ast.id] = context[ast.id] || spyData;
      }
    }
  },

  _getObject: function(ast, args, ret){

    var from = ast.from;
    var last, value;

    if (from.path && from.path.length) {
      last = from.path[from.path.length - 1];
    }

    if (last.type === 'method') {

      if (last.id === 'keySet') {

        var o = {};
        o[args] = ret;
        value = '[#foreach($' + ast.to + ' in ' + Helper.getRefText(from) + ") ";
        value += JSON.stringify(o) + '#if($foreach.hasNext), #end #end]';
        return value;

      } else {

        var itemText = args === null ? ret : [].concat(args, ret);
        value = '[#foreach($' + ast.to + ' in ' + Helper.getRefText(from) + ") ";
        value +=  JSON.stringify(itemText) + ' #if($foreach.hasNext), #end #end]';
        return value;

      }
    }
  },

  _setAttributes: function(property, baseRef, spy){
    /**
     * type对应着velocity.yy中的attribute，三种类型: method, index, property
     */
    var type = property.type;
    var ret;
    var id = property.id;
    if (type === 'method'){
      ret = this._setPropMethod(property, baseRef, spy);
    } else if (type === 'property') {
      baseRef[id] = spy;
      ret = baseRef[id];
    } else {
      ret = this._setPropIndex(property, baseRef, spy);
    }
    return ret;
  },

  /**
   * $foo.bar[1] index求值
   */
  _setPropIndex: function(property, baseRef, spy){
    var ast = property.id;
    var key;
    if (ast.type === 'references'){
      key = this.getReferences(ast);
    } else {
      key = ast.value;
    }

    baseRef[key] = spy;
    return baseRef[key];
  },

  _setPropMethod: function(property, baseRef, spy){

    var id         = property.id;
    var ret        = '';
    var _id        = id.slice(3);
    //特殊方法
    var specialFns = ['keySet'];

    if (id.indexOf('get') === 0){
      if (!_id) {
        //map 对应的get方法
        _id = this.getLiteral(property.args[0]);
      }
      baseRef[_id] = spy;
      ret = baseRef[_id];
    } else if (id.indexOf('set') === 0) {
      baseRef[_id] = this.getLiteral(property.args[0]);
      ret = baseRef;
    } else {
      ret = baseRef[id];
      baseRef[id] = spy;
      ret = baseRef[id];
    }

    return ret;
  },

  getMacro: function(ast){

    var macro = this.macros[ast.id];
    if (macro === undefined) return;

    var guid = utils.guid();
    var contextId = 'macro:' + guid;
    var local = {
      type: 'macro',
      variable: this._getArgus(macro.args),
      maps: ast.args,
      context: {}
    };

    this.local[contextId] = local;
    this.conditions.push(contextId);
    this._render(macro.asts);

    utils.forEach(macro.args, function(formal, i){
      var val = local.context[formal.id];
      this.getReferences(ast.args[i], val);
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

require('../compile/expression')(Jsonify, utils);
require('../compile/literal')(Jsonify, utils);
require('../compile/set')(Jsonify, utils);
module.exports = Jsonify;
