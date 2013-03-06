/**
 * test for jsonify helper
 */
var assert = require("assert");
var Parser = require('../../src/velocity').Parser;
var Jsonify = require('../../src/velocity').Helper.Jsonify;
var fs = require('fs');
var path = require('path');

describe('Jsonify', function(){

  function getContext(vm, context, macros){
    var jsonify = new Jsonify(Parser.parse(vm), context, macros);
    return jsonify.toVTL();
  }

  function getVmFile(name){
    name = path.join(__dirname, name + '.vm');
    var jsonFile = name.replace(/\.vm$/, '-json.vm');
    var readFile = fs.readFileSync;
    return [(readFile(name)).toString(), (readFile(jsonFile)).toString()];
  }

  function trimStr(str){
    return str.replace(/\s+/g, '');
  }

  it('simple references', function(){
    var strs = getVmFile('simple'); 
    var str1 = trimStr(getContext(strs[0]));
    var str2 = trimStr(strs[1]);
    assert.equal(str1, str2);
  });

  it('simple macros', function(){
    var strs = getVmFile('simple-macros'); 
    var str1 = trimStr(getContext(strs[0]));
    var str2 = trimStr(strs[1]);
    assert.equal(str1, str2);
  });

  it('simple foreach', function(){
    var strs = getVmFile('foreach'); 
    var str1 = trimStr(getContext(strs[0]));
    var str2 = trimStr(strs[1]);
    assert.equal(str1, str2);
  });

  it('rewrite macros and inner api', function(){
    function loadVFile(txt){
      var file = __dirname + '/'+ txt;
      if (fs.existsSync(file)) {
        this.eval(fs.readFileSync(file).toString());
      }
    }
    
    var strs = getVmFile('macros'); 
    var str1 = trimStr(getContext(strs[0], {ctrl: {load: loadVFile}}, {parse: loadVFile}));
    var str2 = trimStr(strs[1]);
    assert.equal(str1, str2);
  });
});
