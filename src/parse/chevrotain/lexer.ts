/**
 * Lexer implementation for the Velocity template language
 *
 * This file defines the lexer configuration and tokenization functions.
 */
import {
  Lexer,
  IMultiModeLexerDefinition,
  TokenType,
  IToken,
  ILexingResult,
  ILexerDefinitionError,
} from 'chevrotain';
import { LexerTokenTypes } from './constants';
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
  createVelocityToken,
} from './tokens';
import { getLexerState, LexerWithState, VelocityLexerState } from './state';

// Define extended TokenType interface with custom properties
interface ExtendedTokenType extends TokenType {
  PATTERN: RegExp | { exec: (text: string, offset: number) => RegExpExecArray | null };
  tokenCreator?: (
    match: RegExpExecArray,
    lexer: unknown
  ) => { tokenType: TokenType; payload?: unknown };
}

// Token processing state interface
interface TokenProcessingState {
  inFormalReference: boolean;
  inDirective: boolean;
  inVariableReference: boolean;
  inPropertyAccess: boolean;
  inDirectiveParams: boolean;
  inAssignment: boolean;
  skipNextEqual: boolean;
}

// Content tracking state interface
interface ContentTrackingState {
  contentTokens: IToken[];
  contentStartOffset: number;
  contentEndOffset: number;
  contentStartLine: number;
  contentStartColumn: number;
}

/**
 * Implementation of the Velocity template lexer
 */
export class VelocityLexerImpl implements VelocityLexer {
  private lexerInstance: VelocityLexer;
  private state: TokenProcessingState;
  private tracking: ContentTrackingState;
  [key: string]: unknown; // Implement index signature for LexerWithState

  constructor() {
    this.lexerInstance = this.createLexer();
    this.state = this.createInitialState();
    this.tracking = this.createInitialTracking();
  }

  // Implement required Lexer interface properties
  public get lexerDefinitionErrors(): ILexerDefinitionError[] {
    return this.lexerInstance.lexerDefinitionErrors;
  }

  public get lexerDefinition(): IMultiModeLexerDefinition {
    return this.lexerInstance.lexerDefinition as IMultiModeLexerDefinition;
  }

  public get modes(): string[] {
    return this.lexerInstance.modes as string[];
  }

  public get defaultMode(): string {
    return this.lexerInstance.defaultMode as string;
  }

  /**
   * Create initial token processing state
   */
  private createInitialState(): TokenProcessingState {
    return {
      inFormalReference: false,
      inDirective: false,
      inVariableReference: false,
      inPropertyAccess: false,
      inDirectiveParams: false,
      inAssignment: false,
      skipNextEqual: false,
    };
  }

  /**
   * Create initial content tracking state
   */
  private createInitialTracking(): ContentTrackingState {
    return {
      contentTokens: [],
      contentStartOffset: -1,
      contentEndOffset: -1,
      contentStartLine: -1,
      contentStartColumn: -1,
    };
  }

  /**
   * Create a new lexer instance with all token definitions
   */
  private createLexer(): VelocityLexer {
    const allTokens = [
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
      Content,
    ];

    const lexerDefinition: IMultiModeLexerDefinition = {
      defaultMode: 'INITIAL',
      modes: {
        INITIAL: allTokens,
      },
    };

    allTokens.forEach((tokenType) => {
      const extendedToken = tokenType as ExtendedTokenType;
      extendedToken.tokenCreator = createVelocityToken(tokenType);
    });

    const lexer = new Lexer(lexerDefinition) as VelocityLexer;
    getLexerState(lexer).reset();
    return lexer;
  }

