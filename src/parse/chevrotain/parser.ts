/**
 * Parser implementation for the Velocity template language
 *
 * This file defines the parser rules and grammar structure.
 */
import { CstParser, IToken, CstNode } from 'chevrotain';
import {
  Content,
  WhiteSpace,
  Dollar,
  Hash,
  OpenCurly,
  CloseCurly,
  OpenParen,
  CloseParen,
  Dot,
  Comma,
  Colon,
  Bang,
  Equal,
  Set,
  If,
  ElseIf,
  Else,
  End,
  ForEach,
  In,
  Id,
  StringLiteral,
} from './tokens';

// Define all tokens used in the parser
const allTokens = [
  Content,
  WhiteSpace,
  Dollar,
  Hash,
  OpenCurly,
  CloseCurly,
  OpenParen,
  CloseParen,
  Dot,
  Comma,
  Colon,
  Bang,
  Equal,
  StringLiteral,
  Set,
  If,
  ElseIf,
  Else,
  End,
  ForEach,
  In,
  Id,
];

/**
 * Velocity template parser implementation based on Chevrotain
 */
export class VelocityTemplateParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  // Top level rules
  public readonly template = this.RULE('template', () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.content) },
        { ALT: () => this.SUBRULE(this.variableReference) },
        { ALT: () => this.SUBRULE(this.directive) },
        { ALT: () => this.SUBRULE(this.miscToken) },
      ]);
    });
  });

  // Content rule
  private readonly content = this.RULE('content', () => {
    this.CONSUME(Content);
  });

  // Miscellaneous tokens rule - handles standalone tokens in content
  private readonly miscToken = this.RULE('miscToken', () => {
    this.OR([
      { ALT: () => this.CONSUME(Id) },
      { ALT: () => this.CONSUME(Comma) },
      { ALT: () => this.CONSUME(Bang) },
      { ALT: () => this.CONSUME(Colon) },
      { ALT: () => this.CONSUME(Dot) },
      { ALT: () => this.CONSUME(In) },
      { ALT: () => this.CONSUME(WhiteSpace) },
      // 其他可能在内容中出现的标记
    ]);
  });

  // Variable reference rules
  private readonly variableReference = this.RULE('variableReference', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.simpleVariableReference) },
      { ALT: () => this.SUBRULE(this.formalVariableReference) },
    ]);
  });

  private readonly simpleVariableReference = this.RULE('simpleVariableReference', () => {
    this.CONSUME(Dollar);
    this.CONSUME(Id, { LABEL: 'variableName' });
    this.OPTION(() => {
      this.SUBRULE(this.propertyAccess);
    });
  });

  private readonly formalVariableReference = this.RULE('formalVariableReference', () => {
    this.CONSUME(Dollar);
    this.CONSUME(OpenCurly);
    this.CONSUME(Id, { LABEL: 'variableName' });
    this.OPTION(() => {
      this.SUBRULE(this.propertyAccess);
    });
    this.CONSUME(CloseCurly);
  });

  private readonly propertyAccess = this.RULE('propertyAccess', () => {
    this.AT_LEAST_ONE(() => {
      this.CONSUME(Dot);
      this.CONSUME(Id, { LABEL: 'property' });
    });
  });

  // Directive rules
  private readonly directive = this.RULE('directive', () => {
    this.CONSUME(Hash);
    this.OR([
      { ALT: () => this.SUBRULE(this.setDirective) },
      { ALT: () => this.SUBRULE(this.ifDirective) },
      { ALT: () => this.SUBRULE(this.foreachDirective) },
      { ALT: () => this.SUBRULE(this.endDirective) },
      { ALT: () => this.SUBRULE(this.elseDirective) },
      { ALT: () => this.SUBRULE(this.elseIfDirective) },
    ]);
  });

  private readonly setDirective = this.RULE('setDirective', () => {
    this.CONSUME(Set);
    this.CONSUME(OpenParen);
    this.CONSUME(Dollar);
    this.CONSUME(Id, { LABEL: 'variableName' });
    this.CONSUME(Equal);
    this.OR([
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.SUBRULE(this.variableReference) },
      { ALT: () => this.CONSUME1(Id) },
    ]);
    this.OPTION(() => {
      this.CONSUME(CloseParen);
    });
  });

  private readonly ifDirective = this.RULE('ifDirective', () => {
    this.CONSUME(If);
    this.CONSUME(OpenParen);
    this.SUBRULE(this.condition);
    this.OPTION(() => {
      this.CONSUME(CloseParen);
    });
  });

  private readonly foreachDirective = this.RULE('foreachDirective', () => {
    this.CONSUME(ForEach);
    this.CONSUME(OpenParen);
    this.CONSUME(Dollar);
    this.CONSUME(Id, { LABEL: 'item' });
    this.CONSUME(In);
    this.CONSUME1(Dollar);
    this.CONSUME1(Id, { LABEL: 'collection' });
    this.OPTION(() => {
      this.CONSUME(CloseParen);
    });
  });

  private readonly endDirective = this.RULE('endDirective', () => {
    this.CONSUME(End);
  });

  private readonly elseDirective = this.RULE('elseDirective', () => {
    this.CONSUME(Else);
  });

  private readonly elseIfDirective = this.RULE('elseIfDirective', () => {
    this.CONSUME(ElseIf);
    this.CONSUME(OpenParen);
    this.SUBRULE(this.condition);
    this.OPTION(() => {
      this.CONSUME(CloseParen);
    });
  });

  // For checking if a condition could be an equality condition
  private readonly isEqualityCondition = this.RULE('isEqualityCondition', () => {
    this.SUBRULE(this.variableReference);
    this.CONSUME1(Equal);
    this.CONSUME2(Equal);
  });

  private readonly condition = this.RULE('condition', () => {
    this.OR([
      {
        // Using BACKTRACK to check if this is an equality condition
        GATE: this.BACKTRACK(this.isEqualityCondition),
        ALT: () => this.SUBRULE(this.equalityCondition),
      },
      {
        ALT: () => this.SUBRULE(this.variableReference),
      },
    ]);
  });

  private readonly equalityCondition = this.RULE('equalityCondition', () => {
    this.SUBRULE(this.variableReference);
    this.CONSUME1(Equal);
    this.CONSUME2(Equal);
    this.OR([
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.SUBRULE2(this.variableReference) },
    ]);
  });
}

