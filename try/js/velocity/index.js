KISSY.add(function(S){
  var Velocity = function(asts){
    this.asts = asts;
    this.init();
  };
  Velocity.Helper = {};
  Velocity.prototype = {
    constructor: Velocity
  };

  //api map
  var utils = {
    forEach : S.each,
    some    : S.some,
    mixin   : S.mix,
    guid    : S.guid,
    isArray : S.isArray,
    indexOf : S.indexOf,
    keys    : S.keys,
    now     : S.now
  };

  !function(Helper, utils){
  /**
   * 获取引用文本，当引用自身不存在的情况下，需要返回原来的模板字符串
   */
  function getRefText(ast){

    var ret = ast.leader;

    if (ast.isWraped) ret += '{';

    ret += ast.id;
    utils.forEach(ast.path, function(ref){
      //不支持method并且传递参数
      if (ref.type == 'method') {

        var args = [];

        utils.forEach(ref.args, function(arg){

          if (arg.type === 'string') {

            var sign = arg.isEval? '"': "'";
            var text = sign + arg.value + sign;
            args.push(text);

          } else {

            args.push(getRefText(arg));

          }

        });

        ret += '.' + ref.id + '(' + args.join(',') + ')';

      } else if (ref.type == 'index') {

        var text = '';
        var id = ref.id;

        if (id.type === 'integer') {

          text = id.value;

        } else if (id.type === 'string') {

          var sign = id.isEval? '"': "'";
          text = sign + id.value + sign;

        } else {

          text = getRefText(id);

        }

        ret += '[' + text + ']';

      } else if (ref.type == 'property') {

        ret += '.' + ref.id;

      }

    }, this);

    if (ast.isWraped) ret += '}';

    return ret;
  }

  Helper.getRefText = getRefText;
}(Velocity.Helper, utils);
  /** file: ./src/compile/blocks.js*/
!function(Velocity, utils){
  /**
   * blocks语法处理
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 处理代码库: if foreach macro
     */
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
          if (utils.indexOf(ast.type, blockTypes) !== -1) {
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

    /**
     * parse macro call
     */
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
          if (_call_args[i]) {
            local[ref.id] = this.getLiteral(_call_args[i]);
          } else {
            local[ref.id] = undefined;
          }
        }, this);

        this.local[contextId] = local;
        ret = this._render(asts, contextId);
        this.local[contextId] = {};
        this.conditions.pop();
        this.condition = '';
      }

      return ret;
    },

    /**
     * parse #foreach
     */
    getBlockEach: function(block){

      var ast = block[0];
      var _from = this.getLiteral(ast.from);
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
        //TODO: here, the foreach variable give to local, when _from is not an
        //array, count and hasNext would be undefined, also i is not the
        //index.
        local['foreach']['count'] = i + 1;
        local['foreach']['index'] = i;
        local['foreach']['hasNext'] = !!val[i + 1];
        this.local[contextId] = local;
        ret += this._render(_block, contextId);

      }, this);

      this.setBreak = false;
      //删除临时变量
      this.local[contextId] = {};
      this.conditions.pop();
      this.condition = '';

      return ret;

    },

    /**
     * parse #if
     */
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

      return this._render(asts);
    }
  });
}(Velocity, utils);

