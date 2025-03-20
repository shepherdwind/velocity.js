# Velocity.js Chevrotain Parser Implementation

## Overview

This document describes the implementation of a new parser for the Velocity.js template engine using the Chevrotain parsing library. The goal is to replace the existing Jison-based parser with a more maintainable and extensible Chevrotain-based implementation.

## Current Status

The parser implementation is in progress and has achieved the following milestones:

- [x] Basic lexer implementation for Velocity syntax
- [x] Basic parser rules for template structure
- [x] Support for simple variable references (`$foo`)
- [x] Support for formal references (`${foo}`)
- [x] Support for property access (`$foo.bar`)
- [x] AST visitor pattern implementation for converting CST to AST
- [x] Test coverage for basic parsing functionality
- [x] AST output compatible with existing Jison parser

## Implementation Details

### Architecture

The new parser is structured in the following components:

1. **Lexer**: Responsible for tokenizing input text into a stream of tokens

   - Implementation: `src/parse/chevrotain/lexer.ts`
   - Tokens defined in: `src/parse/chevrotain/tokens.ts`

2. **Parser**: Consumes tokens and builds a Concrete Syntax Tree (CST)

   - Implementation: `src/parse/chevrotain/parser.ts`
   - Grammar rules for Velocity syntax

3. **AST Visitor**: Converts CST to Abstract Syntax Tree (AST)

   - Implementation: `VelocityAstVisitor` in `src/parse/chevrotain/parser.ts`
   - Creates AST nodes compatible with existing parser

4. **Entry Point**: Main parser function that handles the full parsing process
   - Implementation: `src/parse/index.ts`
   - Currently delegates to Jison parser, will switch to Chevrotain when ready

### Key Accomplishments

- **Lexical Analysis**: The lexer correctly tokenizes Velocity templates, identifying variables, directives, and content.
- **Grammar Rules**: The parser defines rules for template elements including variable references and basic directives.
- **AST Conversion**: The visitor pattern implementation converts CST to AST format compatible with the existing system.
- **Test Framework**: Unit tests verify that the output matches expectations and is compatible with Jison parser output.

## Next Steps

The following tasks need to be completed before the Chevrotain parser can fully replace the Jison parser:

- [ ] Complete implementation of all directive parsing rules

  - [ ] Full support for `#if`/`#elseif`/`#else` directives with proper nesting
  - [ ] Full support for `#foreach` directive with iteration context
  - [ ] Support for `#macro` directive and macro calls
  - [ ] Support for `#include` directive

- [ ] Enhanced condition parsing

  - [ ] Arithmetic expressions
  - [ ] Comparison operators
  - [ ] Logical operators

- [ ] Support for methods and functions

  - [ ] Method calls with arguments
  - [ ] Function references

- [ ] Robust error handling

  - [ ] Error recovery during parsing
  - [ ] Descriptive error messages
  - [ ] Source location tracking

- [ ] Performance optimization

  - [ ] Memoization for repeated parsing patterns
  - [ ] Token categorization for faster lexing

- [ ] Switch from legacy Jison parser to Chevrotain parser
  - [ ] Update `src/parse/index.ts` to use Chevrotain
  - [ ] Ensure 100% compatibility with existing AST consumers

## How to Contribute

To continue development of the Chevrotain parser:

1. Implement one feature at a time, starting with simpler directives
2. Add test cases for each new feature
3. Compare output with Jison parser to ensure compatibility
4. Update this documentation as progress is made

## References

- [Chevrotain Documentation](https://chevrotain.io/docs/)
- [Velocity Template Language Guide](https://velocity.apache.org/engine/2.3/user-guide.html)
- [CST Visitor Pattern](https://chevrotain.io/docs/guide/concrete_syntax_tree.html#cst-visitor)
