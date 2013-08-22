module.exports = function(Velocity, utils){

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

      var text = Velocity.Helper.getRefText(ast)
      if (text in context) {
        return context[text];
      }


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

          //第三个参数，返回后面的参数ast
          ret = this.getAttributes(property, ret, ast.path.slice(i + 1), ast);

          //提前结束计算，某些情况下，连缀运行，后面的运算影响前面的结果，这种
          //情况需要特殊处理，比如$control.setTempalte('a.vm').setParameter('a', 'b')
          //第一个函数就返回结果，这时候，函数返回对象为
          //{$stop: true, $return: 'string'}
          //$stop表示停滞，$return：返回结果
          if (ret === undefined || ret.$stop === true) {
            ret = ret && ret.$stop ? ret.$return : ret;
            return true;
          }
        }, this);
      }

      if (isVal && ret === undefined) ret = isSilent? '' : Velocity.Helper.getRefText(ast);
      return ret;
    },

    /**
     * set方法需要单独处理，假设set只在references最后$page.setTitle('')
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
     * $foo.bar 属性求值，最后面两个参数在用户传递的函数中用到
     * @param {object} property 属性描述，一个对象，主要包括id，type等定义
     * @param {object} baseRef 当前执行链结果，比如$a.b.c，第一次baseRef是$a,
     * 第二次是$a.b返回值
     * @param {array} others 后面的属性，比如$a.b.c，求$a.b时，其余的是[c]所对
     * 应的描述
     * @param {object} total 整个ast描述
     * @private
     */
    getAttributes: function(property, baseRef, others, total){
      /**
       * type对应着velocity.yy中的attribute，三种类型: method, index, property
       */
      var type = property.type;
      var ret;
      var id = property.id;
      if (type === 'method'){
        ret = this.getPropMethod(property, baseRef, others, total);
      } else if (type === 'property') {
        ret = baseRef[id];
      } else {
        ret = this.getPropIndex(property, baseRef);
      }
      return ret;
    },

    /**
     * $foo.bar[1] index求值
     * @private
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
    getPropMethod: function(property, baseRef, others, total){

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

          baseRef.$sys = {
            others: others,
            vm: this,
            total: total
          };

          baseRef.eval = function() {
            return that.eval.apply(that, arguments);
          };
          ret = ret.apply(baseRef, args);

          delete baseRef.$sys;

        } else {
          ret = undefined;
        }
      }

      return ret;
    }
  });
};
