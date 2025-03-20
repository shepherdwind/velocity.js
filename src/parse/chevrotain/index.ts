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
} from './tokens';

// Export lexer
export {
  VelocityLexer,
  createVelocityLexer,
  getLexerCurrentState,
  resetLexer,
  tokenizeVelocityTemplate,
} from './lexer';

/**
 * Current migration status (Phase 1):
 *
 * - Implemented state machine to mimic Jison's state stack behavior
 * - Created token definitions for Velocity template language
 * - Implemented basic lexer
 *
 * To complete the migration:
 *
 * - Implement the full token definitions for each lexer mode
 * - Update token patterns to handle special cases (like escaping)
 * - Implement the parser grammar
 * - Create the AST builder
 * - Add extensive test coverage
 * - Apply finishing touches like performance optimizations
 */
