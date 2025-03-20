/**
 * Entry point for the velocity template parser
 *
 * Exports the parse function which converts a template string into an AST
 */
// These imports will be used when Chevrotain parser is enabled
// import { tokenizeVelocityTemplate, createVelocityLexer } from './chevrotain';
// import { parseVelocityTemplate } from './chevrotain/parser';
import { AstNode } from './chevrotain/parser';

// Legacy Jison parser, to be eventually replaced
import { parse as jisonParse } from './index.js';

// Create a singleton lexer instance - will be used when Chevrotain parser is enabled
// const lexer = createVelocityLexer();

/**
 * Parse a Velocity template string into an AST
 *
 * This function tokenizes the input string using the Chevrotain lexer,
 * then parses the tokens into an AST compatible with the original parser.
 *
 * @param template The template string to parse
 * @returns An array of AST nodes
 */
export function parse(template: string): AstNode[] {
  // For now, use the legacy parser (Jison) while we develop the Chevrotain parser
  // TEMPORARY: This will be replaced with Chevrotain parser once fully implemented
  return jisonParse(template);

  // Once the Chevrotain parser is ready, uncomment the below code:
  /*
  // Tokenize the input string
  const tokenizeResult = tokenizeVelocityTemplate(template, lexer);
  
  // Check for lexing errors
  if (tokenizeResult.errors.length > 0) {
    console.error('Lexing errors:', tokenizeResult.errors);
    return [];
  }
  
  // Parse the tokens into an AST
  return parseVelocityTemplate(tokenizeResult.tokens);
  */
}
