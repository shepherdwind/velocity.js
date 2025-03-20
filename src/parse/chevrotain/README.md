# Velocity.js Chevrotain Parser

This module implements a parser for Velocity templates using Chevrotain. It is a direct replacement for the existing Jison-based parser.

## Implementation Status

- ✅ State machine implementation
- ✅ Basic token definitions
- ✅ Lexer infrastructure
- ✅ State transition handling
- ✅ Basic tests for state machine and lexer
- 🔲 Complete token definitions for all modes
- 🔲 Parser grammar implementation
- 🔲 AST builder
- 🔲 Full test coverage
- 🔲 Performance optimizations

## Architecture

### State Machine

The Velocity template syntax requires complex state transitions that were previously handled by Jison's lexer states. To replicate this functionality, we've implemented a custom state machine that tracks:

- Current lexer mode (INITIAL, mu, i, h, c, esc, run)
- State stack for nested expressions
- Context variables for special handling

### Lexer

The lexer is responsible for:

1. Tokenizing template input into discrete tokens
2. Tracking state transitions based on token patterns
3. Handling special cases like escape sequences
4. Providing position information for error reporting

### Parser (Planned)

The parser will:

1. Consume tokens from the lexer
2. Build a concrete syntax tree (CST)
3. Transform the CST into an abstract syntax tree (AST)
4. Handle error recovery and reporting

## Usage

```typescript
import { createVelocityLexer, tokenizeVelocityTemplate } from './parse/chevrotain';

// Create a lexer
const lexer = createVelocityLexer();

// Tokenize a template
const result = tokenizeVelocityTemplate('Hello, $name!', lexer);

// Check for errors
if (result.errors.length > 0) {
  console.error('Tokenization errors:', result.errors);
} else {
  console.log('Tokens:', result.tokens);
}
```

## Development Plan

### Phase 1: State Machine and Basic Lexer ✅

- Implement the state machine to handle complex state transitions
- Define basic token types
- Create the lexer infrastructure
- Add tests for the state machine and basic lexing

### Phase 2: Complete Lexer

- Implement all token definitions for each lexer mode
- Add special handling for escape sequences
- Handle edge cases in state transitions
- Add comprehensive tests for all token types and transitions

### Phase 3: Parser Grammar

- Define grammar rules for Velocity syntax
- Implement the parser using Chevrotain
- Create the CST-to-AST transformation
- Add tests for parsing various template constructs

### Phase 4: Integration and Optimization

- Integrate with the existing codebase
- Ensure compatibility with the current API
- Optimize performance
- Add benchmarks
- Complete documentation

## Testing Strategy

- Unit tests for individual components (state machine, lexer, parser)
- Integration tests for the complete parsing pipeline
- Test cases from the original parser to ensure compatibility
- Edge case testing for error handling and recovery
- Performance benchmarks

## References

- [Jison Parser Source](../jison)
- [Chevrotain Documentation](https://chevrotain.io/docs/)
- [Velocity Template Language Guide](https://velocity.apache.org/engine/2.0/user-guide.html)