/**
 * AST node types based on Velocity language specifications
 */
export interface CommonAstNode {
  type: string;
  pos?: {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
  };
}

// Variable reference
export interface ReferenceAstNode extends CommonAstNode {
  type: 'references';
  id: string;
  path?: Array<{
    type: 'property' | 'method' | 'index';
    id: string | unknown;
    args?: unknown[];
  }>;
  isWraped?: boolean;
  leader: string;
  args?: unknown[];
  prue?: boolean;
}

// Set directive
export interface SetAstNode extends CommonAstNode {
  type: 'set';
  equal: [ReferenceAstNode, unknown];
}

// If directive
export interface IfAstNode extends CommonAstNode {
  type: 'if' | 'elseif';
  condition: unknown;
}

// Else directive
export interface ElseAstNode extends CommonAstNode {
  type: 'else';
}

// End directive
export interface EndAstNode extends CommonAstNode {
  type: 'end';
}

// Foreach directive
export interface ForeachAstNode extends CommonAstNode {
  type: 'foreach';
  to: string;
  from: unknown;
}

// Content node
export interface ContentAstNode extends CommonAstNode {
  type: 'raw';
  value: string;
}

// Comment node
export interface CommentAstNode extends CommonAstNode {
  type: 'comment';
  value: string;
}

// Union type for all AST nodes
export type AstNode =
  | ReferenceAstNode
  | SetAstNode
  | IfAstNode
  | ElseAstNode
  | EndAstNode
  | ForeachAstNode
  | ContentAstNode
  | CommentAstNode
  | string;

// Create and export a singleton parser instance
const velocityParser = new VelocityTemplateParser();

