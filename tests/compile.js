var Velocity = require('../src/velocity');
var Parser = Velocity.Parser;
var Compile = Velocity.Compile;
var assert = require("assert");

describe('Compile', function(){

  describe('Directives', function(){

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

});
