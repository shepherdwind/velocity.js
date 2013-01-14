module.exports = function(Velocity, utils, BLOCK_TYPES){

  // 基本数据结构
  var TYPE_STRING   = 'variable';
  var TYPE_ARRAY    = 'foreach:normal';
  var TYPE_MAP_ALL  = 'foreach:entrySet';
  var TYPE_MAP_KEYS = 'foreach:keySet';
  var TYPE_METHOD   = 'method';

  function getPath(ast){

    var ret = [ast.id];

    utils.forEach(ast.path, function(a){

      if (a.type === 'index') {
        if (a.id && (a.id.type === 'integer' || a.id.type === 'string')) 
          ret.push(a.id.value);
      } else {
        ret.push(a.id);
      }

    });

    return ret;
  }

  utils.mixin(Velocity.prototype, {

    toBasicType: function(astType){

      if (astType.ignore) return;

      var ast = astType.real;
      if (ast.type === 'foreach') ast = ast.from;

      var paths = getPath(ast);
      var last  = paths.pop();
      var context = this.context;
      var leafs = this.leafs;
      var len   = leafs.length;

      if (astType.foreach === true && astType.type === 'method') {
        if (last === 'entrySet' || last === 'keySet') last = paths.pop();
      }

      utils.forEach(paths, function(path){
        if (!context[path]) {
          context[path] = {};
          context = context[path];
        }
      }, this);

      leafs.push(astType);
      context[last] = '{@' + len + '@}';
    },

    toVTL: function(){
      var leafs = this.leafs;
      var context = JSON.stringify(this.context, false, 2);

      utils.forEach(leafs, function(leaf, i){
        var tpl = '"{@' + i + '@}"';
        var str = this.getLeaf(leaf);
        context = context.replace(tpl, str);
      }, this);

      return context;
    },

    getLeaf: function(leaf){
      var ret = '';
      var real = leaf.real;

      if (!leaf.foreach) {
        ret = this._callMacro('jsonifyGetString', this.getRefText(real));
      } else {
        if (leaf.foreach === true && real.from) {
          ret = this.getEachVTL(leaf);
        } else {
          ret = '"Function(){}"';
          //ret = this.getMethodCall(leaf);
        }
      }

      return ret;
    },

    getMethodCall: function(leaf){

      var args, returnVal;
      var ret = {
        __isMethod: true
      };

      returnVal = this._callMacro('jsonifyGetString', this.getRefText(leaf.real));

      if (leaf.foreach) {
        var real = leaf.real;
        var len = real.path && real.path.length;
        var last = len ? real.path[len - 1] : real;
        args = utils.map(last.args, function(ast){
          return this._callMacro('jsonifyGetString', this.getRefText(ast));
        }, this);
        returnVal = this._creatEach(leaf.foreach, args, returnVal);
      }

      ret.args = args;
      ret.returnVal = returnVal;
      return JSON.stringify(ret, false, 2);
    },

    _creatEach: function(foreach, args, value){
      var tpl = '#foreach(${list} in {$lists}) {' +
                '  "{$args}" : "{$value}" #if($foreach.hasNext) , #end '+
                '} #end';
      var getText = this.getRefText;
      tpl = tpl.replace('{$lists}', getText(foreach.from));
      tpl = tpl.replace('{list}', foreach.to);
      tpl = tpl.replace('{$args}', args);
      tpl = tpl.replace('{$value}', value);
      return tpl;
    },

    _callMacro: function(macro, args){
      args = utils.isArray(args) ? args.join(' ') : args;
      return '#' + macro + '(' + args + ')';
    },

    getEachVTL: function(leaf){
      var real = leaf.real;
      var paths = getPath(real.from);
      var last  = paths.pop();
      var macro = 'jsonifyGetList';

      if (leaf.type === 'method' && last === 'entrySet') {
        macro = 'jsonifyGetEntryMap';
      } else if (leaf.type === 'method' && last === 'keySet') {
        macro = 'jsonifyGetKeyMap';
      }

      return this._callMacro(macro, this.getRefText(real.from));
    }

  });

};
