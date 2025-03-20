# Velocity Template Engine Lexer State Machine Analysis

## Overview

This document provides a detailed analysis of the state machine used in the Velocity template engine's Jison lexer. Understanding the state transitions is critical for successfully migrating to Chevrotain, as we'll need to implement equivalent mode-based transitions.

## 1. State Definitions

The Jison lexer (`velocity.l`) defines several states to handle different contexts within a Velocity template:

| State     | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `INITIAL` | Default state for handling regular content                   |
| `mu`      | Handling variable references starting with `$`               |
| `h`       | Handling directives starting with `#`                        |
| `c`       | Handling expressions in parentheses (conditions, parameters) |
| `i`       | Handling array index expressions in brackets                 |
| `esc`     | Handling escaped characters                                  |
| `run`     | Handling method calls                                        |

## 2. State Transitions

### 2.1 State Machine Diagram

```
                     ┌────────────────────┐
                     │     INITIAL        │
                     │  (Default State)   │
                     └──────┬─────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 │                 ▼
┌─────────────────┐         │        ┌──────────────────┐
│       mu        │◄────────┘        │        h         │
│  ($ Variables)  │                  │  (# Directives)  │
└─────┬─────┬─────┘                  └────┬──────┬──────┘
      │     │                             │      │
      │     │                             │      │
      ▼     │                             │      ▼
┌──────────┐│                             │┌──────────┐
│   esc    ││                             ││   esc    │
│ (Escape) ││                             ││ (Escape) │
└──────────┘│                             │└──────────┘
            │                             │
            │         ┌──────────┐        │
            └────────►│    c     │◄───────┘
                      │(Parens)  │
                      └──┬────┬──┘
                         │    │
                         │    │
                         │    ▼
                         │ ┌──────────┐
                         │ │    i     │
                         │ │(Brackets)│
                         │ └──────────┘
                         │
                         ▼
                    ┌──────────┐
                    │   run    │
                    │(Methods) │
                    └──────────┘
```

### 2.2 Detailed State Transitions

#### From INITIAL State

| Trigger Pattern | Target State | Condition                                                             |
| --------------- | ------------ | --------------------------------------------------------------------- |
| `/[^#]*?/"$"/`  | `mu`         | When encountering `$` not preceded by an odd number of `\` characters |
| `/[^\$]*?/"#"/` | `h`          | When encountering `#` not preceded by an odd number of `\` characters |

#### From `mu` State (Variable Reference)

| Trigger Pattern | Target State                           | Condition                                                      |
| --------------- | -------------------------------------- | -------------------------------------------------------------- |
| `"{"[\s]*`      | Remains in `mu` with `yy.begin = true` | When a variable reference uses curly braces `${var}`           |
| `[\s]*"}"`      | INITIAL (popState)                     | When closing a curly brace variable, if `yy.begin` is true     |
| `"("`           | `c`                                    | When opening parentheses in a variable reference (method call) |
| `"["`           | `i`                                    | When opening brackets in a variable reference (index access)   |
| `"#"`           | `h`                                    | When encountering a directive after a variable                 |
| `.` or `\s+`    | INITIAL (popState)                     | For any other character (returning to regular content)         |

#### From `h` State (Directive)

| Trigger Pattern                    | Target State       | Condition                                              |
| ---------------------------------- | ------------------ | ------------------------------------------------------ |
| `"#"\*[\s\S]+?\*"#"`               | INITIAL (popState) | For multi-line comments `#*...*#`                      |
| `"#"\[\[[\s\S]+?\]\]"#"`           | INITIAL (popState) | For raw content blocks `#[[...]]#`                     |
| `"##"[^\n]*`                       | INITIAL (popState) | For single-line comments `##...`                       |
| `"else"`                           | INITIAL (popState) | For `#else` directive                                  |
| `"{else}"`                         | INITIAL (popState) | For `#{else}` directive                                |
| `"end"`                            | INITIAL (popState) | For `#end` directive                                   |
| `"{end}"`                          | INITIAL (popState) | For `#{end}` directive                                 |
| `"break"`                          | INITIAL (popState) | For `#break` directive                                 |
| `"#"/[a-zA-Z{]`                    | Remains in `h`     | For directive start                                    |
| `"("`                              | `c`                | When opening parentheses in a directive                |
| `[_a-zA-Z][a-zA-Z0-9_\-]*[ ]*/"("` | `run`              | For potential method calls in directive context        |
| `.` or `\s+`                       | INITIAL (popState) | For any other character (returning to regular content) |

