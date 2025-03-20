# Velocity Parser Migration Plan: Jison to Chevrotain

## Overview

This document outlines the plan for migrating the Velocity template engine's parser from Jison to Chevrotain. The migration will be performed in stages, with each stage focusing on a specific aspect of the parser implementation.

## Migration Strategy

The migration will follow these high-level steps:

1. Set up the Chevrotain infrastructure
2. Implement the lexer
3. Implement the parser
4. Handle the post-processing of the AST
5. Integrate with the existing codebase
6. Test and validate

## 1. Lexer Implementation Plan

### 1.1 Token Definitions

- [ ] Create a base token class hierarchy
- [ ] Define tokens for all lexical elements
- [ ] Organize tokens into logical groups (directives, expressions, etc.)
- [ ] Set up token patterns with correct precedence

### 1.2 Lexer Modes

- [ ] Create modes corresponding to the Jison lexer states:
  - [ ] `INITIAL` mode (default content mode)
  - [ ] `mu` mode (after `$` for variable references)
  - [ ] `h` mode (after `#` for directives)
  - [ ] `c` mode (inside parentheses for expressions)
  - [ ] `i` mode (inside brackets for index access)
  - [ ] `esc` mode (for handling escape sequences)
  - [ ] `run` mode (for method calls)
- [ ] Implement mode transitions based on token recognition

### 1.3 State Machine Implementation

- [ ] Create a custom state tracking mechanism to supplement Chevrotain's mode stack
- [ ] Implement escape sequence detection logic
- [ ] Create pattern matchers for state transition triggers
- [ ] Implement custom context tracking (e.g., `yy.begin` equivalent)
- [ ] Build state transition logic for complex nested states

### 1.4 Special Handling

- [ ] Implement escape sequence detection
- [ ] Handle raw content blocks
- [ ] Manage comments
- [ ] Process string literals correctly (single vs. double quotes)

### 1.5 Position Tracking

- [ ] Ensure all tokens track line and column information
- [ ] Maintain consistent position information for error reporting

## 2. Parser Implementation Plan

### 2.1 Grammar Rules

- [ ] Define rules for the top-level template structure
- [ ] Implement directive rules (if, set, foreach, etc.)
- [ ] Create rules for variable references
- [ ] Implement expression handling
- [ ] Support literals and complex structures (arrays, maps)

### 2.2 AST Construction

- [ ] Create visitor functions to construct AST nodes
- [ ] Ensure AST nodes match the existing structure
- [ ] Generate proper position information
- [ ] Handle nested structures

### 2.3 Error Recovery

- [ ] Implement error recovery strategies for common syntax errors
- [ ] Provide meaningful error messages
- [ ] Add recovery points at logical boundaries

## 3. Post-Processing Implementation

### 3.1 Block Nesting

- [ ] Implement the `makeLevel` function to handle nested blocks
- [ ] Support custom blocks
- [ ] Process directives and their content

### 3.2 Whitespace Handling

- [ ] Implement whitespace trimming after directives
- [ ] Preserve appropriate whitespace in content

## 4. Integration Plan

### 4.1 API Compatibility

- [ ] Ensure the new parser exposes the same external API
- [ ] Maintain backward compatibility with existing code
- [ ] Provide the same error handling behavior

### 4.2 Performance Optimization

- [ ] Optimize token matching patterns
- [ ] Consider memoization for frequently parsed structures
- [ ] Benchmark against the Jison implementation

## 5. Testing Strategy

### 5.1 Unit Tests

- [ ] Test lexer in isolation
- [ ] Test parser with predefined token streams
- [ ] Test AST construction
- [ ] Validate error handling

### 5.2 State Machine Tests

- [ ] Test basic state transitions:

  - [ ] `#set($var = "value")` (INITIAL → h → c → INITIAL)
  - [ ] `$customer.name` (INITIAL → mu → INITIAL)
  - [ ] `$customer.getName()` (INITIAL → mu → c → INITIAL)
  - [ ] `$customer["property"]` (INITIAL → mu → i → INITIAL)

- [ ] Test nested state transitions:

  - [ ] `#if($customer.orders.size() > 10)` (Multiple nested transitions)
  - [ ] `#foreach($item in $items[$idx])` (Index inside foreach)
  - [ ] `$customer.getAddress()["street"]` (Method call followed by index)

