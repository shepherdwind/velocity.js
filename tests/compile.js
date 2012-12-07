var Velocity = require('../src/velocity');
var Parser = Velocity.Parser;
var Compile = Velocity.Compile;
var assert = require("assert");

describe('Compile', function(){

  describe('Set', function(){

    function render(str, context){
      var compile = new Compile(Parser.parse(str));
      compile.render(context);
      return compile.context;
    }

    var vms = [
      '#set( $monkey = $bill ) ## variable reference',
      '#set( $monkey.Friend = "monica" ) ## string literal',
      '#set( $monkey.Blame = $whitehouse.Leak ) ## property reference',
      '#set( $monkey.Plan = $spindoctor.weave($web) ) ## method reference',
      '#set( $monkey.Number = 123 ) ##number literal',
      '#set( $monkey.Say = ["Not", $my, "fault"] ) ## ArrayList',
      '#set( $monkey.Map = {"banana" : "good", "roast beef" : "bad"}) ## Map'
    ];

    var ret = render(vms[0], {bill: "hello"});
    var whitehouse = {
      whitehouse: {
        Leak: "hello world"
      }
    };

    var spindoctor = {
      spindoctor: {
        weave: function(name){
          return name;
        }
      },
      web: "name"
    };
    var list = ["Not", "my", "fault"];
    var map = {"banana" : "good", "roast beef" : "bad"};

    it('set reference value', function(){

      assert.equal("hello"       , ret.monkey);
      assert.equal("monica"      , render(vms[1]).monkey.Friend);
      assert.equal("hello world" , render(vms[2], whitehouse).monkey.Blame);
      assert.equal("name"        , render(vms[3], spindoctor).monkey.Plan);
      assert.equal(123           , render(vms[4]).monkey.Number);

      assert.deepEqual(list , render(vms[5], {my: "my"}).monkey.Say);
      assert.deepEqual(map  , render(vms[6], {my: "my"}).monkey.Map);

    });

    it('expression simple math', function(){

      assert.equal(10 , render('#set($foo = 2 * 5)').foo);
      assert.equal(2  , render('#set($foo = 4 / 2)').foo);
      assert.equal(-3 , render('#set($foo = 2 - 5)').foo);
      assert.equal(7  , render('#set($foo = 7)').foo);

    });

    it('expression complex math', function(){
      assert.equal(20  , render('#set($foo = (7 + 3) * (10 - 8))').foo);
      assert.equal(-20 , render('#set($foo = -(7 + 3) * (10 - 8))').foo);
      assert.equal(-1  , render('#set($foo = -7 + 3 * (10 - 8))').foo);
    })

    it('expression compare', function(){
      assert.equal(false , render('#set($foo = 10 > 11)').foo);
      assert.equal(true  , render('#set($foo = 10 < 11)').foo);
      assert.equal(true  , render('#set($foo = 10 != 11)').foo);
      assert.equal(false , render('#set($foo = 10 == 11)').foo);
    });

    it('expression logic', function(){
      assert.equal(false , render('#set($foo = 10 == 11 && 3 > 1)').foo);
      assert.equal(true  , render('#set($foo = 10 < 11 && 3 > 1)').foo);
      assert.equal(true  , render('#set($foo = 10 > 11 || 3 > 1)').foo);
      assert.equal(true  , render('#set($foo = !(10 > 11) && 3 > 1)').foo);
      assert.equal(false , render('#set($foo = $a > $b)', {a: 1, b: 2}).foo);
      assert.equal(false , render('#set($foo = $a && $b)', {a: 1, b: 0}).foo);
      assert.equal(true  , render('#set($foo = $a || $b)', {a: 1, b: 0}).foo);
    });

  });

  function render(str, context){
    var compile = new Compile(Parser.parse(str));
    return compile.render(context);
  }

  describe('Literals', function(){

    it("eval string value", function(){

      var vm = '#set( $directoryRoot = "www" )' + 
               '#set( $templateName = "index.vm")' +
               '#set( $template = "$directoryRoot/$templateName" )' +
               '$template';

      assert.equal('www/index.vm', render(vm));

    });

    it('not eval string', function(){
      var vm = "#set( $blargh = '$foo' )$blargh";
      assert.equal('$foo', render(vm));
    });

    it('not parse #[[ ]]#', function(){
      var vm = '#foreach ($woogie in $boogie) nothing to $woogie #end'
      assert.equal(vm, render('#[[' + vm + ']]#'));
    });

  });

  describe('Conditionals', function(){

    it('#if', function(){
      var vm = '#if($foo)Velocity#end';
      assert.equal('Velocity', render(vm, {foo: 1}));
    });

    it('#elseif & #else', function(){
      var vm = '#if($foo < 5)Go North#elseif($foo == 8)Go East#{else}Go South#end';
      assert.equal('Go North' , render(vm, {foo: 4}));
      assert.equal('Go East'  , render(vm, {foo: 8}));
      assert.equal('Go South' , render(vm, {foo: 9}));
    });

  });

  describe('Loops', function(){

    it('#foreach', function(){
      var vm = '#foreach( $product in $allProducts )<li>$product</li>#end';
      var data = {allProducts: ["book", "phone"]};
      assert.equal('<li>book</li><li>phone</li>', render(vm, data));
    });

    it('#break', function(){
      var vm = '#foreach($num in [1..6]) #if($foreach.count > 3) #break #end $num #end';
      assert.equal('  1   2   3     4 ', render(vm));
    });

  });

  describe('Velocimacros', function(){
    it('simple #macro', function(){
      var vm = '#macro( d )<tr><td></td></tr>#end #d()';
      assert.equal(' <tr><td></td></tr>', render(vm));
    });
  });

});
