# Expression and Operator Support in Velocity.js

## Current Status Summary

| Feature                                 | Lexical Support | Parser Support | Visitor Support | Test Coverage          |
| --------------------------------------- | --------------- | -------------- | --------------- | ---------------------- | --- | ---------------------- |
| Content parsing                         | ✅              | ✅             | ✅              | ✅                     |
| Variable references                     | ✅              | ✅             | ✅              | ✅                     |
| Property access                         | ✅              | ✅             | ✅              | ✅                     |
| Equality operator (==)                  | ✅              | ✅             | ✅              | ✅                     |
| Comparison operators (!=, >, <, >=, <=) | ✅              | ❌             | ❌              | ✅ (tokenization only) |
| Logical operators (&&,                  |                 | , !)           | ✅              | ❌                     | ❌  | ✅ (tokenization only) |
| Arithmetic operators (+, -, \*, /, %)   | ✅              | ❌             | ❌              | ✅ (tokenization only) |
| Method calls                            | ❌              | ❌             | ❌              | ❌                     |

## Lexical Support (Tokenization)

The following operators are now recognized by the lexer:

### Comparison Operators

- [x] Equal (`==`) - Recognized as two separate Equal tokens (fully supported in parser)
- [x] NotEqual (`!=`)
- [x] GreaterThan (`>`)
- [x] LessThan (`<`)
- [x] GreaterThanEqual (`>=`)
- [x] LessThanEqual (`<=`)

### Logical Operators

- [x] And (`&&`)
- [x] Or (`||`)
- [x] Bang (`!`) - Recognized but with limitations in certain contexts

### Arithmetic Operators

- [x] Plus (`+`)
- [x] Minus (`-`)
- [x] Multiply (`*`)
- [x] Divide (`/`)
- [x] Modulo (`%`)

## Parser Support

The parser currently only supports the following operations fully:

- [x] Content parsing and recognition
- [x] Variable references (simple and formal)
- [x] Property access
- [x] Equality comparison (==) in if conditions

## String Literal Handling

A notable difference between Jison and Chevrotain implementations:

- **Jison AST:** String literals are stored without quotes (e.g., `test`)
- **Chevrotain AST:** String literals currently retain their quotes (e.g., `"test"`)

This difference is acknowledged in tests but will need to be addressed for complete compatibility.

## Known Limitations

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

### 1. Complete Parser Rules for Comparison Operators

The immediate next task is to implement parser rules for the remaining comparison operators:

1. Not equal (`!=`)
2. Greater than (`>`)
3. Less than (`<`)
4. Greater than or equal (`>=`)
5. Less than or equal (`<=`)

For each operator:

- Update the `comparisonCondition` rule in the parser to handle the operator
- Modify the visitor method to correctly translate the CST to AST
- Update tests to verify correct parsing

### 2. Implement Logical Operator Support

Once comparison operators are implemented, we'll add support for logical operators:

- NOT (`!`) - Unary logical operator
- AND (`&&`) - Binary logical operator with higher precedence
- OR (`||`) - Binary logical operator with lower precedence

### 3. Implement Arithmetic Operator Support

After logical operators, we'll implement arithmetic operators in order of precedence:

- Multiplicative operators (`*`, `/`, `%`) - Higher precedence
- Additive operators (`+`, `-`) - Lower precedence

### 4. String Literal Handling

Address the string literal formatting difference:

- Either strip quotes in the Chevrotain visitor
- Or update runtime code to handle both formats

## Testing Strategy

For each operator implementation:

1. Verify lexical recognition (already done)
2. Test parser grammar rule functionality
3. Compare generated AST with Jison parser output
4. Ensure the visitor correctly converts CST to AST
