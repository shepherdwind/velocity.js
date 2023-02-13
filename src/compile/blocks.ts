import { EachAST, MacroAST, MacroCallAST, Param, VELOCITY_AST } from '../type';
import { Compile } from './compile';
import { parse } from '../parse';
import { getRefText } from '../helper';
import { applyMixins, guid } from '../utils';

/**
 * blocks such as if, foreach, macro syntax handler
 */
export class BlockCommand extends Compile {
  getBlock(block: VELOCITY_AST[]) {
    const ast = block[0];
    let ret = '';

    switch (ast.type) {
      case 'if':
        ret = this.getBlockIf(block);
        break;
      case 'foreach':
        ret = this.getBlockEach(block);
        break;
      case 'macro':
        this.setBlockMacro(block);
        break;
      case 'noescape':
        ret = this._render(block.slice(1));
        break;
      case 'define':
        this.setBlockDefine(block);
        break;
      case 'macro_body':
        ret = this.getMacroBody(block);
        break;
      default:
        ret = this._render(block);
    }

    return ret || '';
  }

  /**
   * define
   */
  setBlockDefine(block: VELOCITY_AST[]) {
    const ast = block[0];
    this.defines[ast.id] = block.slice(1);
  }

  /**
   * define macro
   */
  setBlockMacro(block: VELOCITY_AST[]) {
    const ast = block[0] as MacroAST;
    this.macrosStore[ast.id] = {
      asts: block.slice(1),
      args: ast.args,
    };
  }

  getMacroBody(asts: VELOCITY_AST[]) {
    const ast = asts[0] as MacroCallAST;
    const _block = asts.slice(1);
    const bodyContent = this.eval(_block, {});
    return this.getMacro(ast, bodyContent);
  }

  /**
   * parse macro call
   */
  getMacro(ast: MacroCallAST, bodyContent?: any) {
    const macro = this.macrosStore[ast.id];

    if (!macro) {
      const fn: any = this.macros[ast.id];
      if (!fn || typeof fn !== 'function') {
        return '';
      }

      const jsArgs: any[] = (ast.args || []).map((arg) =>
        this.getLiteral(arg as VELOCITY_AST)
      );

      try {
        return fn.apply(this.macros, jsArgs);
      } catch (e: any) {
        const pos = ast.pos;
        const text = getRefText(ast);
        const err = `\n      at ${text} L/N ${pos.first_line}:${pos.first_column}`;
        e.name = '';
        e.message += err;
        throw e;
      }
    }

    const { args, asts } = macro;
    const callArgs = ast.args;
    const local: any = { bodyContent };
    const contextId = `macro:${ast.id}:${guid()}`;

    (args || []).forEach((ref, i) => {
      if (!('id' in ref)) {
        return;
      }

      local[ref.id] = callArgs[i]
        ? this.getLiteral(callArgs[i] as VELOCITY_AST)
        : undefined;
    });

    return this.eval(asts, local, contextId);
  }

  /**
   * eval
   * @param str {array|string} input string
   * @param local {object} local variable
   * @param contextId {=string} optional contextId, this contextId use to find local variable
   * @return {string}
   */
  eval(str: string | VELOCITY_AST[], local: any, contextId?: string): string {
    if (!local) {
      if (Array.isArray(str)) {
        return this._render(str);
      }
      return this.evalStr(str);
    }

    let asts = Array.isArray(str) ? str : parse(str);
    contextId = contextId || 'eval:' + guid();

    if (!asts.length) {
      return '';
    }

    this.local[contextId] = local;
    const ret = this._render(asts, contextId);
    this.local[contextId] = {};
    this.conditions.shift();
    this.contextId = this.conditions[0] || '';

    return ret;
  }

  /**
   * 对双引号字符串进行eval求值，替换其中的变量，只支持最基本的变量类型替换
   */
  evalStr(str: string) {
    const asts = parse(str);
    return this._render(asts, this.contextId);
  }

  /**
   * parse #foreach
   */
  getBlockEach(block: VELOCITY_AST[]) {
    const ast = block[0] as EachAST;
    const _from = this.getLiteral({
      ...ast.from,
      pos: ast.pos,
    });
    const _block = block.slice(1);
    const _to = ast.to;
    const local: any = {
      foreach: {
        count: 0,
      },
    };

    let ret = '';
    const uid = guid();
    const contextId = 'foreach:' + uid;

    const type = {}.toString.call(_from);
    if (!_from || (type !== '[object Array]' && type !== '[object Object]')) {
      return '';
    }

    const items = Array.isArray(_from) ? _from : Object.values(_from);
    const len = items.length;
    items.forEach((val: any, i) => {
      if (this.runState.break) {
        return;
      }
      local[_to] = val;
      local.foreach = {
        count: i + 1,
        index: i,
        hasNext: i + 1 < len,
      };
      local.velocityCount = i + 1;

      this.local[contextId] = local;
      ret += this._render(_block, contextId);
    });

    // if foreach items be an empty array, then this code will shift current
    // conditions, but not this._render call, so this will shift parent context
    if (_from && _from.length) {
      this.runState.break = false;
      // empty current local context object
      this.local[contextId] = {};
      this.conditions.shift();
      this.contextId = this.conditions[0] || '';
    }

    return ret;
  }

  /**
   * parse #if
   */
  getBlockIf(block: VELOCITY_AST[]) {
    let received = false;
    const asts: VELOCITY_AST[] = [];

    block.some((ast) => {
      const hasCondition = ast.type === 'elseif' || ast.type === 'if';
      const isIF = hasCondition || ast.type === 'else';

      if (!isIF) {
        // if not if/elseif/else, then push to asts, skip when not received
        received && asts.push(ast);
        return;
      }

      // if received, then skip all
      if (received) {
        return true;
      }
      received = hasCondition ? !!this.getExpression(ast.condition) : true;
    });

    // keep current condition fix #77
    return this._render(asts, this.contextId);
  }
}

applyMixins(Compile, [BlockCommand]);