/**
 * CstVisitor class to transform CST into AST
 */
export class VelocityAstVisitor {
  private readonly BaseCstVisitor = velocityParser.getBaseCstVisitorConstructor();

  // Track position information for AST nodes
  private buildPosition(
    ctx: Record<string, unknown>
  ):
    | { first_line: number; first_column: number; last_line: number; last_column: number }
    | undefined {
    // First, try to get position from the first element if it exists
    const firstChild = this.getFirstChild(ctx);
    if (!firstChild) return undefined;

    // Get the last child as well for the end position
    const lastChild = this.getLastChild(ctx);

    return {
      first_line: firstChild.startLine ?? 1,
      first_column: firstChild.startColumn ?? 0,
      last_line: lastChild?.endLine ?? firstChild.endLine ?? 1,
      last_column: lastChild?.endColumn ?? firstChild.endColumn ?? 0,
    };
  }

  // Helper to get the first token/child with position information
  private getFirstChild(ctx: Record<string, unknown>): IToken | undefined {
    if (!ctx) return undefined;

    // Look through all properties of the context
    for (const key in ctx) {
      if (Array.isArray(ctx[key]) && ctx[key].length > 0) {
        const firstElement = ctx[key][0];
        // Check if this is a token with position info
        if (
          firstElement &&
          typeof firstElement === 'object' &&
          'startLine' in firstElement &&
          'startColumn' in firstElement
        ) {
          return firstElement as IToken;
        }
      }
    }
    return undefined;
  }

  // Helper to get the last token/child with position information
  private getLastChild(ctx: Record<string, unknown>): IToken | undefined {
    if (!ctx) return undefined;

    let lastToken: IToken | undefined = undefined;

    // Look through all properties of the context
    for (const key in ctx) {
      if (Array.isArray(ctx[key]) && ctx[key].length > 0) {
        const lastElement = ctx[key][ctx[key].length - 1];
        // Check if this is a token with position info
        if (
          lastElement &&
          typeof lastElement === 'object' &&
          'startLine' in lastElement &&
          'startColumn' in lastElement
        ) {
          // Track the last token found
          if (
            !lastToken ||
            (lastElement.endLine ?? 0) > (lastToken.endLine ?? 0) ||
            ((lastElement.endLine ?? 0) === (lastToken.endLine ?? 0) &&
              (lastElement.endColumn ?? 0) > (lastToken.endColumn ?? 0))
          ) {
            lastToken = lastElement as IToken;
          }
        }
      }
    }
    return lastToken;
  }

  /**
   * Create a new visitor instance and convert a CST to AST
   * @param cst The concrete syntax tree to convert
   * @returns Array of AST nodes
   */
  public toAst(cst: CstNode): AstNode[] {
    const visitor = new ChevrotainToAstVisitor();
    return visitor.visit(cst);
  }
}

/**
 * Concrete visitor implementation for converting CST to AST
 */
class ChevrotainToAstVisitor extends velocityParser.getBaseCstVisitorConstructor() {
  constructor() {
    super();
    // This helper validates that the visitor has all required methods
    this.validateVisitor();
  }

