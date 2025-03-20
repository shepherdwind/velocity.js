# Velocity Template Engine Parser Analysis

## Overview

This document analyzes the current Velocity template engine's parser implementation based on Jison and outlines a plan to migrate to a Chevrotain-based implementation. The analysis focuses on the lexical structure, grammar rules, AST definition, and how the parser integrates with the rest of the codebase.

## 1. Current Implementation Analysis

### 1.1 Overall Architecture

The current parser implementation uses Jison, a JavaScript parser generator based on Bison/Yacc and Flex/Lex. The parser consists of:

- A lexer definition (`velocity.l`) that tokenizes the input template
- A grammar definition (`velocity.yy`) that defines the language syntax and AST construction
- A TypeScript wrapper (`parse.ts`) that post-processes the parsed AST to handle nested blocks

The parser's output is an Abstract Syntax Tree (AST) that represents the structure of the template, which is later used by the renderer to generate the final output.

### 1.2 Token Definitions

The lexer (`velocity.l`) defines various states and token patterns:

#### Lexer States

- `mu`: Handling variable references beginning with `$`
- `h`: Handling directives beginning with `#`
- `c`: Handling expressions in conditions and parameter lists
- `i`: Handling array index expressions
- `esc`: Handling escape sequences
- `run`: Handling method calls

#### Token Categories

1. **Content Tokens**

   - `CONTENT`: Regular content text
   - `RAW`: Raw content enclosed in `#[[...]]#`
   - `COMMENT`: Comments (`##...` or `#*...*#`)

2. **Directive Tokens**

   - `HASH`: The `#` character starting directives
   - `SET`, `IF`, `ELSEIF`, `ELSE`, `END`, `FOREACH`, `BREAK`, `DEFINE`, `MACRO`, `NOESCAPE`, `MACRO_BODY`

3. **Variable Tokens**

   - `DOLLAR`: The `$` character starting variable references
   - `ID`: Identifiers
   - `VAR_BEGIN`, `VAR_END`: `{` and `}` for wrapped references

4. **Expression Tokens**

   - `PARENTHESIS`, `CLOSE_PARENTHESIS`: `(` and `)`
   - `BRACKET`, `CLOSE_BRACKET`: `[` and `]`
   - `DOT`: `.` for property access
   - `COMMA`: `,` for separating arguments
   - `EQUAL`: `=` for assignment
   - Operators: `+`, `-`, `*`, `/`, `%`, `==`, `!=`, `>`, `<`, `>=`, `<=`, `&&`, `||`, `!`

5. **Literal Tokens**
   - `INTEGER`: Integer numbers
   - `DECIMAL_POINT`: Decimal point in numbers
   - `STRING`: String literals in single quotes
   - `EVAL_STRING`: String literals in double quotes
   - `BOOL`: Boolean literals (`true`, `false`, `null`)
   - `MAP_BEGIN`, `MAP_END`, `MAP_SPLIT`: Characters for map definition
   - `RANGE`: `..` for range expressions

### 1.3 Grammar Rules

The grammar (`velocity.yy`) defines the structure of Velocity templates with the following main productions:

1. **Top-level Structure**

   - `root`: The starting point, containing statements
   - `statements`: A list of statements
   - `statement`: A single statement (reference, directive, content, etc.)

2. **Directives**

   - `set`: Variable assignment (`#set($var = value)`)
   - `if`, `elseif`, `else`, `end`: Conditional directives
   - `foreach`: Loop directive
   - `break`: Loop termination
   - `define`, `macro`, `macro_call`: Macro definitions and usage
   - `noescape`: Escaping control

3. **References**

   - Simple references (`$var`)
   - Wrapped references (`${var}`)
   - Method calls (`$var.method()`)
   - Property access (`$var.property`)
   - Index access (`$var[index]`)
   - Chained access (`$var.property.method()[index]`)

4. **Expressions**
   - Literals (strings, numbers, booleans)
   - Arrays and ranges
   - Maps
   - Mathematical expressions
   - Logical expressions

### 1.4 AST Structure

The AST structure is defined in `src/type.ts` with the following main node types:

1. **Base Types**

   - `CommonAstType`: Base type with common properties (`value`, `id`, `pos`)
   - `AST_TYPE`: Union of possible node types

2. **Specific Node Types**

   - `MacroAST`: Macro definitions
   - `SetAST`: Variable assignments
   - `StringAST`: String literals
   - `ArrayAST`: Array definitions (normal and range)
   - `IfAST`: Conditional statements
   - `ReferencesAST`: Variable references
   - `MathAST`: Mathematical expressions
   - `Content`: Text content
   - And many others for specific constructs

3. **Union Types**
   - `VELOCITY_AST`: Union of all possible AST node types
   - `RAW_AST_TYPE`: Union of AST nodes and raw strings

### 1.5 Post-Processing

The `parse.ts` file contains additional logic to:

1. Handle whitespace and newlines after directives
2. Process nested blocks by grouping directive nodes and their content
3. Support custom blocks defined by the user

### 1.6 Integration with the Template Engine

The parser is integrated into the template engine through the `index.ts` file, which:

1. Exports the `parse` function for standalone use
2. Provides a `render` function that parses a template and then compiles it
3. Links the parser with the compiler and helper functions

### 1.7 Error Handling

Error handling in the current implementation is relatively basic:

- The Jison-generated parser throws errors for syntax mismatches
- The `parseError` function in the generated parser is used to report parsing errors

## 2. Token and Parsing Stage Analysis

### 2.1 Key Lexical Patterns

The lexer uses complex patterns to handle Velocity's syntax, with notable features:

1. **Context-Sensitive Tokenization**

   - State changes based on tokens encountered
   - Different handling for content vs. expressions

