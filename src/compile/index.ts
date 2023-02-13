import { CompileConfig, Macros, Param, RenderContext, VELOCITY_AST } from '../type';
import defaultMethodHandlers from './methods';

export default class Velocity {
  context: RenderContext = {};
  protected macros: Record<string, Function> = {};
  protected defines: Record<string, VELOCITY_AST[]> = {};
  protected conditions: string[] = [];
  protected local: any = {};
  protected silence = false;
  protected unescape = {};
  protected contextId: string = '';

  protected config: CompileConfig = {
    /**
     * if escapeHtml variable, is set true
     * $foo value will handle by escapeHtml
     */
    escape: false,
    // whiteList which no need escapeHtml
    unescape: {},
    valueMapper(value: any) {
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
    const customMethodHandlers = (config?.customMethodHandlers || []).concat(
      defaultMethodHandlers
    );
    Object.assign(this.config, config, { customMethodHandlers });
  }

  render(context?: RenderContext, macros?: Macros, silence?: boolean) {
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

  protected setValue(_ast: VELOCITY_AST) {}

  protected getBlock(_ast: VELOCITY_AST[]) {
    return '';
  }

  protected getMacro(_ast: VELOCITY_AST) {
    return '';
  }

  protected evalStr(_str: string) {
    return '';
  }

  protected eval(str: string, contextId?: string) {
    return [str, contextId].join(',');
  }

}

import './compile';