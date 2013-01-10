module.exports = function(Velocity, utils, BLOCK_TYPES){

  utils.mixin(Velocity.prototype, {
    getBlock: function(block) {
      var ast = block[0];
      var ret = '';
      var _block = [ast];
      var _inBlock = [];
      var index = 0;

      /**
       * 处理block嵌套，重新构造_block，把block中有嵌套的放入数组_inBlock,
       * _inBlock 最后成为_block的一个元素，_inBlock数组作为一个block数组，求值
       * 过程中，可以通过递归求值，进入下一层嵌套
       */
      utils.forEach(block, function(ast, i){
        if (i) {
          if (BLOCK_TYPES.indexOf(ast.type) !== -1) {
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

    getBlockIf: function(block){
      var str = '';
      var asts = [];
      var condition = block[0].condition;
      //console.log(condition);
      this.getExpression(condition);
      utils.forEach(block, function(ast, i){
        if (ast.type === 'elseif') {
          this.getExpression(ast.condition);
        } else if (ast.type !== 'else' && i) {
          asts.push(ast);
        }
      }, this);

      this._render(asts);
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

    getBlockEach: function(block){
      var ast = block[0];
      var guid = utils.guid();
      var contextId = 'foreach:' + guid;
      var local = {
        type: 'foreach',
        variable: [ast.to, 'velocityCount'],
        ast : ast,
        context: {}
      };

      this.local[contextId] = local;
      this.conditions.push(contextId);

      var asts = block.slice(1);

      this._render(asts);

      this.conditions.pop();
    },

    _setEachVTL: function(ast, local){

      var from = this.getLocal(ast.from)['real'];

      if (from === undefined) from = ast.from;

      var endPart = " #end ]";
      var value = '[#foreach($' + ast.to + ' in ' + this.getRefText(from) + ")";
      //ast.to取值
      var vm = local.context[ast.to];
      if (typeof vm === 'string') {
        value += vm + ' #if( $foreach.hasNext ), #end';
      } else {
        value += JSON.stringify(vm) + '#if( $foreach.hasNext ), #end';
      }
      value += endPart;
      return value;
    },

    getMacro: function(ast){

      var macro = this.macros[ast.id];
      if (macro === undefined) return;

      var guid = utils.guid();
      var contextId = 'macro:' + guid;
      var local = {
        type: 'macro',
        variable: this._getArgus(macro.args),
        maps: ast.args,
        context: {}
      };

      this.local[contextId] = local;
      this.conditions.push(contextId);
      this._render(macro.asts);

      this.conditions.pop();
    },

    _getArgus: function(args){
      var ret = [];
      utils.forEach(args, function(arg){
        ret.push(arg.id);
      });
      return ret;
    }
  });
};
