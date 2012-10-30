var Parser = require('./parse/');
var utils = require('./utils');
var Compile = require('./compile/');
var Velocity = {
  Parser: Parser,
  Compile: Compile
};

Velocity.render = function(template, context){
  var t1 = Date.now();
  var asts = Parser.parse(template);
  var t2 = Date.now();
  var str = 'parse syntax tree finished, cost time: ' + (t2 - t1)+ 'ms.';
  console.log(str);

  var compile = new Compile(asts);
  return compile.render(context);
};


module.exports = Velocity;
