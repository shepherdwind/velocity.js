module.exports = function(Velocity, utils){

  'use strict'

  function getSize(obj){

    if (utils.isArray(obj)) {
      return obj.length;
    } else if (utils.isObject(obj)) {
      return utils.keys(obj).length;
    }

    return undefined;
  }

  /**
   * unicode转码
   */
  function convert(str){

    if (typeof str !== 'string') return str;

    var result = ""
    var escape = false
    var i, c, cstr;

    for(i = 0 ; i < str.length ; i++) {
      c = str.charAt(i);
      if((' ' <= c && c <= '~') || (c == '\r') || (c == '\n')) {
        if(c == '&') {
          cstr = "&amp;"
          escape = true
        } else if(c == '<') {
          cstr = "&lt;"
          escape = true
        } else if(c == '>') {
          cstr = "&gt;"
          escape = true
        } else {
          cstr = c.toString()
        }
      } else {
        cstr = "&#" + c.charCodeAt().toString() + ";"
      }

      result = result + cstr
    }

    return escape ? result : str

  }
  

  utils.mixin(Velocity.prototype, {
    
    //增加某些函数，不需要执行html转义
    addIgnoreEscpape: function(key){

      if (!utils.isArray(key)) key = [key]

      utils.forEach(key, function(key){
        this.config.unescape[key] = true
      }, this)

    },

    /**
     * 引用求值
     * @param {object} ast 结构来自velocity.yy
     * @param {bool} isVal 取值还是获取字符串，两者的区别在于，求值返回结果，求
     * 字符串，如果没有返回变量自身，比如$foo
     */
    getReferences: function(ast, isVal) {

      if (ast.prue) {
        if (ast.id in this.config.unescape) ast.prue = false
      }
      var escape = this.config.escape;

      var isSilent = this.silence || ast.leader === "$!";
      var isfn     = ast.args !== undefined;
      var context  = this.context;
      var ret      = context[ast.id];
      var local    = this.getLocal(ast);

      var text = Velocity.Helper.getRefText(ast)

      if (text in context) {
        return (ast.prue && escape) ? convert(context[text]) : context[text];
      }


      if (ret !== undefined && isfn) {
        ret = this.getPropMethod(ast, context);
      }

      if (local.isLocaled) ret = local['value'];

      if (ast.path && ret !== undefined) {

        utils.some(ast.path, function(property, i){

          //第三个参数，返回后面的参数ast
          ret = this.getAttributes(property, ret);

        }, this);
      }

      if (isVal && ret === undefined) {
        ret = isSilent? '' : Velocity.Helper.getRefText(ast);
      }

      ret = (ast.prue && escape) ? convert(ret) : ret

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
     * $foo.bar 属性求值，最后面两个参数在用户传递的函数中用到
     * @param {object} property 属性描述，一个对象，主要包括id，type等定义
     * @param {object} baseRef 当前执行链结果，比如$a.b.c，第一次baseRef是$a,
     * 第二次是$a.b返回值
     * @private
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
    getPropMethod: function(property, baseRef){

      var id         = property.id;
      var ret        = '';
      var _id        = id.slice(3);

      // getter 处理
      if (id.indexOf('get') === 0 && !(id in baseRef)) {

        if (_id) {
          ret = baseRef[_id];
        } else {
          //map 对应的get方法
          _id = this.getLiteral(property.args[0]);
          ret = baseRef[_id];
        }

        return ret;

      // setter 处理
      } else if (id.indexOf('set') === 0 && !baseRef[id]) {

        baseRef[_id] = this.getLiteral(property.args[0]);
        // $page.setName(123)
        baseRef.toString =  function() { return ''; };
        return baseRef;

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
  })

}
