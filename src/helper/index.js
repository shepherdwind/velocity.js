var Helper = {};
var utils = require('../utils');
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
      ret += '.' + ref.id + '()';
    } else if (ref.type == 'index') {
      var text = '';
      var id = ref.id;
      if (id.type === 'integer') {
        text = id.value;
      } else if (id.type === 'string') {
        text = id.value;
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
module.exports = Helper;
