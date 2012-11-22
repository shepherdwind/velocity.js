module.exports = function(Helper, utils){
  /**
   * 获取引用文本，当引用自身不存在的情况下，需要返回原来的模板字符串
   */
  function getRefText(ast){

    var ret = ast.leader;

    if (ast.isWraped) ret += '{';

    ret += ast.id;
    utils.forEach(ast.path, function(ref){
      //不支持method并且传递参数
      if (ref.type == 'method') {

        var args = [];

        utils.forEach(ref.args, function(arg){

          if (arg.type === 'string') {

            var sign = arg.isEval? '"': "'";
            var text = sign + arg.value + sign;
            args.push(text);

          } else {

            args.push(getRefText(arg));

          }

        });

        ret += '.' + ref.id + '(' + args.join(',') + ')';

      } else if (ref.type == 'index') {

        var text = '';
        var id = ref.id;

        if (id.type === 'integer') {

          text = id.value;

        } else if (id.type === 'string') {

          var sign = id.isEval? '"': "'";
          text = sign + id.value + sign;

        } else {

          text = getRefText(id);

        }

        ret += '[' + text + ']';

      } else if (ref.type == 'property') {

        ret += '.' + ref.id;

      }

    }, this);

    if (ast.isWraped) ret += '}';

    return ret;
  }

  Helper.getRefText = getRefText;
};
