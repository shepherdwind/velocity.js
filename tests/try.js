var Velocity = require('../src/velocity')
var assert = require("assert")
var Parser = Velocity.Parser
var Compile = Velocity.Compile

describe('Compile', function() {

  var render = Velocity.render;

  describe('test examples', function() {

    it('Array prototype', function() {

      Array.prototype.contains = Array.prototype.contains ||
        function(val) {
          return !!~this.indexOf(val)
        };
      var vm = '#if($config.mod.contains("sns"))sns#end'

      var excepted = 'sns';
      assert.equal(render(vm, { config: { mod: ['sns', 'a'] }}), excepted)
    })

  })

})

