/**
 * velocity数据结构构造，根据vm文件，构造数据结构
 */
var utils = require('./utils');
function Structure(){
  this.init.apply(this, arguments);
}

Structure.prototype = {

  init: function(asts){
    this.context = {};
    utils.forEach(asts, this._render, this);
  },

  _render: function(ast){
    if (ast.type === 'references'){
      this._setRefs(ast);
    }
  },

  _setRefs: function(ast){
    if (ast.path) {
      if (!ret) ret = context[ast.id] = {};
      var len = ast.path.length;
      utils.forEach(ast.path, function(property, i){
        var isEnd = len === i + 1;
        this._setAttributes(property, ret, isEnd);
      }, this);
    } else {
      context[ast.id] = 'string';
    }
  },

  _setAttributes: function(property, baseRef, isEnd){
    /**
     * type对应着velocity.yy中的attribute，三种类型: method, index, property
     */
    var type = property.type;
    var ret;
    var id = property.id;
    if (type === 'method'){
      this._setPropMethod(property, baseRef, isEnd);
    } else if (type === 'property') {
      baseRef = baseRef || {};
      baseRef[id] = isEnd? 'string': {};
    } else {
      this._setPropIndex(property, baseRef, isEnd);
    }
  },

  /**
   * $foo.bar[1] index求值
   */
  _setPropIndex: function(property, baseRef, isEnd){
    var ast = property.id;
    var key;
    if (ast.type === 'references'){
      key = this._setRefs(ast);
    } else {
      key = ast.value;
    }

    baseRef = baseRef || {};
    baseRef[key] = isEnd?'string': {};
  },

  _setPropMethod: function(property, baseRef, isEnd){

    var id         = property.id;
    var ret        = '';
    var _id        = id.slice(3);
    //特殊方法
    var specialFns = ['keySet'];

    if (id.indexOf('get') === 0){
      if (_id) {
        ret = baseRef[_id];
      } else {
        //map 对应的get方法
        _id = this.getLiteral(property.args[0]);
        ret = baseRef[_id];
      }
      //spy data
      if (ret === undefined) baseRef[_id] = 'spy>>> string';
    } else if (id.indexOf('set') === 0) {
      ret = '';
      baseRef[_id] = this.getLiteral(property.args[0]);
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
        ret = undefined;
        //spy fn
        //baseRef[id] = noop(isEnd?'spy>>> string': {});
      }
    }

    return ret;
  },

  getStruct: function(){

  }
};

module.exports = Structure;
