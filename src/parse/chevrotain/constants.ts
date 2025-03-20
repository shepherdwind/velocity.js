/**
 * Token type constants for the Velocity lexer
 */
export enum LexerTokenTypes {
  CONTENT = 'Content',
  WHITESPACE = 'WhiteSpace',
  DOLLAR = 'Dollar',
  HASH = 'Hash',
  OPEN_CURLY = 'OpenCurly',
  CLOSE_CURLY = 'CloseCurly',
  OPEN_PAREN = 'OpenParen',
  CLOSE_PAREN = 'CloseParen',
  DOT = 'Dot',
  COMMA = 'Comma',
  COLON = 'Colon',
  BANG = 'Bang',
  EQUAL = 'Equal',
  NOT_EQUAL = 'NotEqual',
  GREATER_THAN = 'GreaterThan',
  LESS_THAN = 'LessThan',
  GREATER_THAN_EQUAL = 'GreaterThanEqual',
  LESS_THAN_EQUAL = 'LessThanEqual',
  AND = 'And',
  OR = 'Or',
  PLUS = 'Plus',
  MINUS = 'Minus',
  MULTIPLY = 'Multiply',
  DIVIDE = 'Divide',
  MODULO = 'Modulo',
  SET = 'Set',
  IF = 'If',
  ELSE_IF = 'ElseIf',
  ELSE = 'Else',
  END = 'End',
  FOR_EACH = 'ForEach',
  IN = 'In',
  ID = 'Id',
  STRING_LITERAL = 'StringLiteral',
}

/**
 * Directive type constants
 */
export enum DirectiveTypes {
  SET = 'set',
  IF = 'if',
  ELSE = 'else',
  ELSE_IF = 'elseif',
  END = 'end',
  FOR_EACH = 'foreach',
}

/**
 * Lexer modes
 */
export enum LexerModes {
  INITIAL = 'INITIAL',
  VARIABLE = 'variable',
  DIRECTIVE = 'directive',
}

/**
 * Special characters used in content parsing
 */
export enum SpecialChars {
  DOLLAR = '$',
  HASH = '#',
  OPEN_CURLY = '{',
  CLOSE_CURLY = '}',
  OPEN_PAREN = '(',
  CLOSE_PAREN = ')',
  DOT = '.',
  COLON = ':',
  EQUAL = '=',
  COMMA = ',',
  BANG = '!',
  QUOTE = '"',
  GREATER_THAN = '>',
  LESS_THAN = '<',
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  MODULO = '%',
  AMPERSAND = '&',
  PIPE = '|',
}

/**
 * Content parsing constants
 */
export const CONTENT = {
  // Characters that should be treated as separate tokens
  SPECIAL_CHARS: '$#{}().:=,!"<>+-*/%&|',
  // Regex for whitespace
  WHITESPACE_PATTERN: /\s/,
};

/**
 * Operator types for operation nodes
 */
export enum OperatorTypes {
  EQUAL = '==',
  NOT_EQUAL = '!=',
  GREATER_THAN = '>',
  LESS_THAN = '<',
  GREATER_THAN_EQUAL = '>=',
  LESS_THAN_EQUAL = '<=',
  AND = '&&',
  OR = '||',
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  MODULO = '%',
  NOT = '!',
}

/**
 * Error messages
 */
export enum ErrorMessages {
  INVALID_TOKEN = 'Invalid token',
  UNEXPECTED_TOKEN = 'Unexpected token',
  MISSING_CLOSING_BRACE = 'Missing closing brace',
  MISSING_CLOSING_PAREN = 'Missing closing parenthesis',
}