2. **Escape Handling**

   - Backslash escaping for special characters
   - Special handling for escaped `$` and `#`

3. **State Management**
   - Stack-based state tracking
   - Transitioning between directive, reference, and content states

### 2.2 Parsing Flow

The parsing process follows these general steps:

1. Tokenize the input template
2. Build an initial AST based on grammar rules
3. Post-process the AST to handle nested structures
4. Return the processed AST for rendering

### 2.3 Edge Cases and Challenges

Several edge cases must be handled correctly:

1. **Whitespace Handling**

   - Trimming newlines after directives
   - Preserving whitespace in content

2. **Nested Structures**

   - Properly closing blocks (`#if`, `#foreach`, etc.)
   - Handling nested conditions and loops

3. **Expression Evaluation**

   - Operator precedence in math expressions
   - Method call resolution

4. **Escaping**
   - Differentiating escaped sequences from directives/references
   - Raw content handling

## 3. Complete Token List

| Token Name          | Description               | Example                                                            |
| ------------------- | ------------------------- | ------------------------------------------------------------------ | --- | ------ |
| `CONTENT`           | Regular text content      | `Hello world`                                                      |
| `RAW`               | Raw text not processed    | `#[[raw content]]#`                                                |
| `COMMENT`           | Comments                  | `##comment` or `#*comment*#`                                       |
| `HASH`              | Directive marker          | `#`                                                                |
| `DOLLAR`            | Variable marker           | `$`                                                                |
| `ID`                | Identifier                | `foo`, `bar1`                                                      |
| `VAR_BEGIN`         | Start of wrapped variable | `${`                                                               |
| `VAR_END`           | End of wrapped variable   | `}`                                                                |
| `SET`               | Set directive             | `#set`                                                             |
| `IF`                | If directive              | `#if`                                                              |
| `ELSEIF`            | Else if directive         | `#elseif`                                                          |
| `ELSE`              | Else directive            | `#else`                                                            |
| `END`               | End directive             | `#end`                                                             |
| `FOREACH`           | Foreach directive         | `#foreach`                                                         |
| `BREAK`             | Break directive           | `#break`                                                           |
| `DEFINE`            | Define directive          | `#define`                                                          |
| `MACRO`             | Macro directive           | `#macro`                                                           |
| `NOESCAPE`          | Noescape directive        | `#noescape`                                                        |
| `MACRO_BODY`        | Macro body marker         | `#@`                                                               |
| `PARENTHESIS`       | Opening parenthesis       | `(`                                                                |
| `CLOSE_PARENTHESIS` | Closing parenthesis       | `)`                                                                |
| `BRACKET`           | Opening bracket           | `[`                                                                |
| `CLOSE_BRACKET`     | Closing bracket           | `]`                                                                |
| `MAP_BEGIN`         | Start of map              | `{`                                                                |
| `MAP_END`           | End of map                | `}`                                                                |
| `MAP_SPLIT`         | Map key-value separator   | `:`                                                                |
| `DOT`               | Property accessor         | `.`                                                                |
| `COMMA`             | Argument separator        | `,`                                                                |
| `EQUAL`             | Assignment operator       | `=`                                                                |
| `IN`                | In keyword for foreach    | `in`                                                               |
| `INTEGER`           | Integer number            | `123`                                                              |
| `DECIMAL_POINT`     | Decimal point             | `.`                                                                |
| `STRING`            | String in single quotes   | `'string'`                                                         |
| `EVAL_STRING`       | String in double quotes   | `"string"`                                                         |
| `BOOL`              | Boolean literal           | `true`, `false`, `null`                                            |
| `RANGE`             | Range operator            | `..`                                                               |
| `SPACE`             | Significant whitespace    | ` `                                                                |
| Operators           | Various operators         | `+`, `-`, `*`, `/`, `%`, `==`, `!=`, `>`, `<`, `>=`, `<=`, `&&`, ` |     | `, `!` |

## 4. Current AST Examples

### Variable Reference

```javascript
// Template: $customer.Address
{
  id: 'customer',
  prue: true,
  type: 'references',
  path: [{ type: 'property', id: 'Address' }],
  leader: '$',
  pos: { first_line: 1, last_line: 1, first_column: 0, last_column: 17 }
}
```

### If Statement

```javascript
// Template: #if($condition)content#end
[
  [
    {
      type: 'if',
      condition: {
        type: 'references',
        id: 'condition',
        leader: '$',
      },
      pos: { first_line: 1, first_column: 0, last_line: 1, last_column: 16 },
    },
    'content',
  ],
];
```

### Foreach Loop

```javascript
// Template: #foreach($item in $items)$item#end
[
  [
    {
      type: 'foreach',
      to: 'item',
      from: {
        type: 'references',
        id: 'items',
        leader: '$',
      },
      pos: { first_line: 1, first_column: 0, last_line: 1, last_column: 28 },
    },
    {
      type: 'references',
      id: 'item',
      leader: '$',
      prue: true,
    },
  ],
];
```

## 5. Key Challenges for Migration

Based on the analysis, the following challenges must be addressed during migration:

1. **State Management**

   - Chevrotain uses a different approach to lexer modes compared to Jison
   - Need to recreate the state transitions properly

2. **Nested Block Handling**

   - Current implementation uses post-processing for nested blocks
   - May need a more grammar-integrated approach in Chevrotain

3. **Error Reporting**

   - Improving error messages and recovery strategies
   - Maintaining source position information

4. **Maintaining Compatibility**

   - Ensuring the new parser produces identical AST structures
   - Supporting all edge cases handled by the current parser

5. **Performance Considerations**
   - Optimizing lexer patterns for Chevrotain
   - Efficient handling of large templates

These challenges will be addressed in the design and implementation phases of the migration plan.