  // Helper to build position information from context
  private buildPosition(
    ctx: Record<string, unknown[]>
  ):
    | { first_line: number; first_column: number; last_line: number; last_column: number }
    | undefined {
    // Find first token with location info
    let firstToken: IToken | undefined;
    let lastToken: IToken | undefined;

    // Look through all properties of the context
    for (const key in ctx) {
      if (Array.isArray(ctx[key])) {
        for (const element of ctx[key]) {
          if (
            element &&
            typeof element === 'object' &&
            'startLine' in element &&
            'startColumn' in element
          ) {
            const tokenElement = element as unknown as IToken;
            // Track first token found
            if (
              !firstToken ||
              (tokenElement.startLine ?? Number.MAX_SAFE_INTEGER) <
                (firstToken.startLine ?? Number.MAX_SAFE_INTEGER) ||
              ((tokenElement.startLine ?? Number.MAX_SAFE_INTEGER) ===
                (firstToken.startLine ?? Number.MAX_SAFE_INTEGER) &&
                (tokenElement.startColumn ?? Number.MAX_SAFE_INTEGER) <
                  (firstToken.startColumn ?? Number.MAX_SAFE_INTEGER))
            ) {
              firstToken = tokenElement;
            }

            // Track last token found
            if (
              !lastToken ||
              (tokenElement.endLine ?? 0) > (lastToken.endLine ?? 0) ||
              ((tokenElement.endLine ?? 0) === (lastToken.endLine ?? 0) &&
                (tokenElement.endColumn ?? 0) > (lastToken.endColumn ?? 0))
            ) {
              lastToken = tokenElement;
            }
          }
        }
      }
    }

    if (!firstToken) return undefined;

    return {
      first_line: firstToken.startLine ?? 1,
      first_column: firstToken.startColumn ?? 0,
      last_line: lastToken?.endLine ?? firstToken.endLine ?? 1,
      last_column: lastToken?.endColumn ?? firstToken.endColumn ?? 0,
    };
  }

  // Main entry point - the template
  template(ctx: Record<string, CstNode[]>): AstNode[] {
    const result: AstNode[] = [];

    // Process all elements of the template
    if (ctx.content) {
      ctx.content.forEach((contentCtx) => {
        const contentNode = this.visit(contentCtx);
        if (contentNode) {
          result.push(contentNode);
        }
      });
    }

    if (ctx.variableReference) {
      ctx.variableReference.forEach((refCtx) => {
        const refNode = this.visit(refCtx);
        if (refNode) {
          result.push(refNode);
        }
      });
    }

    if (ctx.directive) {
      ctx.directive.forEach((directiveCtx) => {
        const directiveNode = this.visit(directiveCtx);
        if (directiveNode) {
          result.push(directiveNode);
        }
      });
    }

    if (ctx.miscToken) {
      ctx.miscToken.forEach((tokenCtx) => {
        const tokenNode = this.visit(tokenCtx);
        if (tokenNode) {
          result.push(tokenNode);
        }
      });
    }

    return result;
  }

  // Content nodes - Raw text
  content(ctx: { Content: IToken[] }): ContentAstNode | string {
    const content = ctx.Content[0].image;

    // For simple content, just return the raw string to match Jison behavior
    // This is important for compatibility with existing tests
    return content;
  }

  // Misc tokens - convert to raw content
  miscToken(ctx: Record<string, IToken[]>): ContentAstNode | string {
    // Find the first token in the context
    let token: IToken | undefined;
    for (const key in ctx) {
      if (Array.isArray(ctx[key]) && ctx[key].length > 0) {
        token = ctx[key][0];
        break;
      }
    }

    // For simple content, just return the raw string to match Jison behavior
    if (token) {
      return token.image;
    }

    return '';
  }

  // Variable references
  variableReference(ctx: {
    simpleVariableReference?: CstNode[];
    formalVariableReference?: CstNode[];
  }): ReferenceAstNode {
    if (ctx.simpleVariableReference) {
      return this.visit(ctx.simpleVariableReference[0]);
    } else if (ctx.formalVariableReference) {
      return this.visit(ctx.formalVariableReference[0]);
    }

    // Should not reach here if grammar is correct
    throw new Error('Invalid variable reference structure');
  }

  // Simple variable reference ($var)
  simpleVariableReference(ctx: {
    variableName: IToken[];
    propertyAccess?: CstNode[];
  }): ReferenceAstNode {
    const varName = ctx.variableName[0].image;

    // Get position with special handling for variable references
    const pos = this.buildVariableRefPosition(ctx);

    const node: ReferenceAstNode = {
      type: 'references',
      id: varName,
      leader: '$',
      prue: true,
      pos,
    };

    // Add property path if present
    if (ctx.propertyAccess) {
      node.path = this.visit(ctx.propertyAccess[0]);
    }

    return node;
  }

