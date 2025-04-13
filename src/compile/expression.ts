import type { VELOCITY_AST } from '../type';
import { applyMixins } from '../utils';
import { Compile } from './base-compile';

/**
 * expression support, include math, logic, compare expression
 */
export class Expression extends Compile {
  /**
   * Expression evaluation, mainly for mathematical expressions, logical operations and comparison operations.
   * For basic data types at the lowest level, getLiteral is used for evaluation.
   * When getLiteral encounters references, getReferences is used for evaluation.
   */
  getExpression(ast: VELOCITY_AST) {
    if (ast.type !== 'math') {
      return this.getLiteral(ast);
    }

    const exp = ast.expression;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line eqeqeq
        ret = this.getExpression(exp[0]) == this.getExpression(exp[1]);
        break;

      case '>=':
        ret = this.getExpression(exp[0]) >= this.getExpression(exp[1]);
        break;

      case '<=':
        ret = this.getExpression(exp[0]) <= this.getExpression(exp[1]);
        break;

      case '!=':
        // eslint-disable-next-line eqeqeq
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
