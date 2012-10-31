module.exports = function(Velocity, utils){
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
      var t1 = Date.now();
      var str = this._render();
      var t2 = Date.now();
      var cost = t2 - t1;
      return str + "finished, cout time:" + cost + 'ms';
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
          }
          break;

          case 'comment':
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
            if (utils.isArray(ast)) {
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
    }
  });
};
