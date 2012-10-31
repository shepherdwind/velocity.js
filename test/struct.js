var Parser = require('../src/parse/');
var fs = require('fs');
var Structure = require('../src/helper/structure');

var vm = fs.readFileSync('struct.vm').toString();
var asts = Parser.parse(vm);
var struct = new Structure(asts);
console.log(struct.context);
//console.log(JSON.stringify(struct.context));
