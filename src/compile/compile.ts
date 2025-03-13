import Velocity from './index';
import { Macros, RenderContext, VELOCITY_AST } from '../type';
import { applyMixins, format } from '../utils';

export class Compile extends Velocity {
  /**
   * @param context {object} context object
   * @param macro   {object} self defined #macro
   * @param silent {bool} if true, $foo variable will be output as is
   * @return str
   */
  render(context?: RenderContext, macros?: Macros, silence?: boolean) {
    this.silence = !!silence;
    this.context = context || {};
    this.macros = Object.assign(macros || {}, {
      stop: () => {
        this.runState.stop = true;
        return '';
      },
    });

    // eslint-disable-next-line no-prototype-builtins
    if (!this.macros.hasOwnProperty('eval')) {
      // add eval method to macros
      Object.defineProperty(this.macros, 'eval', {
        value: this.eval.bind(this),
      });
    }

    return this.renderAstList();
  }

  renderAstList(asts?: VELOCITY_AST[], contextId?: string) {
    let str = '';
    asts = asts || this.asts;

    if (contextId) {
      if (contextId !== this.contextId && this.conditions.indexOf(contextId) === -1) {
        this.conditions.unshift(contextId);
      }

      this.contextId = contextId;
    } else {
      this.contextId = '';
    }

    asts.forEach((ast: VELOCITY_AST) => {
      // Exit immediately if stop state is entered
      if (this.runState.stop === true) {
        return false;
      }

      switch (ast.type) {
        case 'references':
          str += format(this.getReferences(ast, true));
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
          str += typeof ast === 'string' ? ast : this.getBlock(ast as unknown as VELOCITY_AST[]);
          break;
      }
    });

    return str;
  }
}

import './blocks';
import './expression';
import './literal';
import './references';
import './set';

applyMixins(Velocity, [Compile]);
