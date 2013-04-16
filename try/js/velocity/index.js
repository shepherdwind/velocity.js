KISSY.add(function(S){
  var Velocity = function(asts){
    this.asts = asts;
    this.init();
  };
  Velocity.Helper = {};
  Velocity.prototype = {
    constructor: Velocity
  };

  var hasEnumBug = !({toString: 1}.propertyIsEnumerable('toString'));

  var keys = Object.keys || function (o) {
    var result = [], p, i;

    for (p in o) {
      result.push(p);
    }

    if (hasEnumBug) {
      for (i = enumProperties.length - 1; i >= 0; i--) {
        p = enumProperties[i];
        if (o.hasOwnProperty(p)) {
          result.push(p);
        }
      }
    }

    return result;
  };

  //api map
  var utils = {
    forEach : S.each,
    some    : S.some,
    mixin   : S.mix,
    guid    : S.guid,
    isArray : S.isArray,
    indexOf : S.indexOf,
    // 1.2没有keys方法，考虑独立utils
    keys    : keys,
    isObject: S.isObject,
    now     : S.now
  };

  !function(Helper, utils){
    /**
     * 获取引用文本，当引用自身不存在的情况下，需要返回原来的模板字符串
     */
    function getRefText(ast){
  
      var ret = ast.leader;
      var isFn = ast.args !== undefined;
  
      if (ast.isWraped) ret += '{';
  
      if (isFn) {
        ret += getMethodText(ast);
      } else {
        ret += ast.id;
      }
  
      utils.forEach(ast.path, function(ref){
        //不支持method并且传递参数
        if (ref.type == 'method') {
          ret += '.' + getMethodText(ref);
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
  
    function getMethodText(ref) {
  
      var args = [];
      var ret = '';
  
      utils.forEach(ref.args, function(arg){
        args.push(getLiteral(arg));
      });
  
      ret += ref.id + '(' + args.join(',') + ')';
  
      return ret;
  
    }
  
    function getLiteral(ast){
  
      var ret = '';
  
      switch(ast.type) {
  
        case 'string': {
          var sign = ast.isEval? '"': "'";
          ret = sign + ast.value + sign;
          break;
        }
  
        case 'integer':
        case 'bool'   : {
          ret = ast.value;
          break;
        }
  
        case 'array': {
          ret = '[';
          var len = ast.value.length - 1;
          utils.forEach(ast.value, function(arg, i){
            ret += getLiteral(arg);
            if (i !== len) ret += ', ';
          });
          ret += ']';
          break;
        }
  
        default:
          ret = getRefText(ast)
      }
  
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
  
        if (ast.type === 'if') {
          ret = this.getBlockIf(block);
        } else if (ast.type === 'foreach') {
          ret = this.getBlockEach(block);
        } else if (ast.type === 'macro') {
          this.setBlockMacro(block);
        } else if (ast.type === 'noescape') {
          ret = this._render(block.slice(1));
        } else {
          ret = this._render(block);
        }
  
        return ret || '';
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
  
          var jsmacros = this.jsmacros;
          macro = jsmacros[ast.id];
          var jsArgs = [];
  
          if (macro && macro.apply) {
  
            utils.forEach(ast.args, function(a){
              jsArgs.push(this.getLiteral(a));
            }, this);
  
            ret = macro.apply(this, jsArgs);
  
          }
  
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
  
          ret = this.eval(asts, local, contextId);
        }
  
        return ret;
      },
  
      /**
       * eval
       * @param str {array|string} 需要解析的字符串
       * @param local {object} 局部变量
       * @param contextId {string} 
       * @return {string}
       */
      eval: function(str, local, contextId){
  
        if (!local) {
  
          if (utils.isArray(str)) {
            return this._render(str);
          } else {
            return this.evalStr(str);
          }
  
        } else {
  
          var asts = [];
          var Parser = Velocity.Parser;
          contextId = contextId || ('eval:' + utils.guid());
  
          if (utils.isArray(str)) {
  
            asts = str;
  
          } else if (Parser) {
  
            asts = Parser.parse(str);
  
          }
  
          if (asts.length) {
  
            this.local[contextId] = local;
            var ret = this._render(asts, contextId);
            this.local[contextId] = {};
            this.conditions.pop();
            this.condition = '';
  
            return ret;
          }
  
        }
  
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
  
        var type = ({}).toString.call(_from);
        if (!_from || (type !== '[object Array]' && type !== '[object Object]')) return;
  
        var len = utils.isArray(_from)? _from.length: utils.keys(_from).length;
  
        utils.forEach(_from, function(val, i){
  
          if (this.setBreak) return;
          //构造临时变量
          local[_to] = val;
          //TODO: here, the foreach variable give to local, when _from is not an
          //array, count and hasNext would be undefined, also i is not the
          //index.
          local['foreach']['count'] = i + 1;
          local['foreach']['index'] = i;
          local['foreach']['hasNext'] = i + 1 < len;
          local['velocityCount'] = i + 1;
          this.local[contextId] = local;
          ret += this._render(_block, contextId);
  
        }, this);
  
        this.setBreak = false;
        //删除临时变量
        this.local[contextId] = {};
        this.conditions.shift();
        this.condition = this.conditions[0] || '';
  
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
  
    /**
     * compile
     */
    utils.mixin(Velocity.prototype, {
      init: function(){
        this.context = {};
        this.macros = {};
        this.conditions = [];
        this.local = {};
        this.silence = false;
  
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
  
      /**
       * @param context {object} 上下文环境，数据对象
       * @param macro   {object} self defined #macro
       * @param silent {bool} 如果是true，$foo变量将原样输出
       * @return str
       */
      render: function(context, macros, silence){
  
        this.silence = !!silence;
        this.context = context || {};
        this.jsmacros = macros || {};
        var t1 = utils.now();
        var str = this._render();
        var t2 = utils.now();
        var cost = t2 - t1;
  
        this.cost = cost;
  
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
        asts = asts || this.asts;
  
        if (contextId) {
  
          if (contextId !== this.condition && 
              utils.indexOf(contextId, this.conditions) === -1) {
            this.conditions.unshift(contextId);
          }
  
          this.condition = contextId;
  
        } else {
          this.condition = null;
        }
  
        utils.forEach(asts, function(ast){
  
          switch(ast.type) {
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
  
            case 'comment':
              break;
  
            default:
              str += typeof ast == 'string' ? ast : this.getBlock(ast);
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
  
            case '%':
            ret = this.getExpression(exp[0]) % this.getExpression(exp[1]);
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
  
            case '==':
            ret = this.getExpression(exp[0]) == this.getExpression(exp[1]);
            break;
  
            case '>=':
            ret = this.getExpression(exp[0]) >= this.getExpression(exp[1]);
            break;
  
            case '<=':
            ret = this.getExpression(exp[0]) <= this.getExpression(exp[1]);
            break;
  
            case '!=':
            ret = this.getExpression(exp[0]) != this.getExpression(exp[1]);
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
  
        } else if (type == 'decimal') {
  
          ret = parseFloat(literal.value, 10);
  
        } else if (type == 'array') {
  
          ret = this.getArray(literal);
  
        } else if(type == 'map') {
  
          ret = {};
          var map = literal.value;
  
          utils.forEach(map, function(exp, key){
            ret[key] = this.getLiteral(exp);
          }, this);
        } else if(type == 'bool') {
  
          if (literal.value === "null") {
            ret = null;
          } else if (literal.value === 'false') {
            ret = false;
          } else if (literal.value === 'true') {
            ret = true;
          }
  
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
  
          var begin = literal.value[0];
          if (begin.type === 'references') {
            begin = this.getReferences(begin);
          }
  
          var end = literal.value[1];
          if (end.type === 'references') {
            end = this.getReferences(end);
          }
  
          end   = parseInt(end, 10);
          begin = parseInt(begin, 10);
  
          var i;
  
          if (!isNaN(begin) && !isNaN(end)) {
  
            if (begin < end) {
              for (i = begin; i <= end; i++) ret.push(i);
            } else {
              for (i = begin; i >= end; i--) ret.push(i);
            }
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
  
        // 如果是Broswer环境，使用正则执行evalStr，如果是node环境，或者自行设置
        // Velocity.Parser = Parser，可以对evalStr完整支持
        if (Velocity.Parser) {
  
          var asts = Velocity.Parser.parse(str);
          ret = this._render(asts);
  
        } else {
  
          var ret = str;
          var reg = /\$\{{0,1}([_a-z][a-z_\-0-9.]*)\}{0,1}/gi;
          var self = this;
          ret = ret.replace(reg, function(){
            return self._getFromVarname(arguments[1]);
          });
        }
  
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
  
    function getSize(obj){
  
      if (utils.isArray(obj)) {
        return obj.length;
      } else if (utils.isObject(obj)) {
        return utils.keys(obj).length;
      }
  
      return undefined;
    }
  
    utils.mixin(Velocity.prototype, {
      /**
       * 引用求值
       * @param {object} ast 结构来自velocity.yy
       * @param {bool} isVal 取值还是获取字符串，两者的区别在于，求值返回结果，求
       * 字符串，如果没有返回变量自身，比如$foo
       */
      getReferences: function(ast, isVal) {
  
        var isSilent = this.silence || ast.leader === "$!";
        var isfn     = ast.args !== undefined;
        var context  = this.context;
        var ret      = context[ast.id];
        var local    = this.getLocal(ast);
  
  
        if (ret !== undefined && isfn) {
          ret = this.getPropMethod(ast, context);
        }
  
        if (local.isLocaled) ret = local['value'];
  
        // 如果是$page.setTitle('xx')类似的方法，需要设置page为对象
        var isSet = this.hasSetMethod(ast, ret);
        if (isSet !== false) {
          if (!context[ast.id]) context[ast.id] = {};
          utils.mixin(context[ast.id], isSet);
          return '';
        }
  
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
       * set方法需要单独处理，假设set只在references最后$page.setTitle('')
       * 对于set连缀的情况$page.setTitle('sd').setName('haha')
       */
      hasSetMethod: function(ast, context){
        var tools = { 'control': true };
        var len = ast.path && ast.path.length;
        if (!len || tools[ast.id]) return false;
  
        var lastId = '' + ast.path[len - 1].id;
  
        if (lastId.indexOf('set') !== 0) {
          return false;
        } else {
  
          context = context || {};
          utils.forEach(ast.path, function(ast){
            if (ast.type === 'method' && ast.id.indexOf('set') === 0) {
              //if (context[ast.id]) { }
              context[ast.id.slice(3)] = this.getLiteral(ast.args[0]);
            } else {
              context[ast.id] = context[ast.id] || {};
            }
          }, this);
  
          return context;
        }
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
  
        return baseRef[key];
      },
  
      /**
       * $foo.bar()求值
       */
      getPropMethod: function(property, baseRef){
  
        var id         = property.id;
        var ret        = '';
        var _id        = id.slice(3);
  
        if (id.indexOf('get') === 0 && !(id in baseRef)) {
  
          if (_id) {
            ret = baseRef[_id];
          } else {
            //map 对应的get方法
            _id = this.getLiteral(property.args[0]);
            ret = baseRef[_id];
          }
  
          return ret;
  
        } else if (id.indexOf('is') === 0 && !(id in baseRef)) {
  
          _id = id.slice(2);
          ret = baseRef[_id];
          return ret;
  
        } else if (id === 'keySet') {
  
          return utils.keys(baseRef);
  
        } else if (id === 'entrySet') {
  
          ret = [];
          utils.forEach(baseRef, function(value, key){
            ret.push({key: key, value: value});
          });
  
          return ret;
  
        } else if (id === 'size') {
  
          return getSize(baseRef);
  
        } else {
  
          ret = baseRef[id];
          var args = [];
  
          utils.forEach(property.args, function(exp){
            args.push(this.getLiteral(exp));
          }, this);
  
          if (ret && ret.call) {
  
            var that = this;
            baseRef.eval = function() {
              return that.eval.apply(that, arguments);
            };
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
