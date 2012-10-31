module.exports = function(Velocity, utils){
  utils.mixin(Velocity.prototype, {
    /**
     * 引用求值
     */
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

      if (ret === undefined) ret = isSilent? '' : Velocity.Helper.getRefText(ast);
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

    /**
     * $foo.bar[1] index求值
     */
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

    /**
     * $foo.bar()求值
     */
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
        }
      }

      return ret;
    }
  });
};
