/**
 * Unit tests for the Velocity lexer
 *
 * Tests the basic tokenization capabilities.
 */
import {
  createVelocityLexer,
  getLexerCurrentState,
  tokenizeVelocityTemplate,
  VelocityLexer,
} from '../index';
import { IToken } from 'chevrotain';

describe('Velocity Lexer', () => {
  let lexer: VelocityLexer;

  beforeEach(() => {
    lexer = createVelocityLexer();
  });

  // Basic Content Tests
  describe('Content Tokenization', () => {
    test('should tokenize simple content', () => {
      const result = tokenizeVelocityTemplate('Hello world', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(1);
      expect(result.tokens[0].tokenType.name).toBe('Content');
      expect(result.tokens[0].image).toBe('Hello world');
    });

    test('should tokenize content with line breaks', () => {
      const result = tokenizeVelocityTemplate('Hello\nworld', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(1);
      expect(result.tokens[0].tokenType.name).toBe('Content');
      expect(result.tokens[0].image).toBe('Hello\nworld');
    });

    test('should tokenize content with special characters', () => {
      const result = tokenizeVelocityTemplate('Hello_world-123', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(1);
      expect(result.tokens[0].tokenType.name).toBe('Content');
      expect(result.tokens[0].image).toBe('Hello_world-123');
    });
  });

  // Variable Reference Tests
  describe('Variable Reference Tokenization', () => {
    test('should tokenize simple variable reference', () => {
      const result = tokenizeVelocityTemplate('Hello $name', lexer);

      expect(result.errors).toHaveLength(0);

      // Should have Content, Dollar, Id tokens
      expect(result.tokens).toHaveLength(3);
      expect(result.tokens[0].tokenType.name).toBe('Content');
      expect(result.tokens[0].image).toBe('Hello ');

      expect(result.tokens[1].tokenType.name).toBe('Dollar');
      expect(result.tokens[1].image).toBe('$');

      expect(result.tokens[2].tokenType.name).toBe('Id');
      expect(result.tokens[2].image).toBe('name');

      // Verify state tracking is working
      const state = getLexerCurrentState(lexer);
      // Should be back to initial state
      expect(state.currentMode()).toBe('INITIAL');
    });

    test('should tokenize formal reference', () => {
      const result = tokenizeVelocityTemplate('Hello ${name}', lexer);

      expect(result.errors).toHaveLength(0);

      // Should have Content, Dollar, OpenCurly, Id, CloseCurly tokens
      expect(result.tokens).toHaveLength(5);
      expect(result.tokens[0].tokenType.name).toBe('Content');
      expect(result.tokens[0].image).toBe('Hello ');

      expect(result.tokens[1].tokenType.name).toBe('Dollar');
      expect(result.tokens[1].image).toBe('$');

      expect(result.tokens[2].tokenType.name).toBe('OpenCurly');
      expect(result.tokens[2].image).toBe('{');

      expect(result.tokens[3].tokenType.name).toBe('Id');
      expect(result.tokens[3].image).toBe('name');

      expect(result.tokens[4].tokenType.name).toBe('CloseCurly');
      expect(result.tokens[4].image).toBe('}');

      // Verify state tracking is working
      const state = getLexerCurrentState(lexer);
      // Should be back to initial state
      expect(state.currentMode()).toBe('INITIAL');
    });

    test('should tokenize variable reference with property access', () => {
      const result = tokenizeVelocityTemplate('$user.name', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(4);
      expect(result.tokens[0].tokenType.name).toBe('Dollar');
      expect(result.tokens[1].tokenType.name).toBe('Id');
      expect(result.tokens[1].image).toBe('user');
      expect(result.tokens[2].tokenType.name).toBe('Dot');
      expect(result.tokens[3].tokenType.name).toBe('Id');
      expect(result.tokens[3].image).toBe('name');
    });

    test('should tokenize formal reference with property access', () => {
      const result = tokenizeVelocityTemplate('${user.name}', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(6);
      expect(result.tokens[0].tokenType.name).toBe('Dollar');
      expect(result.tokens[1].tokenType.name).toBe('OpenCurly');
      expect(result.tokens[2].tokenType.name).toBe('Id');
      expect(result.tokens[2].image).toBe('user');
      expect(result.tokens[3].tokenType.name).toBe('Dot');
      expect(result.tokens[4].tokenType.name).toBe('Id');
      expect(result.tokens[4].image).toBe('name');
      expect(result.tokens[5].tokenType.name).toBe('CloseCurly');
    });

    test('should tokenize multiple nested property access', () => {
      const result = tokenizeVelocityTemplate('$user.address.street', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(6);
      expect(result.tokens[0].tokenType.name).toBe('Dollar');
      expect(result.tokens[1].tokenType.name).toBe('Id');
      expect(result.tokens[1].image).toBe('user');
      expect(result.tokens[2].tokenType.name).toBe('Dot');
      expect(result.tokens[3].tokenType.name).toBe('Id');
      expect(result.tokens[3].image).toBe('address');
      expect(result.tokens[4].tokenType.name).toBe('Dot');
      expect(result.tokens[5].tokenType.name).toBe('Id');
      expect(result.tokens[5].image).toBe('street');
    });
  });

  // Directive Tests
  describe('Directive Tokenization', () => {
    test('should tokenize #set directive', () => {
      const template = '#set($name = value)';
      const result = lexer.tokenize(template);
      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(7);
      expect(result.tokens[0].tokenType.name).toBe('Hash');
      expect(result.tokens[1].tokenType.name).toBe('Set');
      expect(result.tokens[2].tokenType.name).toBe('OpenParen');
      expect(result.tokens[3].tokenType.name).toBe('Dollar');
      expect(result.tokens[4].tokenType.name).toBe('Id');
      expect(result.tokens[5].tokenType.name).toBe('Equal');
      expect(result.tokens[6].tokenType.name).toBe('Content');
    });

    test('should tokenize #if directive', () => {
      const template = '#if($name == "value")';
      const result = lexer.tokenize(template);
      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(8);
      expect(result.tokens[0].tokenType.name).toBe('Hash');
      expect(result.tokens[1].tokenType.name).toBe('If');
      expect(result.tokens[2].tokenType.name).toBe('OpenParen');
      expect(result.tokens[3].tokenType.name).toBe('Dollar');
      expect(result.tokens[4].tokenType.name).toBe('Id');
      expect(result.tokens[5].tokenType.name).toBe('Equal');
      expect(result.tokens[6].tokenType.name).toBe('Equal');
      expect(result.tokens[7].tokenType.name).toBe('StringLiteral');
    });

    test('should tokenize #foreach directive', () => {
      const result = tokenizeVelocityTemplate('#foreach($item in $items)', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(8);
      expect(result.tokens[0].tokenType.name).toBe('Hash');
      expect(result.tokens[1].tokenType.name).toBe('ForEach');
      expect(result.tokens[2].tokenType.name).toBe('OpenParen');
      expect(result.tokens[3].tokenType.name).toBe('Dollar');
      expect(result.tokens[4].tokenType.name).toBe('Id');
      expect(result.tokens[4].image).toBe('item');
      expect(result.tokens[5].tokenType.name).toBe('In');
      expect(result.tokens[6].tokenType.name).toBe('Dollar');
      expect(result.tokens[7].tokenType.name).toBe('Id');
      expect(result.tokens[7].image).toBe('items');
    });

    test('should tokenize #end directive', () => {
      const result = tokenizeVelocityTemplate('#end', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(2);
      expect(result.tokens[0].tokenType.name).toBe('Hash');
      expect(result.tokens[1].tokenType.name).toBe('End');
    });
  });

  // Combined Tests
  describe('Combined Tokenization', () => {
    test('should tokenize a complex template with multiple constructs', () => {
      const template = `
        #if($user)
          Hello, $user.name!
          #foreach($item in $items)
            - $item
          #end
        #else
          Please log in.
        #end
      `;

      const result = tokenizeVelocityTemplate(template, lexer);

      expect(result.errors).toHaveLength(0);

      // Check for key tokens (not all)
      const tokenNames = result.tokens.map((t: IToken) => t.tokenType.name);

      // Verify we have the expected directives
      expect(tokenNames).toContain('Hash');
      expect(tokenNames).toContain('If');
      expect(tokenNames).toContain('ForEach');
      expect(tokenNames).toContain('Else');
      expect(tokenNames).toContain('End');

      // Verify we have variable references
      expect(tokenNames).toContain('Dollar');
      expect(tokenNames).toContain('Id');

      // Verify we have content
      expect(tokenNames).toContain('Content');
    });

    test('should tokenize adjacent variable references', () => {
      const result = tokenizeVelocityTemplate('$first$second', lexer);

      expect(result.errors).toHaveLength(0);
      expect(result.tokens).toHaveLength(4);
      expect(result.tokens[0].tokenType.name).toBe('Dollar');
      expect(result.tokens[1].tokenType.name).toBe('Id');
      expect(result.tokens[1].image).toBe('first');
      expect(result.tokens[2].tokenType.name).toBe('Dollar');
      expect(result.tokens[3].tokenType.name).toBe('Id');
      expect(result.tokens[3].image).toBe('second');
    });

    test('should tokenize mixed content and variables', () => {
      const result = tokenizeVelocityTemplate('Hello $name, your score is $score!', lexer);

      expect(result.errors).toHaveLength(0);

      // Check specific tokens
      expect(result.tokens[0].tokenType.name).toBe('Content');
      expect(result.tokens[0].image).toBe('Hello ');

      expect(result.tokens[1].tokenType.name).toBe('Dollar');
      expect(result.tokens[2].tokenType.name).toBe('Id');
      expect(result.tokens[2].image).toBe('name');

      expect(result.tokens[3].tokenType.name).toBe('Content');
      expect(result.tokens[3].image).toBe(', your score is ');

      expect(result.tokens[4].tokenType.name).toBe('Dollar');
      expect(result.tokens[5].tokenType.name).toBe('Id');
      expect(result.tokens[5].image).toBe('score');

      expect(result.tokens[6].tokenType.name).toBe('Content');
      expect(result.tokens[6].image).toBe('!');
    });
  });
});
