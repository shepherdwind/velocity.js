import { ArrayAST, NormalArrayAST, StringAST, VELOCITY_AST } from '../type';
import { applyMixins } from '../utils';
import { Compile } from './compile';

/**
 * literal parse, include string, integer, array, map, bool data structure
 * @require {method} getReferences
 */
export class LiteralCompiler extends Compile {
  /**
   * 字面量求值，主要包括string, integer, array, map四种数据结构
   * @param literal {object} 定义于velocity.yy文件，type描述数据类型，value属性
   * 是literal值描述
   * @return {object|string|number|array} js variable
   */
  getLiteral(literal: VELOCITY_AST): any {
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
      const ret: any = {};
      const map = literal.value || {};

      Object.keys(map).forEach((key: string) => {
        ret[key] = this.getLiteral(map[key] as VELOCITY_AST);
      });
      return ret;
    }

    if (type === 'bool') {
      return {
        true: true,
        false: false,
        null: null,
      }[literal.value as string];
    }

    return this.getReferences(literal);
  }

  /**
   * 对字符串求值，对已双引号字符串，需要做变量替换
   */
  getString(literal: StringAST) {
    const val = literal.value;

    if (
      literal.isEval &&
      (val.indexOf('#') !== -1 || val.indexOf('$') !== -1)
    ) {
      return this.evalStr(val);
    }

    return val;
  }

  /**
   * 对array字面量求值，比如[1, 2]=> [1,2]，[1..5] => [1,2,3,4,5]
   * @param literal {object} array字面量的描述对象，分为普通数组和range数组两种
   * ，和js基本一致
   * @return {array} 求值得到的数组
   */
  getArray(literal: ArrayAST): any[] {
    if (!('isRange' in literal && literal.isRange === true)) {
      return (literal as NormalArrayAST).value.map((exp) => this.getLiteral(exp as VELOCITY_AST));
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
