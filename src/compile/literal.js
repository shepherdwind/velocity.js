module.exports = function(Velocity, utils){
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
};
