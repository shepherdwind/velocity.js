import type { CompileConfig, Macros, Param, RenderContext, SetAST, VELOCITY_AST } from '../type';
import defaultMethodHandlers from './methods';

export class Velocity {
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

  /* istanbul ignore next */
  render(_context?: RenderContext, _macros?: Macros, _silence?: boolean) {
    return '';
  }

  /* istanbul ignore next */
  protected getReferences(_ast: VELOCITY_AST, _isVal?: boolean) {
    return '';
  }

  /* istanbul ignore next */
  protected getLiteral(_ast: VELOCITY_AST) {
    return '';
  }

  /* istanbul ignore next */
  protected getExpression(_ast: VELOCITY_AST) {
    return '';
  }

  /* istanbul ignore next */
  protected setValue(_ast: SetAST) {
    return;
  }

  /* istanbul ignore next */
  protected getBlock(_ast: VELOCITY_AST[]) {
    return '';
  }

  /* istanbul ignore next */
  protected getMacro(_ast: VELOCITY_AST) {
    return '';
  }

  /* istanbul ignore next */
  protected evalStr(_str: string) {
    return '';
  }

  /* istanbul ignore next */
  protected eval(str: string, _local?: object) {
    return str;
  }
} 