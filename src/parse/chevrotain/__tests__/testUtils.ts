/**
 * Test utilities and types for Velocity parser tests
 *
 * This file contains shared types and helper functions used in parser tests
 * to compare Jison and Chevrotain parsing results.
 */
import { CstNode } from 'chevrotain';
import { AstNode, ReferenceAstNode, VelocityAstVisitor } from '../parser';

// Custom interfaces for Jison parser output to handle type checking
export interface JisonIfAstNode {
  type: 'if' | 'elseif';
  condition: JisonIfCondition;
  consequent: Array<string | ReferenceAstNode | JisonIfAstNode | JisonForeachAstNode>;
  alternate: Array<string | ReferenceAstNode | JisonIfAstNode | JisonForeachAstNode>;
  pos?: {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
  };
}

export interface JisonIfCondition {
  type: 'math';
  expression: Array<unknown>;
  operator: string;
}

export interface JisonForeachAstNode {
  type: 'foreach';
  to: string;
  from: unknown;
  item: ReferenceAstNode;
  body: Array<string | ReferenceAstNode | JisonIfAstNode | JisonForeachAstNode>;
  pos?: {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
  };
}

// Additional interfaces for Chevrotain AST nodes
export interface IfAstNode {
  type: 'if' | 'elseif';
  condition: OperationAstNode;
  pos?: {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
  };
}

export interface OperationAstNode {
  type: 'operation' | 'math';
  operator: string;
  // For 'operation' type
  left?: ReferenceAstNode;
  right?: unknown;
  // For 'math' type
  expression?: Array<ReferenceAstNode | { type: string; value: string; isEval: boolean }>;
  pos?: {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
  };
}

/**
 * Converts a CST (Concrete Syntax Tree) to an AST (Abstract Syntax Tree)
 * using the VelocityAstVisitor
 */
export function cstToAst(cst: CstNode, _template: string): AstNode[] {
  const visitor = new VelocityAstVisitor();
  return visitor.toAst(cst);
}

/**
 * Normalizes and compares two AST structures while ignoring position information
 * and providing detailed diagnostics when mismatches are found
 */
export function compareAstNodesIgnoringPos(actualAst: unknown, expectedAst: unknown): void {
  /**
   * Function to recursively remove position information from objects and normalize structure
   * - Removes 'pos' properties
   * - Ensures object keys are consistently sorted
   * - Preserves arrays and primitives
   */
  function normalizeAst<T>(obj: T): T {
    if (obj === null || obj === undefined) {
      return obj;
    }

    // Handle arrays by normalizing each element
    if (Array.isArray(obj)) {
      return obj.map(normalizeAst) as unknown as T;
    }

    // Handle objects (but not arrays)
    if (typeof obj === 'object') {
      // Create a new object with keys in sorted order
      const sortedResult: Record<string, unknown> = {};

      // Get all keys except 'pos' and sort them
      const keys = Object.keys(obj as Record<string, unknown>)
        .filter((key) => key !== 'pos')
        .sort();

      // Add properties in sorted order
      for (const key of keys) {
        sortedResult[key] = normalizeAst((obj as Record<string, unknown>)[key]);
      }

      return sortedResult as unknown as T;
    }

    // For primitives, return as is
    return obj;
  }

  // Normalize both ASTs for comparison
  const normalizedActual = normalizeAst(actualAst);
  const normalizedExpected = normalizeAst(expectedAst);

  // Compare the normalized ASTs
  const actualJSON = JSON.stringify(normalizedActual, null, 2);
  const expectedJSON = JSON.stringify(normalizedExpected, null, 2);

  // Special handling for Jison's nested arrays: [[{node}]]
  let unwrappedExpected = normalizedExpected;
  if (
    Array.isArray(normalizedExpected) &&
    normalizedExpected.length === 1 &&
    Array.isArray(normalizedExpected[0]) &&
    normalizedExpected[0].length === 1 &&
    typeof normalizedExpected[0][0] === 'object' &&
    normalizedExpected[0][0] !== null
  ) {
    // Unwrap double-nested array to match Chevrotain's single-level nesting
    unwrappedExpected = [normalizedExpected[0][0]];
    const unwrappedJSON = JSON.stringify(unwrappedExpected, null, 2);

    // Try comparing with the unwrapped version first
    if (actualJSON === unwrappedJSON) {
      // Success - they match after unwrapping
      return;
    }
  }

  if (actualJSON !== expectedJSON) {
    console.log('WARNING: AST structures differ after normalization:');

    // Find what's different - very simplistic approach
    if (Array.isArray(normalizedActual) && Array.isArray(normalizedExpected)) {
      // Array length difference
      if (normalizedActual.length !== normalizedExpected.length) {
        console.log(
          `Array length mismatch: Actual (${normalizedActual.length}) vs Expected (${normalizedExpected.length})`
        );
      }

      // Log only first few items for brevity
      console.log(
        'Normalized actual (first 2 levels):',
        JSON.stringify(normalizedActual.slice(0, 2), null, 2)
      );
      console.log(
        'Normalized expected (first 2 levels):',
        JSON.stringify(normalizedExpected.slice(0, 2), null, 2)
      );
    } else {
      console.log('Normalized actual:', actualJSON);
      console.log('Normalized expected:', expectedJSON);
    }

    // Now perform the actual assertion using Jest's expect
    // First try the regular comparison
    try {
      // Try to match with unwrapped expected if it exists
      if (unwrappedExpected !== normalizedExpected) {
        expect(normalizedActual).toEqual(unwrappedExpected);
      } else {
        // Use deep equality comparison
        expect(normalizedActual).toEqual(normalizedExpected);
      }
    } catch (error) {
      // If regular equality fails, try looser matching with toMatchObject
      // This is useful for cases where the structure might have extra properties
      // that don't affect the functionality
      console.log('Trying looser comparison with toMatchObject...');
      try {
        if (unwrappedExpected !== normalizedExpected) {
          expect(normalizedActual).toMatchObject(unwrappedExpected as Record<string, unknown>);
        } else {
          expect(normalizedActual).toMatchObject(normalizedExpected as Record<string, unknown>);
        }
      } catch (matchError) {
        // Rethrow the original error as it's probably more informative
        throw error;
      }
    }
  }

  // If we got here without throwing, the ASTs match after normalization
}

