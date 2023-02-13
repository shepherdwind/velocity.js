import { render, Compile, parse } from '../src/velocity';
import assert from 'assert';

describe('Compile', () => {
  function getContext(str: string, context?: any, macros?: any) {
    const compile = new Compile(parse(str));
    compile.render(context, macros);
    return compile.context;
  }

  describe('Literals', () => {
    it('eval string value', () => {
      const vm =
        '#set( $directoryRoot = "www" )' +
        '#set( $templateName = "index.vm")' +
        '#set( $template = "$directoryRoot/$templateName" )' +
        '$template';

      assert.equal('www/index.vm', render(vm));
    });

    it('not eval string', () => {
      const vm = "#set( $blargh = '$foo' )$blargh";
      assert.equal('$foo', render(vm));
    });

    it('not parse #[[ ]]#', () => {
      const vm = '#foreach ($woogie in $boogie) nothing to $woogie #end';
      assert.equal(vm, render('#[[' + vm + ']]#'));
    });

    it('Range Operator', () => {
      const vm1 = '#set($foo = [-1..2])';
      const vm2 = '#set($foo = [-1..$bar])';
      const vm3 = '#set($foo = [$bar..2])';
      assert.deepEqual([-1, 0, 1, 2], getContext(vm1).foo);
      assert.deepEqual([-1, 0, 1, 2], getContext(vm2, { bar: 2 }).foo);
      assert.deepEqual([-1, 0, 1, 2], getContext(vm3, { bar: -1 }).foo);
      assert.deepEqual([], getContext('#set($foo = [$bar..1])').foo);
    });

    it('map and array nest', () => {
      const vm1 =
        '' +
        '#set($a = [\n' +
        '  {"name": 1},\n' +
        '  {"name": 2}\n' +
        '])\n' +
        ' ';

      const vm2 =
        '' +
        '#set($a = {\n' +
        '  "a": [1, 2, ["1", "a"], {"a": 1}],\n' +
        '  "b": "12",\n' +
        '  "d": null,\n' +
        '  "c": false\n' +
        '})\n' +
        '';

      assert.deepEqual([{ name: 1 }, { name: 2 }], getContext(vm1).a);
      const expected = {
        a: [1, 2, ['1', 'a'], { a: 1 }],
        b: '12',
        d: null,
        c: false,
      };
      assert.deepEqual(expected, getContext(vm2).a);
    });
  });

  describe('Conditionals', () => {
    it('#if', () => {
      const vm = '#if($foo)Velocity#end';
      assert.equal('Velocity', render(vm, { foo: 1 }));
    });

    it('#if not work', () => {
      const vm = '#if($!css_pureui)hello world#end';
      assert.equal('', render(vm));
    });

    it('#elseif & #else', () => {
      const vm =
        '#if($foo < 5)Go North#elseif($foo == 8)' +
        'Go East#{else}Go South#end';
      assert.equal('Go North', render(vm, { foo: 4 }));
      assert.equal('Go East', render(vm, { foo: 8 }));
      assert.equal('Go South', render(vm, { foo: 9 }));
    });

    it('#if with arguments', () => {
      const vm = '#if($foo.isTrue(true))true#{end}';
      const foo = {
        isTrue: function (str) {
          return !!str;
        },
      };

      assert.equal('true', render(vm, { foo: foo }));
    });
  });

  describe('Velocimacros', () => {
    it('simple #macro', () => {
      const vm = '#macro( d )<tr><td></td></tr>#end #d()';
      assert.equal(' <tr><td></td></tr>', render(vm));
    });

    it('compex #macro', () => {
      const vm = '#macro( d $name)<tr><td>$!name</td></tr>#end #d($foo)';
      const vm1 = '#macro( d $a $b)#if($b)$a#end#end #d ( $foo $bar )';

      assert.equal(' <tr><td>hanwen</td></tr>', render(vm, { foo: 'hanwen' }));
      assert.equal(' <tr><td></td></tr>', render(vm));
      assert.equal(' ', render(vm1, { foo: 'haha' }));
      assert.equal(' ', render(vm1, { foo: 'haha', bar: false }));
      assert.equal(' haha', render(vm1, { foo: 'haha', bar: true }));
    });

    it('#macro call arguments', () => {
      const vm = '#macro( d $a $b $d)$a$b$!d#end #d ( $foo , $bar, $dd )';
      assert.equal(' ab', render(vm, { foo: 'a', bar: 'b' }));
      assert.equal(' abd', render(vm, { foo: 'a', bar: 'b', dd: 'd' }));
    });

    it('#macro map argument', () => {
      const vm =
        '#macro( d $a)#foreach($_item in $a.entrySet())' +
        '$_item.key = $_item.value #end#end #d ( {"foo": $foo,"bar":$bar} )';
      assert.equal(' foo = a bar = b ', render(vm, { foo: 'a', bar: 'b' }));
    });

    it('#noescape', () => {
      const vm = '#noescape()$hello#end';
      assert.equal('hello world', render(vm, { hello: 'hello world' }));
    });
  });

  describe('Escaping', () => {
    it('escape slash', () => {
      const vm = '#set( $email = "foo" )$email \\$email';
      assert.equal('foo $email', render(vm));
    });

    it('double slash', () => {
      const vm = '#set( $email = "foo" )\\\\$email \\\\\\$email';
      assert.equal('\\foo \\$email', render(vm));
    });
  });

  describe('Error condiction', () => {
    it('css color render', () => {
      const vm = 'color: #666 height: 39px';
      assert.equal(vm, render(vm));
    });

    it('jquery parse', () => {
      const vm = '$(function() { $("a").click() $.post() })';
      assert.equal(vm, render(vm));
    });

    it('issue #7: $ meet with #', () => {
      const vm = '$bar.foo()#if(1>0)...#end';
      assert.equal('$bar.foo()...', render(vm));
    });

    it('issue #15', () => {
      const vm =
        '#macro(a $b $list)' +
        '#foreach($a in $list)${a}#end $b #end #a("hello", [1, 2])';
      assert.equal(' 12 hello ', render(vm));
    });

    it('issue #18', () => {
      const vm =
        '$!tradeDetailModel.goodsInfoModel.goodsTitle' +
        "[<a href=\"$!personalModule.setTarget('/p.htm')" +
        '.addQueryData("id",$!stringUtil.substringAfter' +
        '($!tradeDetailModel.goodsInfoModel.goodsId,"guarantee."))"' +
        ' target="_blank">商品页面</a>]';
      const ret = '[<a href="" target="_blank">商品页面</a>]';
      assert.equal(ret, render(vm));
    });

    it('issue #18, condiction 2', () => {
      const vm = '$!a(**** **** **** $stringUtil.right($!b,4))';
      const ret = '(**** **** **** $stringUtil.right($!b,4))';
      assert.equal(ret, render(vm));
    });

    it('# meet with css property', () => {
      const vm = '#margin-top:2px';
      assert.equal(vm, render(vm));
    });

    it('const end must in condiction const begin', () => {
      const vm = 'stepFareNo:{$!result.getStepFareNo()}';
      assert.equal('stepFareNo:{}', render(vm));
    });

    it('empty string condiction', () => {
      assert.equal('', render(''));
      assert.equal('', render('##hello'));
      assert.equal('hello', render('hello'));
    });
  });

  describe('throw friendly error message', () => {
    it('prints the right position when error thrown', () => {
      const vm = '111\nsdfs\n$foo($name)';

      const compile = new Compile(parse(vm), { escape: false });
      const context = {
        name: '<i>',
        foo: () => {
          throw new Error('Run error');
        },
      };
      assert.throws(() => {
        compile.render(context);
      }, /\$foo\(\$name\)/);

      assert.throws(() => {
        compile.render(context);
      }, /L\/N 3:0/);
    });

    it('prints the right position when error thrown in foreach', () => {
      const vm = `
      #foreach( $item in $func() )
      #end
      `;

      const compile = new Compile(parse(vm), { escape: false });
      const context = {
        name: '<i>',
        func: () => {
          throw new Error('Run error');
        },
      };

      assert.throws(() => {
        compile.render(context);
      }, /\$func\(\)/);

      assert.throws(() => {
        compile.render(context);
      }, /L\/N 2:6/);
    });

    it('print error stack of user-defined macro', () => {
      const vm = '111\n\n#foo($name)';
      const vm1 = '\nhello#parse("vm.vm")';
      const files = { 'vm.vm': vm, 'vm1.vm': vm1 };

      const compile = new Compile(parse('\n\n#parse("vm1.vm")'));
      const macros = {
        foo: () => {
          throw new Error('Run error');
        },
        parse: function (name: string) {
          return this.eval(files[name]);
        },
      };

      const expected =
        '' +
        'Run error\n' +
        '      at #foo($name) L/N 3:0\n' +
        '      at #parse("vm.vm") L/N 2:5\n' +
        '      at #parse("vm1.vm") L/N 3:0';
      try {
        compile.render({}, macros);
      } catch (e) {
        assert.equal(expected, e.message);
      }
    });
  });

  describe('user-defined macro, such as #include, #parse', () => {
    it('basic', () => {
      const macros = {
        haha: function (a, b) {
          a = a || '';
          b = b || '';
          return a + ' hello to ' + b;
        },
      };

      const vm = '#haha($a, $b)';
      assert.equal(' hello to ', render(vm, {}, macros));
      assert.equal('Lily hello to ', render(vm, { a: 'Lily' }, macros));
    });

    it('use eval', () => {
      const macros = {
        cmsparse: function (str: string) {
          return this.eval(str);
        },
        d: () => {
          return 'I am d!';
        },
      };

      const vm = '#cmsparse($str)';
      const o = {
        str: 'hello $foo.bar, #d()',
        foo: { bar: 'world' },
      };

      assert.equal('hello world, I am d!', render(vm, o, macros));
    });

    it('use eval with local variable', () => {
      const macros = {
        cmsparse: function(...args: any[]) {
          return this.include.apply(this, args);
        },

        include: function (str: string) {
          return this.eval(str, { name: 'hanwen' });
        },

        parse: function (file: string) {
          return file;
        },

        d: function () {
          return this.eval('I am $name!');
        },
      };

      const vm = '#cmsparse($str)';
      const vm1 = '#parse("a.vm")';
      const o = {
        str: 'hello $foo.bar, #d()',
        foo: { bar: 'world' },
      };

      assert.equal('hello world, I am hanwen!', render(vm, o, macros));
      assert.equal(undefined, getContext(vm, o, macros).name);
      assert.equal('a.vm', render(vm1, o, macros));
    });

    it('eval work with #set', () => {
      const macros = {
        cmsparse: function (str) {
          return this.eval(str);
        },
      };

      const vm = '#cmsparse($str)';
      const o = {
        str:
          '#set($foo = ["hello"," ", "world"])' +
          '#foreach($word in $foo)$word#end',
      };

      assert.equal('hello world', render(vm, o, macros));
    });
  });

  describe('self defined function', () => {
    it('$control.setTemplate', () => {
      const Control = function () {
        this.__temp = {};
      };

      Control.prototype = {
        constructor: Control,

        setTemplate: function (vm) {
          this.vm = vm;
          return this;
        },
        toString: function () {
          debugger;
          return this.eval(this.vm, this.__temp);
        },
        setParameter: function (key, value) {
          this.__temp[key] = value;
          return this;
        },
      };

      const str = 'hello $who, welcome to $where';

      const vm =
        '$control.setTemplate($str).setParameter("who", "Blob")' +
        '.setParameter("where", "China")';
      const expected = 'hello Blob, welcome to China';
      assert.equal(render(vm, { str: str, control: new Control() }), expected);
    });
  });

  describe('issues', () => {
    it('#29', () => {
      const vm =
        '#set($total = 0) #foreach($i in [1,2,3])' +
        ' #set($total = $total + $i) #end $total';
      assert.equal(render(vm).trim(), '6');
    });
    it('#30', () => {
      const vm = '$foo.setName';
      assert.equal(render(vm, { foo: { setName: 'foo' } }).trim(), 'foo');
    });
    it('#54', () => {
      let vm = '$a.b.c';
      assert.equal(render(vm, { a: { b: null } }).trim(), '$a.b.c');

      vm = '$a.b.c()';
      assert.equal(render(vm, { a: { b: null } }).trim(), '$a.b.c()');
    });
  });

  describe('multiline', () => {
    it('#set multiline', () => {
      const vm = '$bar.foo()\n#set($foo=$bar)\n...';
      assert.equal('$bar.foo()\n...', render(vm));
    });

    it('#if multiline', () => {
      const vm = '$bar.foo()\n#if(1>0)\n...#end';
      assert.equal('$bar.foo()\n...', render(vm));
    });

    it('#set #set', () => {
      const vm = '$bar.foo()\n...\n#set($foo=$bar)\n#set($foo=$bar)';
      assert.equal('$bar.foo()\n...\n', render(vm));
    });

    it('#if multiline #set', () => {
      const vm = '$bar.foo()\n#if(1>0)\n#set($foo=$bar)\n...#end';
      assert.equal('$bar.foo()\n...', render(vm));
    });

    it('#if multiline #set #end', () => {
      const vm = '$bar.foo()\n#if(1>0)...\n#set($foo=$bar)\n#end';
      assert.equal('$bar.foo()\n...\n', render(vm));
    });

    it('with references', () => {
      const vm = [
        'a',
        '#foreach($b in $nums)',
        '#if($b) ',
        'b',
        'e $b.alm',
        '#end',
        '#end',
        'c',
      ].join('\n');
      const expected = ['a', 'b', 'e 1', 'b', 'e 2', 'b', 'e 3', 'c'].join(
        '\n'
      );

      const data = { nums: [{ alm: 1 }, { alm: 2 }, { alm: 3 }], bar: '' };
      assert.equal(expected, render(vm, data));
    });

    it('multiple newlines after statement', () => {
      const vm = '#if(1>0)\n\nb#end';
      assert.equal('\nb', render(vm));
    });
  });

  describe('define support', () => {
    it('basic', () => {
      const vm =
        '#define($block)\nHello $who#end\n#set($who = "World!")\n$block';
      assert.equal('Hello World!', render(vm));
    });
  });

  describe('raw content render', () => {
    it('simple', () => {
      const vm = '#[[\nThis content is ignored. $val\n]]#';
      assert.equal(
        '\nThis content is ignored. $val\n',
        render(vm, {
          val: 'foo',
        })
      );
    });

    it('newline after', () => {
      const vm = '#[[This content is ignored. $val]]#\na';
      assert.equal(
        'This content is ignored. $val\na',
        render(vm, {
          val: 'foo',
        })
      );
    });
  });

  describe('assignment via .put', () => {
    it('should set a key to an object', () => {
      const vm = `
        #set($foo = {})
        #set($test = $foo.put('foo', 'bar'))
        $foo["foo"]
      `;
      const expected = 'bar';
      assert.equal(render(vm).trim(), expected);
    });
    it('fix issue #120, push only', () => {
      const vm = `
        #set($foo = {})
        $!{ foo.put("a", 1) }
      `;
      const expected = '1';
      assert.equal(render(vm).trim(), expected);
    });
    it('should set a key to an object', () => {
      const vm = `
      $foo.put()
      `;
      const expected = 'bar';
      assert.equal(
        render(vm, {
          foo: {
            put: () => {
              return 'bar';
            },
          },
        }).trim(),
        expected
      );
    });
  });

  describe('deletion via .remove', () => {
    it('should remove a key from an object', () => {
      const vm = `
        #set($test = {'foo': 'bar'})
        #set($baz = $test.remove('foo'))
        $test
      `;
      const expected = '{}';
      assert.equal(render(vm).trim(), expected);
    });

    it('should return the value of the removed key', () => {
      const vm = `
        #set($test = {'foo': 'bar'})
        #set($baz = $test.remove('foo'))
        $baz
      `;
      const expected = 'bar';
      assert.equal(render(vm).trim(), expected);
    });

    it('should remove a value from an array', () => {
      const vm = `
        #set($test = ['foo', 'bar'])
        #set($baz = $test.remove('bar'))
        $test
      `;
      const expected = '[foo]';
      assert.equal(render(vm).trim(), expected);
    });

    it('should return the removed value', () => {
      const vm = `
        #set($test = ['foo', 'bar'])
        #set($baz = $test.remove('bar'))
        $baz
      `;
      const expected = 'bar';
      assert.equal(render(vm).trim(), expected);
    });
  });

  describe('Add into empty array', () => {
    it('should add item to array', () => {
      const vm = `
        #set($foo = [])
        #set($ignore = $foo.add('foo'))
        $foo
      `;
      const expected = '[foo]';
      assert.equal(render(vm).trim(), expected);
    });

    it('should add object to array', () => {
      const vm = `
        #set($foo = [])
        #set($ignore = $foo.add({'foo':'bar'}))
        $foo
      `;
      const expected = '[{foo=bar}]';
      assert.equal(render(vm).trim(), expected);
    });

    it('should not add when is object', () => {
      const vm = `
        #set($foo = {})
        #set($ignore = $foo.add({'foo':'bar'}))
        $foo
      `;
      const expected = '{}';
      assert.equal(render(vm).trim(), expected);
    });
  });

  describe('extracting items via .subList', () => {
    it('should return empty array if original array is empty', () => {
      const vm = `
        #set($foo = [])
        #set($bar = $foo.subList(0, 1))
        $bar
      `;
      const expected = '[]';
      assert.equal(render(vm).trim(), expected);
    });

    it('should return a single item', () => {
      const vm = `
        #set($foo = [1, 2, 3])
        #set($bar = $foo.subList(0, 1))
        $bar
      `;
      const expected = '[1]';
      assert.equal(render(vm).trim(), expected);
    });

    it('should return multiple items', () => {
      const vm = `
        #set($foo = [1, 2, 3])
        #set($bar = $foo.subList(1, 3))
        $bar
      `;
      const expected = '[2, 3]';
      assert.equal(render(vm).trim(), expected);
    });
  });

  describe('Object|Array#toString', () => {
    it('simple object', () => {
      const vm = '$data';
      const expected = '{k=v, k2=v2}';
      assert.equal(render(vm, { data: { k: 'v', k2: 'v2' } }), expected);
    });

    it('object.keySet()', () => {
      const vm = '$data.keySet()';
      const expected = '[k, k2]';
      assert.equal(render(vm, { data: { k: 'v', k2: 'v2' } }), expected);
    });

    it('object.keySet() with object that has keySet method', () => {
      const vm = '$data.keySet()';
      const expected = '[k, k2]';
      function keySet() {
        return ['k', 'k2'];
      }
      assert.equal(render(vm, { data: { keySet: keySet } }), expected);
    });

    it('object.entrySet()', () => {
      const vm = '$data.entrySet()';
      const expected = '[{key=k, value=v}, {key=k2, value=v2}]';
      assert.equal(render(vm, { data: { k: 'v', k2: 'v2' } }), expected);
    });

    it('object.entrySet() with object that has entrySet method', () => {
      const vm = '$data.entrySet()';
      const expected = '{k=v, k2=v2}';

      function entrySet() {
        return {
          k: 'v',
          k2: 'v2',
        };
      }

      assert.equal(render(vm, { data: { entrySet: entrySet } }), expected);
    });

    it('nested object', () => {
      const vm = '$data';
      const expected = '{k={k2=v2}, kk={k3=v3}}';
      assert.equal(
        render(vm, { data: { k: { k2: 'v2' }, kk: { k3: 'v3' } } }),
        expected
      );
    });

    it('object that has toString as own property', () => {
      const vm = '$data';
      const expected = 'custom';
      assert.equal(
        render(vm, {
          data: {
            toString: () => {
              return 'custom';
            },
            key: 'value',
            key2: 'value2',
            key3: { key4: 'value4' },
          },
        }),
        expected
      );
    });

    it('simple array', () => {
      const vm = '$data';
      const expected = '[a, b]';
      assert.equal(render(vm, { data: ['a', 'b'] }), expected);
    });

    it('nested array', () => {
      const vm = '$data';
      const expected = '[a, [b]]';
      assert.equal(render(vm, { data: ['a', ['b']] }), expected);
    });

    it('object in array', () => {
      const vm = '$data';
      const expected = '[a, {k=v}]';
      assert.equal(render(vm, { data: ['a', { k: 'v' }] }), expected);
    });

    it('array in object', () => {
      const vm = '$data';
      const expected = '{k=[a, b]}';
      assert.equal(render(vm, { data: { k: ['a', 'b'] } }), expected);
    });
  });
});
