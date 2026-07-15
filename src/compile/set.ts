import type { Attribute, ReferencesAST, SetAST, VELOCITY_AST } from '../type';
import { applyMixins } from '../utils';
import { Compile } from './base-compile';
import { hasBlockedUnknownPrototypePath, isBlockedPrototypeKey } from './prototype-guard';

type SetPathTarget = {
  blocked: boolean;
  rootRef?: unknown;
  shouldSetRoot?: boolean;
  baseRef?: unknown;
  key?: string;
};

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

  private getPathKeys(ref: ReferencesAST): string[] {
    return (ref.path || []).map((exp) => this.getPathKey(exp));
  }

  private isBlockedPathKey(baseRef: unknown, key: string, isEnd: boolean): boolean {
    return isBlockedPrototypeKey(baseRef, key, isEnd);
  }

  private hasBlockedUnknownPath(keys: string[], startIndex: number): boolean {
    return hasBlockedUnknownPrototypePath(keys, startIndex);
  }

  private resolveSetPath(context: object, ref: ReferencesAST, pathKeys: string[]): SetPathTarget {
    if (pathKeys.length === 0) {
      return { blocked: this.isBlockedPathKey(context, ref.id, true) };
    }

    if (this.isBlockedPathKey(context, ref.id, false)) {
      return { blocked: true };
    }

    let rootRef = (context as Record<string, unknown>)[ref.id];
    let shouldSetRoot = false;

    if (typeof rootRef !== 'object') {
      rootRef = {};
      shouldSetRoot = true;
    }

    let baseRef = rootRef;

    for (let i = 0; i < pathKeys.length; i++) {
      if (baseRef === undefined || baseRef === null) {
        return { blocked: this.hasBlockedUnknownPath(pathKeys, i), rootRef, shouldSetRoot };
      }

      const key = pathKeys[i];
      const isEnd = pathKeys.length === i + 1;

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

    // Resolve the left-hand path before evaluating RHS so blocked prototype
    // paths cannot trigger user callbacks or other RHS side effects.
    const pathKeys = this.getPathKeys(ref);
    let setPath = this.resolveSetPath(context, ref, pathKeys);

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

    // Resolve again after RHS evaluation to preserve legacy behavior where RHS
    // side effects create a previously missing parent object.
    setPath = this.resolveSetPath(context, ref, pathKeys);

    if (setPath.blocked) {
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
