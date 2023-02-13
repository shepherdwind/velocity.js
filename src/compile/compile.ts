import Velocity from './index';
import { RenderContext, VELOCITY_AST } from '../type';
import { applyMixins } from '../utils';

export class Compile extends Velocity {
  /**
   * @param context {object} context object
   * @param macro   {object} self defined #macro
   * @param silent {bool} 如果是true，$foo变量将原样输出
   * @return str
   */
  render(context: RenderContext, macros: any, silence: any) {
    this.silence = !!silence;
    this.context = context || {};
    this.macros = Object.assign(macros || {}, {
      stop: () => {
        this.runState.stop = true;
        return '';
      },
    });

    if (!this.macros.hasOwnProperty('eval')) {
      // add eval method to macros
      Object.defineProperty(this.macros, 'eval', {
        value: this.eval.bind(this),
      });
    }

    return this._render();
  }

  /**
   * 解析入口函数
   * @param ast {array} 模板结构数组
   * @param contextId {number} 执行环境id，对于macro有局部作用域，变量的设置和
   * 取值，都放在一个this.local下，通过contextId查找
   * @return {string}解析后的字符串
   */
  _render(asts?: VELOCITY_AST[], contextId?: string) {
    let str = '';
    asts = asts || this.asts;

    if (contextId) {
      if (
        contextId !== this.contextId &&
        this.conditions.indexOf(contextId) === -1
      ) {
        this.conditions.unshift(contextId);
      }

      this.contextId = contextId;
    } else {
      this.contextId = '';
    }

    asts.forEach((ast: VELOCITY_AST) => {
      // 进入stop，直接退出
      if (this.runState.stop === true) {
        return false;
      }

      switch (ast.type) {
        case 'references':
          str += this.format(this.getReferences(ast, true));
          break;

        case 'set':
          this.setValue(ast);
          break;

        case 'break':
          this.runState.break = true;
          break;

        case 'macro_call':
          str += this.getMacro(ast);
          break;

        case 'comment':
          break;

        case 'raw':
          str += ast.value;
          break;

        default:
          str +=
            typeof ast === 'string'
              ? ast
              : this.getBlock(ast as unknown as VELOCITY_AST[]);
          break;
      }
    });

    return str;
  }

  format(value: any): string {
    if (Array.isArray(value)) {
      return '[' + value.map(this.format.bind(this)).join(', ') + ']';
    }

    if (typeof value === 'object' && value !== null) {
      if (value.toString.toString().indexOf('[native code]') === -1) {
        return value;
      }

      const kvJoin = (k: string) => `${k}=${this.format(value[k])}`;
      return '{' + Object.keys(value).map(kvJoin).join(', ') + '}';
    }

    return value;
  }
}

import './blocks';
import './expression';
import './literal';
import './references';
import './set';

applyMixins(Velocity, [Compile]);
