import { render, Compile, parse } from '../src/velocity';
import assert from 'assert';

describe('References', function () {
  it('get && set support', () => {
    const data = ['value1'];
    assert.strictEqual(
      render('$data.set(0, "value2")$data[0]', { data }),
      'value2'
    );
    assert.strictEqual(
      render('$data.set("foo", "value1")$data.foo', { data: {} }),
      'value1'
    );
    assert.strictEqual(render('$data.get(0)', { data: [1, 2] }), '1');
  });

  it('get/is method', function () {
    const vm = '$customer.getAddress() $customer.getaddress()';
    const vm1 = '$customer.get("address") $customer.get("Address")';
    const vm3 = '$customer.isAddress() $customer.isaddress()';

    assert.equal('bar bar', render(vm3, { customer: { Address: 'bar' } }));

    assert.equal('bar bar', render(vm, { customer: { address: 'bar' } }));
    assert.equal(
      'foo bar',
      render(vm, {
        customer: {
          address: 'bar',
          Address: 'foo',
        },
      })
    );

    assert.equal('bar bar', render(vm1, { customer: { address: 'bar' } }));
    assert.equal(
      'foo bar',
      render(vm1, {
        customer: {
          Address: 'bar',
          address: 'foo',
        },
      })
    );
  });

  it('method with attribute', function () {
    const vm = '$foo().bar\n${foo().bar}';
    assert.equal(
      'hello\nhello',
      render(vm, {
        foo: function () {
          return { bar: 'hello' };
        },
      })
    );

    assert.equal(
      'foo',
      render('${foo()}', {
        foo: function () {
          return 'foo';
        },
      })
    );
  });

  it('index notation', function () {
    const vm = '$foo[0] $foo[$i] $foo.get(1) $xx["oo"]';
    assert.equal(
      'bar haha haha oo',
      render(vm, { foo: ['bar', 'haha'], i: 1, xx: { oo: 'oo' } })
    );
  });

  it('set method', function () {
    const vm =
      '$page.setTitle("My Home Page").setname("haha")' +
      '$page.Title $page.name';
    assert.equal('My Home Page haha', render(vm, { page: {} }));
  });

  it('runt type support', function () {
    const vm = '$page.header(page)';
    assert.equal('$page.header(page)', render(vm, { page: {} }));
  });

  it('size method', function () {
    const vm = '$foo.bar.size()';
    assert.equal('2', render(vm, { foo: { bar: [1, 2] } }));
    assert.equal('2', render(vm, { foo: { bar: { a: 1, b: 3 } } }));

    const vm2 = '#if($foo.bar.size()) ok #{else} nosize #end';
    assert.equal(' nosize ', render(vm2, { foo: { bar: 123 } }));
    assert.equal(' nosize ', render(vm2, { foo: {} }));

    const vm3 = '$foo.size()';
    function fooSize() {
      return 3;
    }
    assert.equal('3', render(vm3, { foo: { size: fooSize } }));
  });

  it('quiet reference', function () {
    const vm = 'my email is $email';
    const vmquiet = 'my email is $!email.xxx';
    assert.equal(vm, render(vm));
    assert.equal('my email is ', render(vmquiet));
  });

  it('silence all reference', function () {
    const vm = 'my email is $email';

    const compile = new Compile(parse(vm));
    assert.equal('my email is ', compile.render(null, null, true));
  });

  it('this context keep correct, see #16', function () {
    const data = 'a = $a.get()';
    function B(c) {
      this.c = c;
    }

    B.prototype.get = function () {
      const t = this.eval(' hello $name', { name: 'hanwen' });
      return this.c + t;
    };

    assert.equal('a = 1 hello hanwen', render(data, { a: new B(1) }));
  });

  it('this context should keep correct in macro', function () {
    const data = '#parse()';
    const Macro = function (name: string) {
      this.name = name;
    };

    Macro.prototype.parse = function () {
      return this.name;
    };

    assert.equal('hanwen', render(data, {}, new Macro('hanwen')));
  });

  it('get variable form text', function () {
    const vm = 'hello $user.getName().getFullName("hanwen")';
    const data = { '$user.getName().getFullName("hanwen")': 'world' };
    assert.equal('hello world', render(vm, data));
  });

  it('escape false default', function () {
    const vm = '$name $name2 $cn $cn1';
    const data = {
      name: 'hello world',
      name2: '<i>&a',
      cn: '中文',
      cn1: '<i>中文',
    };

    const ret = 'hello world <i>&a 中文 <i>中文';
    assert.equal(ret, render(vm, data));
  });

  it('escape true', function () {
    const vm = '$name $name2 $cn $cn1';
    const data = {
      name: 'hello world',
      name2: '<i>&a',
      cn: '中文',
      cn1: '<i>中文',
    };

    const ret = 'hello world &lt;i&gt;&amp;a 中文 &lt;i&gt;&#20013;&#25991;';
    assert.equal(ret, render(vm, data, undefined, { escape: true }));
  });

  it('add custom ignore escape function', function () {
    const vm = '$noIgnore($name), $ignore($name)';
    const expected = '&lt;i&gt;, <i>';

    const compile = new Compile(parse(vm), {
      escape: true,
      unescape: { ignore: true },
    });

    const context = {
      name: '<i>',
      noIgnore: function (name) {
        return name;
      },

      ignore: function (name) {
        return name;
      },
    };

    const ret = compile.render(context);
    assert.equal(expected, ret);
  });

  it('config support', function () {
    const vm = '$foo($name)';
    const expected = '<i>';

    let compile = new Compile(parse(vm), { escape: false });
    const context = {
      name: '<i>',
      foo: function (name) {
        return name;
      },
    };

    let ret = compile.render(context);
    assert.equal(expected, ret);

    compile = new Compile(parse(vm), { escape: true, unescape: { foo: true } });
    ret = compile.render(context);
    assert.equal(expected, ret);

    compile = new Compile(parse(vm), { escape: true });
    ret = compile.render(context);
    assert.equal('&lt;i&gt;', ret);
  });

  it('valueMapper support', () => {
    const values = [];
    const vm = '#set($foo = "bar")\n$foo';
    const ret = render(
      vm,
      {},
      {},
      {
        valueMapper: (value) => {
          values.push(value);
          return 'foo';
        },
      }
    );
    assert.deepEqual(values, ['bar']);
    assert.equal(ret.trim(), 'foo');
  });

  it('support customMethodHandlers config', () => {
    const vm = `#set($mystring="123")
    #set($Integer=1)
    #set($myint=$Integer.parseInt($mystring))
    $myint
    `;

    const customMethodHandlers = [
      {
        uid: 'parseInt',
        match: function ({ property, context }) {
          return typeof context === 'number' && property === 'parseInt';
        },
        resolve({ params }) {
          return parseInt(params[0]);
        },
      },
    ];

    const compile = new Compile(parse(vm), {
      customMethodHandlers,
    });

    const ret = compile.render();
    assert.equal(compile.context.myint, 123);
    assert.equal('123', ret.trim());
  });

  describe('env', function () {
    it('should throw on property when parent is null', function () {
      const vm = '$foo.bar';
      const compile = new Compile(parse(vm), { env: 'development' });
      function foo() {
        compile.render();
      }
      expect(foo).toThrow(/get property bar of undefined/);
    });

    it('should throw on index when parent is null', function () {
      const vm = '$foo[1]';
      const compile = new Compile(parse(vm), { env: 'development' });
      function foo() {
        compile.render();
      }
      expect(foo).toThrow(/get property 1 of undefined/);
    });

    it('should throw on function when parent is null', function () {
      const vm = '$foo.xx()';
      const compile = new Compile(parse(vm), { env: 'development' });
      function foo() {
        compile.render();
      }
      expect(foo).toThrow(/get property xx of undefined/);
    });

    it('should throw when mult level', function () {
      const vm = '$foo.bar.xx.bar1';
      const compile = new Compile(parse(vm), { env: 'development' });
      function foo() {
        compile.render({ foo: { bar: {} } });
      }
      expect(foo).toThrow(/get property bar1 of undefined/);
    });

    it('not function', function () {
      const vm = '$foo.bar.xx()';
      const compile = new Compile(parse(vm), { env: 'development' });
      function foo() {
        return compile.render({ foo: { bar: {} } });
      }
      expect(foo).toThrow(/xx is not method/);
    });
  });
});
