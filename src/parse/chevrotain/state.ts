/**
 * State management for Velocity lexer
 *
 * This provides the state stack functionality similar to Jison's lexer
 * to enable complex state transitions needed for Velocity templates.
 */

/**
 * Type definition for context variables
 */
export type ContextValue = string | number | boolean | null;

/**
 * VelocityLexerState - Custom state tracking for the Velocity lexer
 * Mimics Jison's state stack capabilities
 */
export class VelocityLexerState {
  /**
   * The stack of lexer modes
   * @private
   */
  private modeStack: string[] = ['INITIAL'];

  /**
   * Context variables for state tracking
   * @private
   */
  private contextVars: Map<string, ContextValue> = new Map();

  /**
   * Push a new mode onto the stack (equivalent to Jison's this.begin())
   * @param mode The mode to push onto the stack
   */
  pushMode(mode: string): void {
    this.modeStack.push(mode);
  }

  /**
   * Pop the top mode from the stack (equivalent to Jison's this.popState())
   * @returns The mode that was popped
   */
  popMode(): string {
    if (this.modeStack.length <= 1) {
      return 'INITIAL';
    }
    return this.modeStack.pop() || 'INITIAL';
  }

  /**
   * Get the current mode (top of the stack)
   * @returns The current mode
   */
  currentMode(): string {
    return this.modeStack[this.modeStack.length - 1];
  }

  /**
   * Peek at a mode in the stack without popping (equivalent to Jison's this.topState())
   * @param offset The offset from the top of the stack (0 = top)
   * @returns The mode at the specified offset
   */
  peekMode(offset: number = 0): string {
    const idx = this.modeStack.length - 1 - offset;
    return idx >= 0 ? this.modeStack[idx] : 'INITIAL';
  }

  /**
   * Get the size of the mode stack (equivalent to Jison's this.stateStackSize())
   * @returns The number of modes in the stack
   */
  stackSize(): number {
    return this.modeStack.length;
  }

  /**
   * Set a context variable
   * @param name The name of the variable
   * @param value The value to set
   */
  setVar(name: string, value: ContextValue): void {
    this.contextVars.set(name, value);
  }

  /**
   * Get a context variable
   * @param name The name of the variable
   * @returns The value of the variable, or undefined if not found
   */
  getVar(name: string): ContextValue | undefined {
    return this.contextVars.get(name);
  }

  /**
   * Check if a context variable exists
   * @param name The name of the variable
   * @returns True if the variable exists, false otherwise
   */
  hasVar(name: string): boolean {
    return this.contextVars.has(name);
  }

  /**
   * Reset the state to initial
   */
  reset(): void {
    this.modeStack = ['INITIAL'];
    this.contextVars.clear();
  }

  /**
   * Debug function to get the current state
   * @returns The current state information
   */
  debug(): { modeStack: string[]; vars: Record<string, ContextValue> } {
    const vars: Record<string, ContextValue> = {};
    this.contextVars.forEach((value, key) => {
      vars[key] = value;
    });

    return {
      modeStack: [...this.modeStack],
      vars,
    };
  }
}

/**
 * Lexer instance with state
 */
export interface LexerWithState {
  velocityState?: VelocityLexerState;
  [key: string]: unknown;
}

/**
 * Get or create a lexer state object for a lexer instance
 * @param lexer The lexer instance
 * @returns The state object
 */
export function getLexerState(lexer: LexerWithState): VelocityLexerState {
  if (!lexer.velocityState) {
    lexer.velocityState = new VelocityLexerState();
  }
  return lexer.velocityState;
}
