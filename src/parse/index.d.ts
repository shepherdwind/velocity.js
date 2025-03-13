import { VELOCITY_AST } from '../type';

/**
 * 为 jison 生成的解析器提供类型定义
 */
export function parse(input: string): VELOCITY_AST[];