#### From `c` State (Expressions in Parentheses)

| Trigger Pattern | Target State                   | Condition                                  |
| --------------- | ------------------------------ | ------------------------------------------ |
| `")"`           | Pop to previous state          | For closing parentheses                    |
| `"["`           | `i`                            | When opening brackets inside an expression |
| `"."`           | Remains in `c`                 | For property access or decimal points      |
| `","`           | Remains in `c`                 | For argument separators                    |
| `"("`           | `c` (pushes another `c` state) | For nested parentheses                     |

#### From `i` State (Index Expressions)

| Trigger Pattern | Target State          | Condition            |
| --------------- | --------------------- | -------------------- |
| `"]"`           | Pop to previous state | For closing brackets |
| `".."`          | Remains in `i`        | For range operator   |

#### From `esc` State (Escape Sequences)

| Trigger Pattern | Target State          | Condition                             |
| --------------- | --------------------- | ------------------------------------- |
| `[\$#]`         | Pop to previous state | After processing an escaped character |

#### From `run` State (Method Calls)

| Trigger Pattern | Target State                              | Condition                                                            |
| --------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| `")"`           | Check and potentially pop multiple states | When closing a method call, may need to pop to `h` or earlier states |

### 2.3 State Stack Management

The Jison lexer maintains a stack of states, allowing it to return to the appropriate context after processing nested elements. The key functions used are:

- `this.begin(state)`: Push a new state onto the stack
- `this.popState()`: Pop the top state from the stack and return to the previous one
- `this.topState([n])`: Access the nth state from the top without popping
- `this.stateStackSize()`: Get the current size of the state stack

### 2.4 Complex State Handling Examples

#### Example 1: Nested Method Call in Directive

For a template like: `#if($customer.getName().length > 0)`

State transitions:

1. INITIAL → `h` (encountering `#if`)
2. `h` → `c` (opening parenthesis after `#if`)
3. `c` → handles `$customer` variable reference
4. Processes `.getName()` as method call within `c`
5. Processes `.length > 0` remaining in `c`
6. `c` → `h` (closing parenthesis of the `#if` condition)
7. `h` → INITIAL (end of directive)

#### Example 2: Escaping Special Characters

For a template like: `\$customer will not be evaluated`

State transitions:

1. INITIAL → detects `\$` pattern
2. Determines this is an escape sequence (odd number of backslashes)
3. INITIAL → `esc` (to handle the escape)
4. `esc` → INITIAL (after processing the escape)
5. Continues as regular content

#### Example 3: Complex Nested Structure

For a template like: `#foreach($item in $items)#if($item.active)$item.name#end#end`

State transitions:

1. INITIAL → `h` (encountering `#foreach`)
2. `h` → `c` (opening parenthesis)
3. `c` → processes `$item in $items`
4. `c` → `h` (closing parenthesis)
5. `h` → INITIAL (end of `#foreach` directive)
6. INITIAL → `h` (encountering `#if`)
7. `h` → `c` (opening parenthesis)
8. `c` → processes `$item.active`
9. `c` → `h` (closing parenthesis)
10. `h` → INITIAL (end of `#if` directive)
11. INITIAL → `mu` (encountering `$item.name`)
12. `mu` → INITIAL (end of `$item.name`)
13. INITIAL → `h` (encountering `#end` for `#if`)
14. `h` → INITIAL (end of `#end` directive)
15. INITIAL → `h` (encountering `#end` for `#foreach`)
16. `h` → INITIAL (end of `#end` directive)

## 3. Special Handling Logic

### 3.1 Escape Sequence Handling

The lexer uses this pattern to detect escape sequences:

```
var _reg = /\\+$/;
var _esc = yytext.match(_reg);
var _num = _esc ? _esc[0].length: null;
```

It then decides whether to interpret `$` or `#` as escaped:

```
if (!_num || !(_num % 2)) {
  this.begin("mu"); // or "h" for #
} else {
  yytext = yytext.replace(/\\$/, '');
  this.begin('esc');
}
```

### 3.2 Nested State Resolution

The parser uses complex logic to handle nested states, especially for method calls and parenthesized expressions:

```javascript
if (this.popState() === 'c') {
  var len = this.stateStackSize();

  if (this.topState() === 'run') {
    this.popState();
    len = len - 1;
  }

  var tailStack = this.topState(len - 2);

  // End state h after encountering #set(a = b) parenthesis closure
  if (len === 2 && tailStack === 'h') {
    this.popState();
  } else if (len === 3 && tailStack === 'mu' && this.topState(len - 3) === 'h') {
    // issue#7 $foo#if($a)...#end
    this.popState();
    this.popState();
  }

  return 'CLOSE_PARENTHESIS';
}
```

This logic ensures that the parser returns to the correct state after processing nested expressions.

## 4. Implementing in Chevrotain

In Chevrotain, we'll need to:

1. **Define Multiple Lexer Modes**:

   - Create equivalent modes for each Jison state
   - Define tokens specific to each mode

2. **Implement Mode Transitions**:

   - Use Chevrotain's `pop_mode()` and `push_mode()` instead of Jison's state stack
   - Track additional state in custom properties if needed

3. **Handle Custom Logic**:

   - Implement custom token patterns for escape sequences
   - Create custom token matchers for complex transitions

4. **State Tracking**:
   - Maintain a similar state stack or use Chevrotain's built-in mode stack
   - Track additional context (like `yy.begin`) in the lexer object

### 4.1 Example Chevrotain Implementation for Escape Handling:

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

### 4.2 Example Chevrotain Implementation for State Transitions:

```typescript
// In the lexer definition
const VelocityLexer = new Lexer({
  // Default mode tokens
  defaultMode: 'INITIAL',
  modes: {
    INITIAL: [
      WhiteSpace,
      PotentialEscapedDollar,
      PotentialEscapedHash,
      // ... other tokens
    ],
    mu: [
      // Variable mode tokens
      VarBegin,
      VarEnd,
      // ... other tokens
    ],
    h: [
      // Directive mode tokens
      // ... tokens
    ],
    // ... other modes
  },
});

// In the token definitions
const Dollar = createToken({
  name: 'DOLLAR',
  pattern: /\$/,
  push_mode: 'mu', // Equivalent to this.begin("mu") in Jison
});

const Hash = createToken({
  name: 'HASH',
  pattern: /#/,
  push_mode: 'h', // Equivalent to this.begin("h") in Jison
});

const CloseParenthesis = createToken({
  name: 'CLOSE_PARENTHESIS',
  pattern: /\)/,
  pop_mode: true, // Equivalent to this.popState() in Jison
});
```

## 5. Key Test Cases for State Transitions

To validate our implementation, we need test cases that exercise the state machine thoroughly:

### 5.1 Basic State Transitions

```
#set($var = "value")           // INITIAL → h → c → INITIAL
$customer.name                 // INITIAL → mu → INITIAL
$customer.getName()            // INITIAL → mu → c → INITIAL
$customer["property"]          // INITIAL → mu → i → INITIAL
```

### 5.2 Nested States

```
#if($customer.orders.size() > 10)  // Multiple nested property/method accesses
#foreach($item in $items[$idx])    // Index inside foreach
$customer.getAddress()["street"]   // Method call followed by index
```

### 5.3 Escape Sequences

```
\$notVariable                 // Escaped $ should not enter mu state
\\$stillVariable              // Double backslash doesn't escape $
\#notDirective                // Escaped # should not enter h state
```

### 5.4 Complex Nesting

```
#if($customer && $customer.orders.size() > 0 && $customer.status == "active")
  #foreach($order in $customer.orders)
    $order.id: $order.total
  #end
#end
```

### 5.5 Edge Cases

```
$var#if($x)nested#end         // Variable followed by directive
#{else}                        // Directive in braces
#@macroName($param)           // Macro body syntax
#[[This is raw content with $vars and #directives that shouldn't be processed]]#
```

## 6. Implementation Challenges

1. **Context Tracking**:

   - Jison tracks context variables like `yy.begin`
   - Will need equivalent tracking in Chevrotain

2. **Complex State Returns**:

   - Jison can navigate the state stack arbitrarily
   - Chevrotain's mode stack is strictly LIFO (Last In, First Out)

3. **State-Based Token Recognition**:

   - Jison can use different patterns for the same token in different states
   - Chevrotain uses mode-specific token lists

4. **Performance Considerations**:
   - Jison's generated lexer is highly optimized
   - May need to optimize Chevrotain implementation for large templates

These challenges will be specifically addressed in the implementation phases of our migration plan.