  // Formal variable reference (${var})
  formalVariableReference(ctx: {
    variableName: IToken[];
    propertyAccess?: CstNode[];
  }): ReferenceAstNode {
    const varName = ctx.variableName[0].image;

    // Get position with special handling for variable references
    const pos = this.buildVariableRefPosition(ctx);

    const node: ReferenceAstNode = {
      type: 'references',
      id: varName,
      leader: '$',
      isWraped: true,
      prue: true,
      pos,
    };

    // Add property path if present
    if (ctx.propertyAccess) {
      node.path = this.visit(ctx.propertyAccess[0]);
    }

    return node;
  }

  // Special position calculation for variable references to match Jison parser
  private buildVariableRefPosition(ctx: Record<string, unknown[]>): {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
  } {
    const pos = this.buildPosition(ctx);
    if (!pos) {
      return {
        first_line: 1,
        first_column: 0,
        last_line: 1,
        last_column: 0,
      };
    }

    // Adjust positions to match Jison parser output
    // For variables: Jison puts the $ character at the beginning of the position
    // while Chevrotain lexer starts the position at the variable name
    if ('variableName' in ctx && Array.isArray(ctx.variableName) && ctx.variableName.length > 0) {
      const varToken = ctx.variableName[0] as IToken;

      // Subtract 1 from first_column to include the $ symbol
      // This matches the Jison parser output
      return {
        ...pos,
        first_column: Math.max(0, (varToken.startColumn ?? 1) - 1),
      };
    }

    return pos;
  }

  // Property access (obj.prop.subprop)
  propertyAccess(ctx: { property: IToken[] }): Array<{ type: 'property'; id: string }> {
    const path: Array<{ type: 'property'; id: string }> = [];

    // There could be multiple properties in the path
    if (ctx.property) {
      ctx.property.forEach((propToken: IToken) => {
        path.push({
          type: 'property',
          id: propToken.image,
        });
      });
    }

    return path;
  }

  // Directives
  directive(ctx: {
    setDirective?: CstNode[];
    ifDirective?: CstNode[];
    foreachDirective?: CstNode[];
    endDirective?: CstNode[];
    elseDirective?: CstNode[];
    elseIfDirective?: CstNode[];
  }): AstNode {
    if (ctx.setDirective) {
      return this.visit(ctx.setDirective[0]);
    } else if (ctx.ifDirective) {
      return this.visit(ctx.ifDirective[0]);
    } else if (ctx.foreachDirective) {
      return this.visit(ctx.foreachDirective[0]);
    } else if (ctx.endDirective) {
      return this.visit(ctx.endDirective[0]);
    } else if (ctx.elseDirective) {
      return this.visit(ctx.elseDirective[0]);
    } else if (ctx.elseIfDirective) {
      return this.visit(ctx.elseIfDirective[0]);
    }

    // Should not reach here if grammar is correct
    throw new Error('Invalid directive structure');
  }

  // Set directive (#set($var = "value"))
  setDirective(ctx: {
    variableName: IToken[];
    StringLiteral?: IToken[];
    variableReference?: CstNode[];
    Id?: IToken[];
  }): SetAstNode {
    const varName = ctx.variableName[0].image;
    let value: unknown;

    // Get the value based on the available tokens
    if (ctx.StringLiteral) {
      value = ctx.StringLiteral[0].image;
    } else if (ctx.variableReference) {
      value = this.visit(ctx.variableReference[0]);
    } else if (ctx.Id && ctx.Id.length > 0) {
      value = ctx.Id[0].image;
    } else {
      value = '';
    }

    // Create the reference node for the variable
    const refNode: ReferenceAstNode = {
      type: 'references',
      id: varName,
      leader: '$',
      prue: true,
      pos: this.buildPosition(ctx),
    };

    return {
      type: 'set',
      equal: [refNode, value],
      pos: this.buildPosition(ctx),
    };
  }

  // End directive (#end)
  endDirective(ctx: Record<string, IToken[]>): EndAstNode {
    return {
      type: 'end',
      pos: this.buildPosition(ctx),
    };
  }