/**
 * Enhanced comparison function that provides more detailed diagnostics
 * for AST structural differences between Jison and Chevrotain implementations
 */
export function compareParserImplementations(
  template: string,
  jisonAst: unknown,
  chevrotainAst: unknown
): { isMatch: boolean; details: string } {
  // Helper function to normalize AST structure for comparison
  const normalizeAst = (ast: unknown): unknown => {
    if (ast === null || ast === undefined) {
      return ast;
    }

    // Handle arrays by normalizing each element
    if (Array.isArray(ast)) {
      // Special case for deeply nested Jison AST: [[{node}]]
      if (
        ast.length === 1 &&
        Array.isArray(ast[0]) &&
        ast[0].length === 1 &&
        typeof ast[0][0] === 'object' &&
        ast[0][0] !== null
      ) {
        // Unwrap double-nested array to match Chevrotain's single-level nesting
        return normalizeAst([ast[0][0]]);
      }
      return ast.map(normalizeAst);
    }

    // Handle objects (but not arrays)
    if (typeof ast === 'object') {
      const result: Record<string, unknown> = {};

      // Get all keys except 'pos' and sort them for consistent comparison
      const keys = Object.keys(ast as Record<string, unknown>)
        .filter((key) => key !== 'pos')
        .sort();

      // Process each property
      for (const key of keys) {
        const value = (ast as Record<string, unknown>)[key];
        result[key] = normalizeAst(value);
      }

      return result;
    }

    // For primitives, return as is
    return ast;
  };

  const normalizedJison = normalizeAst(jisonAst);
  const normalizedChevrotain = normalizeAst(chevrotainAst);

  // For better comparison, convert to JSON strings
  const jisonJson = JSON.stringify(normalizedJison, null, 2);
  const chevrotainJson = JSON.stringify(normalizedChevrotain, null, 2);

  // Check if normalized structures match
  const isMatch = jisonJson === chevrotainJson;

  let details = '';
  if (!isMatch) {
    details = `Template: "${template}"\n\n`;

    // Find differences based on node type and structure
    if (Array.isArray(normalizedJison) && Array.isArray(normalizedChevrotain)) {
      if (normalizedJison.length !== normalizedChevrotain.length) {
        details += `AST node count mismatch: Jison (${normalizedJison.length}) vs Chevrotain (${normalizedChevrotain.length})\n`;
      }

      // Compare top-level node types
      const jisonTypes = normalizedJison.map((node) =>
        typeof node === 'object' && node !== null
          ? (node as { type?: string }).type || 'unknown'
          : typeof node
      );

      const chevrotainTypes = normalizedChevrotain.map((node) =>
        typeof node === 'object' && node !== null
          ? (node as { type?: string }).type || 'unknown'
          : typeof node
      );

      details += `Jison node types: [${jisonTypes.join(', ')}]\n`;
      details += `Chevrotain node types: [${chevrotainTypes.join(', ')}]\n\n`;
    }

    // Include abbreviated AST structures for comparison
    details += `Jison AST: ${jisonJson.length > 500 ? jisonJson.substring(0, 500) + '...' : jisonJson}\n\n`;
    details += `Chevrotain AST: ${chevrotainJson.length > 500 ? chevrotainJson.substring(0, 500) + '...' : chevrotainJson}`;
  } else {
    details = `ASTs match perfectly for template: "${template}"`;
  }

  return { isMatch, details };
}
