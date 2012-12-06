var Parser = require('../src/parse/');
var fs = require('fs');
var BackStep = require('../src/helper/backstep');

var vm = fs.readFileSync('./backstep/foreach.vm').toString();
var html = fs.readFileSync('./backstep/foreach.htm').toString();
var asts = Parser.parse(vm);
var backstep = new BackStep(asts, html);
console.log(backstep.context);