  /**
   * Process formal reference tokens and update state
   */
  private handleFormalReference(
    token: IToken,
    nextToken: IToken | null,
    processedTokens: IToken[],
    template: string
  ): boolean {
    if (
      token.tokenType.name === LexerTokenTypes.DOLLAR &&
      nextToken?.tokenType.name === LexerTokenTypes.OPEN_CURLY
    ) {
      if (this.tracking.contentTokens.length > 0) {
        this.mergeContentTokens(processedTokens, template);
      }
      this.state.inFormalReference = true;
      processedTokens.push(token);
      return true;
    } else if (token.tokenType.name === LexerTokenTypes.CLOSE_CURLY) {
      this.state.inFormalReference = false;
      this.state.inPropertyAccess = false;
      processedTokens.push(token);
      return true;
    }
    return false;
  }

  /**
   * Process variable reference tokens and update state
   */
  private handleVariableReference(
    token: IToken,
    processedTokens: IToken[],
    template: string
  ): boolean {
    if (token.tokenType.name === LexerTokenTypes.DOLLAR) {
      if (this.tracking.contentTokens.length > 0) {
        this.mergeContentTokens(processedTokens, template);
      }
      this.state.inVariableReference = true;
      processedTokens.push(token);
      return true;
    }
    return false;
  }

  /**
   * Process property access tokens and update state
   */
  private handlePropertyAccess(token: IToken, processedTokens: IToken[]): boolean {
    if (token.tokenType.name === LexerTokenTypes.DOT) {
      this.state.inPropertyAccess = true;
      processedTokens.push(token);
      return true;
    }
    return false;
  }

  /**
   * Process directive tokens and update state
   */
  private handleDirective(token: IToken, processedTokens: IToken[], template: string): boolean {
    if (token.tokenType.name === LexerTokenTypes.HASH) {
      if (this.tracking.contentTokens.length > 0) {
        this.mergeContentTokens(processedTokens, template);
      }
      this.state.inDirective = true;
      this.state.inDirectiveParams = false;
      this.state.inAssignment = false;
      processedTokens.push(token);
      return true;
    } else if (token.tokenType.name === LexerTokenTypes.OPEN_PAREN) {
      this.state.inDirectiveParams = true;
      processedTokens.push(token);
      return true;
    } else if (token.tokenType.name === LexerTokenTypes.CLOSE_PAREN) {
      this.state.inDirective = false;
      this.state.inDirectiveParams = false;
      this.state.inAssignment = false;
      processedTokens.push(token);
      return true;
    }
    return false;
  }

  /**
   * Process equal tokens and update state
   */
  private handleEqual(token: IToken, nextToken: IToken | null, processedTokens: IToken[]): boolean {
    if (token.tokenType.name === LexerTokenTypes.EQUAL) {
      if (this.state.skipNextEqual) {
        this.state.skipNextEqual = false;
        return true;
      }
      if (nextToken?.tokenType.name === LexerTokenTypes.EQUAL) {
        this.state.skipNextEqual = true;
        token.image = '==';
        token.endOffset = nextToken.endOffset;
        token.endLine = nextToken.endLine;
        token.endColumn = nextToken.endColumn;
      }
      this.state.inAssignment = true;
      processedTokens.push(token);
      return true;
    }
    return false;
  }

  /**
   * Process directive keywords and update state
   */
  private handleDirectiveKeywords(token: IToken, processedTokens: IToken[]): boolean {
    if (
      this.state.inDirective &&
      (token.tokenType.name === LexerTokenTypes.SET || token.tokenType.name === LexerTokenTypes.IF)
    ) {
      processedTokens.push(token);
      return true;
    }
    return false;
  }

