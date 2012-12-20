var Parser = require('../src/parse/');
var fs = require('fs');
var Jsonify = require('../src/helper/jsonify');

var vm = fs.readFileSync('./backstep/pg.vm').toString();
var asts = Parser.parse(vm);
var jsonify = new Jsonify(asts);
console.log(jsonify.context);
console.log(JSON.stringify(jsonify.jsonify, false, 2));
