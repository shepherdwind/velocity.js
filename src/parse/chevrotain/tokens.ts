/**
 * Token definitions for the Velocity template language
 *
 * This file defines all tokens used in the Velocity lexer, organized by mode
 */
import { createToken, TokenType } from 'chevrotain';
import { getLexerState, LexerWithState, VelocityLexerState } from './state';

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
  name: 'WhiteSpace',
  pattern: /[ \t\n\r]+/,
  line_breaks: true,
});

// Operators
export const Dollar = createToken({
  name: 'Dollar',
  pattern: /\$/,
  line_breaks: false,
});

export const Hash = createToken({
  name: 'Hash',
  pattern: /#/,
  line_breaks: false,
});

export const OpenCurly = createToken({
  name: 'OpenCurly',
  pattern: /{/,
  line_breaks: false,
});

export const CloseCurly = createToken({
  name: 'CloseCurly',
  pattern: /}/,
  line_breaks: false,
});

export const OpenParen = createToken({
  name: 'OpenParen',
  pattern: /\(/,
  line_breaks: false,
});

export const CloseParen = createToken({
  name: 'CloseParen',
  pattern: /\)/,
  line_breaks: false,
});

export const Dot = createToken({
  name: 'Dot',
  pattern: /\./,
  line_breaks: false,
});

export const Comma = createToken({
  name: 'Comma',
  pattern: /,/,
  line_breaks: false,
});

export const Colon = createToken({
  name: 'Colon',
  pattern: /:/,
  line_breaks: false,
});

export const Bang = createToken({
  name: 'Bang',
  pattern: /!/,
  line_breaks: false,
});

export const Equal = createToken({
  name: 'Equal',
  pattern: /=/,
  line_breaks: false,
});

// String literals
export const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(?:[^"\\]|\\.)*"/,
  line_breaks: false,
});

// Identifiers
export const Id = createToken({
  name: 'Id',
  pattern: /[a-zA-Z][a-zA-Z0-9_]*/,
  line_breaks: false,
});

// Directive keywords
export const Set = createToken({
  name: 'Set',
  pattern: /set/,
  longer_alt: Id,
  line_breaks: false,
});

export const If = createToken({
  name: 'If',
  pattern: /if/,
  longer_alt: Id,
  line_breaks: false,
});

export const ElseIf = createToken({
  name: 'ElseIf',
  pattern: /elseif/,
  longer_alt: Id,
  line_breaks: false,
});

export const Else = createToken({
  name: 'Else',
  pattern: /else/,
  longer_alt: Id,
  line_breaks: false,
});

export const End = createToken({
  name: 'End',
  pattern: /end/,
  longer_alt: Id,
  line_breaks: false,
});

export const ForEach = createToken({
  name: 'ForEach',
  pattern: /foreach/,
  longer_alt: Id,
  line_breaks: false,
});

export const In = createToken({
  name: 'In',
  pattern: /in/,
  longer_alt: Id,
  line_breaks: false,
});

// Content - must come after other tokens to properly handle text content
export const Content = createToken({
  name: 'Content',
  pattern: {
    exec: (text: string, offset: number) => {
      // Skip if we're at the end of the text
      if (offset >= text.length) {
        return null;
      }

      // Get the current character
      const char = text[offset];

      // Skip special characters that have their own tokens
      if ('$#{}().:=,!"'.indexOf(char) >= 0) {
        return null;
      }

      // Find the next special character, whitespace, or the end of the text
      let endOffset = offset + 1;
      while (endOffset < text.length) {
        const nextChar = text[endOffset];
        if ('$#{}().:=,!"'.indexOf(nextChar) >= 0 || /\s/.test(nextChar)) {
          break;
        }
        endOffset++;
      }

      // Create the match
      const match = text.substring(offset, endOffset);
      const result = [match] as unknown as RegExpExecArray;
      result.index = offset;
      result.input = text;

      return result;
    },
  },
  line_breaks: true,
});

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

    // Handle specific token types with state transitions
    if (tokenType === Dollar) {
      handleDollarToken(state);
    } else if (tokenType === Hash) {
      handleHashToken(state);
    } else if (tokenType === OpenCurly) {
      handleOpenCurlyToken(state);
    } else if (tokenType === CloseCurly) {
      handleCloseCurlyToken(state);
    }
    // No special state handling for other tokens

    return { tokenType };
  };
}

/**
 * State transitions for Dollar token
 */
function handleDollarToken(state: VelocityLexerState): void {
  const currentMode = state.currentMode();

  if (currentMode === 'INITIAL') {
    // $ in initial mode starts a variable reference
    state.pushMode('mu');
  }
}

/**
 * State transitions for Hash token
 */
function handleHashToken(state: VelocityLexerState): void {
  const currentMode = state.currentMode();

  if (currentMode === 'INITIAL') {
    // # in initial mode starts a directive
    state.pushMode('h');
  }
}

/**
 * State transitions for OpenCurly token
 */
function handleOpenCurlyToken(state: VelocityLexerState): void {
  const currentMode = state.currentMode();

  if (currentMode === 'mu') {
    // ${...} formal reference style
    state.pushMode('i');
  }
}

/**
 * State transitions for CloseCurly token
 */
function handleCloseCurlyToken(state: VelocityLexerState): void {
  const currentMode = state.currentMode();

  if (currentMode === 'i') {
    // End of ${...} formal reference
    state.popMode(); // Pop "i" mode

    // If in "mu" mode, pop it as well to return to INITIAL
    if (state.currentMode() === 'mu') {
      state.popMode();
    }
  }
}
