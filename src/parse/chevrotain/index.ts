/**
 * Velocity template Chevrotain parser module
 *
 * This is the main entry point for the Chevrotain-based Velocity template parser.
 */

// Export state machine
export { VelocityLexerState, getLexerState } from './state';

// Export tokens
export {
  Bang,
  CloseCurly,
  CloseParen,
  Colon,
  Comma,
  Content,
  Dollar,
  Dot,
  Else,
  ElseIf,
  End,
  Equal,
  ForEach,
  Hash,
  Id,
  If,
  In,
  OpenCurly,
  OpenParen,
  Set,
  WhiteSpace,
  StringLiteral,
} from './tokens';

// Export lexer
export {
  VelocityLexer,
  createVelocityLexer,
  getLexerCurrentState,
  resetLexer,
  tokenizeVelocityTemplate,
} from './lexer';

// Export parser
export {
  VelocityTemplateParser,
  parseVelocityTemplate,
  parseVelocityTemplateToCST,
  createVelocityParser,
  VelocityAstVisitor,
  AstNode,
} from './parser';

/**
 * Current migration status (Phase 2.5):
 *
 * - Implemented state machine to mimic Jison's state stack behavior
 * - Created token definitions for Velocity template language
 * - Implemented lexer with proper token handling and state tracking
 * - Started implementing parser grammar rules
 * - Defined AST node structure compatible with the original parser
 *
 * TODO to complete the migration:
 *
 * - Implement the full parser grammar rules
 * - Create the CST-to-AST visitor
 * - Connect lexer and parser to produce fully compatible AST
 * - Ensure all edge cases and escaping are handled correctly
 * - Add comprehensive test coverage
 * - Optimize for performance
 */
