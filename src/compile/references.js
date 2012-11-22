module.exports = function(Velocity, utils){
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
};
