import { applyMixins } from '../utils';
import { Compile } from './base-compile';
import { ArrayAST, LiteralAST, NormalArrayAST, ReferencesAST, StringAST } from '../type';

/**
 * literal parse, include string, integer, array, map, bool data structure
 * @require {method} getReferences
 */
export class LiteralCompiler extends Compile {
  /**
   * Evaluate literals, mainly including four data structures: string, integer, array, map
   * @param literal {object} Defined in the velocity.yy file, type describes the data type,
   * value property is the literal value description
   * @return js variable
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLiteral(literal: LiteralAST | ReferencesAST): any {
    const type = literal.type;

    if (type === 'string') {
      return this.getString(literal);
    }

    if (type === 'integer') {
      return parseInt(literal.value, 10);
    }

    if (type === 'decimal') {
      return parseFloat(literal.value);
    }

    if (type === 'array') {
      return this.getArray(literal);
    }

    if (type === 'map') {
      const ret: Record<string, unknown> = {};
      const map = literal.value || {};

      Object.keys(map).forEach((key: string) => {
        ret[key] = this.getLiteral(map[key]);
      });
      return ret;
    }

    if (type === 'bool') {
      return {
        true: true,
        false: false,
        null: null,
      }[literal.value];
    }

    return this.getReferences(literal);
  }

  /**
   * Evaluate strings, for double-quoted strings, variable replacement needs to be done
   */
  getString(literal: StringAST) {
    const val = literal.value;

    if (literal.isEval && (val.indexOf('#') !== -1 || val.indexOf('$') !== -1)) {
      return this.evalStr(val);
    }

    return val;
  }

  /**
   * Evaluate array literals, e.g. [1, 2] => [1,2], [1..5] => [1,2,3,4,5]
   * @param literal {object} Description object of array literal, divided into two types:
   * normal array and range array
   */
  getArray(literal: ArrayAST): unknown[] {
    if (!('isRange' in literal && literal.isRange === true)) {
      return (literal as NormalArrayAST).value.map((exp) => this.getLiteral(exp));
    }

    const [begin, end] = literal.value.map((exp) => {
      if (typeof exp === 'string') {
        return parseInt(exp, 10);
      }
      if (typeof exp === 'number') {
        return exp;
      }
      return this.getReferences(exp) as unknown as number;
    });

    if (Number.isNaN(begin) || Number.isNaN(end)) {
      return [];
    }

    let i = 0;
    const ret: number[] = [];
    if (begin < end) {
      for (i = begin; i <= end; i++) ret.push(i);
    } else {
      for (i = begin; i >= end; i--) ret.push(i);
    }
    return ret;
  }
}

applyMixins(Compile, [LiteralCompiler]);
