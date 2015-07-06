'use strict';

var Velocity = require('../src/velocity');
var render = Velocity.render;

describe('stop', function() {
  it('should support #stop', function() {
    var str = `hello #stop('hello') world`;
    render(str).trim().should.eql('hello');
  });

  it('should support #stop in loop', function() {
    var str = `
      <ul>
        #foreach( $product in $items )
        #if ($product == 'world') #stop() #end
        <li>$product</li>
        #end
      </ul>
    `;
    var ret = render(str, { items: ['hello', 'world']}).trim();
    ret.should.containEql('<li>hello</li>');
    ret.should.not.containEql('<li>world</li>');
  });

  it('should support #stop in #parse', function() {
    var str = `
      <p>hello</p>
      #parse($a)
      this should stop ouput
    `;
    var ret = render(str, {
      a: `
        this is a
        #stop('stop a')
        this is stop end
      `
    }, {
      parse: function(template) {
        return this.eval(template);
      }
    }).trim();
    ret.should.containEql('<p>hello</p>');
    ret.should.containEql('this is a');
    ret.should.not.containEql('stop');
  });
});
