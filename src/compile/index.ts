/* istanbul ignore file */
import { Velocity } from './base';
import { Compile } from './base-compile';
import { BlockCommand } from './blocks';
import { Expression } from './expression';
import { LiteralCompiler } from './literal';
import { References } from './references';
import { SetValue } from './set';
import { applyMixins } from '../utils';

// Apply mixins to Velocity class
applyMixins(Velocity, [Compile, BlockCommand, Expression, LiteralCompiler, References, SetValue]);

// Export everything
export { Compile, BlockCommand, Expression, LiteralCompiler, References, SetValue, Velocity };