/** file: ./src/compile/compile.js*/
!function(Velocity, utils){
  var BLOCK_TYPES = ['if', 'foreach', 'macro'];
  /**
   * compile
   */
  utils.mixin(Velocity.prototype, {
    init: function(){
      this.context = {};
      this.macros = {};
      this.conditions = [];
      this.local = {};

      utils.forEach(this.asts, this._init, this);
    },

    _init: function(ast, i){
      if (!ast.type || ast.type !== 'references') {
        this._trim(i + 1);
      }
    },

    /**
     * 删除多余的换行符，规则，所有非references的指令后面的换行符，都去除接下来的
     * 换行符
     */
    _trim: function(i){
      var asts = this.asts;
      var _ast = asts[i];
      if (typeof _ast === 'string' && _ast.slice(0, 1) === "\n") {
        asts[i] = _ast.slice(1);
      }
    },

    render: function(context){
      this.context = context || {};
      var t1 = utils.now();
      var str = this._render();
      var t2 = utils.now();
      var cost = t2 - t1;
      console && console.log("velocity finished, cout time:" + cost + 'ms');
      return str ;
    },

    /**
     * 解析入口函数
     * @param ast {array} 模板结构数组
     * @param contextId {number} 执行环境id，对于macro有局部作用域，变量的设置和
     * 取值，都放在一个this.local下，通过contextId查找
     * @return {string}解析后的字符串
     */
    _render: function(asts, contextId){

      var str = '';
      var block = [];
      var index = 0;
      asts = asts || this.asts;
      if (contextId) {
        if (contextId !== this.condition) this.conditions.push(contextId);
        this.condition = contextId;
      } else {
        this.condition = null;
      }

      utils.forEach(asts, function(ast){
        var type = ast.type;

        //foreach if macro时，index加一
        if (utils.indexOf(type, BLOCK_TYPES) > -1) index ++;

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
          str += this.getReferences(ast, true);
          break;

          case 'set':
          this.setValue(ast);
          break;

          case 'break':
          this.setBreak = true;
          break;

          case 'macro_call':
          str += this.getMacro(ast);
          break;

          case 'end':
          //使用slide获取block的拷贝
          str += this.getBlock(block.slice());
          block = [];
          break;

          default:
          if (utils.isArray(ast)) {
            str += this.getBlock(ast);
          } else {
            str += ast;
          }
          break;
        }
      }, this);

      return str;
    }
  });
}(Velocity, utils);

/** file: ./src/compile/expression.js*/
!function(Velocity, utils){
  /**
   * expression运算
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 表达式求值，表达式主要是数学表达式，逻辑运算和比较运算，到最底层数据结构，
     * 基本数据类型，使用 getLiteral求值，getLiteral遇到是引用的时候，使用
     * getReferences求值
     */
    getExpression: function(ast){

      var exp = ast.expression;
      var ret;
      if (ast.type === 'math') {

        switch(ast.operator) {
          case '+':
          ret = this.getExpression(exp[0]) + this.getExpression(exp[1]);
          break;

          case '-':
          ret = this.getExpression(exp[0]) - this.getExpression(exp[1]);
          break;

          case '/':
          ret = this.getExpression(exp[0]) / this.getExpression(exp[1]);
          break;

          case '*':
          ret = this.getExpression(exp[0]) * this.getExpression(exp[1]);
          break;

          case '||':
          ret = this.getExpression(exp[0]) || this.getExpression(exp[1]);
          break;

          case '&&':
          ret = this.getExpression(exp[0]) && this.getExpression(exp[1]);
          break;

          case '>':
          ret = this.getExpression(exp[0]) > this.getExpression(exp[1]);
          break;

          case '<':
          ret = this.getExpression(exp[0]) < this.getExpression(exp[1]);
          break;

          case 'minus':
          ret = - this.getExpression(exp[0]);
          break;

          case 'not':
          ret = !this.getExpression(exp[0]);
          break;

          case 'parenthesis':
          ret = this.getExpression(exp[0]);
          break;

          default:
          return;
          // code
        }

        return ret;
      } else {
        return this.getLiteral(ast);
      }
    }
  });
}(Velocity, utils);

