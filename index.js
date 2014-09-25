'use strict';
var Parser  = require('./src/parse/index');
var utils   = require('./src/utils');
var Compile = require('./src/compile/index');
var Helper  = {};

Parser._parse = Parser.parse;

Parser.parse = function (str) {
  var asts = Parser._parse(str);
  return utils.makeLevel(asts);
};

var Velocity = {
  Parser  : Parser,
  Compile : Compile
};

Velocity.render = function (template, context, macros) {
  var asts = Parser.parse(template);
  var compile = new Compile(asts);
  return compile.render(context, macros);
};

module.exports = Velocity;
