'use strict';
module.exports = function(Velocity, utils) {

  function step(arr, i) {
    var result = '';
    i = i || 0;
    if (!arr[i]) {
      return Promise.resolve('');
    }

    return new Promise(function(resolve) {
      arr[i]().then(function(ret) {
        result += ret;
        step(arr, i + 1).then(function(ret) {
          result += ret;
          resolve(result);
        });
      });
    });
  }

  /**
   * compile
   */
  utils.mixin(Velocity.prototype, {
    init: function() {
      this.context = {};
      this.macros = {};
      this.defines = {};
      this.conditions = [];
      this.local = {};
      this.silence = false;
      this.unescape = {};
    },

    /**
     * @param context {object} 上下文环境，数据对象
     * @param macro   {object} self defined #macro
     * @param silent {bool} 如果是true，$foo变量将原样输出
     * @return str
     */
    render: function(context, macros, silence) {

      this.silence = !!silence;
      this.context = context || {};
      this.jsmacros = macros || {};

      if (!this.config.isAsync) {
        var t1 = utils.now();
        var str = this._render();
        var t2 = utils.now();
        var cost = t2 - t1;

        this.cost = cost;

        return str;
      }

      return this.asyncRender(this.asts);
    },

    /**
     * 解析入口函数
     * @param ast {array} 模板结构数组
     * @param contextId {number} 执行环境id，对于macro有局部作用域，变量的设置和
     * 取值，都放在一个this.local下，通过contextId查找
     * @return {string}解析后的字符串
     */
    _render: function(asts, contextId) {

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

      return utils.map(asts, this.compute, this).join('');
    },

    asyncRender: function(asts) {
      return step(this.toPromises(asts));
    },

    compute: function(ast) {
      switch (ast.type) {
        case 'references':
          return this.getReferences(ast, true);

        case 'set':
          this.setValue(ast);
          return '';

        case 'break':
          this.setBreak = true;
          return '';

        case 'macro_call':
          return this.getMacro(ast);

        case 'comment':
          return '';

        default:
          return typeof ast === 'string' ? ast : this.getBlock(ast);
      }
    },

    toPromises: function(asts) {
      var self = this;
      return utils.map(asts, function(ast) {
        return function() {
          var ret = self.compute(ast);
          if (typeof ret === 'string') {
            return Promise.resolve(ret);
          }

          // 否则是promise对象
          return ret;
        };
      });
    }
  });
};
