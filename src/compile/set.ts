import type { SetAST, VELOCITY_AST } from '../type';
import { applyMixins } from '../utils';
import { Compile } from './base-compile';
/**
 * #set value
 */
export class SetValue extends Compile {
  /**
   * get variable from context, if run in block, return local context, else return global context
   */
  getContext(idName: string) {
    const local = this.local;
    // context find, from the conditions stack top to end
    for (const condition of this.conditions) {
      // eslint-disable-next-line no-prototype-builtins
      if ((local[condition] as object).hasOwnProperty(idName)) {
        return local[condition];
      }
    }
    // not find local variable, return global context
    return this.context;
  }
  /**
   * parse #set
   */
  setValue(ast: SetAST): void {
    const ref = ast.equal[0];
    let context = this.getContext(ref.id) as object;

    // @see #25
    if (this.contextId && this.contextId.indexOf('macro:') === 0) {
      context = this.context;
      // fix #129
    }

    const valAst = ast.equal[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let val: any;

    if (valAst.type === 'math') {
      val = this.getExpression(valAst);
    } else {
      val = this.config.valueMapper?.(this.getLiteral(ast.equal[1]));
    }

    if (!ref.path) {
      (context as Record<string, unknown>)[ref.id] = val;
      return;
    }

    let baseRef = (context as Record<string, unknown>)[ref.id];
    if (typeof baseRef !== 'object') {
      baseRef = {};
    }

    (context as Record<string, unknown>)[ref.id] = baseRef;
    const len = ref.path ? ref.path.length : 0;

    ref.path.some((exp, i) => {
      const isEnd = len === i + 1;
      let key: string;

      if (exp.type === 'property') {
        key = exp.id;
      } else if (exp.type === 'index' && exp.id) {
        key = String(this.getLiteral(exp.id as VELOCITY_AST));
      } else {
        key = '';
      }

      if (isEnd) {
        (baseRef as Record<string, unknown>)[key] = val;
        return true;
      }

      baseRef = (baseRef as Record<string, unknown>)[key] as Record<string, unknown>;

      // such as
      // #set($a.d.c2 = 2)
      // but $a.d is undefined, value set fail
      if (baseRef === undefined) {
        return true;
      }

      return false;
    });
  }
}

applyMixins(Compile, [SetValue]);
