/**
 * Unit tests for the VelocityLexerState class
 *
 * Tests the functionality of the state machine implementation.
 */
import { VelocityLexerState, getLexerState, LexerWithState } from '../state';

describe('VelocityLexerState', () => {
  describe('Mode Stack Operations', () => {
    let state: VelocityLexerState;

    beforeEach(() => {
      state = new VelocityLexerState();
    });

    test('should initialize with INITIAL mode', () => {
      expect(state.currentMode()).toEqual('INITIAL');
      expect(state.stackSize()).toEqual(1);
    });

    test('should push and pop modes correctly', () => {
      state.pushMode('mu');
      expect(state.currentMode()).toEqual('mu');
      expect(state.stackSize()).toEqual(2);

      state.pushMode('i');
      expect(state.currentMode()).toEqual('i');
      expect(state.stackSize()).toEqual(3);

      expect(state.popMode()).toEqual('i');
      expect(state.currentMode()).toEqual('mu');
      expect(state.stackSize()).toEqual(2);

      expect(state.popMode()).toEqual('mu');
      expect(state.currentMode()).toEqual('INITIAL');
      expect(state.stackSize()).toEqual(1);
    });

    test('should not pop below INITIAL mode', () => {
      expect(state.currentMode()).toEqual('INITIAL');
      expect(state.popMode()).toEqual('INITIAL');
      expect(state.currentMode()).toEqual('INITIAL');
      expect(state.stackSize()).toEqual(1);
    });

    test('should peek at modes correctly', () => {
      state.pushMode('mu');
      state.pushMode('i');
      state.pushMode('c');

      expect(state.peekMode(0)).toEqual('c');
      expect(state.peekMode(1)).toEqual('i');
      expect(state.peekMode(2)).toEqual('mu');
      expect(state.peekMode(3)).toEqual('INITIAL');
      expect(state.peekMode(10)).toEqual('INITIAL'); // Out of bounds
    });

    test('should reset to initial state', () => {
      state.pushMode('mu');
      state.pushMode('i');
      state.setVar('test', 'value');

      state.reset();

      expect(state.currentMode()).toEqual('INITIAL');
      expect(state.stackSize()).toEqual(1);
      expect(state.hasVar('test')).toBeFalsy();
    });
  });

  describe('Context Variables', () => {
    let state: VelocityLexerState;

    beforeEach(() => {
      state = new VelocityLexerState();
    });

    test('should get, set, and check context variables', () => {
      // Initially empty
      expect(state.hasVar('test')).toBeFalsy();
      expect(state.getVar('test')).toBeUndefined();

      // Set and get variables
      state.setVar('stringVar', 'value');
      state.setVar('numberVar', 123);
      state.setVar('boolVar', true);
      state.setVar('nullVar', null);

      expect(state.hasVar('stringVar')).toBeTruthy();
      expect(state.getVar('stringVar')).toEqual('value');

      expect(state.hasVar('numberVar')).toBeTruthy();
      expect(state.getVar('numberVar')).toEqual(123);

      expect(state.hasVar('boolVar')).toBeTruthy();
      expect(state.getVar('boolVar')).toEqual(true);

      expect(state.hasVar('nullVar')).toBeTruthy();
      expect(state.getVar('nullVar')).toBeNull();

      // Variable should be cleared on reset
      state.reset();
      expect(state.hasVar('stringVar')).toBeFalsy();
    });

    test('should provide debug information', () => {
      state.pushMode('mu');
      state.setVar('test', 'value');

      const debug = state.debug();

      expect(debug.modeStack).toEqual(['INITIAL', 'mu']);
      expect(debug.vars).toEqual({ test: 'value' });
    });
  });

  describe('getLexerState function', () => {
    test('should create state when not exists', () => {
      const lexer: LexerWithState = {};
      const state = getLexerState(lexer);

      expect(state).toBeInstanceOf(VelocityLexerState);
      expect(lexer.velocityState).toBe(state);
    });

    test('should return existing state', () => {
      const existingState = new VelocityLexerState();
      const lexer: LexerWithState = { velocityState: existingState };

      const state = getLexerState(lexer);

      expect(state).toBe(existingState);
    });
  });
});
