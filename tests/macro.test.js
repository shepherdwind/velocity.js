var Velocity = require('../src/velocity')
var assert = require("assert")
var render = Velocity.render;


describe('macro_body', function() {
  it('#@foo()', function() {
    var vm = '#macro( d ) <tr><td>$!bodyContent</td></tr> #end #@d()Hello!#end'
    assert('<tr><td>Hello!</td></tr>', render(vm, {}).trim());
  });
  it('#@ with template', function() {
    var vm = '#macro( d ) <tr><td>$!bodyContent</td></tr> #end #@d()Hello $nick!#end'
    assert('<tr><td>Hello foo!</td></tr>', render(vm, { nick: 'foo' }).trim());
  });
});
