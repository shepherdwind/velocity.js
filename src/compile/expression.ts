import { VELOCITY_AST } from '../type';
import { applyMixins } from '../utils';
import { Compile } from './compile';

/**
 * expression support, include math, logic, compare expression
 */
export class Expression extends Compile {
  /**
   * 表达式求值，表达式主要是数学表达式，逻辑运算和比较运算，到最底层数据结构，
   * 基本数据类型，使用 getLiteral求值，getLiteral遇到是引用的时候，使用
   * getReferences求值
   */
  getExpression(ast: VELOCITY_AST): any {
    if (ast.type !== 'math') {
      return this.getLiteral(ast);
    }

    const exp = ast.expression;
    let ret: any;
    switch (ast.operator) {
      case '+':
        ret = this.getExpression(exp[0]) + this.getExpression(exp[1]);
        break;

      case '-':
        ret = this.getExpression(exp[0]) - this.getExpression(exp[1]);
        break;

      case '/':
        ret = this.getExpression(exp[0]) / this.getExpression(exp[1]);
        break;

      case '%':
        ret = this.getExpression(exp[0]) % this.getExpression(exp[1]);
        break;

      case '*':
        ret = this.getExpression(exp[0]) * this.getExpression(exp[1]);
        break;

      case '||':
        ret = this.getExpression(exp[0]) || this.getExpression(exp[1]);
        break;

      case '&&':
        ret = this.getExpression(exp[0]) && this.getExpression(exp[1]);
        break;

      case '>':
        ret = this.getExpression(exp[0]) > this.getExpression(exp[1]);
        break;

      case '<':
        ret = this.getExpression(exp[0]) < this.getExpression(exp[1]);
        break;

      case '==':
        ret = this.getExpression(exp[0]) == this.getExpression(exp[1]);
        break;

      case '>=':
        ret = this.getExpression(exp[0]) >= this.getExpression(exp[1]);
        break;

      case '<=':
        ret = this.getExpression(exp[0]) <= this.getExpression(exp[1]);
        break;

      case '!=':
        ret = this.getExpression(exp[0]) != this.getExpression(exp[1]);
        break;

      case 'minus':
        ret = -this.getExpression(exp[0]);
        break;

      case 'not':
        ret = !this.getExpression(exp[0]);
        break;

      case 'parenthesis':
        ret = this.getExpression(exp[0]);
        break;

      default:
        return;
      // code
    }

    return ret;
  }
}

applyMixins(Compile, [Expression]);
