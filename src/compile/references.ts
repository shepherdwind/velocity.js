import debugBase from 'debug';
import { getRefText } from '../helper';
import { Compile } from './compile';
import { Attribute, IndexAttribute, Method, ReferencesAST, VELOCITY_AST } from '../type';
import { applyMixins, convert } from '../utils';

const debug = debugBase('velocity');
const posUnknown = { first_line: 'unknown', first_column: 'unknown' };

export class References extends Compile {
  /**
   * get variable value
   * @param {object} ast ast data
   * @param {bool} isVal for example `$foo`, isVal value should be true, other condition,
   * `#set($foo = $bar)`, the $bar value get, isVal set to false
   */
  getReferences(ast: ReferencesAST, isVal?: boolean) {
    if (ast.prue) {
      const define = this.defines[ast.id];
      if (Array.isArray(define)) {
        return this.renderAstList(define);
      }

      if (this.config.unescape && ast.id in this.config.unescape) {
        ast.prue = false;
      }
    }

    const escape = this.config.escape;

    const isSilent = this.silence || ast.leader === '$!';
    const isFunction = ast.args !== undefined;
    const context = this.context;
    let ret = context[ast.id];
    const local = this.getLocal(ast);

    const text = getRefText(ast);

    if (text in context) {
      return ast.prue && escape ? convert(context[text]) : context[text];
    }

    if (ret !== undefined && isFunction) {
      ret = this.getPropMethod(ast as unknown as Method, context, ast);
    }

    if (local.isLocal) ret = local['value'];

    if (Array.isArray(ast.path)) {
      ast.path.some((property) => {
        if (ret === undefined) {
          this._throw(ast, property);
        }

        // 第三个参数，返回后面的参数ast
        ret = this.getAttributes(property, ret, ast);
      });
    }

    if (isVal && ret === undefined) {
      ret = isSilent ? '' : getRefText(ast);
    }

    ret = ast.prue && escape ? convert(ret) : ret;

    return ret;
  }

  /**
   * 获取局部变量，在macro和foreach循环中使用
   */
  getLocal(ast: ReferencesAST) {
    const id = ast.id;
    const local = this.local;
    let ret = false;

    const isLocal = this.conditions.some((contextId: string) => {
      const hasData = id in (local[contextId] as object);
      if (hasData) {
        ret = (local[contextId] as object)[id];
      }

      return hasData;
    });

    return {
      value: ret,
      isLocal,
    };
  }
  /**
   * $foo.bar 属性求值，最后面两个参数在用户传递的函数中用到
   * @param {object} property 属性描述，一个对象，主要包括id，type等定义
   * @param {object} baseRef 当前执行链结果，比如$a.b.c，第一次baseRef是$a,
   * 第二次是$a.b返回值
   * @private
   */
  getAttributes(property: Attribute, baseRef: unknown, ast: ReferencesAST) {
    // fix #54
    if (baseRef === null || baseRef === undefined) {
      return undefined;
    }

    /**
     * type对应着velocity.yy中的attribute，三种类型: method, index, property
     */
    if (property.type === 'method') {
      return this.getPropMethod(property, baseRef, ast);
    }

    if (property.type === 'property') {
      return baseRef[property.id];
    }
    return this.getPropIndex(property, baseRef);
  }

  /**
   * $foo.bar[1] index求值
   * @private
   */
  getPropIndex(property: IndexAttribute, baseRef: object) {
    const ast = property.id;
    const key = ast.type === 'references' ? this.getReferences(ast) : ast.value;
    return baseRef[key];
  }

  /**
   * $foo.bar()求值
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPropMethod(property: Method, baseRef: any, ast: ReferencesAST) {
    const id = property.id;
    let ret = baseRef[id];
    const args = (property.args || []).map((exp) => this.getLiteral(exp as VELOCITY_AST)) || [];

    const payload = { property: id, params: args, context: baseRef };
    const matched = this.config.customMethodHandlers?.find((item) => item && item.match(payload));

    if (matched) {
      debug('match custom method handler, uid %s', matched.uid);
      // run custom method handler, we can
      // add some native method which Java can do, for example
      // #set($foo = [1, 2]) $foo.size()
      return matched.resolve(payload);
    }

    if (!ret || !ret.call) {
      this._throw(ast, property, 'TypeError');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    if (typeof baseRef === 'object' && baseRef) {
      baseRef.eval = function (...args: unknown[]) {
        // eslint-disable-next-line prefer-spread
        return that.eval.apply(that, args);
      };
    }

    try {
      ret = ret.apply(baseRef, args);
    } catch (e) {
      const pos = ast.pos || posUnknown;
      const text = getRefText(ast);
      const err = `on ${text} at L/N ${pos.first_line}:${pos.first_column}`;
      e.message += err;
      throw e;
    }

    return ret;
  }

  _throw(ast: ReferencesAST, property: Attribute, errorName?: string) {
    if (this.config.env !== 'development') {
      return;
    }

    const text = getRefText(ast);
    const pos = ast.pos || posUnknown;
    const propertyName = property.type === 'index' ? property.id.value : property.id;
    let errorMsg = 'get property ' + propertyName + ' of undefined';
    if (errorName === 'TypeError') {
      errorMsg = propertyName + ' is not method';
    }

    errorMsg += '\n  at L/N ' + text + ' ' + pos.first_line + ':' + pos.first_column;
    const e = new Error(errorMsg);
    e.name = errorName || 'ReferenceError';
    throw e;
  }
}

applyMixins(Compile, [References]);
