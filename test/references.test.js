'use strict';
var Velocity = require('../src/velocity')
var assert = require("assert")
var parse = Velocity.parse
var Compile = Velocity.Compile

describe('References', function() {
  var render = Velocity.render;

  it('get && set support', () => {
    const data = ['value1'];
    assert.strictEqual(render('$data.set(0, "value2")$data[0]', { data }), 'value2');
    assert.strictEqual(render('$data.set("foo", "value1")$data.foo', { data: {} }), 'value1');
    assert.strictEqual(render('$data.get(0)', { data: [1, 2] }), '1');
  });

  it('get/is method', function() {
    var vm = '$customer.getAddress() $customer.getaddress()'
    var vm1 = '$customer.get("address") $customer.get("Address")'
    var vm3 = '$customer.isAddress() $customer.isaddress()'

    assert.equal('bar bar', render(vm3, {customer: {Address: "bar"}}))

    assert.equal('bar bar', render(vm, {customer: {address: "bar"}}))
    assert.equal('foo bar', render(vm, {
      customer: {
        address: 'bar',
        Address: 'foo'
      }
    }))

    assert.equal('bar bar', render(vm1, {customer: {address: "bar"}}))
    assert.equal('foo bar', render(vm1, {
      customer: {
        Address: 'bar',
        address: 'foo'
      }
    }))
  })

  it('method with attribute', function() {
    var vm = '$foo().bar\n${foo().bar}'
    assert.equal('hello\nhello', render(vm, {
      foo: function() {
        return { bar: 'hello' }
      }
    }))

    assert.equal('foo', render('${foo()}', {
      foo: function() {
        return 'foo'
      }
    }))
  })

  it('index notation', function() {
    var vm = '$foo[0] $foo[$i] $foo.get(1) $xx["oo"]'
    assert.equal('bar haha haha oo', render(vm, {foo: ["bar", "haha"], i: 1, xx: { oo: 'oo' }}))
  })

  it('set method', function() {
    var vm = '$page.setTitle("My Home Page").setname("haha")' +
    '$page.Title $page.name'
    assert.equal('My Home Page haha', render(vm, {page: {}}))
  })

  it('runt type support', function() {
    var vm = '$page.header(page)'
    assert.equal('$page.header(page)', render(vm, {page: {}}))
  })

  it('size method', function() {
    var vm = '$foo.bar.size()'
    assert.equal('2', render(vm, {foo: {bar: [1, 2]}}))
    assert.equal('2', render(vm, {foo: {bar: {a: 1, b: 3}}}))

    var vm2 = '#if($foo.bar.size()) ok #{else} nosize #end'
    assert.equal(' nosize ', render(vm2, {foo: {bar: 123}}))
    assert.equal(' nosize ', render(vm2, {foo: {}}))

    var vm3 = '$foo.size()';
    function fooSize() {
      return 3;
    }
    assert.equal('3', render(vm3, { foo: { size: fooSize } }))
  })

  it('quiet reference', function() {
    var vm = 'my email is $email'
    var vmquiet = 'my email is $!email.xxx'
    assert.equal(vm, render(vm))
    assert.equal('my email is ', render(vmquiet))
  })

  it('silence all reference', function() {
    var vm = 'my email is $email'

    var compile = new Compile(parse(vm))
    assert.equal('my email is ', compile.render(null, null, true))
  })

  it('this context keep correct, see #16', function() {
    var data = 'a = $a.get()'
    function B(c) {
      this.c = c
    }

    B.prototype.get = function() {
      var t = this.eval(" hello $name", {name: 'hanwen'})
      return this.c + t
    }

    assert.equal('a = 1 hello hanwen', render(data, {a: new B(1)}))
  })

  it('this context should keep corrent in macro', function() {
    var data = '#parse()'
    var Macro = function(name) {
      this.name = name;
    };

    Macro.prototype.parse = function() {
      return this.name;
    };

    assert.equal('hanwen', render(data, {}, new Macro('hanwen')))
  })

  it('get variable form text', function() {
    var vm = 'hello $user.getName().getFullName("hanwen")'
    var data = { '$user.getName().getFullName("hanwen")': 'world' }
    assert.equal('hello world', render(vm, data))
  })

  it('escape false default', function() {
    var vm = '$name $name2 $cn $cn1'
    var data = {
      name: 'hello world',
      name2: '<i>&a',
      cn: '中文',
      cn1: '<i>中文'
    }

    var ret  = 'hello world <i>&a 中文 <i>中文'
    assert.equal(ret, render(vm, data))
  })

  it('escape true', function() {
    var vm = '$name $name2 $cn $cn1'
    var data = {
      name: 'hello world',
      name2: '<i>&a',
      cn: '中文',
      cn1: '<i>中文'
    }

    var ret  = 'hello world &lt;i&gt;&amp;a 中文 &lt;i&gt;&#20013;&#25991;'
    assert.equal(ret, render(vm, data, undefined, { escape: true }))
  })

  it('add custom ignore escape function', function() {
    var vm = '$noIgnore($name), $ignore($name)'
    var expected = '&lt;i&gt;, <i>'

    var compile = new Compile(parse(vm), {
      escape: true,
      unescape: { ignore: true },
    });

    var context = {
      name: '<i>',
      noIgnore: function(name) {
        return name
      },

      ignore: function(name) {
        return name;
      }
    }

    var ret = compile.render(context)
    assert.equal(expected, ret)
  })

  it('config support', function() {
    var vm = '$foo($name)'
    var expected = '<i>'

    var compile = new Compile(parse(vm), { escape: false })
    var context = {
      name: '<i>',
      foo: function(name) {
        return name;
      }
    }

    var ret = compile.render(context)
    assert.equal(expected, ret)

    compile = new Compile(parse(vm), { escape: true, unescape: { foo: true } })
    ret = compile.render(context)
    assert.equal(expected, ret)

    compile = new Compile(parse(vm), { escape: true })
    ret = compile.render(context)
    assert.equal('&lt;i&gt;', ret)
  })

  it ('valueMapper support', () => {
    const values = [];
    const vm = '#set($foo = "bar")\n$foo'
    const ret = render(vm, {}, {}, {
      valueMapper: (value) => {
        values.push(value);
        return 'foo';
      },
    });
    assert.deepEqual(values, ['bar']);
    assert.equal(ret.trim(), 'foo');
  });

  describe('env', function() {
    it('should throw on property when parent is null', function() {
      var vm = '$foo.bar';
      var compile = new Compile(parse(vm), { env: 'development' })
      function foo() {
        compile.render()
      };
      foo.should.throw(/get property bar of undefined/);
    });

    it('should throw on index when parent is null', function() {
      var vm = '$foo[1]';
      var compile = new Compile(parse(vm), { env: 'development' })
      function foo() {
        compile.render()
      };
      foo.should.throw(/get property 1 of undefined/);
    });

    it('should throw on function when parent is null', function() {
      var vm = '$foo.xx()';
      var compile = new Compile(parse(vm), { env: 'development' })
      function foo() {
        compile.render()
      };
      foo.should.throw(/get property xx of undefined/);
    });

    it('should throw when mult level', function() {
      var vm = '$foo.bar.xx.bar1';
      var compile = new Compile(parse(vm), { env: 'development' })
      function foo() {
        compile.render({ foo: { bar: {} }});
      };
      foo.should.throw(/get property bar1 of undefined/);
    });

    it('not function', function() {
      var vm = '$foo.bar.xx()';
      var compile = new Compile(parse(vm), { env: 'development' })
      function foo() {
        return compile.render({ foo: { bar: {} }});
      };
      foo.should.throw(/xx is not method/);
    });
  });
})
