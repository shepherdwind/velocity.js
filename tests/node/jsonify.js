/**
 * test for jsonify helper
 */
var assert = require("assert");
var Parser = require('../../src/velocity').Parser;
var Jsonify = require('../../src/velocity').Helper.Jsonify;

describe('Jsonify', function(){
  function getContext(vm){
    var jsonify = new Jsonify(Parser.parse(vm));
    return jsonify.toVTL();
  }

  function getJson(obj){
    return JSON.stringify(obj, false, 2);
  }
  it('simple references', function(){
    var vm = '$foo.bar';
    assert.equal(getContext(vm), getJson({foo: {bar: '#jsonifyGetString($foo.bar)'} }));
  });

  it('method call', function(){
    var vm = '$foo.bar($user.name)';
    assert.equal(getContext(vm), getJson({foo: {bar: 'Function(){}'} }));
  });

  it('method call, return map', function(){
    var vm = '$foo.bar($user.name).bar';
    //console.log(getContext(vm));
  });

});
