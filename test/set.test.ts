import { render, Compile, parse } from '../src/velocity';
import assert from 'assert';

describe('Set && Expression', function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getContext(str: string, context?: any, macros?: any) {
    const compile = new Compile(parse(str));
    compile.render(context, macros);
    return compile.context;
  }

  it('set equal to reference', function () {
    const vm = '#set( $monkey = $bill ) ## variable reference';
    assert.equal('hello', getContext(vm, { bill: 'hello' }).monkey);
  });

  it('empty map', function () {
    const vm = '#set($foo = {})';
    assert.deepEqual({}, getContext(vm).foo);
  });

  it('#set array', function () {
    const vm = '#set($foo = []) #set($foo[0] = 12)';
    assert.equal(12, getContext(vm).foo[0]);
  });

  it('set equal to literal', function () {
    const vm =
      "#set( $monkey.Friend = 'monica' ) ## string literal\n" +
      '#set( $monkey.Number = 123 ) ##number literal';
    assert.equal('monica', getContext(vm).monkey.Friend);
    assert.equal('123', getContext(vm).monkey.Number);
  });

  it('set equal to result of method ', () => {
    const vm =
      "#set( $monkey = 'monica' ) ## string literal\n" +
      '#set( $result = $monkey.substring(1) ) ##calling method';
    assert.equal('monica', getContext(vm).monkey);
    assert.equal('onica', getContext(vm).result);
  });

  it('set equal to result of method ', () => {
    const vm =
      '#set( $monkey = 1234 ) ## number literal\n' +
      '#set( $result = $monkey.toString() ) ##calling method';
    assert.equal('1234', getContext(vm).monkey);
    assert.equal('1234', getContext(vm).result);
  });

  it('equal to method/property reference', function () {
    const vm =
      '#set($monkey.Blame = $spindoctor.Leak) ## property \n' +
      '#set( $monkey.Plan = $spindoctor.weave($web) ) ## method';
    const obj = {
      spindoctor: {
        weave: function (name) {
          return name;
        },
        Leak: 'hello world',
      },
      web: 'name',
    };

    assert.equal('hello world', getContext(vm, obj).monkey.Blame);
    assert.equal('name', getContext(vm, obj).monkey.Plan);
  });

  it('equal to map/list', function () {
    const vms = [
      '#set( $monkey.Say = ["Not", $my, "fault"] ) ## ArrayList',
      '#set( $monkey.Map = {"banana" : "good", "roast beef" : "bad"}) ## Map',
    ];

    const list = ['Not', 'my', 'fault'];
    const map = { banana: 'good', 'roast beef': 'bad' };
    assert.deepEqual(list, getContext(vms[0], { my: 'my' }).monkey.Say);
    assert.deepEqual(map, getContext(vms[1]).monkey.Map);
  });

  it('expression simple math', function () {
    assert.equal(10, getContext('#set($foo = 2 * 5)').foo);
    assert.equal(2, getContext('#set($foo = 4 / 2)').foo);
    assert.equal(-3, getContext('#set($foo = 2 - 5)').foo);
    assert.equal(1, getContext('#set($foo = 5 % 2)').foo);
    assert.equal(7, getContext('#set($foo = 7)').foo);
  });

  it('math with decimal', function () {
    assert.equal(10.5, getContext('#set($foo = 2.1 * 5)').foo);
    assert.equal(2.1, getContext('#set($foo = 4.2 / 2)').foo);
    assert.equal(-7.5, getContext('#set($foo = - 2.5 - 5)').foo);
  });

  it('expression complex math', function () {
    assert.equal(20, getContext('#set($foo = (7 + 3) * (10 - 8))').foo);
    assert.equal(-20, getContext('#set($foo = -(7 + 3) * (10 - 8))').foo);
    assert.equal(-1, getContext('#set($foo = -7 + 3 * (10 - 8))').foo);
  });

  it('expression compare', function () {
    assert.equal(false, getContext('#set($foo = 10 > 11)').foo);
    assert.equal(true, getContext('#set($foo = 10 < 11)').foo);
    assert.equal(true, getContext('#set($foo = 10 != 11)').foo);
    assert.equal(true, getContext('#set($foo = 10 <= 11)').foo);
    assert.equal(true, getContext('#set($foo = 11 <= 11)').foo);
    assert.equal(false, getContext('#set($foo = 12 <= 11)').foo);
    assert.equal(true, getContext('#set($foo = 12 >= 11)').foo);
    assert.equal(false, getContext('#set($foo = 10 == 11)').foo);
  });

  it('expression compare text version', function () {
    assert.equal(false, getContext('#set($foo = 10 gt 11)').foo);
    assert.equal(true, getContext('#set($foo = 10 lt 11)').foo);
    assert.equal(true, getContext('#set($foo = 10 ne 11)').foo);
    assert.equal(true, getContext('#set($foo = 10 le 11)').foo);
    assert.equal(true, getContext('#set($foo = 11 le 11)').foo);
    assert.equal(false, getContext('#set($foo = 12 le 11)').foo);
    assert.equal(true, getContext('#set($foo = 12 ge 11)').foo);
    assert.equal(false, getContext('#set($foo = 10 eq 11)').foo);
  });

  it('expression logic', function () {
    assert.equal(false, getContext('#set($foo = 10 == 11 && 3 > 1)').foo);
    assert.equal(true, getContext('#set($foo = 10 < 11 && 3 > 1)').foo);
    assert.equal(true, getContext('#set($foo = 10 > 11 || 3 > 1)').foo);
    assert.equal(true, getContext('#set($foo = !(10 > 11) && 3 > 1)').foo);
    assert.equal(false, getContext('#set($foo = $a > $b)', { a: 1, b: 2 }).foo);
    assert.equal(false, getContext('#set($foo = $a && $b)', { a: 1, b: 0 }).foo);
    assert.equal(true, getContext('#set($foo = $a || $b)', { a: 1, b: 0 }).foo);
  });

  it('expression logic text version', function () {
    assert.equal(false, getContext('#set($foo = 10 eq 11 and 3 gt 1)').foo);
    assert.equal(true, getContext('#set($foo = 10 lt 11 and 3 gt 1)').foo);
    assert.equal(true, getContext('#set($foo = 10 gt 11 or 3 gt 1)').foo);
    assert.equal(true, getContext('#set($foo = not(10 gt 11) and 3 gt 1)').foo);
    assert.equal(false, getContext('#set($foo = $a gt $b)', { a: 1, b: 2 }).foo);
    assert.equal(false, getContext('#set($foo = $a and $b)', { a: 1, b: 0 }).foo);
    assert.equal(true, getContext('#set($foo = $a or $b)', { a: 1, b: 0 }).foo);
  });

  it('const in key', function () {
    const vm = '#set($o = {}) #set($key = "k") #set($o[$key] = "c") #set($o.f = "d") $o $o[$key]';
    const ret = render(vm).replace(/\s+/g, '');
    assert.equal('{k=c,f=d}c', ret);

    const vm2 = `
      #set($obj = {})
      #set($objlist = [
        {"k": "a"},
        {"k": "b"},
        {"k": "c"}
      ])
      #foreach( $item in $!{objlist} )
        #set($obj[$item.k] = $item)
      #end
      $obj
    `;
    const ret2 = render(vm2).replace(/\s+/g, '');
    assert.equal('{a={k=a},b={k=b},c={k=c}}', ret2);
  });

  it('#set context should be global, #25', function () {
    const vm = '#macro(local) #set($val =1) $val #end #local() $val';
    const ret = render(vm).replace(/\s+/g, '');
    assert.equal('11', ret);
  });

  describe('set multi level var', function () {
    it('normal, fix #63', function () {
      const tpl = `
        #set($a = { "b": {} })
        #set($a.b.c1 = 1)
        #set($a.b.c2 = 2)
      `;
      const context = getContext(tpl);
      expect(context.a.b).toMatchObject({ c1: 1, c2: 2 });
    });

    it('set fail', function () {
      const tpl = `
        #set($a = { "b": {} })
        #set($a.b.c1 = 1)
        #set($a.b.c2 = 2)
        #set($a.d.c2 = 2)
      `;
      const context = getContext(tpl);
      expect(context.a).not.toHaveProperty('d');
    });
  });

  it('set with foreach', function () {
    const tpl = `
#foreach($item in [1..2])
  #set($bTest = false)
  #if($item > 1) #set($bTest = true) #end
  <h1>$bTest</h1>
#end`;
    const html = render(tpl).replace(/\s+/g, '');
    expect(html).toEqual('<h1>false</h1><h1>true</h1>');
  });

  it('set error #78', function () {
    const tpl = `
      #foreach($item in [1..4])
        #set($bTest = "test1")
        #if($item % 2 == 0)
          #set($bTest = "$!{bTest} test2")
        #end
        #set($bTest = "$!{bTest} test3")
        <h1>$bTest</h1>
      #end
    `;
    const html = render(tpl)
      .replace(/\n\s.|\s{2}/g, '')
      .trim();
    expect(html).toEqual(
      '<h1>test1 test3</h1><h1>test1 test2 test3</h1><h1>test1 test3</h1><h1>test1 test2 test3</h1>'
    );
  });

  it('nested foreach subprop', function () {
    const tpl = `
      #set($list = [{"prop": "a"}])
      #set($list2 = ["a", "b", "c"])
      #foreach($i in $list)
          #set($fc = $velocityCount - 1)
          #foreach($j in $list2)
              #set($i.prop = "$i.prop$j")
          #end
      #end
      $list
    `;
    const ret = render(tpl).trim();
    assert.strictEqual('[{prop=aabc}]', ret);
  });

  it('nested foreach set', function () {
    const tpl = `
      #set($obj = [{
        "SubProp": [
          { "SubSubProp": "a" }
        ]
      }])
      #set($subSubPropRealValue = "b")
      #foreach($sub in $obj)
          #set($fc = $velocityCount - 1)
          #foreach($subsub in $sub.SubProp)
              #set($fcc = $velocityCount - 1)
              #set($sub.SubProp[$fcc].SubSubProp = $subSubPropRealValue)
          #end
          #set($obj[$fc] = $sub)
      #end
      $obj
    `;
    const ret = render(tpl).trim();
    assert.strictEqual('[{SubProp=[{SubSubProp=b}]}]', ret);
  });

  it('support set null, fix #139', function () {
    const tpl = '#set($null = "<span>-</span>")$null';
    const ret = render(tpl).trim();
    assert.strictEqual(ret, '<span>-</span>');
  });
});
