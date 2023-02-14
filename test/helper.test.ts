import assert from 'assert';
import { type ReferencesAST } from '../src/type';
import { parse, Helper } from '../src/velocity';
const { getRefText } = Helper;

describe('Helper', () => {
  describe('getRefText', () => {
    it('simple reference', () => {
      const foo = '$a.b';
      const ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);
    });

    it('reference method', () => {
      const foo = '$a.b()';
      const ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);
    });

    it('reference method with arguments', () => {
      let foo = '$a.b("hello")';
      let ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);

      foo = "$a.b('hello')";
      ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);

      foo = "$a.b('hello',10)";
      ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);
    });

    it('reference method with arguments array', () => {
      let foo = '$a.b(["hello"])';
      let ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);

      foo = "$a.b(['hello', 2])";
      ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);
    });

    it('reference index', () => {
      let foo = '$a.b[1]';
      let ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);

      foo = '$a.b["cc"]';
      ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);

      foo = "$a.b['cc']";
      ast = parse(foo)[0] as ReferencesAST;
      assert.equal(getRefText(ast), foo);
    });
  });
});
