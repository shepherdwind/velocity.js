/* eslint-disable @typescript-eslint/no-explicit-any */
export type Macros = any;

export type RenderContext = Record<string, any>;

export type AST_TYPE =
  | 'else'
  | 'end'
  | 'foreach'
  | 'define'
  | 'content'
  | 'comment'
  | 'macro'
  | 'macro_call'
  | 'method'
  | 'index'
  | 'property'
  | 'break'
  | 'noescape'
  | 'macro_body'
  | 'raw';

export interface CommonAstType {
  value: any;
  id: string;
  pos: { first_line: number; first_column: number };
}

export interface MacroAST extends CommonAstType {
  type: 'macro';
  id: string;
  args: Param[];
}

export type SetAST = CommonAstType & {
  type: 'set';
  equal: [ReferencesAST, VELOCITY_AST];
};

export interface StringAST extends CommonAstType {
  type: 'string';
  value: string;
  isEval: boolean;
}

export type ArrayAST = NormalArrayAST | RangeArrayAST;
export interface NormalArrayAST extends CommonAstType {
  type: 'array';
  value: Param[];
}

export interface RangeArrayAST extends CommonAstType {
  type: 'array';
  value: [ReferencesAST | string | number];
  isRange: true;
}

export interface IfAST extends CommonAstType {
  type: 'if' | 'elseif';
  condition: VELOCITY_AST;
}

export type Attribute =
  | Method
  | IndexAttribute
  | {
      type: 'property';
      id: string;
    };

export type IndexAttribute = {
  type: 'index';
  id: LiteralAST | ReferencesAST;
};

export interface Content {
  type: 'content';
  value: string;
  id: string;
}

export interface Method {
  type: 'method';
  id: string;
  args?: Param[];
}

export type Param = ReferencesAST | LiteralAST;

export type LiteralAST =
  | ArrayAST
  | {
      type: 'map';
      value: Record<string, Param>;
    }
  | StringAST
  | {
      type: 'integer' | 'decimal';
      value: string;
    }
  | {
      type: 'bool';
      value: 'true' | 'false' | 'null';
    }
  | {
      type: 'runt';
      value: string;
    };

export interface ReferencesAST extends CommonAstType {
  type: 'references';
  prue: boolean;
  isWraped: boolean;
  id: string;
  leader: string;
  path?: Attribute[];
  args?: Param[];
}

export interface MacroCallAST extends CommonAstType {
  type: 'macro_call';
  args: Param[];
}

export interface EachAST extends CommonAstType {
  type: 'foreach';
  from: ReferencesAST;
  to: string;
}

export interface MathAST extends CommonAstType {
  type: 'math';
  expression: Array<MacroAST | LiteralAST | ReferencesAST>;
  operator: string;
}

export interface CommonAST extends CommonAstType {
  type: AST_TYPE;
}

export type VELOCITY_AST =
  | CommonAST
  | ReferencesAST
  | MacroCallAST
  | EachAST
  | IfAST
  | MacroAST
  | MathAST
  | SetAST
  | LiteralAST;
export type RAW_AST_TYPE = VELOCITY_AST | string;

export interface CompileConfig {
  escape?: boolean; // escape variable
  unescape?: Record<string, boolean>; // unescape var config
  // @see https://github.com/shepherdwind/velocity.js/pull/105
  valueMapper?: (value: any) => any;
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
  env?: string;
}
