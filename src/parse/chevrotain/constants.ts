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