- [ ] Test escape sequences:

  - [ ] `\$notVariable` (Escaped $ should not enter mu state)
  - [ ] `\\$stillVariable` (Double backslash doesn't escape $)
  - [ ] `\#notDirective` (Escaped # should not enter h state)

- [ ] Test complex nesting:

  - [ ] Complex templates with multiple levels of nesting
  - [ ] Templates with interleaved directives and references

- [ ] Test edge cases:
  - [ ] `$var#if($x)nested#end` (Variable followed by directive)
  - [ ] `#{else}` (Directive in braces)
  - [ ] `#@macroName($param)` (Macro body syntax)
  - [ ] `#[[...]]#` (Raw content with special characters)

### 5.3 Integration Tests

- [ ] Test compatibility with existing test cases
- [ ] Verify correct handling of edge cases
- [ ] Ensure AST compatibility

### 5.4 Performance Tests

- [ ] Measure parsing speed
- [ ] Analyze memory usage
- [ ] Compare with Jison implementation

## 6. Implementation Phases

### Phase 1: Setup and State Machine Design

- [ ] Set up Chevrotain integration
- [ ] Design the state machine implementation
- [ ] Create state tracking mechanism
- [ ] Build test infrastructure for state transitions

### Phase 2: Basic Lexer with State Machine

- [ ] Implement basic token definitions
- [ ] Create the core state machine
- [ ] Implement mode transitions
- [ ] Build escape sequence handling
- [ ] Test with simple state transitions

### Phase 3: Complete Lexer

- [ ] Implement all lexer modes
- [ ] Add all token patterns
- [ ] Handle special cases (escaping, raw content)
- [ ] Test with complex templates and nested states

### Phase 4: Basic Parser

- [ ] Implement core grammar rules
- [ ] Build AST construction
- [ ] Handle simple directives and references
- [ ] Test basic parsing functionality

### Phase 5: Complete Parser

- [ ] Implement all grammar rules
- [ ] Support all directive types
- [ ] Handle complex expressions
- [ ] Add error recovery

### Phase 6: Post-Processing and Integration

- [ ] Implement the block nesting logic
- [ ] Handle whitespace properly
- [ ] Integrate with the existing codebase
- [ ] Ensure API compatibility

### Phase 7: Testing and Refinement

- [ ] Run tests against full test suite
- [ ] Fix compatibility issues
- [ ] Optimize performance
- [ ] Document any differences or improvements

## 7. Chevrotain-Specific Considerations

### 7.1 State Machine Implementation Approach

Chevrotain's mode system is more limited than Jison's state machine. We'll need to:

1. **Implement Custom State Stack**:

   - Create a wrapper around Chevrotain's mode system
   - Track additional state information
   - Support operations like `topState(n)` and arbitrary state transitions

2. **Handle Context Variables**:

   - Create equivalents to Jison's context variables like `yy.begin`
   - Pass context between token matchers

3. **Manage Complex Transitions**:
   - Create custom token matchers for complex state transitions
   - Implement lookahead for context-sensitive decisions

### 7.2 Lexer Mode Implementation

Example implementation structure:

```typescript
class VelocityLexerState {
  private modeStack: string[] = ['INITIAL'];
  private contextVars: Map<string, any> = new Map();

  // Similar to Jison's this.begin()
  pushMode(mode: string): void {
    this.modeStack.push(mode);
  }

  // Similar to Jison's this.popState()
  popMode(): string {
    return this.modeStack.pop() || 'INITIAL';
  }

  // Similar to Jison's this.topState()
  peekMode(offset: number = 0): string {
    const idx = this.modeStack.length - 1 - offset;
    return idx >= 0 ? this.modeStack[idx] : 'INITIAL';
  }

  // Similar to Jison's this.stateStackSize()
  stackSize(): number {
    return this.modeStack.length;
  }

  // Context variable handling
  setVar(name: string, value: any): void {
    this.contextVars.set(name, value);
  }

  getVar(name: string): any {
    return this.contextVars.get(name);
  }
}

// Token creators would then use this state object
function createStateAwareToken(config) {
  return createToken({
    ...config,
    push_mode: (lexer) => {
      const state = getLexerState(lexer);
      state.pushMode(config.mode);
    },
    pop_mode: (lexer) => {
      const state = getLexerState(lexer);
      return state.popMode();
    },
  });
}
```

### 7.3 Parser Design

Chevrotain uses a different parsing approach:

- Class-based grammar definition
- Explicit rule methods
- Visitor pattern for AST construction

Key adaptations needed:

- Convert Jison's grammar productions to Chevrotain rules
- Implement semantic actions as visitor methods
- Handle operator precedence explicitly

## 8. State Machine Migration Challenges and Solutions

### 8.1 Complex State Stack Navigation

**Challenge**: Jison can navigate the state stack arbitrarily (`this.topState(n)`), while Chevrotain has limited mode stack access.

**Solution**:

- Implement custom state stack tracking
- Mirror Jison's stack navigation capabilities
- Maintain stack integrity during transitions

### 8.2 Context-Dependent Decisions

**Challenge**: Jison makes decisions based on multiple states in the stack (e.g., checking if previous states are `mu`, `h`, etc.).

**Solution**:

- Maintain state history in our custom state tracker
- Implement decision functions based on state stack contents
- Create context-aware token matchers

### 8.3 Escape Sequence Detection

**Challenge**: Jison uses complex regex-based lookahead for escape detection.

**Solution**:

- Implement custom token patterns with embedded JavaScript logic
- Use custom token matchers to handle escape sequences
- Track escape context across state transitions

### 8.4 Raw Content and Comment Blocks

**Challenge**: Jison uses special patterns to handle raw blocks and comments.

**Solution**:

- Create specialized token matchers for raw content
- Implement custom logic for multi-line comment blocks
- Ensure proper state transitions after special blocks

## 9. Migration Risks and Mitigations

### 9.1 Identified Risks

1. **Complex State Machine Translation**

   - Risk: The Jison lexer uses a complex state machine that may be difficult to replicate
   - Mitigation: Implement a custom state tracking system that mirrors Jison's capabilities

2. **AST Compatibility**

   - Risk: Different AST structure could break existing code
   - Mitigation: Thorough testing with existing templates and comparing AST outputs

3. **Edge Case Handling**

   - Risk: Missing subtle edge cases handled by the current implementation
   - Mitigation: Comprehensive test suite covering all edge cases

4. **Performance Regression**
   - Risk: New implementation could be slower
   - Mitigation: Performance benchmarking and optimization

### 9.2 Mitigation Approaches

- Incremental development with frequent testing
- Detailed comparison of AST outputs between implementations
- Extensive unit testing for each component
- Parallel operation during development (ability to switch between implementations)

## 10. Example Implementation Code Snippets

### 10.1 Escape Sequence Detection

```typescript
// Custom token for handling potential escapes before $
const PotentialEscapedDollar = createToken({
  name: 'PotentialEscapedDollar',
  pattern: /[^]*?(?=\$)/,
  line_breaks: true,
  start_chars_hint: [''],
  custom: {
    resolveDollar: (text) => {
      const escapeMatch = /\\+$/.exec(text);
      if (!escapeMatch || escapeMatch[0].length % 2 === 0) {
        // Not escaped, transition to variable mode
        return { escaped: false, text: text };
      } else {
        // Escaped, handle accordingly
        return {
          escaped: true,
          text: text.replace(/\\$/, ''),
        };
      }
    },
  },
});
```

### 10.2 State Transition Implementation

```typescript
// Example for handling complex state transitions like parenthesis closing
const CloseParenthesis = createToken({
  name: 'CLOSE_PARENTHESIS',
  pattern: /\)/,
  custom: {
    action: (lexer) => {
      const state = getLexerState(lexer);
      const currentMode = state.popMode();

      if (currentMode === 'c') {
        const stackSize = state.stackSize();

        // Check if we're in a method call
        if (state.peekMode() === 'run') {
          state.popMode();
          stackSize--;
        }

        // Check for specific state combinations (like in Jison)
        const tailState = state.peekMode(stackSize - 2);

        if (stackSize === 2 && tailState === 'h') {
          // End state h after encountering #set(a = b) parenthesis closure
          state.popMode();
        } else if (stackSize === 3 && tailState === 'mu' && state.peekMode(stackSize - 3) === 'h') {
          // Handle $foo#if($a)...#end case
          state.popMode();
          state.popMode();
        }
      }
    },
  },
});
```

## 11. Documentation Plan

- [ ] Document token definitions
- [ ] Document state machine implementation details
- [ ] Document grammar rules
- [ ] Create diagrams of parsing flow and state transitions
- [ ] Provide migration notes for any behavioral changes
- [ ] Update API documentation

## Next Steps

1. Set up the development environment for Chevrotain
2. Create the custom state tracking mechanism
3. Implement basic token definitions with state transitions
4. Build test infrastructure for state machine validation
5. Proceed with the implementation phases as outlined