  // Else directive (#else)
  elseDirective(ctx: Record<string, IToken[]>): ElseAstNode {
    return {
      type: 'else',
      pos: this.buildPosition(ctx),
    };
  }

  // If directive (#if($condition))
  ifDirective(ctx: { condition?: CstNode[] }): IfAstNode {
    return {
      type: 'if',
      condition: ctx.condition ? this.visit(ctx.condition[0]) : undefined,
      pos: this.buildPosition(ctx),
    };
  }

  // ElseIf directive (#elseif($condition))
  elseIfDirective(ctx: { condition?: CstNode[] }): IfAstNode {
    return {
      type: 'elseif',
      condition: ctx.condition ? this.visit(ctx.condition[0]) : undefined,
      pos: this.buildPosition(ctx),
    };
  }

  // Foreach directive (#foreach($item in $items))
  foreachDirective(ctx: { item: IToken[]; collection: IToken[] }): ForeachAstNode {
    const itemName = ctx.item[0].image;
    const collectionName = ctx.collection[0].image;

    // Create the reference node for the collection
    const collectionRefNode: ReferenceAstNode = {
      type: 'references',
      id: collectionName,
      leader: '$',
      prue: true,
      pos: this.buildPosition(ctx),
    };

    return {
      type: 'foreach',
      to: itemName,
      from: collectionRefNode,
      pos: this.buildPosition(ctx),
    };
  }

  // Condition - currently just returns unknown, to be expanded
  condition(_ctx: Record<string, unknown>): unknown {
    // TODO: Implement condition parsing
    // For now, we'll just return a placeholder
    return {};
  }

  // Equality condition (e.g., $a == $b or $a == "string")
  equalityCondition(ctx: {
    variableReference: CstNode[];
    Equal: IToken[];
    StringLiteral?: IToken[];
  }): unknown {
    // Get the left side of the equality
    const leftSide = this.visit(ctx.variableReference[0]);

    // Get the right side based on the available tokens
    let rightSide: unknown;
    if (ctx.StringLiteral) {
      rightSide = ctx.StringLiteral[0].image;
    } else if (ctx.variableReference.length > 1) {
      rightSide = this.visit(ctx.variableReference[1]);
    } else {
      rightSide = '';
    }

    // Build an equality condition object
    return {
      type: 'operation',
      operator: '==',
      left: leftSide,
      right: rightSide,
      pos: this.buildPosition(ctx),
    };
  }

  // Rule for checking if a condition is an equality condition
  // This is a utility rule used with BACKTRACK, so it doesn't produce AST nodes
  isEqualityCondition(_ctx: Record<string, unknown>): undefined {
    // This is a utility rule for the parser's BACKTRACK feature
    // It doesn't need to produce any AST node
    return undefined;
  }
}

/**
 * Parse a Velocity template string into a CST (Concrete Syntax Tree)
 * @param tokens The tokens from the lexer
 * @returns Object containing the CST and any parsing errors
 */
export function parseVelocityTemplateToCST(tokens: IToken[]) {
  // Reset the parser before parsing
  velocityParser.input = tokens;

  // Parse the input
  const cst = velocityParser.template();

  return {
    cst,
    errors: velocityParser.errors,
  };
}

/**
 * Create a new Velocity parser instance
 * @returns A new parser instance
 */
export function createVelocityParser() {
  return new VelocityTemplateParser();
}

/**
 * Parse a Velocity template string and return AST compatible with the original parser
 * @param tokens The tokens from the lexer
 * @returns Array of AST nodes
 */
export function parseVelocityTemplate(tokens: IToken[]): AstNode[] {
  // First get the CST
  const { cst, errors } = parseVelocityTemplateToCST(tokens);

  if (errors.length > 0) {
    // Handle errors appropriately
    console.error('Parsing errors:', errors);
    return [];
  }

  // Convert CST to AST using visitor pattern
  const visitor = new VelocityAstVisitor();
  const ast = visitor.toAst(cst);

  return ast;
}
