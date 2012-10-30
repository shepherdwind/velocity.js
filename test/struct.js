var Parser = require('../src/parse/');
var fs = require('fs');
var Structure = require('../src/structure');

var vm = fs.readFileSync('references.vm').toString();
var asts = Parser.parse(vm);
var struct = new Structure(asts);
console.log(JSON.stringify(struct.getStruct()));
