var Parser  = require('./parse/');
var utils   = require('./utils');
var Compile = require('./compile/');
var Helper  = {};

Compile.Parser = Parser;
Parser._parse = Parser.parse;

Parser.parse = function (str) {
  var asts = Parser._parse(str);

  /**
   * remove all newline after all direction such as `#set, #each`
   */
  utils.forEach(asts, function trim(ast, i){
    if (ast.type && ast.type !== 'references') {
      var _ast = asts[i + 1];
      if (typeof _ast === 'string' && _ast.slice(0, 1) === "\n") {
        asts[i + 1] = _ast.slice(1);
      }
    }
  });

  return utils.makeLevel(asts);
};

Helper.Structure = require('./helper/structure');
Helper.Jsonify   = require('./helper/jsonify');
Helper.BackStep  = require('./helper/backstep');

var Velocity = {
  Parser  : Parser,
  Compile : Compile,
  Helper  : Helper,
  Jsonify : Helper.Jsonify
};

Velocity.render = function (template, context, macros) {

  var t1   = Date.now();
  var asts = Parser.parse(template);
  var t2   = Date.now();
  //var str  = 'parse syntax tree finished, cost time: ' + (t2 - t1)+ 'ms.';

  var compile = new Compile(asts);
  return compile.render(context, macros);
};

module.exports = Velocity;