  /**
   * Process directive parameters and update state
   */
  private handleDirectiveParams(token: IToken, processedTokens: IToken[]): boolean {
    if (this.state.inDirectiveParams) {
      if (
        token.tokenType.name === LexerTokenTypes.ID ||
        token.tokenType.name === LexerTokenTypes.STRING_LITERAL
      ) {
        if (this.state.inAssignment && token.tokenType.name === LexerTokenTypes.ID) {
          const contentToken = {
            ...token,
            tokenType: { ...token.tokenType, name: LexerTokenTypes.CONTENT },
            tokenTypeIdx: Content.tokenTypeIdx!,
          };
          processedTokens.push(contentToken);
        } else {
          processedTokens.push(token);
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Process content tokens and update state
   */
  private handleContent(token: IToken, nextToken: IToken | null): boolean {
    if (
      token.tokenType.name === LexerTokenTypes.CONTENT ||
      token.tokenType.name === LexerTokenTypes.WHITESPACE ||
      (token.tokenType.name === LexerTokenTypes.ID &&
        !this.state.inFormalReference &&
        !this.state.inDirective &&
        !this.state.inVariableReference &&
        !this.state.inPropertyAccess &&
        !this.state.inDirectiveParams &&
        (!nextToken || nextToken.tokenType.name !== LexerTokenTypes.OPEN_PAREN))
    ) {
      if (this.tracking.contentTokens.length === 0) {
        this.tracking.contentStartOffset = token.startOffset!;
        this.tracking.contentEndOffset = token.endOffset!;
        this.tracking.contentStartLine = token.startLine!;
        this.tracking.contentStartColumn = token.startColumn!;
      } else {
        this.tracking.contentEndOffset = token.endOffset!;
      }
      this.tracking.contentTokens.push(token);
      return true;
    }
    return false;
  }

  /**
   * Merge content tokens into a single token
   */
  private mergeContentTokens(processedTokens: IToken[], template: string): void {
    const contentText = template.substring(
      this.tracking.contentStartOffset,
      this.tracking.contentEndOffset + 1
    );
    const newToken = {
      image: contentText,
      startOffset: this.tracking.contentStartOffset,
      endOffset: this.tracking.contentEndOffset,
      startLine: this.tracking.contentStartLine,
      endLine: this.tracking.contentTokens[this.tracking.contentTokens.length - 1].endLine!,
      startColumn: this.tracking.contentStartColumn,
      endColumn: this.tracking.contentTokens[this.tracking.contentTokens.length - 1].endColumn!,
      tokenType: { name: LexerTokenTypes.CONTENT },
      tokenTypeIdx: Content.tokenTypeIdx!,
    };

    processedTokens.push(newToken as IToken);
    this.tracking.contentTokens = [];
  }

  /**
   * Filter unnecessary tokens from the processed tokens array
   */
  private filterTokens(tokens: IToken[]): IToken[] {
    const result: IToken[] = [];
    let inDirective = false;
    let inDirectiveParams = false;
    let prevToken: IToken | null = null;
    let skipNextEqual = false;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const nextToken = i + 1 < tokens.length ? tokens[i + 1] : null;

      // Skip all whitespace tokens
      if (token.tokenType.name === LexerTokenTypes.WHITESPACE) {
        continue;
      }

      // Handle directive start
      if (token.tokenType.name === LexerTokenTypes.HASH) {
        inDirective = true;
        inDirectiveParams = false;
        result.push(token);
        prevToken = token;
        continue;
      }

      // Handle directive keywords
      if (
        inDirective &&
        !inDirectiveParams &&
        (token.tokenType.name === LexerTokenTypes.SET ||
          token.tokenType.name === LexerTokenTypes.IF)
      ) {
        result.push(token);
        prevToken = token;
        continue;
      }

      // Handle directive parameters
      if (inDirective) {
        if (token.tokenType.name === LexerTokenTypes.OPEN_PAREN) {
          inDirectiveParams = true;
          result.push(token);
        } else if (token.tokenType.name === LexerTokenTypes.CLOSE_PAREN) {
          inDirective = false;
          inDirectiveParams = false;
          result.push(token);
        } else if (token.tokenType.name === LexerTokenTypes.EQUAL) {
          if (skipNextEqual) {
            skipNextEqual = false;
          } else if (nextToken?.tokenType.name === LexerTokenTypes.EQUAL) {
            skipNextEqual = true;
            result.push({
              ...token,
              image: '==',
              endOffset: nextToken.endOffset,
              endLine: nextToken.endLine,
              endColumn: nextToken.endColumn,
            });
          } else {
            result.push(token);
          }
        } else if (token.tokenType.name === LexerTokenTypes.STRING_LITERAL) {
          result.push(token);
        } else if (token.tokenType.name === LexerTokenTypes.ID) {
          if (prevToken?.tokenType.name === LexerTokenTypes.EQUAL && !skipNextEqual) {
            result.push({
              ...token,
              tokenType: { ...token.tokenType, name: LexerTokenTypes.CONTENT },
            });
          } else {
            result.push(token);
          }
        } else {
          result.push(token);
        }
        prevToken = token;
        continue;
      }

      result.push(token);
      prevToken = token;
    }

    return result;
  }

  /**
   * Post-process tokens to fix Content tokens and improve overall token quality
   */
  private postProcessTokens(result: ILexingResult, template: string): ILexingResult {
    if (result.errors.length > 0) {
      return result;
    }

    const processedTokens: IToken[] = [];
    this.state = this.createInitialState();
    this.tracking = this.createInitialTracking();

    for (let i = 0; i < result.tokens.length; i++) {
      const token = result.tokens[i];
      const nextToken = i + 1 < result.tokens.length ? result.tokens[i + 1] : null;

      // Process tokens in order of precedence
      if (this.handleFormalReference(token, nextToken, processedTokens, template)) continue;
      if (this.handleVariableReference(token, processedTokens, template)) continue;
      if (this.handlePropertyAccess(token, processedTokens)) continue;
      if (this.handleDirective(token, processedTokens, template)) continue;
      if (this.handleEqual(token, nextToken, processedTokens)) continue;
      if (
        token.tokenType.name === LexerTokenTypes.WHITESPACE &&
        (this.state.inDirective || this.state.inFormalReference)
      )
        continue;
      if (this.handleDirectiveKeywords(token, processedTokens)) continue;
      if (this.handleDirectiveParams(token, processedTokens)) continue;

      // Handle content tokens
      if (this.handleContent(token, nextToken)) {
        continue;
      } else {
        if (this.tracking.contentTokens.length > 0) {
          this.mergeContentTokens(processedTokens, template);
        }
        processedTokens.push(token);
      }

      // Reset variable reference state after Id token
      if (token.tokenType.name === LexerTokenTypes.ID) {
        if (this.state.inVariableReference) {
          this.state.inVariableReference = false;
        }
        if (this.state.inPropertyAccess) {
          this.state.inPropertyAccess = false;
        }
      }
    }

    // Handle any remaining content tokens
    if (this.tracking.contentTokens.length > 0) {
      this.mergeContentTokens(processedTokens, template);
    }

    return {
      ...result,
      tokens: this.filterTokens(processedTokens),
    };
  }

  /**
   * Tokenize a Velocity template string
   */
  public tokenize(template: string): ILexingResult {
    getLexerState(this.lexerInstance).reset();
    const result = this.lexerInstance.tokenize(template);
    return this.postProcessTokens(result, template);
  }

  /**
   * Get the current lexer state
   */
  public getCurrentState(): VelocityLexerState {
    return getLexerState(this.lexerInstance);
  }

  /**
   * Reset the lexer to its initial state
   */
  public reset(): void {
    getLexerState(this.lexerInstance).reset();
    this.state = this.createInitialState();
    this.tracking = this.createInitialTracking();
  }
}

// Export factory function to create lexer instances
export function createVelocityLexer(): VelocityLexerImpl {
  return new VelocityLexerImpl();
}

// Export helper functions
export function getLexerCurrentState(lexer: VelocityLexer): VelocityLexerState {
  return getLexerState(lexer);
}

export function resetLexer(lexer: VelocityLexer): void {
  getLexerState(lexer).reset();
}

export function tokenizeVelocityTemplate(template: string, lexer?: VelocityLexer): ILexingResult {
  const lexerInstance = lexer || createVelocityLexer();
  resetLexer(lexerInstance);
  return (lexerInstance as VelocityLexerImpl).tokenize(template);
}

// Export type for external use
export type VelocityLexer = Lexer & LexerWithState;
