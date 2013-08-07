var Parser  = require('./parse/');
var utils   = require('./utils');
var Compile = require('./compile/');
var Helper  = {};

Compile.Parser = Parser;
Parser._parse = Parser.parse;

Parser.parse = function (str) {
  var asts = Parser._parse(str);
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
