# Chevrotain Parser Implementation for Velocity Templates

## Overview

This document describes the implementation of a new parser for Velocity templates using the Chevrotain parsing library. The goal is to replace the existing Jison-based parser with a more maintainable and extensible implementation.

## Current Status

### Completed Milestones

- [x] Basic lexer implementation for token recognition
- [x] Parser rules for simple templates
- [x] Support for variable references (`$var`, `${var}`)
- [x] Support for property access (`$user.name`)
- [x] Basic expression tokenizer for comparison, logical, and arithmetic operators
- [x] Test coverage for basic functionality
- [x] AST visitor infrastructure for CST to AST conversion

### In Progress

- [ ] Complete expression parser for operators and complex conditions
- [ ] Directive parsing (if, foreach, set, etc.)
- [ ] Complete AST visitor implementation

## Implementation Details

### Architecture

The parser implementation consists of four main components:

1. **Lexer** (`src/parse/chevrotain/lexer.ts`): Handles tokenization of template text into a stream of tokens
2. **Parser** (`src/parse/chevrotain/parser.ts`): Parses tokens into a Concrete Syntax Tree (CST)
3. **AST Visitor** (`src/parse/chevrotain/visitor.ts`): Converts the CST into an Abstract Syntax Tree (AST)
4. **Entry Point** (`src/parse/index.ts`): Provides the API for template parsing

### Key Accomplishments

#### Lexical Analysis

- Implemented token definitions for Velocity syntax elements
- Added support for various operators (comparison, logical, arithmetic)
- Developed advanced token processing for context-sensitive lexing
- Created a robust state management system for token tracking

#### Grammar Rules

- Defined grammar for basic template elements
- Implemented rules for variable references and property access
- Prepared structure for directive parsing

#### AST Conversion

- Built a visitor framework for traversing the CST
- Implemented methods for converting basic elements to AST nodes
- Ensured position information is preserved for error reporting

#### Test Framework

- Created comprehensive tests for lexical analysis
- Added tests for CST to AST conversion
- Implemented comparison with Jison parser output for compatibility validation

## Expression Support

For details on the current status of expression and operator support, see [Expression Operator Support](./expression-operator-support.md)

## Next Steps

To complete the Chevrotain parser implementation, the following tasks need to be addressed:

1. **Parser Rules**:

   - Complete expression grammar for operators with proper precedence
   - Implement directive parsing rules
   - Add support for method and function calls

2. **AST Visitor**:

   - Implement visitor methods for all grammar rules
   - Complete conversion of CST to compatible AST format
   - Handle complex nested structures

3. **Error Handling**:

   - Improve error messages for syntax errors
   - Add recovery strategies for common mistakes
   - Implement detailed position tracking for all error types

4. **Performance Optimization**:

   - Benchmark against the existing Jison parser
   - Optimize critical parsing paths
   - Reduce memory consumption during parsing

5. **Switch Implementation**:
   - Complete the transition from the legacy parser
   - Update entry points to use the new implementation
   - Ensure backward compatibility

## How to Contribute

When working on this implementation:

1. Implement one feature at a time and ensure it has test coverage
2. Add test cases that compare output with the Jison parser for compatibility
3. Update this documentation as you make progress
4. Follow the implementation plan in the [Visitor Implementation Plan](./visitor-implementation-plan.md)

## References

- [Chevrotain Documentation](https://chevrotain.io/docs/)
- [Velocity Template Language Guide](https://velocity.apache.org/engine/1.7/user-guide.html)
- [CST Visitor Pattern](https://chevrotain.io/docs/guide/concrete_syntax_tree.html#cst-visitor)
