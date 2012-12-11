"use strict";
/**
 * velocity数据结构构造，根据vm文件，构造数据结构
 */
var utils = require('../utils');
var Helper = require('./index');
function Structure(){
  this.init.apply(this, arguments);
}

Structure.prototype = {

  init: function(asts){
    this.context = {};
    this.conditions = [];
    this.local = {};
    this.leval = 0;
    this.ignores = {};
    utils.forEach(asts, this._render, this);
  },

  _render: function(ast){
    var type = ast.type;
    var leval = this.leval;
    if (type === 'references'){
      this._setRefs(ast);
    } else if (type === 'if' || type === 'elseif') {
      this._setIf(ast.condition);
    } else if (type === 'set') {
      this.setValue(ast);
      leval++;
    } else if (type === 'foreach') {
      this.leval = leval++;
      this._setForEach(ast);
      leval++;
    } else if (type === 'end') {
      this.leval = leval++;
    }

  },

  _setForEach: function(ast){
    if (ast.from.type == 'references') {
      this._setRefs(ast.from, ['string']);
    }
  },

  _setIf: function(condition){
    var type = condition.type;
    if (type === 'references') {
      this._setRefs(condition);
    } else if (type === 'math') {
      utils.forEach(condition.expression, function(ast){
        this._setIf(ast);
      }, this);
    }
  },

  getReferences: Helper.getRefText,

  _setRefs: function(ast, spyData){
    var context = this.context;
    spyData = spyData || 'string';
    debugger;
    if (ast.path) {
      context[ast.id] = context[ast.id] || {};
      var ret = context[ast.id];
      var len = ast.path.length;
      utils.forEach(ast.path, function(property, i){
        var isEnd = len === i + 1;
        var spy = isEnd? spyData: {};
        ret = this._setAttributes(property, ret, spy);
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
    } else if (id === 'keySet') {
      ret = Object.keys(baseRef);
    } else {
      ret = baseRef[id];
      var args = [];

      utils.forEach(property.args, function(exp){
        args.push(this.getLiteral(exp));
      }, this);

      if (ret && ret.call) {
        ret = ret.apply(baseRef, args); 
      } else {
        //spy fn
        baseRef[id] = utils.noop(spy);
        ret = baseRef[id];
      }
    }

    return ret;
  }

};

require('../compile/expression')(Structure, utils);
require('../compile/literal')(Structure, utils);
require('../compile/set')(Structure, utils);
module.exports = Structure;
