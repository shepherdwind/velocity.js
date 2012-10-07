var Parser = require('./parse/');
var utils = require('./utils');

function noop (){
  var args = arguments;
  return function(){
    return args;
  };
}

function Velocity() {
  this.init.apply(this, arguments);
}

Velocity.prototype = {

  init: function(template){
    this.template = template;
    this.ast = Parser.parse(template);
    this.context = {};
    //模拟数据
    this._context = {};

    utils.forEach(this.ast, this._init);
  },

  _init: function(ast){
    //console.log(ast);
  },

  render: function(context){
    this.context = context || {};
    return this._render();
  },

  _render: function(){
    var str = '';
    utils.forEach(this.ast, function(ast){
      switch(ast.type) {
        case 'references':
          str += this.getReferences(ast);
          break;

        case 'set':
          this.setValue(ast);
          break;
        
        default:
          str += ast;
          break;
          // code
      }
    }, this);
    console.log(str);
    console.log(this.context);
  },

  /**
   * parse #set
   */
  setValue: function(ast){
    var ref = ast.equal[0];
    var context  = this.context;
    var val = this.getExpression(ast.equal[1]);
    if (!ref.path) {
      context[ref.id] = val;
    } else {
      var baseRef = context[ref.id] || {};
      context[ref.id] = baseRef;
      var len = ref.path ? ref.path.length: 0;
      utils.forEach(ref.path, function(exp, i){
        var isEnd = len === i + 1;
        var key = exp.id;
        if (exp.type === 'index')  key = key.value;
        baseRef[key] = isEnd? val: {};
        baseRef = baseRef[key];
      });
    }
  },

  getReferences: function(ast){
    var isSilent= ast.leader === '$!';
    var context = this.context;
    var ret = context[ast.id];
    if (ast.path) {
      if (!ret) ret = context[ast.id] = {};
      var len = ast.path.length;
      utils.forEach(ast.path, function(property, i){
        var isEnd = len === i + 1;
        ret = this.getAttributes(property, ret, isEnd);
      }, this);
    }

    if (ret === undefined) ret = isSilent? '' : this.getRefText(ast);
    return ret;
  },

  getRefText: function(ast){
    var ret = ast.leader;
    if (ast.isWraped) ret += '{';

    ret += ast.id;
    utils.forEach(ast.path, function(ref){
      //不支持method并且传递参数
      if (ref.type == 'method') {
        ret += '.' + ref.id + '()';
      } else if (ref.type == 'index') {
        var text = '';
        var id = ref.id;
        if (id.type === 'integer') {
          text = id.value;
        } else if (id.type === 'string') {
          text = id.value;
        } else {
          text = this.getRefText(id);
        }
        ret += '[' + text + ']';
      } else if (ref.type == 'property') {
        ret += '.' + ref.id;
      }
    }, this);

    if (ast.isWraped) ret += '}';
    return ret;
  },

  getAttributes: function(property, baseRef, isEnd){
    /**
     * type对应着velocity.yy中的attribute，三种类型: method, index, property
     */
    var type = property.type;
    var ret;
    var id = property.id;
    if (type === 'method'){
      ret = this.getPropMethod(property, baseRef, isEnd);
    } else if (type === 'property') {
      ret = baseRef && baseRef[id];
      if (!ret) {
        baseRef = baseRef || {};
        baseRef[id] = isEnd? 'spy>>>string': {};
      }
    } else {
      ret = this.getPropIndex(property, baseRef, isEnd);
    }
    return ret;
  },

  getPropIndex: function(property, baseRef, isEnd){
    var ast = property.id;
    var key;
    if (ast.type === 'references'){
      key = this.getReferences(ast);
    } else if(ast.type === 'integer'){
      key = ast.value;
    } else {
      key = ast.value;
    }

    var ret;
    ret = baseRef && baseRef[key];
    if (!ret){
      baseRef = baseRef || {};
      baseRef[key] = isEnd?'spy>>> string': {};
    }

    return ret;
  },

  getPropMethod: function(property, baseRef, isEnd){

    var id = property.id;
    var ret = '';
    var _id = id.slice(3);
    if (id.indexOf('get') === 0){
      ret = baseRef[_id];
      //spy data
      if (ret === undefined) baseRef[_id] = 'spy>>> string';
    } else if (id.indexOf('set') === 0) {
      ret = '';
      baseRef[_id] = this.getExpression(property.args[0]);
    } else {
      ret = baseRef[id];
      var args = [];

      utils.forEach(property.args, function(exp){
        args.push(this.getExpression(exp));
      }, this);

      if (ret && ret.call) {
        ret = ret.apply(baseRef, args); 
      } else {
        ret = undefined;
        //spy fn
        baseRef[id] = noop(isEnd?'spy>>> string': {});
      }
    }

    return ret;
  },

  getExpression: function(expression){
    var type = expression.type;
    var ret = '';
    if (type == 'string' || type == 'integer') {
      ret = expression.value;
    } else if (type == 'array') {
      ret = [];
      utils.forEach(expression.value, function(exp){
        ret.push(this.getExpression(exp));
      }, this);
    }
    return ret;
  }

};

module.exports = Velocity;
