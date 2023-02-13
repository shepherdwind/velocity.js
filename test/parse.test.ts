import { parse } from '../src/velocity';
import assert from 'assert';
describe('Parser', () => {
  describe('simple references', () => {
    it('self define block', () => {
      const vm =
        '#cms(1)<div class="abs-right"> #H(1,"第一个链接") </div> #end';
      const ast = parse(vm, { cms: true });
      assert.equal(ast.length, 1);
      assert.equal(ast[0][0].type, 'cms');
    });

    it('simple references', () => {
      const vm = 'hello world: $foo';
      const ret = parse(vm);

      assert.ok(ret instanceof Array);
      assert.equal(2, ret.length);
      assert.equal('hello world: ', ret[0]);
      assert.equal('foo', ret[1].id);
    });

    it('valid variable references', () => {
      const vm = '$mud-Slinger_1';
      assert.equal('mud-Slinger_1', parse(vm)[0].id);
    });

    it('wrapped references', () => {
      const vm = '${mudSlinger}';
      const ast = parse(vm)[0];
      assert(ast.type === 'references');
      assert.equal(true, ast.isWraped);
      assert.equal('mudSlinger', ast.id);
    });

    it('function call references', () => {
      const ast = parse('$foo()')[0];
      assert(ast.type === 'references');
      assert.equal(false, (ast as any).args);
      assert.equal('references', ast.type);
    });
  });

  describe('Properties', () => {
    it('simple property', () => {
      const vm = '$customer.Address';
      const asts = parse(vm);
      assert.deepEqual(asts[0], {
        id: 'customer',
        prue: true,
        type: 'references',
        path: [{ type: 'property', id: 'Address' }],
        leader: '$',
        pos: { first_line: 1, last_line: 1, first_column: 0, last_column: 17 },
      });
    });
  });

  describe('Methods ', () => {
    it('with no arguments', () => {
      const vm = '$foo.bar()';
      const ast = parse(vm)[0];

      assert.deepEqual(ast['path'], [
        {
          type: 'method',
          id: 'bar',
          args: false,
        },
      ]);
    });

    it('with arguments integer', () => {
      const vm = '$foo.bar(10)';
      const ast = parse(vm)[0];

      assert.deepEqual(ast['path'], [
        {
          type: 'method',
          id: 'bar',
          args: [
            {
              type: 'integer',
              value: '10',
            },
          ],
        },
      ]);
    });

    it('with arguments references', () => {
      const vm = '$foo.bar($bar)';
      const ast = parse(vm)[0];

      assert(ast.type === 'references');
      assert.equal(ast.prue, true);

      assert(ast.path[0].type === 'method');
      assert.deepEqual(ast.path[0].args, [
        {
          type: 'references',
          leader: '$',
          id: 'bar',
        },
      ]);
    });
  });

  describe('Index', () => {
    it('all kind of indexs', () => {
      const vm = '$foo[0] $foo[$i] $foo["bar"]';
      const asts = parse(vm);

      assert.equal(5, asts.length);

      assert(asts[0].type === 'references');
      expect(asts[0].path[0]).toMatchObject({
        type: 'index',
        id: { type: 'integer', value: '0' },
      });

      // asts[2].path[0] => $foo[$i]
      // {type: 'references', id: {type:'references', id: 'i', leader: '$'}}
      assert(asts[2].type === 'references');
      expect(asts[2].path[0]).toMatchObject({
        type: 'index',
        id: { type: 'references', id: 'i', leader: '$' },
      });

      // asts[4].path[0] => $foo["bar"]
      // {type: 'index', id: {type: 'string', value: 'bar', isEval: true}
      assert(asts[4].type === 'references');
      expect(asts[4].path[0]).toMatchObject({
        type: 'index',
        id: { type: 'string', value: 'bar', isEval: true },
      });
    });
  });

  describe('complex references', () => {
    it('property + index + property', () => {
      const vm = '$foo.bar[1].junk';
      const ast = parse(vm)[0];

      assert.equal('foo', ast.id);
      assert(ast.type === 'references');
      assert.equal(3, ast.path.length);

      const paths = ast.path;

      assert.equal('property', paths[0].type);
      assert.equal('index', paths[1].type);
      assert.equal('property', paths[2].type);
    });

    it('method + index', () => {
      const vm = '$foo.callMethod()[1]';
      const ast = parse(vm)[0];

      assert(ast.type === 'references');
      assert.equal(2, ast.path.length);

      assert.equal('method', ast.path[0].type);
      assert.equal('callMethod', ast.path[0].id);

      assert.equal('index', ast.path[1].type);
      assert(ast.path[1].type === 'index');
      assert.equal('1', ast.path[1].id.value);
      assert.equal('integer', ast.path[1].id.type);
    });

    it('property should not start with alphabet', () => {
      const asts = parse('$foo.124');
      const ast2 = parse('$foo.-24')[0];

      assert.equal(3, asts.length);
      assert.equal('foo', asts[0].id);
      assert(asts[0].type === 'references');
      assert.equal(undefined, asts[0].path);

      assert.equal(undefined, (ast2 as any).path);
    });

    it('index should end with close bracket', () => {
      assert.throws(() => {
        parse("$foo.bar['a'12]");
      }, /Parse error/);
    });
  });

  describe('Directives', () => {
    it('#macro', () => {
      const vm = '#macro( d $a $b)#if($b)$a#end#end #d($foo $bar)';
      const asts = parse(vm);

      const ifAst = asts[0][1];

      assert.equal(ifAst[0].condition.type, 'references');
      assert.equal(ifAst[0].condition.id, 'b');
      assert.equal(ifAst[0].condition.prue, undefined);

      assert.equal(ifAst[1].type, 'references');
      assert.equal(ifAst[1].id, 'a');
      assert.equal(ifAst[1].prue, true);

      assert.equal(asts.length, 3);
      assert.equal(ifAst.length, 2);
    });

    it('#setter will work fine', () => {
      const vm = '<a href="#setter" target="_blank"></a>';
      let asts = parse(vm);
      expect(asts.every((ast) => typeof ast === 'string')).toEqual(true);
      const vm2 = '<a href="#setter()" target="_blank"></a>';
      asts = parse(vm2);
      expect(asts[1].type).toEqual('macro_call');
    });
  });

  describe('comment identify', () => {
    it('one line comment', () => {
      const asts = parse('#set( $monkey.Number = 123)##number literal');

      assert.equal(2, asts.length);
      assert.equal('comment', asts[1].type);
    });

    it('all comment', () => {
      let asts = parse('##number literal');

      expect(asts.length).toEqual(1);
      expect(asts[0].type).toEqual('comment');

      asts = parse('##');
      expect(asts.length).toEqual(1);
      expect(asts[0].type).toEqual('comment');
    });
  });

  describe('raw identify', () => {
    it('raw content', () => {
      const asts = parse('#[[\nThis content is ignored.\n]]#');

      assert.equal('raw', asts[0].type);
      assert.equal('\nThis content is ignored.\n', asts[0].value);
    });
  });
});
