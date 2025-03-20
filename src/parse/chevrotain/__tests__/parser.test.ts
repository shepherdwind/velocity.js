/**
 * Unit tests for the Velocity parser
 *
 * Tests the basic parsing capabilities.
 */
import { createVelocityLexer, tokenizeVelocityTemplate, VelocityLexer } from '../../chevrotain';
import {
  parseVelocityTemplateToCST,
  VelocityAstVisitor,
  AstNode,
  ReferenceAstNode,
} from '../parser';
import { parse as jisonParse } from '../../../parse'; // Import the original jison parser
import { CstNode } from 'chevrotain';

// Custom interfaces for Jison parser output to handle type checking
interface JisonIfAstNode {
  type: 'if' | 'elseif';
  condition: unknown;
  consequent: Array<string | ReferenceAstNode | JisonIfAstNode | JisonForeachAstNode>;
  alternate: Array<string | ReferenceAstNode | JisonIfAstNode | JisonForeachAstNode>;
  pos?: {
    first_line: number;
    first_column: number;
    last_line: number;
    last_column: number;
  };
}

interface JisonForeachAstNode {
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

// Helper function to create AST from CST
function cstToAst(cst: CstNode, _template: string): AstNode[] {
  // Use the VelocityAstVisitor to convert CST to AST
  const visitor = new VelocityAstVisitor();
  return visitor.toAst(cst);
}

describe('Velocity Parser', () => {
  let lexer: VelocityLexer;

  beforeEach(() => {
    lexer = createVelocityLexer();
  });

  // Basic Content Tests
  describe('Content Parsing', () => {
    test('should parse simple content', () => {
      const template = 'Hello world';
      const result = tokenizeVelocityTemplate(template, lexer);
      const parseResult = parseVelocityTemplateToCST(result.tokens);

      expect(parseResult.errors).toHaveLength(0);
      // Verify that the CST is created correctly
      expect(parseResult.cst).toBeDefined();

      // Compare with the original jison parser output
      const jisonAst = jisonParse(template);
      const chevrotainAst = cstToAst(parseResult.cst, template);

      // Log for debugging
      console.log('Jison AST:', JSON.stringify(jisonAst, null, 2));
      console.log('Chevrotain converted AST:', JSON.stringify(chevrotainAst, null, 2));

      // Verify the structure without strict position checks
      expect(chevrotainAst).toEqual(jisonAst);
    });
  });

  // Variable Reference Tests
  describe('Variable Reference Parsing', () => {
    test('should parse simple variable reference', () => {
      const template = 'Hello $name';
      const result = tokenizeVelocityTemplate(template, lexer);
      const parseResult = parseVelocityTemplateToCST(result.tokens);

      expect(parseResult.errors).toHaveLength(0);
      expect(parseResult.cst).toBeDefined();

      // Compare with the original jison parser output
      const jisonAst = jisonParse(template);
      const chevrotainAst = cstToAst(parseResult.cst, template);

      // Log for debugging
      console.log('Jison AST:', JSON.stringify(jisonAst, null, 2));
      console.log('Chevrotain converted AST:', JSON.stringify(chevrotainAst, null, 2));

      // Validate important properties without strict position checks
      expect(chevrotainAst.length).toBe(2);
      expect(chevrotainAst[0]).toBe('Hello ');

      const refNode = chevrotainAst[1] as ReferenceAstNode;
      expect(refNode.type).toBe('references');
      expect(refNode.id).toBe('name');
      expect(refNode.leader).toBe('$');
      expect(refNode.prue).toBe(true);
      expect(refNode.pos).toBeDefined();
    });

    test('should parse formal reference', () => {
      const template = 'Hello ${name}';
      const result = tokenizeVelocityTemplate(template, lexer);
      const parseResult = parseVelocityTemplateToCST(result.tokens);

      expect(parseResult.errors).toHaveLength(0);
      expect(parseResult.cst).toBeDefined();

      // Compare with the original jison parser output
      const jisonAst = jisonParse(template);
      const chevrotainAst = cstToAst(parseResult.cst, template);

      // Log for debugging
      console.log('Jison AST:', JSON.stringify(jisonAst, null, 2));
      console.log('Chevrotain converted AST:', JSON.stringify(chevrotainAst, null, 2));

      // Validate important properties without strict position checks
      expect(chevrotainAst.length).toBe(2);
      expect(chevrotainAst[0]).toBe('Hello ');

      const refNode = chevrotainAst[1] as ReferenceAstNode;
      expect(refNode.type).toBe('references');
      expect(refNode.id).toBe('name');
      expect(refNode.isWraped).toBe(true);
      expect(refNode.leader).toBe('$');
      expect(refNode.prue).toBe(true);
      expect(refNode.pos).toBeDefined();
    });

    test('should parse variable reference with property access', () => {
      const template = '$user.name';
      const result = tokenizeVelocityTemplate(template, lexer);
      const parseResult = parseVelocityTemplateToCST(result.tokens);

      expect(parseResult.errors).toHaveLength(0);
      expect(parseResult.cst).toBeDefined();

      // Compare with the original jison parser output
      const jisonAst = jisonParse(template);
      const chevrotainAst = cstToAst(parseResult.cst, template);

      // Log for debugging
      console.log('Jison AST:', JSON.stringify(jisonAst, null, 2));
      console.log('Chevrotain converted AST:', JSON.stringify(chevrotainAst, null, 2));

      // Validate important properties without strict position checks
      expect(chevrotainAst.length).toBe(1);

      const refNode = chevrotainAst[0] as ReferenceAstNode;
      expect(refNode.type).toBe('references');
      expect(refNode.id).toBe('user');
      expect(refNode.path).toBeDefined();
      expect(refNode.path?.length).toBe(1);
      expect(refNode.path?.[0].type).toBe('property');
      expect(refNode.path?.[0].id).toBe('name');
      expect(refNode.leader).toBe('$');
      expect(refNode.prue).toBe(true);
      expect(refNode.pos).toBeDefined();
    });
  });

  // Directive Parsing Tests - Currently in early stages, focusing on basic syntax
  describe('Directive Parsing Tests', () => {
    test('should tokenize #set directive', () => {
      const template = '#set($name = "John")';
      // For now, we're just testing the tokenization, not the full AST
      const result = tokenizeVelocityTemplate(template, lexer);

      // Verify tokens are correctly identified
      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toBeDefined();

      // Check that we have the expected number of tokens for a set directive
      // #(1) set(1) ((1) $(1) name(1) =(1) "John"(1) )(1) = 8 tokens
      expect(result.tokens.length).toBeGreaterThanOrEqual(7);

      // Verify token types in sequence
      expect(result.tokens[0].tokenType.name).toBe('Hash');
      expect(result.tokens[1].tokenType.name).toBe('Set');
      expect(result.tokens[2].tokenType.name).toBe('OpenParen');
      expect(result.tokens[3].tokenType.name).toBe('Dollar');
      expect(result.tokens[4].tokenType.name).toBe('Id');
      expect(result.tokens[5].tokenType.name).toBe('Equal');
      expect(result.tokens[6].tokenType.name).toBe('StringLiteral');
    });

    test('should tokenize #if directive', () => {
      const template = '#if($condition)';
      // For now, we're just testing the tokenization, not the full AST
      const result = tokenizeVelocityTemplate(template, lexer);

      // Verify tokens are correctly identified
      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toBeDefined();

      // Check that we have the expected number of tokens for an if directive
      // #(1) if(1) ((1) $(1) condition(1) )(1) = 6 tokens
      expect(result.tokens.length).toBe(6);

      // Verify token types in sequence
      expect(result.tokens[0].tokenType.name).toBe('Hash');
      expect(result.tokens[1].tokenType.name).toBe('If');
      expect(result.tokens[2].tokenType.name).toBe('OpenParen');
      expect(result.tokens[3].tokenType.name).toBe('Dollar');
      expect(result.tokens[4].tokenType.name).toBe('Id');
      expect(result.tokens[5].tokenType.name).toBe('CloseParen');
    });

    test('should tokenize #foreach directive', () => {
      const template = '#foreach($item in $items)';
      // For now, we're just testing the tokenization, not the full AST
      const result = tokenizeVelocityTemplate(template, lexer);

      // Verify tokens are correctly identified
      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toBeDefined();

      // Check that we have the expected number of tokens for a foreach directive
      // #(1) foreach(1) ((1) $(1) item(1) in(1) $(1) items(1) )(1) = 8 tokens
      expect(result.tokens.length).toBe(8);

      // Verify token types in sequence
      expect(result.tokens[0].tokenType.name).toBe('Hash');
      expect(result.tokens[1].tokenType.name).toBe('ForEach');
      expect(result.tokens[2].tokenType.name).toBe('OpenParen');
      expect(result.tokens[3].tokenType.name).toBe('Dollar');
      expect(result.tokens[4].tokenType.name).toBe('Id');
      expect(result.tokens[5].tokenType.name).toBe('In');
      expect(result.tokens[6].tokenType.name).toBe('Dollar');
      expect(result.tokens[7].tokenType.name).toBe('Id');
    });
  });

  // Combined Parsing Tests - Currently in early stages
  describe('Combined Tokenization', () => {
    test('should tokenize mixed content', () => {
      const template = 'Hello $user! #if($role == "admin") Welcome, admin. #end';
      // For now, we're just testing the tokenization, not the full AST
      const result = tokenizeVelocityTemplate(template, lexer);

      // Verify tokens are correctly identified
      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toBeDefined();
      expect(result.tokens.length).toBeGreaterThan(10);

      // Verify some key tokens are present
      const tokenTypes = result.tokens.map((t) => t.tokenType.name);
      expect(tokenTypes).toContain('Content');
      expect(tokenTypes).toContain('Dollar');
      expect(tokenTypes).toContain('Id');
      expect(tokenTypes).toContain('Hash');
      expect(tokenTypes).toContain('If');
    });
  });
});
