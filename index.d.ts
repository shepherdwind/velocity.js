interface Velocity {
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

type AST_TYPE = 'set' | 'elseif' | 'if' | 'else' | 'end' | 'foreach' | 'define' | 'content' | 'comment'
                | 'macro' | 'macro_call' | 'math' | 'references' | 'method' | 'index' | 'property'
                | 'bool' | 'interger' | 'decimal' | 'string' | 'array' | 'map'

interface VELOCITY_AST {
  type: AST_TYPE
  value: any
  id: string
  pos: { first_line: number, first_column: number }
}

interface CompileConfig {
  escape?: boolean // escape variable
  unescape?: { [varName: string]: boolean } // unescape var config
  // @see https://github.com/shepherdwind/velocity.js/pull/105
  valueMapper?: (value: any) => any
}

declare module 'velocityjs' {
  var velocityjs: Velocity;
  export = velocityjs
}
