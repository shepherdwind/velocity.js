import { AST_TYPE, CommonAST, type RAW_AST_TYPE, type VELOCITY_AST } from './type';
import { parse as _parse } from './parse/index';

type BlockConfig = Record<string, boolean>;
const blockTypes: BlockConfig = {
  if: true,
  foreach: true,
  macro: true,
  noescape: true,
  define: true,
  macro_body: true,
};

let customBlocks: BlockConfig = {};
const TRIM_REG = /^[ \t]*\n/;

/**
 * @param str string to parse
 * @param blocks self define blocks, such as `#cms(1) hello #end`
 * @param ignoreSpace if set true, then ignore the newline trim.
 */
export const parse = (str: string, blocks?: BlockConfig, ignoreSpace = true): VELOCITY_AST[] => {
  const asts = _parse(str) as RAW_AST_TYPE[];
  customBlocks = blocks ?? {};

  /**
   * remove all newline after all direction such as `#set, #each`
   */
  if (ignoreSpace) {
    asts.forEach((ast, i) => {
      if (typeof ast === 'string') {
        return;
      }
      // after raw and references, then keep the newline.
      if (!['references', 'raw'].includes(ast.type)) {
        const _ast = asts[i + 1];
        if (typeof _ast === 'string' && TRIM_REG.test(_ast)) {
          asts[i + 1] = _ast.replace(TRIM_REG, '');
        }
      }
    });
  }

  const [ret] = makeLevel(asts);

  return ret;
};

function makeLevel(block: RAW_AST_TYPE[], index = 0): [VELOCITY_AST[], number] {
  const len = block.length;
  const ret: VELOCITY_AST[] = [];
  let ignore = index - 1;

  for (let i = index; i < len; i++) {
    if (i <= ignore) continue;

    const ast = block[i] as CommonAST;
    const isString = typeof ast === 'string';
    const type = !isString ? ast.type : '';

    let isBlockType = blockTypes[type];

    // support custom block , for example
    // const vm = '#cms(1)<div class="abs-right"> #H(1,"第一个链接") </div> #end'
    // parse(vm, { cms: true });
    if (!isString && type === 'macro_call' && customBlocks[ast.id]) {
      isBlockType = true;
      ast.type = ast.id as AST_TYPE;
      ast.id = '';
    }

    if (!isBlockType && type !== 'end') {
      ret.push(ast as VELOCITY_AST);
      continue;
    }

    if (type === 'end') {
      return [ret, i];
    }

    const [nest, current] = makeLevel(block, i + 1);
    ignore = current;
    nest.unshift(block[i] as VELOCITY_AST);
    ret.push(nest as unknown as VELOCITY_AST);
  }

  return [ret, 0];
}
