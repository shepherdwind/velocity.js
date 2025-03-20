/**
 * Token definitions for the Velocity template language
 *
 * This file defines all tokens used in the Velocity lexer, organized by mode
 */
import { createToken, TokenType } from 'chevrotain';
import { getLexerState, LexerWithState, VelocityLexerState } from './state';
import { LexerModes, LexerTokenTypes, CONTENT } from './constants';

// Token categories as string constants for reference (not used in token definitions)
export const TokenCategories = {
  WhiteSpace: 'WhiteSpace',
  Keyword: 'Keyword',
  Variable: 'Variable',
  Content: 'Content',
  Directive: 'Directive',
  Operator: 'Operator',
  Comment: 'Comment',
};

// Define token groups
export const WhiteSpace = createToken({
  name: LexerTokenTypes.WHITESPACE,
  pattern: /[ \t\n\r]+/,
  line_breaks: true,
});

// Operators
export const Dollar = createToken({
  name: LexerTokenTypes.DOLLAR,
  pattern: /\$/,
  line_breaks: false,
});

export const Hash = createToken({
  name: LexerTokenTypes.HASH,
  pattern: /#/,
  line_breaks: false,
});

export const OpenCurly = createToken({
  name: LexerTokenTypes.OPEN_CURLY,
  pattern: /{/,
  line_breaks: false,
});

export const CloseCurly = createToken({
  name: LexerTokenTypes.CLOSE_CURLY,
  pattern: /}/,
  line_breaks: false,
});

export const OpenParen = createToken({
  name: LexerTokenTypes.OPEN_PAREN,
  pattern: /\(/,
  line_breaks: false,
});

export const CloseParen = createToken({
  name: LexerTokenTypes.CLOSE_PAREN,
  pattern: /\)/,
  line_breaks: false,
});

export const Dot = createToken({
  name: LexerTokenTypes.DOT,
  pattern: /\./,
  line_breaks: false,
});

export const Comma = createToken({
  name: LexerTokenTypes.COMMA,
  pattern: /,/,
  line_breaks: false,
});

export const Colon = createToken({
  name: LexerTokenTypes.COLON,
  pattern: /:/,
  line_breaks: false,
});

export const Bang = createToken({
  name: LexerTokenTypes.BANG,
  pattern: /!/,
  line_breaks: false,
});

export const Equal = createToken({
  name: LexerTokenTypes.EQUAL,
  pattern: /=/,
  line_breaks: false,
});

// String literals
export const StringLiteral = createToken({
  name: LexerTokenTypes.STRING_LITERAL,
  pattern: /(["'])(?:(?=(\\?))\2.)*?\1/,
  line_breaks: false,
});

// Identifiers
export const Id = createToken({
  name: LexerTokenTypes.ID,
  pattern: /[a-zA-Z][a-zA-Z0-9_]*/,
  line_breaks: false,
});

// Directive keywords
export const Set = createToken({
  name: LexerTokenTypes.SET,
  pattern: /set/,
  longer_alt: Id,
  line_breaks: false,
});

export const If = createToken({
  name: LexerTokenTypes.IF,
  pattern: /if/,
  longer_alt: Id,
  line_breaks: false,
});

export const ElseIf = createToken({
  name: LexerTokenTypes.ELSE_IF,
  pattern: /elseif/,
  longer_alt: Id,
  line_breaks: false,
});

export const Else = createToken({
  name: LexerTokenTypes.ELSE,
  pattern: /else/,
  longer_alt: Id,
  line_breaks: false,
});

export const End = createToken({
  name: LexerTokenTypes.END,
  pattern: /end/,
  longer_alt: Id,
  line_breaks: false,
});

export const ForEach = createToken({
  name: LexerTokenTypes.FOR_EACH,
  pattern: /foreach/,
  longer_alt: Id,
  line_breaks: false,
});

export const In = createToken({
  name: LexerTokenTypes.IN,
  pattern: /in/,
  longer_alt: Id,
  line_breaks: false,
});

// Content - must come after other tokens to properly handle text content
export const Content = createToken({
  name: LexerTokenTypes.CONTENT,
  pattern: {
    exec: (text: string, offset: number) => {
      // Early return if at the end of text
      if (offset >= text.length) {
        return null;
      }

      const char = text[offset];

      // Early return for special characters
      if (CONTENT.SPECIAL_CHARS.includes(char)) {
        return null;
      }

      // Find the next special character, whitespace, or end of text
      let endOffset = offset + 1;
      while (endOffset < text.length) {
        const nextChar = text[endOffset];
        const isSpecialOrWhitespace =
          CONTENT.SPECIAL_CHARS.includes(nextChar) || CONTENT.WHITESPACE_PATTERN.test(nextChar);

        if (isSpecialOrWhitespace) {
          break;
        }
        endOffset++;
      }

      // Create the match result
      const match = text.substring(offset, endOffset);
      const result = [match] as unknown as RegExpExecArray;
      result.index = offset;
      result.input = text;

      return result;
    },
  },
  line_breaks: true,
});

// Type for state handler function
type StateHandler = (state: VelocityLexerState) => void;

// Token state transition mapping for better readability and maintainability
const TOKEN_STATE_HANDLERS: Record<string, StateHandler> = {
  [LexerTokenTypes.DOLLAR]: handleDollarToken,
  [LexerTokenTypes.HASH]: handleHashToken,
  [LexerTokenTypes.OPEN_CURLY]: handleOpenCurlyToken,
  [LexerTokenTypes.CLOSE_CURLY]: handleCloseCurlyToken,
};

/**
 * Create a token factory function with state handling capabilities
 * @param tokenType The token type to create
 * @returns A callback function that creates tokens with state information
 */
export function createVelocityToken(tokenType: TokenType) {
  return function (
    match: RegExpExecArray,
    lexer: unknown
  ): { tokenType: TokenType; payload?: unknown } {
    const state = getLexerState(lexer as LexerWithState);

    // Use the mapping to find and call the appropriate handler
    const handler = TOKEN_STATE_HANDLERS[tokenType.name];
    if (handler) {
      handler(state);
    }

    return { tokenType };
  };
}

/**
 * State transitions for Dollar token
 */
function handleDollarToken(state: VelocityLexerState): void {
  if (state.currentMode() !== LexerModes.INITIAL) {
    return;
  }

  // $ in initial mode starts a variable reference
  state.pushMode(LexerModes.VARIABLE);
}

/**
 * State transitions for Hash token
 */
function handleHashToken(state: VelocityLexerState): void {
  if (state.currentMode() !== LexerModes.INITIAL) {
    return;
  }

  // # in initial mode starts a directive
  state.pushMode(LexerModes.DIRECTIVE);
}

/**
 * State transitions for OpenCurly token
 */
function handleOpenCurlyToken(state: VelocityLexerState): void {
  // Only process if we're in variable mode
  if (state.currentMode() !== LexerModes.VARIABLE) {
    return;
  }

  // Mark this as the start of a formal reference
  state.setVar('inFormalReference', true);
}

/**
 * State transitions for CloseCurly token
 */
function handleCloseCurlyToken(state: VelocityLexerState): void {
  // Only process if we're in variable mode and in a formal reference
  if (state.currentMode() !== LexerModes.VARIABLE || !state.getVar('inFormalReference')) {
    return;
  }

  // End the formal reference and pop back to the initial mode
  state.setVar('inFormalReference', false);
  state.popMode();
}