/** file: ./src/compile/literal.js*/
!function(Velocity, utils){
  /**
   * literal解释模块
   * @require {method} getReferences
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 字面量求值，主要包括string, integer, array, map四种数据结构
     * @param literal {object} 定义于velocity.yy文件，type描述数据类型，value属性
     * 是literal值描述
     * @return {object|string|number|array}返回对应的js变量
     */
    getLiteral: function(literal){

      var type = literal.type;
      var ret = '';

      if (type == 'string') {

        ret = this.getString(literal);

      } else if (type == 'integer') {

        ret = parseInt(literal.value, 10);

      } else if (type == 'array') {

        ret = this.getArray(literal);

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
    },

    /**
     * 对字符串求值，对已双引号字符串，需要做变量替换
     */
    getString: function(literal){
      var val = literal.value;
      var ret = val;

      if (literal.isEval && (val.indexOf('#') !== -1 || val.indexOf("$") !== -1)) {
        ret = this.evalStr(val);
      }

      return ret;
    },

    /**
     * 对array字面量求值，比如[1, 2]=> [1,2]，[1..5] => [1,2,3,4,5]
     * @param literal {object} array字面量的描述对象，分为普通数组和range数组两种
     * ，和js基本一致
     * @return {array} 求值得到的数组
     */
    getArray: function(literal){

      var ret = [];

      if (literal.isRange) {
        var begin = parseInt(literal.value[0], 10);
        var end   = parseInt(literal.value[1], 10);
        var i;

        if (begin < end) {
          for (i = begin; i <= end; i++) ret.push(i);
        } else {
          for (i = begin; i >= end; i--) ret.push(i);
        }

      } else {
        utils.forEach(literal.value, function(exp){
          ret.push(this.getLiteral(exp));
        }, this);
      }

      return ret;
    },

    /**
     * 对双引号字符串进行eval求值，替换其中的变量，只支持最基本的变量类型替换
     */
    evalStr: function(str){
      var ret = str;
      var reg = /\$\{{0,1}([a-z][a-z_\-0-9.]*)\}{0,1}/gi;
      var self = this;
      ret = ret.replace(reg, function(){
        return self._getFromVarname(arguments[1]);
      });
      return ret;
    },

    /**
     * 通过变量名获取变量的值
     * @param varname {string} 变量名，比如$name.name，只支持一种形式，变量和属性
     * 的取值，index和method不支持，在字符处理中，只处理"$varname1 $foo.bar" 类似
     * 的变量，对于复杂类型不支持
     * @return ret {string} 变量对应的值
     */
    _getFromVarname: function(varname){
      var varPath = varname.split('.');
      var ast = {
        type   : "references",
        id     : varPath[0],
        leader : "$"
      };

      var path = [];
      for (var i=1; i < varPath.length; i++) {
        path.push({
          type: 'property',
          id: varPath[i]
        });
      }

      if (path.length) ast.path = path;
      return this.getReferences(ast);
    }

  });
}(Velocity, utils);

/** file: ./src/compile/references.js*/
!function(Velocity, utils){
  utils.mixin(Velocity.prototype, {
    /**
     * 引用求值
     * @param {object} ast 结构来自velocity.yy
     * @param {bool} isVal 取值还是获取字符串，两者的区别在于，求值返回结果，求
     * 字符串，如果没有返回变量自身，比如$foo
     */
    getReferences: function(ast, isVal) {

      var isSilent= ast.leader === "$!";
      var context = this.context;
      var ret = context[ast.id];
      var local = this.getLocal(ast);

      if (local.isLocaled) ret = local['value'];

      if (ast.path && ret !== undefined) {
        utils.some(ast.path, function(property, i){
          ret = this.getAttributes(property, ret);
          return ret === undefined;
        }, this);
      }

      if (isVal && ret === undefined) ret = isSilent? '' : Velocity.Helper.getRefText(ast);
      return ret;
    },

    /**
     * 获取局部变量，在macro和foreach循环中使用
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
     * $foo.bar 属性求值
     */
    getAttributes: function(property, baseRef){
      /**
       * type对应着velocity.yy中的attribute，三种类型: method, index, property
       */
      var type = property.type;
      var ret;
      var id = property.id;
      if (type === 'method'){
        ret = this.getPropMethod(property, baseRef);
      } else if (type === 'property') {
        ret = baseRef[id];
      } else {
        ret = this.getPropIndex(property, baseRef);
      }
      return ret;
    },

    /**
     * $foo.bar[1] index求值
     */
    getPropIndex: function(property, baseRef){
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
      ret = baseRef[key];

      return ret;
    },

    /**
     * $foo.bar()求值
     */
    getPropMethod: function(property, baseRef){

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

      } else if (id.indexOf('set') === 0) {

        ret = '';
        baseRef[_id] = this.getLiteral(property.args[0]);

      } else if (id === 'keySet') {
        ret = utils.keys(baseRef);
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
        }
      }

      return ret;
    }
  });
}(Velocity, utils);

/** file: ./src/compile/set.js*/
!function(Velocity, utils){
  /**
   * 变量设置
   */
  utils.mixin(Velocity.prototype, {
    /**
     * 获取执行环境，对于macro中定义的变量，为局部变量，不贮存在全局中，执行后销毁
     */
    getContext: function(){
      var condition = this.condition;
      var local = this.local;
      if (condition) {
        return local[condition];
      } else {
        return this.context;
      }
    },
    /**
     * parse #set
     */
    setValue: function(ast){
      var ref = ast.equal[0];
      var context  = this.getContext();
      var valAst = ast.equal[1];
      var val;

      if (valAst.type === 'math') {
        val = this.getExpression(valAst);
      } else {
        val = this.getLiteral(ast.equal[1]);
      }

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
    }
  });
}(Velocity, utils);


  return Velocity;
});
