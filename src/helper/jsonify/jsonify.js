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
      console.log(context);
    },

    getLeaf: function(leaf){
      var ret = '';
      var real = leaf.real;

      if (!leaf.foreach) {
        ret = this.getRefText(real);
      } else {
        if (leaf.foreach === true && real.from) {
          ret = this.getEachVTL(leaf);
        } else {
          var paths = getPath(leaf);
        }
      }

      return ret;
    },

    getEachVTL: function(leaf){
      var real = leaf.real;
      var paths = getPath(real);
      var last  = paths.pop();
      var macro = 'jsonifyGetList';
      if (leaf.type === 'method' && last === 'entrySet') {
        macro = 'jsonifyGetEntryMap';
      } else if (leaf.type === 'method' && last === 'keySet') {
        macro = 'jsonifyGetKeyMap';
      }
      var ret = '#' + macro + '(' + this.getRefText(real.from) + ')';

      return ret;
    }

  });

};
