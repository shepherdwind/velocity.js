# Expression and Operator Support in Velocity.js

## Current Implementation Status

This document outlines the current status of expression and operator support in the Chevrotain-based Velocity template parser.

### Lexical Support (Tokenization)

The following operators are now recognized by the lexer:

#### Comparison Operators

- [x] Equal (`==`) - Recognized as two separate Equal tokens
- [x] NotEqual (`!=`)
- [x] GreaterThan (`>`)
- [x] LessThan (`<`)
- [x] GreaterThanEqual (`>=`)
- [x] LessThanEqual (`<=`)

#### Logical Operators

- [x] And (`&&`)
- [x] Or (`||`)
- [x] Bang (`!`) - Recognized but with limitations in certain contexts

#### Arithmetic Operators

- [x] Plus (`+`)
- [x] Minus (`-`)
- [x] Multiply (`*`)
- [x] Divide (`/`)
- [x] Modulo (`%`)

### Known Limitations

1. **Token Order Issues**:

   - Proper ordering of tokens is critical in Chevrotain's lexer
   - Complex patterns must be defined before simpler ones
   - Current token order: `NotEqual`, `GreaterThanEqual`, `LessThanEqual`, `And`, `Or`, `Bang`, `Equal`, etc.

2. **Operator Recognition in Context**:

   - Bang (`!`) operator is not consistently recognized in all contexts
   - Logical operators (`&&`, `||`) are recognized but not properly handled within complex expressions
   - Closing parenthesis is not correctly tokenized in complex expressions

3. **Equality Comparison**:
   - `==` is tokenized as two separate `Equal` tokens instead of one `DoubleEqual` token

## Next Steps for Implementation

### Parser Rules Enhancement

1. **Expression Grammar**:

   - Define proper grammar rules for binary expressions
   - Implement precedence and associativity for operators
   - Support for parenthesized expressions

2. **Operator-Specific Rules**:
   - Create specific rules for comparison expressions
   - Create specific rules for logical expressions
   - Create specific rules for arithmetic expressions

### Visitor Methods Implementation

1. **Convert CST to AST**:

   - Implement visitor methods for each expression type
   - Ensure correct AST node creation for each operator
   - Preserve operator precedence in the AST structure

2. **Position Tracking**:
   - Ensure accurate position information for all expression nodes

### Testing and Validation

1. **Comprehensive Test Cases**:

   - Test each operator individually
   - Test combinations of operators
   - Test operator precedence
   - Test complex expressions with multiple operator types

2. **Error Handling**:
   - Improve error reporting for invalid expressions
   - Add recovery strategies for common syntax errors

## Implementation Plan

1. **Fix Lexer Issues**:

   - Create a single `DoubleEqual` token for `==`
   - Improve handling of closing parenthesis
   - Fix context-sensitive recognition of Bang operator

2. **Enhance Parser Grammar**:

   - Implement expression grammar with proper precedence
   - Add support for nested expressions

3. **Complete Visitor Implementation**:
   - Create visitor methods for all expression types
   - Implement AST conversion for operators
   - Ensure compatibility with existing AST structure
