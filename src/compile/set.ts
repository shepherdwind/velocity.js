import type { Attribute, ReferencesAST, SetAST, VELOCITY_AST } from '../type';
import { applyMixins } from '../utils';
import { Compile } from './base-compile';

const PROTO_KEY = '__proto__';
const PROTOTYPE_CHAIN_KEYS = new Set(['constructor', 'prototype']);

type SetPathTarget = {
  blocked: boolean;
  rootRef?: unknown;
  shouldSetRoot?: boolean;
  baseRef?: unknown;
  key?: string;
};

function hasOwnProperty(baseRef: unknown, key: string): boolean {
  return (
    (typeof baseRef === 'object' || typeof baseRef === 'function') &&
    baseRef !== null &&
    Object.prototype.hasOwnProperty.call(baseRef, key)
  );
}

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
  private getPathKey(exp: Attribute): string {
    if (exp.type === 'property') {
      return exp.id;
    }

    if (exp.type === 'index' && exp.id) {
      return String(this.getLiteral(exp.id as VELOCITY_AST));
    }

    return '';
  }

  private isBlockedPathKey(baseRef: unknown, key: string, isEnd: boolean): boolean {
    if (key === PROTO_KEY) {
      return true;
    }

    if (key === 'prototype' && typeof baseRef === 'function') {
      return true;
    }

    return !isEnd && PROTOTYPE_CHAIN_KEYS.has(key) && !hasOwnProperty(baseRef, key);
  }

  private resolveSetPath(context: object, ref: ReferencesAST): SetPathTarget {
    if (!ref.path) {
      return { blocked: ref.id === PROTO_KEY };
    }

    if (ref.id === PROTO_KEY) {
      return { blocked: true };
    }

    let rootRef = (context as Record<string, unknown>)[ref.id];
    let shouldSetRoot = false;

    if (typeof rootRef !== 'object') {
      rootRef = {};
      shouldSetRoot = true;
    }

    let baseRef = rootRef;

    for (let i = 0; i < ref.path.length; i++) {
      if (baseRef === undefined || baseRef === null) {
        return { blocked: false, rootRef, shouldSetRoot };
      }

      const key = this.getPathKey(ref.path[i]);
      const isEnd = ref.path.length === i + 1;

      if (this.isBlockedPathKey(baseRef, key, isEnd)) {
        return { blocked: true };
      }

      if (isEnd) {
        return { blocked: false, rootRef, shouldSetRoot, baseRef, key };
      }

      baseRef = (baseRef as Record<string, unknown>)[key];
    }

    return { blocked: false, rootRef, shouldSetRoot };
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

    const setPath = this.resolveSetPath(context, ref);

    if (setPath.blocked) {
      return;
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

    if (setPath.shouldSetRoot) {
      (context as Record<string, unknown>)[ref.id] = setPath.rootRef;
    }

    if (setPath.key !== undefined) {
      (setPath.baseRef as Record<string, unknown>)[setPath.key] = val;
    }
  }
}

applyMixins(Compile, [SetValue]);
