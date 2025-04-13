import { applyMixins, guid, convert, format } from '../src/utils';
import assert from 'assert';

describe('Utils', () => {
  describe('guid', () => {
    it('should increment number', () => {
      const first = guid();
      const second = guid();
      assert.equal(second, first + 1);
    });
  });

  describe('applyMixins', () => {
    it('should apply mixins to target class', () => {
      class Base {
        baseMethod(): string {
          return 'base';
        }
      }

      class Mixin1 {
        mixin1Method(): string {
          return 'mixin1';
        }
      }

      class Mixin2 {
        mixin2Method(): string {
          return 'mixin2';
        }
      }

      class Target {}

      applyMixins(Target, [Base, Mixin1, Mixin2]);

      const target = new Target() as Target & Base & Mixin1 & Mixin2;
      assert.equal(target.baseMethod(), 'base');
      assert.equal(target.mixin1Method(), 'mixin1');
      assert.equal(target.mixin2Method(), 'mixin2');
    });

    it('should not copy constructor', () => {
      class Base {
        baseProp: string;
        constructor() {
          this.baseProp = 'base';
        }
        baseMethod(): string {
          return 'base';
        }
      }

      class Target {}

      applyMixins(Target, [Base]);

      const target = new Target() as Target & Base;
      assert.equal(target.baseMethod(), 'base');
      assert.equal(target.baseProp, undefined);
    });
  });

  describe('convert', () => {
    it('should escape HTML characters', () => {
      assert.equal(convert('&'), '&amp;');
      assert.equal(convert('"'), '&quot;');
      assert.equal(convert('<'), '&lt;');
      assert.equal(convert('>'), '&gt;');
    });

    it('should return original string if no escaping needed', () => {
      const str = 'Hello World';
      assert.equal(convert(str), str);
    });

    it('should handle non-string input', () => {
      assert.equal(convert(123 as unknown as string), 123);
    });
  });

  describe('format', () => {
    it('should format arrays', () => {
      assert.equal(format([1, 2, 3]), '[1, 2, 3]');
      assert.equal(format(['a', 'b', 'c']), '[a, b, c]');
    });

    it('should format objects', () => {
      const obj = { a: 1, b: '2' };
      assert.equal(format(obj), '{a=1, b=2}');
    });

    it('should handle primitive values', () => {
      assert.equal(format('string'), 'string');
      assert.equal(format(123), 123);
      assert.equal(format(true), true);
      assert.equal(format(null), null);
      assert.equal(format(undefined), undefined);
    });
  });
});
