import type { CompileConfig, Macros, Param, RenderContext, SetAST, VELOCITY_AST } from '../type';
import defaultMethodHandlers from './methods';

export default class Velocity {
  context: RenderContext = {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  protected macros: Record<string, Function> = {};
  protected defines: Record<string, VELOCITY_AST[]> = {};
  protected conditions: string[] = [];
  protected local: Record<string, unknown> = {};
  protected silence = false;
  protected unescape = {};
  protected contextId = '';

  protected config: CompileConfig = {
    /**
     * if escapeHtml variable, is set true
     * $foo value will handle by escapeHtml
     */
    escape: false,
    // whiteList which no need escapeHtml
    unescape: {},
    valueMapper<T>(value: T) {
      return value;
    },
  };

  protected macrosStore: Record<
    string,
    {
      asts: VELOCITY_AST[];
      args: Param[];
    }
  > = {};

  protected asts: VELOCITY_AST[];
  protected runState = { stop: false, break: false };

  constructor(asts: VELOCITY_AST[], config?: CompileConfig) {
    this.asts = asts;
    const customMethodHandlers = (config?.customMethodHandlers ?? []).concat(defaultMethodHandlers);
    Object.assign(this.config, config, { customMethodHandlers });
  }

  render(_context?: RenderContext, _macros?: Macros, _silence?: boolean) {
    return '';
  }

  protected getReferences(_ast: VELOCITY_AST, _isVal?: boolean) {
    return '';
  }

  protected getLiteral(_ast: VELOCITY_AST) {
    return '';
  }

  protected getExpression(_ast: VELOCITY_AST) {
    return '';
  }

  protected setValue(_ast: SetAST) {
    return;
  }

  protected getBlock(_ast: VELOCITY_AST[]) {
    return '';
  }

  protected getMacro(_ast: VELOCITY_AST) {
    return '';
  }

  protected evalStr(_str: string) {
    return '';
  }

  protected eval(str: string, _local?: object) {
    return str;
  }
}

import './compile';
