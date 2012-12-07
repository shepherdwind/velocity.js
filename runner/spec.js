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
describe('Parser', function(){

  describe('simple references', function(){

    it('simple references', function(){

      var vm = 'hello world: $foo';
      var ret = Parser.parse(vm);

      assert.ok(ret instanceof Array);
      assert.equal(2               , ret.length);
      assert.equal('hello world: ' , ret[0]);
      assert.equal('foo'           , ret[1].id);

    });

    it('valid variable references', function(){
      var vm = '$mud-Slinger_1';
      assert.equal('mud-Slinger_1', Parser.parse(vm)[0].id);
    });

    it('wraped references', function(){
      var vm = '${mudSlinger}';
      var ast = Parser.parse(vm)[0];
      assert.equal(true         , ast.isWraped);
      assert.equal('mudSlinger' , ast.id);
    });

    it('function call references', function(){
      var ast = Parser.parse('$foo()')[0];
      assert.equal(false, ast.args);
      assert.equal('references', ast.type);
    });

  });

  describe('Properties', function(){

    it('simple property', function(){
      var vm = '$customer.Address';
      var asts = Parser.parse(vm);
      assert.deepEqual(asts[0], {
        id     : "customer",
        type   : "references",
        path   : [{"type": "property","id": "Address"}],
        leader : '$'
      });
    });

  });

  describe('Methods ', function(){

    it('with no arguments', function(){
      var vm  = '$foo.bar()';
      var ast = Parser.parse(vm)[0];

      assert.deepEqual(ast['path'], [{
        type : "method",
        id   : "bar",
        args : false
      }]);
    });

    it('with arguments integer', function(){
      var vm = '$foo.bar(10)';
      var ast = Parser.parse(vm)[0];

      assert.deepEqual(ast['path'], [{
        type : "method",
        id   : "bar",
        args : [{
          type  : "integer",
          value : "10"
        }]
      }]);
    });

    it('with arguments references', function(){
      var vm = '$foo.bar($bar)';
      var ast = Parser.parse(vm)[0];
      assert.deepEqual(ast.path[0].args, [{
        type   : "references",
        leader : "$",
        id     : "bar"
      }]);
    });

  });

  describe('Index', function(){

    it('all kind of indexs', function(){

      var vm = '$foo[0] $foo[$i] $foo["bar"]';
      var asts = Parser.parse(vm);

      assert.equal(5, asts.length);

      //asts[0].path[0] => $foo[0] 
      //{type: 'index', id: {type: 'integer', value: '0'}}
      assert.equal('index'   , asts[0].path[0].type);
      assert.equal('integer' , asts[0].path[0].id.type);
      assert.equal('0'       , asts[0].path[0].id.value);

      //asts[2].path[0] => $foo[$i]
      //{type: 'references', id: {type:'references', id: 'i', leader: '$'}}
      assert.equal('index'      , asts[2].path[0].type);
      assert.equal('references' , asts[2].path[0].id.type);
      assert.equal('i'          , asts[2].path[0].id.id);

      //asts[4].path[0] => $foo["bar"]
      //{type: 'index', id: {type: 'string', value: 'bar', isEval: true}}
      assert.equal('index'  , asts[4].path[0].type);
      assert.equal('string' , asts[4].path[0].id.type);
      assert.equal('bar'    , asts[4].path[0].id.value);

    });

  });

  describe('complex references', function(){

    it('property + index + property', function(){

      var vm = '$foo.bar[1].junk';
      var ast = Parser.parse(vm)[0];

      assert.equal('foo' , ast.id);
      assert.equal(3     , ast.path.length);

      var paths = ast.path;

      assert.equal('property' , paths[0].type);
      assert.equal('index'    , paths[1].type);
      assert.equal('property' , paths[2].type);

    });


    it('method + index', function(){

      var vm = '$foo.callMethod()[1]';
      var ast = Parser.parse(vm)[0];

      assert.equal(2, ast.path.length);

      assert.equal('method'     , ast.path[0].type);
      assert.equal('callMethod' , ast.path[0].id);

      assert.equal('index'   , ast.path[1].type);
      assert.equal('1'       , ast.path[1].id.value);
      assert.equal('integer' , ast.path[1].id.type);

    });

    it('property should not start with alphabet', function(){

      var asts = Parser.parse('$foo.124');
      var ast1 = Parser.parse('$foo._24')[0];
      var ast2 = Parser.parse('$foo.-24')[0];

      assert.equal(2         , asts.length);
      assert.equal('foo'     , asts[0].id);
      assert.equal('.1'      , asts[0].path[0].value);
      assert.equal('content' , asts[0].path[0].type);
      assert.equal('24'      , asts[1]);

      assert.equal('._'      , ast1.path[0].value);
      assert.equal('content' , ast1.path[0].type);
      assert.equal('.-'      , ast2.path[0].value);
      assert.equal('content' , ast2.path[0].type);

    });

    it('index should end with close bracket', function(){

      assert.throws(function(){
        Parser.parse("$foo.bar['a'12]");
      }, /Parse error/);

      assert.throws(function(){
        Parser.parse("$foo.bar[_a'12]");
      }, /Lexical error/);

    });

  });

  describe('comment identify', function(){

    it('one line comment', function(){

      var asts = Parser.parse('#set( $monkey.Number = 123)##number literal');

      assert.equal(2         , asts.length);
      assert.equal('comment' , asts[1].type);

    });

    //it('escape slash');

  });

});
