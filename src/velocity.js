var Parser = require('./parse/');
var utils = require('./utils');

var toString = {}.toString;

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
    this.macros = {};
    this.conditions = [];
    this.local = {};
    //模拟数据
    this._context = {};

    utils.forEach(this.ast, this._init);
  },

  _init: function(ast){
    //console.log(ast);
  },

  render: function(context){
    this.context = context || {};
    var str = this._render();
    console.log(str);
    console.log(this);
  },

  _render: function(ast, contextId){

    var str = '';
    var isNewLine = true;
    var block = [];
    var index = 0;
    ast = ast || this.ast;
    if (contextId) {
      if (contextId !== this.condition) this.conditions.push(contextId);
      this.condition = contextId;
    } else {
      this.condition = null;
    }

    utils.forEach(ast, function(ast){

      switch(ast.type) {
        case 'references':
          if (index) {
            block.push(ast);
          } else {
            str += this.getReferences(ast);
          }
          break;

        case 'set':
          if (index) {
            block.push(ast);
          } else {
            this.setValue(ast);
            isNewLine = false;
          }
          break;

        case 'comment':
          isNewLine = false;
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
            str += this.getMacro(ast);
          }

          break;

        case 'end':
          index--;
          if (!index){
            //使用slide获取block的拷贝
            str += this.getBlock(block.slice());
            block = [];
          } else {
            block.push(ast);
          }

          break;

        default:
          if (index) {
            block.push(ast);
          } else {
            if (toString.call(ast) === '[object Array]') {
              str += this.getBlock(ast);
            } else {
              str += ast;
            }
          }
          break;
          // code
      }
    }, this);

    return str;
  },

  getBlock: function(block) {
    var ast = block[0];
    var ret = '';
    var _block = [ast];
    var _inBlock = [];
    var index = 0;
    var blockTypes = ['if', 'foreach', 'macro'];

    /**
     * 处理block嵌套，重新构造_block，把block中有嵌套的放入数组_inBlock，_inBlock
     * 最后成为_block的一个元素，_inBlock数组作为一个block数组，求值过程中，可以
     * 通过递归求值，进入下一层嵌套
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

  setBlockMacro: function(block){
    var ast = block[0];
    var _block = block.slice(1);
    var macros = this.macros;

    macros[ast.id] = {
      asts: _block,
      args: ast.args
    };
  },

  getMacro: function(ast){
    var macro = this.macros[ast.id];
    var ret = '';

    if (!macro) {
      ret = '';
    } else {
      var asts = macro.asts;
      var args = macro.args;
      var _call_args = ast.args;
      var local = {};
      var localKey = [];
      var guid = utils.guid();
      var contextId = ast.id + ':' + guid;

      utils.forEach(args, function(ref, i){
        local[ref.id] = this.getReferences(_call_args[i]);
      }, this);

      this.local[contextId] = local;
      ret = this._render(asts, contextId);
      this.local[contextId] = {};
      this.conditions.pop();
    }

    return ret;
  },

  getBlockEach: function(block){

    var ast = block[0];
    var _from = this.getReferences(ast.from);
    var _block = block.slice(1);
    var _to = ast.to;
    var local = {
      foreach: {
        count: 0
      }
    };
    var ret = '';
    var guid = utils.guid();
    var contextId = 'foreach:' + guid;

    utils.forEach(_from, function(val, i){

      if (this.setBreak) return;
      //构造临时变量
      local[_to] = val;
      local['foreach']['count'] = i;
      this.local[contextId] = local;
      ret += this._render(_block, contextId);

    }, this);

    this.setBreak = false;
    //删除临时变量
    this.local[contextId] = {};
    this.conditions.pop();

    return ret;

  },

  getBlockIf: function(block) {

    var str = '';
    var received = false;
    var asts = [];

    utils.some(block, function(ast){

      if (ast.condition) {

        if (received) return true;
        received = this.getExpression(ast.condition);

      } else if (ast.type === 'else') {
        if (received) return true;
        received = true;
      } else if (received) {
        asts.push(ast);
      }

      return false;

    }, this);

    //console.log(asts);
    return this._render(asts);
  },

  getExpression: function(condition){

    var str = '';
    if (!condition.length) condition = [condition];

    utils.forEach(condition, function(exp){

      if (typeof exp === 'string') {
        str += exp;
      } else if (exp.type) {

        var val = this.getLiteral(exp);
        if (typeof val === 'string') val = '"' + val + '"';
        str += val;

      }

    }, this);

    str = '(' + str + ')';
    return eval(str);
  },

  /**
   * parse #set
   */
  setValue: function(ast){
    var ref = ast.equal[0];
    var context  = this.context;
    var val = this.getLiteral(ast.equal[1]);

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

  getReferences: function(ast) {

    var isSilent= ast.leader === '$!';
    var context = this.context;
    var ret = context[ast.id];
    var local = this.getLocal(ast);

    if (local.isLocaled) ret = local['value'];

    if (ast.path) {
      if (!ret) ret = context[ast.id] = {};
      var len = ast.path.length;
      utils.forEach(ast.path, function(property, i){
        var isEnd = len === i + 1;
        ret = this.getAttributes(property, ret, isEnd);
      }, this);
    } else if (ret === undefined) {
      context[ast.id] = '>>>string';
    }

    if (ret === undefined) ret = isSilent? '' : this.getRefText(ast);
    return ret;
  },

  /**
   * 获取局部变量
   */
  getLocal: function(ast){

    var id = ast.id;
    var local = this.local;
    var ret = false;

    var isLocaled = utils.some(this.conditions, function(contextId){
      var _local = local[contextId];
      if (id in _local) {
        ret = _local[id];
        return true;
      }

      return false;
    }, this);

    return {
      value: ret,
      isLocaled: isLocaled
    };
  },

  /**
   * 获取引用文本，当引用自身不存在的情况下，需要返回原来的模板字符串
   */
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
      if (ret === undefined) {
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
        baseRef[id] = noop(isEnd?'spy>>> string': {});
      }
    }

    return ret;
  },

  getLiteral: function(literal){

    var type = literal.type;
    var ret = '';

    if (type == 'string') {

      ret = literal.value;

    } else if (type == 'integer') {

      ret = parseInt(literal.value, 10);

    } else if (type == 'array') {

      ret = [];
      utils.forEach(literal.value, function(exp){
        ret.push(this.getLiteral(exp));
      }, this);

    } else if(type == 'map') {

      ret = {};
      var map = literal.value;

      utils.forEach(map, function(exp, key){
        ret[key] = this.getLiteral(exp);
      }, this);

    } else {

      return this.getReferences(literal);

    }

    return ret;
  }

};

module.exports = Velocity;
