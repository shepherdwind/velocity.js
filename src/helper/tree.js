/**
 * tree helper, 生成vm引用关系树
 */
"use strict";
/**
 * velocity数据结构构造，根据vm文件，构造数据结构
 */
var utils = require('../utils');
var Helper = require('./index');
var Velocity = require('../velocity');
var path = require('path');
var fs = require('fs');
var BLOCK_TYPES = ['if', 'foreach', 'macro'];

function Tree(){
  this.init.apply(this, arguments);
}

Tree.prototype = {

  constructor: Tree,

  init: function(baseFile){
    this.basePath = path.dirname(baseFile);
    var baseName = path.basename(baseFile);
    this.tree = {};
    this.asts = {};
    this.getTree(baseName);
  },

  getTree: function(file){

    var str = fs.readFileSync(this.basePath + '/' + file).toString();

    if (this.asts[file]) {
      return;
    } else {
      var asts = Velocity.Parser.parse(str);
      this.asts[file] = asts;
      return this.getIncFiles(asts);
    }

  },

  getIncFiles: function(asts){

    var block = [];
    var index = 0;

    utils.forEach(asts, function(ast){
      var type = ast.type;

      //foreach if macro时，index加一
      if (BLOCK_TYPES.indexOf(type) > -1) index ++;

      if (type === 'comment') return;

      if (index) {
        type === 'end' && index--;
        if (index) {
          block.push(ast);
          return;
        }
      }

      switch(type) {
        case 'references':
        break;

        case 'set':
        break;

        case 'break':
        this.setBreak = true;
        break;

        case 'macro_call':
        this.getMacro(ast);
        break;

        case 'end':
        //使用slide获取block的拷贝
        this.getBlock(block.slice());
        block = [];
        break;

        default:
        if (utils.isArray(ast)) this.getBlock(ast);
        break;
        // code
      }
    }, this);

  }

};
