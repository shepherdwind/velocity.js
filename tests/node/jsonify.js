/**
 * test for jsonify helper
 */
var assert = require("assert");
var Parser = require('../../src/velocity').Parser;
var Jsonify = require('../../src/velocity').Helper.Jsonify;

describe('Jsonify', function(){
  function getContext(vm){
    var jsonify = new Jsonify(Parser.parse(vm));
    return jsonify.context;
  }

  it('simple references', function(){
    var vm = '$foo.bar';
    var context = getContext(vm).strings;
    assert.deepEqual(context, { foo: {bar: '$foo.bar'} });
  });

  it('method call', function(){
    var vm = '$foo.bar($user.name)';
    var context = getContext(vm).methods;
    assert.equal(context.foo.bar[0][0], "$user.name");
    assert.equal(context.foo.bar[0][1], "$foo.bar($user.name)");
  });

  it('method call, return map', function(){
    var vm = '$foo.bar($user.name).bar';
    var context = getContext(vm).methods;
    assert.equal(context.foo.bar, undefined);
  });

});
