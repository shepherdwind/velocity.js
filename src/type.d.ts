export interface Velocity {
  parse(
    vmString: string,
    blocks?: { [blockName: string]: boolean },
    ignoreSpace?: boolean
  ): Array<VELOCITY_AST>;
  render(
    vmString: string,
    context?: RenderContext,
    macros?: Macros,
    config?: CompileConfig
  ): string;

  Compile: Compile;
  Helper: Helper;
}

interface Compile {
  new (asts: Array<VELOCITY_AST>, config?: CompileConfig): Compile;
  render(context?: RenderContext, macros?: Macros, silence?: boolean): string;

  cost: number; // render cost time
}

interface Helper {
  getRefText(ast: VELOCITY_AST): string;
}

type Macros = Object | { [macro: string]: Function };

type RenderContext =
  | Record<string, any>
  | {
      [contextKey: string]: Function;
      eval(vmString: string, context?: RenderContext): string;
    };

export type AST_TYPE =
  | "set"
  | "else"
  | "end"
  | "foreach"
  | "define"
  | "content"
  | "comment"
  | "macro"
  | "macro_call"
  | "method"
  | "index"
  | "property"
  | "bool"
  | "integer"
  | "decimal"
  | "map"
  | "break"
  | "noescape"
  | "macro_body"
  | "raw";

interface VELOCITY_AST_BASE {
  type: AST_TYPE;
  value: any;
  id: string;
  pos: { first_line: number; first_column: number };
}

export interface MacroAST extends VELOCITY_AST_BASE {
  type: "macro";
  id: string;
  args: Param[];
}

export interface StringAST extends VELOCITY_AST_BASE {
  type: "string";
  value: string;
  isEval: boolean;
}

export type ArrayAST = NormalArrayAST | RangeArrayAST;
interface NormalArrayAST extends VELOCITY_AST_BASE {
  type: "array";
  value: Param[];
}

interface RangeArrayAST extends VELOCITY_AST_BASE {
  type: "array";
  value: [ReferencesAST | string | number];
  isRange: true;
}

export interface IfAST extends VELOCITY_AST_BASE {
  type: "if" | "elseif";
  condition: VELOCITY_AST;
}

type Attribute =
  | Method
  | {
      type: "index";
      id: Literal | ReferencesAST | Content;
    }
  | {
      type: "property";
      id: string;
    }
  | Content;

interface Content {
  type: "content";
  value: string;
  id: string;
}

interface Method {
  type: "method";
  id: string;
  args?: Param[];
}

export type Param = ReferencesAST | Literal;

type Literal =
  | {
      type: "array";
      value: Param[];
      isRange: boolean;
    }
  | {
      type: "map";
      value: { [key: string]: Param };
    }
  | {
      type: "string";
      value: string;
      isEval: boolean;
    }
  | {
      type: "integer" | "decimal";
      value: number;
    }
  | {
      type: "bool";
      value: boolean;
    }
  | {
      type: "runt";
      value: string;
    };

export interface ReferencesAST extends VELOCITY_AST_BASE {
  type: "references";
  prue: boolean;
  isWraped: boolean;
  id: string;
  leader: string;
  path?: Attribute[];
  args?: Param[];
}

export interface MacroCallAST extends VELOCITY_AST_BASE {
  type: "macro_call";
  args: Param[];
}

export interface EachAST extends VELOCITY_AST_BASE {
  type: "foreach";
  from: ReferencesAST;
  to: string;
}

export interface MathAST extends VELOCITY_AST_BASE {
  type: "math";
  expression: Array<MacroAST, Literal, ReferencesAST>;
  operator: string;
}

export type VELOCITY_AST =
  | VELOCITY_AST_BASE
  | ReferencesAST
  | MacroCallAST
  | EachAST
  | IfAST
  | MacroAST
  | MathAST
  | ArrayAST
  | StringAST;
export type RAW_AST_TYPE = VELOCITY_AST | string;

export interface CompileConfig {
  escape?: boolean; // escape variable
  unescape?: { [varName: string]: boolean }; // unescape var config
  // @see https://github.com/shepherdwind/velocity.js/pull/105
  valueMapper?: (value: any) => any;
  customMethodHandlers?: Array<{
    // uid for method handler, use in debug log only
    uid: string;
    // the function to judge which method should be handler
    // for example, we want handler the get method like Java
    // $foo.get('bar')
    // @see https://github.com/shepherdwind/velocity.js/pull/146/files#diff-87cd4af0a4775dde2b789b29008ff702828b17afc38d419ffc0772ce4272f5ffR68
    match: (payload: {
      property: string;
      context: any;
      params: any[];
    }) => boolean;
    // the function to handler custom logic
    resolve: (payload: {
      property: string;
      context: any;
      params: any[];
    }) => any;
  }>;
  env?: string;
}

declare module "velocityjs" {
  var velocityjs: Velocity;
  export = velocityjs;
}
