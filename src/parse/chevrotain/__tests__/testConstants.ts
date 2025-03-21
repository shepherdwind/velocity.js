/**
 * Constants and sample data for Velocity parser tests
 */

/**
 * Sample templates used in multiple test cases
 */
export const SAMPLE_TEMPLATES = {
  // Simple content
  SIMPLE_CONTENT: 'Hello world',

  // Variable references
  SIMPLE_VARIABLE: 'Hello $name',
  FORMAL_VARIABLE: 'Hello ${name}',
  VARIABLE_WITH_PROPERTY: '$user.name',

  // Set directive
  SET_DIRECTIVE: '#set($name = "John")',
  SET_WITH_NUMBER: '#set($value = 10)',
  SET_WITH_VARIABLE: '#set($result = $value)',

  // If directive
  SIMPLE_IF: '#if($condition)',
  IF_WITH_EQUALITY: '#if($value == "test")',
  IF_WITH_NOT_EQUAL: '#if($value != "test")',
  IF_WITH_GREATER_THAN: '#if($count > 10)',
  IF_WITH_LESS_THAN: '#if($price < 100)',
  IF_WITH_GREATER_EQUAL: '#if($value >= 10)',
  IF_WITH_LESS_EQUAL: '#if($value <= 20)',

  // Foreach directive
  SIMPLE_FOREACH: '#foreach($item in $items)',

  // Arithmetic expressions
  ADDITION: '#set($result = $value + 10)',
  SUBTRACTION: '#set($result = $value - 5)',
  MULTIPLICATION: '#set($result = $value * 2)',
  DIVISION: '#set($result = $value / 4)',
  MODULO: '#set($result = $value % 3)',

  // Logical operations
  LOGICAL_AND: '#if($value > 5 && $value < 20)',
  LOGICAL_OR: '#if($value < 5 || $value > 20)',

  // Complex expressions
  COMPLEX_EXPRESSION: '#if(($value > 10 && $value < 20) || $special == true)',

  // Combined template
  COMBINED: 'Hello $user! #if($role == "admin") Welcome, admin. #end',
};

/**
 * Tokens that should be present in different expressions
 */
export const EXPECTED_TOKENS = {
  VARIABLE_REFERENCE: ['Dollar', 'Id'],
  COMPARISON_OPERATORS: {
    EQUAL: ['Equal', 'Equal'],
    NOT_EQUAL: ['NotEqual'],
    GREATER_THAN: ['GreaterThan'],
    LESS_THAN: ['LessThan'],
    GREATER_THAN_EQUAL: ['GreaterThanEqual'],
    LESS_THAN_EQUAL: ['LessThanEqual'],
  },
  ARITHMETIC_OPERATORS: {
    PLUS: ['Plus'],
    MINUS: ['Minus'],
    MULTIPLY: ['Multiply'],
    DIVIDE: ['Divide'],
    MODULO: ['Modulo'],
  },
  LOGICAL_OPERATORS: {
    AND: ['And'],
    OR: ['Or'],
    NOT: ['Bang'],
  },
  DIRECTIVE_TOKENS: {
    HASH: ['Hash'],
    IF: ['If'],
    SET: ['Set'],
    FOREACH: ['ForEach'],
    END: ['End'],
    ELSE: ['Else'],
    ELSEIF: ['ElseIf'],
  },
};

/**
 * Expected AST structure patterns for different expressions
 */
export const AST_PATTERNS = {
  VARIABLE_REFERENCE: {
    type: 'references',
    id: 'name',
    prue: true,
  },
  FORMAL_REFERENCE: {
    type: 'references',
    id: 'name',
    isWraped: true,
  },
  PROPERTY_ACCESS: {
    type: 'references',
    id: 'user',
    path: [{ type: 'property', id: 'name' }],
  },
  IF_CONDITION: {
    type: 'if',
    condition: { type: 'math' },
  },
  SET_DIRECTIVE: {
    type: 'set',
    equal: [{ type: 'references' }, { type: 'string' }],
  },
  FOREACH_DIRECTIVE: {
    type: 'foreach',
    to: 'item',
    from: { type: 'references' },
  },
};
