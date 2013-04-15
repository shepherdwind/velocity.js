describe('Compile', function(){

  function render(str, context, macros){
    var compile = new Compile(Parser.parse(str));
    return compile.render(context, macros);
  }

  function getContext(str, context, macros){
    var compile = new Compile(Parser.parse(str));
    compile.render(context, macros);
    return compile.context;
  }

  describe('References', function(){

    it('get/is method', function(){
      var vm = '$customer.getAddress()';
      var vm1 = '$customer.get("Address") $customer.isAddress()';

      assert.equal('bar'    , render(vm, {customer: {Address: "bar"}}));
      assert.equal('bar bar', render(vm1, {customer: {Address: "bar"}}));
    });

    it('index notation', function(){
      var vm = '$foo[0] $foo[$i] $foo.get(1)';
      assert.equal('bar haha haha', render(vm, {foo: ["bar", "haha"], i: 1}));
    });

    it('set method', function(){
      var vm = '$page.setTitle( "My Home Page" ).setname("haha")$page.Title $page.name';
      assert.equal('My Home Page haha', render(vm));
    });

    it('size method', function(){
      var vm = '$foo.bar.size()';
      assert.equal('2', render(vm, {foo: {bar: [1, 2]}}));
      assert.equal('2', render(vm, {foo: {bar: {a: 1, b: 3}}}));

      var vm2 = '#if($foo.bar.size()) ok #{else} nosize #end';
      assert.equal(' nosize ', render(vm2, {foo: {bar: 123}}));
      assert.equal(' nosize ', render(vm2, {foo: {}}));
    });

    it('quiet reference', function(){
      var vm = 'my email is $email';
      var vmquiet = 'my email is $!email';
      assert.equal(vm, render(vm));
      assert.equal('my email is ', render(vmquiet));
    });

    it('silence all reference', function(){
      var vm = 'my email is $email';

      var compile = new Compile(Parser.parse(vm));
      assert.equal('my email is ', compile.render(null, null, true));
    });

    it('this context keep correct, see #16', function(){
      var data = 'a = $a.get()';
      Compile.Parser = Parser;
      function b(c) {
        this.c = c;
      }
      b.prototype.get = function() {
        var t = this.eval("; hello $name", {name: 'hanwen'});
        return this.c + t;
      };

      assert.equal('a = 1; hello hanwen', render(data, {a: new b(1)}));
    });

  });

  describe('Set && Expression', function(){

    it('set equal to reference', function(){
      var vm = '#set( $monkey = $bill ) ## variable reference';
      assert.equal("hello", getContext(vm, {bill: 'hello'}).monkey);
    });

    it('empty map', function(){
      var vm = '#set($foo = {})'
      assert.deepEqual({}, getContext(vm).foo);
    });

    it('set equal to literal', function(){
      var vm = "#set( $monkey.Friend = 'monica' ) ## string literal\n" +
               '#set( $monkey.Number = 123 ) ##number literal';
      assert.equal("monica", getContext(vm).monkey.Friend);
      assert.equal("123"   , getContext(vm).monkey.Number);
    });

    it('equal to method/property reference', function(){
      var vm = "#set($monkey.Blame = $spindoctor.Leak) ## property \n" +
               '#set( $monkey.Plan = $spindoctor.weave($web) ) ## method';
      var obj = {
        spindoctor: {
          weave: function(name){
            return name;
          },
          Leak: "hello world"
        },
        web: "name"
      };

      assert.equal("hello world" , getContext(vm, obj).monkey.Blame);
      assert.equal("name"        , getContext(vm, obj).monkey.Plan);
    });


    it('equal to map/list', function(){
      var vms = [
        '#set( $monkey.Say = ["Not", $my, "fault"] ) ## ArrayList',
        '#set( $monkey.Map = {"banana" : "good", "roast beef" : "bad"}) ## Map'
      ];

      var list = ["Not", "my", "fault"];
      var map = {"banana" : "good", "roast beef" : "bad"};
      assert.deepEqual(list , getContext(vms[0], {my: "my"}).monkey.Say);
      assert.deepEqual(map  , getContext(vms[1]).monkey.Map);
    });

    it('expression simple math', function(){
      assert.equal(10 , getContext('#set($foo = 2 * 5)').foo);
      assert.equal(2  , getContext('#set($foo = 4 / 2)').foo);
      assert.equal(-3 , getContext('#set($foo = 2 - 5)').foo);
      assert.equal(1  , getContext('#set($foo = 5 % 2)').foo);
      assert.equal(7  , getContext('#set($foo = 7)').foo);
    });

    it('math with decimal', function(){
      assert.equal(10.5 , getContext('#set($foo = 2.1 * 5)').foo);
      assert.equal(2.1  , getContext('#set($foo = 4.2 / 2)').foo);
      assert.equal(-7.5 , getContext('#set($foo = - 2.5 - 5)').foo);
    });

    it('expression complex math', function(){
      assert.equal(20  , getContext('#set($foo = (7 + 3) * (10 - 8))').foo);
      assert.equal(-20 , getContext('#set($foo = -(7 + 3) * (10 - 8))').foo);
      assert.equal(-1  , getContext('#set($foo = -7 + 3 * (10 - 8))').foo);
    });

    it('expression compare', function(){
      assert.equal(false , getContext('#set($foo = 10 > 11)').foo);
      assert.equal(true  , getContext('#set($foo = 10 < 11)').foo);
      assert.equal(true  , getContext('#set($foo = 10 != 11)').foo);
      assert.equal(true  , getContext('#set($foo = 10 <= 11)').foo);
      assert.equal(true  , getContext('#set($foo = 11 <= 11)').foo);
      assert.equal(false , getContext('#set($foo = 12 <= 11)').foo);
      assert.equal(true  , getContext('#set($foo = 12 >= 11)').foo);
      assert.equal(false , getContext('#set($foo = 10 == 11)').foo);
    });

    it('expression logic', function(){
      assert.equal(false , getContext('#set($foo = 10 == 11 && 3 > 1)').foo);
      assert.equal(true  , getContext('#set($foo = 10 < 11 && 3 > 1)').foo);
      assert.equal(true  , getContext('#set($foo = 10 > 11 || 3 > 1)').foo);
      assert.equal(true  , getContext('#set($foo = !(10 > 11) && 3 > 1)').foo);
      assert.equal(false , getContext('#set($foo = $a > $b)', {a: 1, b: 2}).foo);
      assert.equal(false , getContext('#set($foo = $a && $b)', {a: 1, b: 0}).foo);
      assert.equal(true  , getContext('#set($foo = $a || $b)', {a: 1, b: 0}).foo);
    });

  });

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
      var vm = '#foreach ($woogie in $boogie) nothing to $woogie #end';
      assert.equal(vm, render('#[[' + vm + ']]#'));
    });

    it('Range Operator', function(){
      var vm1 = '#set($foo = [-1..2])';
      var vm2 = '#set($foo = [-1..$bar])';
      var vm3 = '#set($foo = [$bar..2])';
      assert.deepEqual([-1, 0, 1, 2], getContext(vm1).foo);
      assert.deepEqual([-1, 0, 1, 2], getContext(vm2, {bar: 2}).foo);
      assert.deepEqual([-1, 0, 1, 2], getContext(vm3, {bar: -1}).foo);
      assert.deepEqual([], getContext('#set($foo = [$bar..1])').foo);
    });

    it('map and array nest', function(){
      var vm1 = '' +
        '#set($a = [\n' +
        '  {"name": 1},\n' +
        '  {"name": 2}\n' +
        '])\n' +
        ' ';

      var vm2 = '' +
        '#set($a = {\n' +
        '  "a": [1, 2, ["1", "a"], {"a": 1}],\n' +
        '  "b": "12",\n' +
        '  "c": false\n' +
        '})\n' +
        '' ;

      assert.deepEqual([{name: 1}, { name: 2 }], getContext(vm1).a);
      assert.deepEqual({a: [1, 2, ["1", "a"], {a: 1}], b: "12", c: false}, getContext(vm2).a);
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

    it('#if with arguments', function(){
      var vm = '#if($foo.isTrue(true))true#end';
      var foo = {
        isTrue: function(str) {
          return !!str;
        }
      }

      assert.equal('true', render(vm, {foo: foo}));
    });

  });

  describe('Loops', function(){

    it('#foreach', function(){
      var vm = '#foreach( $product in $allProducts )<li>$product</li>#end';
      var data = {allProducts: ["book", "phone"]};
      assert.equal('<li>book</li><li>phone</li>', render(vm, data));
    });

    it('#foreach with map', function(){
      var vm   = '#foreach($key in $products) name => $products.name #end';
      var data = {products: {name: "hanwen"}};
      assert.equal(' name => hanwen ', render(vm, data));
    });

    it('#foreach with map keySet', function(){
      var vm = '#foreach($key in $products.keySet()) $key => $products.get($key) #end';
      var data = {products: {name: "hanwen"}};
      assert.equal(' name => hanwen ', render(vm, data));
    });

    it('#foreach with nest foreach', function(){
      var vm = '#foreach($i in [1..2])${velocityCount}#foreach($j in [2..3])${velocityCount}#end#end';
      assert.equal('112212', render(vm));
    });

    it('#foreach with map entrySet', function(){
      var vm = '' +
               '#set($js_file = {\n' +
               '  "js_arale":"build/js/arale.js?t=20110608",\n'+
               '  "js_ma_template":"build/js/ma/template.js?t=20110608",\n'+
               '  "js_pa_pa":"build/js/pa/pa.js?t=20110608",\n'+
               '  "js_swiff":"build/js/app/swiff.js?t=20110608",\n' +
               '  "js_alieditControl":"build/js/pa/alieditcontrol-update.js?t=20110608"\n' +
               '})\n' +
               '#foreach($_item in $js_file.entrySet())'+
               '$_item.key = $staticServer.getURI("/${_item.value}")\n'+
               '#end';

      var ret = 'js_arale = /path/build/js/arale.js?t=20110608\n' +
                'js_ma_template = /path/build/js/ma/template.js?t=20110608\n' +
                'js_pa_pa = /path/build/js/pa/pa.js?t=20110608\n' +
                'js_swiff = /path/build/js/app/swiff.js?t=20110608\n' +
                'js_alieditControl = /path/build/js/pa/alieditcontrol-update.js?t=20110608\n';

      var data = {
        staticServer: {
          getURI: function(url){
            return '/path' + url;
          }
        }
      };

      assert.equal(ret, render(vm, data));

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

    it('compex #macro', function(){
      var vm = '#macro( d $name)<tr><td>$!name</td></tr>#end #d($foo)';
      var vm1 = '#macro( d $a $b)#if($b)$a#end#end #d ( $foo $bar )';

      assert.equal(' <tr><td>hanwen</td></tr>', render(vm, {foo: 'hanwen'}));
      assert.equal(' <tr><td></td></tr>'      , render(vm));
      assert.equal(' '          , render(vm1, {foo: "haha"}));
      assert.equal(' '          , render(vm1, {foo: "haha", bar: false}));
      assert.equal(' haha'      , render(vm1, {foo: "haha", bar: true}));
    });

    it('#macro call arguments', function(){
      var vm = '#macro( d $a $b $d)$a$b$!d#end #d ( $foo , $bar, $dd )';
      assert.equal(' ab', render(vm, {foo: 'a', bar: 'b'}));
      assert.equal(' abd', render(vm, {foo: 'a', bar: 'b', dd: 'd'}));
    });

    it('#noescape', function(){
      var vm = '#noescape()$hello#end';
      assert.equal('hello world', render(vm, {hello: 'hello world'}));
    });

  });

  describe('Escaping', function(){
    it('escape slash', function(){
      var vm = '#set( $email = "foo" )$email \\$email';
      assert.equal('foo $email', render(vm));
    });

    it('double slash', function(){
      var vm = '#set( $email = "foo" )\\\\$email \\\\\\$email';
      assert.equal("\\foo \\$email", render(vm));
    });

  });

  describe('Error condiction', function(){

    it('css color render', function(){
      var vm = 'color: #666; height: 39px;';
      assert.equal(vm, render(vm));
    });

    it('jquery parse', function(){
      var vm = '$(function(){ $("a").click(); $.post(); })';
      assert.equal(vm, render(vm));
    });

    it('issue #7: $ meet with #', function(){
      var vm = '$bar.foo()#if(1>0)...#end';
      assert.equal('$bar.foo()...', render(vm));
    });

    it('issue #15', function(){
      var vm = '#macro(a $b $list)#foreach($a in $list)${a}#end $b #end #a("hello", [1, 2])';
      assert.equal(' 12 hello ', render(vm));
    });

    it('issue #18', function(){
      var vm = '$!tradeDetailModel.goodsInfoModel.goodsTitle[<a href="$!personalModule.setTarget(\'/p.htm\').addQueryData("id",$!stringUtil.substringAfter($!tradeDetailModel.goodsInfoModel.goodsId,"guarantee."))" target="_blank">商品页面</a>]';
      var ret = '[<a href="" target="_blank">商品页面</a>]';
      assert.equal(ret, render(vm));
    });

    it('issue #18, condiction 2', function(){
      var vm = '$!a(**** **** **** $stringUtil.right($!b,4))';
      var ret = '(**** **** **** $stringUtil.right($!b,4))';
      assert.equal(ret, render(vm));
    });

    it('# meet with css property', function(){
      var vm = '#margin-top:2px;';
      assert.equal(vm, render(vm));
    });

    it('var end must in condiction var begin', function(){
      var vm = 'stepFareNo:{$!result.getStepFareNo()}';
      assert.equal('stepFareNo:{}', render(vm));
    });

  });

  describe('self defined macro', function(){

    it('basic', function(){
      var macros = {
        haha: function(a, b){
          a = a || '';
          b = b || '';
          return a + " hello to " + b;
        }
      };

      var vm = '#haha($a, $b)';
      assert.equal(' hello to ', render(vm, {}, macros));
      assert.equal('Lily hello to ', render(vm, {a: "Lily"}, macros));
    });

    it('use eval', function(){
      //这一句非常重要，在node端无需处理，web端必须如此声明
      Compile.Parser = Parser;

      var macros = {
        cmsparse: function(str){
          return this.eval(str);
        },
        d: function(){
          return 'I am d!';
        }
      };

      var vm = '#cmsparse($str)';
      var o = {
        str: 'hello $foo.bar, #d()',
        foo: {bar: 'world'}
      };

      assert.equal('hello world, I am d!', render(vm, o, macros));
    });

    it('use eavl with local variable', function(){
      //这一句非常重要，在node端无需处理，web端必须如此声明
      Compile.Parser = Parser;

      var macros = {

        cmsparse: function(str){
          return macros.include.apply(this, arguments);
        },

        include: function(str){
          return this.eval(str, {name: "hanwen"});
        },

        parse: function(file){
          return file;
        },

        d: function($name){
          return this.eval('I am $name!');
        }
      };

      var vm = '#cmsparse($str)';
      var vm1 = '#parse("a.vm")';
      var o = {
        str: 'hello $foo.bar, #d()',
        foo: {bar: 'world'}
      };

      assert.equal('hello world, I am hanwen!', render(vm, o, macros));
      assert.equal(undefined, getContext(vm, o, macros).name);
      assert.equal('a.vm', render(vm1, o, macros));
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
      var ast2 = Parser.parse('$foo.-24')[0];

      assert.equal(3         , asts.length);
      assert.equal('foo'     , asts[0].id);
      assert.equal(undefined , asts[0].path);

      assert.equal(undefined , ast2.path);

    });

    it('index should end with close bracket', function(){
      assert.throws(function(){
        Parser.parse("$foo.bar['a'12]");
      }, /Parse error/);
    });

  });

  describe('Directives', function(){

    it('#macro', function(){
      var vm = '#macro( d $a $b)#if($b)$a#end#end #d($foo $bar)';
      var asts = Parser.parse(vm);
      assert.equal(asts.length, 3);
      assert.equal(asts[0][1].length, 2);
    });

  });

  describe('comment identify', function(){

    it('one line comment', function(){
      var asts = Parser.parse('#set( $monkey.Number = 123)##number literal');

      assert.equal(2         , asts.length);
      assert.equal('comment' , asts[1].type);
    });

  });

});
