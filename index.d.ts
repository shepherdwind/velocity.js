export interface Velocity {
  parse(vmString: string, blocks?: { [blockName: string]: boolean }, ignoreSpace?: boolean): Array<VELOCITY_AST>
  render(vmString: string, context?: RenderContext, macros?: Macros, config?: CompileConfig): string

  Compile: Compile
  Helper: Helper
}

interface Compile {
  new (asts: Array<VELOCITY_AST>, config?: CompileConfig): Compile
  render(context?: RenderContext, macros?: Macros, silence?: boolean): string

  cost: number // render cost time
}

interface Helper {
  getRefText(ast: VELOCITY_AST): string
}

type Macros = Object | { [macro: string]: Function }

type RenderContext = Object | {
  [contextKey: string]: Function,
  eval(vmString: string, context?: RenderContext): string
}

export type AST_TYPE = 'set' | 'elseif' | 'if' | 'else' | 'end' | 'foreach' | 'define' | 'content' | 'comment'
                | 'macro' | 'macro_call' | 'math' | 'references' | 'method' | 'index' | 'property'
                | 'bool' | 'interger' | 'decimal' | 'string' | 'array' | 'map'

export interface VELOCITY_AST {
  type: AST_TYPE
  value: any
  id: string
  pos: { first_line: number, first_column: number }
}

export interface CompileConfig {
  escape?: boolean // escape variable
  unescape?: { [varName: string]: boolean } // unescape var config
  // @see https://github.com/shepherdwind/velocity.js/pull/105
  valueMapper?: (value: any) => any
  customMethodHandlers?: Array<{
    // uid for method handler, use in debug log only
    uid: string;
    // the function to judge which method should be handler
    // for example, we want handler the get method like Java
    // $foo.get('bar')
    // @see https://github.com/shepherdwind/velocity.js/pull/146/files#diff-87cd4af0a4775dde2b789b29008ff702828b17afc38d419ffc0772ce4272f5ffR68
    match: (payload: { property: string; context: any; params: any[] }) => boolean;
    // the function to handler custom logic
    resolve: (payload: { property: string; context: any; params: any[] }) => any;
  }>;
}

declare module 'velocityjs' {
  var velocityjs: Velocity;
  export = velocityjs
}
