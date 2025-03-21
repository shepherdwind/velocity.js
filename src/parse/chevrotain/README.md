# Chevrotain Parser for Velocity.js

This directory contains the implementation of a Chevrotain-based parser for Velocity templates, aiming to replace the existing Jison-based parser.

## Current Status

The parser is currently under development, with the following components implemented:

- **Lexer**: Complete implementation with support for all basic tokens, including comparison operators, arithmetic operators, and logical operators.
- **Parser Rules**: Basic rules for simple templates, variable references, property access, and some directives.
- **AST Visitor**: Initial implementation for converting CST to AST, supporting basic nodes.
- **Test Framework**: Comprehensive unit tests for the implemented features.

### Expression Support

The current implementation supports:

- ✅ Basic content parsing
- ✅ Variable references with property access
- ✅ Simple equality comparison (`==`) in `#if` directives
- ✅ Token recognition for other operators (but not full parsing)

## Expression Parsing Roadmap

The following steps are planned for implementing full expression support:

1. **Comparison Operators**

   - ✅ Token support for `==`, `!=`, `>`, `<`, `>=`, `<=`
   - ✅ Parser rules for equality operator (`==`)
   - ⏳ Parser rules for inequality operators
   - ⏳ AST visitor implementation for all comparison operators

2. **Arithmetic Operators**

   - ✅ Token support for `+`, `-`, `*`, `/`, `%`
   - ⏳ Parser rules for arithmetic expressions
   - ⏳ Operator precedence handling
   - ⏳ AST visitor implementation

3. **Logical Operators**

   - ✅ Token support for `&&`, `||`, `!`
   - ⏳ Parser rules for logical expressions
   - ⏳ AST visitor implementation

4. **Complex Expressions**
   - ⏳ Nested expressions with correct precedence
   - ⏳ Parenthesized expressions
   - ⏳ Combined operations (e.g., `$value > 5 && $value < 20`)

## Known Issues

1. **Token Order**: The order of token definitions is critical for proper recognition. Currently, some operators are recognized but might conflict with others.
2. **Closing Parentheses**: In complex expressions, there might be issues with recognizing closing parentheses.
3. **Expression Context**: Some operators are only recognized in specific contexts.

## Running Tests

To run the parser tests:

```bash
npm test -- src/parse/chevrotain/__tests__/
```

This will run all tests related to the Chevrotain parser implementation.

## Comparison with Jison Parser

The current implementation aims to be compatible with the existing Jison parser, with a few differences:

1. **AST Structure**: The structure of the AST nodes is similar but not identical.
2. **Position Information**: Position data in the AST differs slightly between implementations.
3. **Expression Handling**: The Jison parser uses a different approach for handling expressions.

## Contributing

When implementing new features or fixing issues:

1. Add or update appropriate tests first
2. Update the parser rules
3. Implement or update the AST visitor methods
4. Verify compatibility with the Jison parser (where applicable)
5. Update this documentation

## References

- [Chevrotain Documentation](https://chevrotain.io/docs/)
- [Velocity Template Language (VTL) Reference](https://velocity.apache.org/engine/1.7/vtl-reference.html)
- Original Jison parser: `src/parse/index.js`
