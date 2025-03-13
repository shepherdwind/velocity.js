import Compile from './compile/index';
import { parse } from './parse';
import { type CompileConfig, type Macros, type RenderContext } from './type';
import { getRefText } from './helper/index';

// Compile.parse = parse;

export const render = (
  template: string,
  context?: RenderContext,
  macros?: Macros,
  config?: CompileConfig
): string => {
  const asts = parse(template);
  const compile = new Compile(asts, config);
  return compile.render(context, macros);
};

export const Helper = {
  getRefText,
};
export { parse, Compile };
