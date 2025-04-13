import { MacroCallAST, Param, ReferencesAST } from '../type';

/**
 * Get reference text. When the reference itself does not exist,
 * the original template string needs to be returned.
 * get variable text
 */
export function getRefText(ast: ReferencesAST | MacroCallAST) {
  if (ast.type === 'macro_call') {
    return `#${getMethodText(ast)}`;
  }

  let ret = ast?.leader || '';
  const isFn = ast.args !== undefined;

  if (ast.isWraped) ret += '{';

  if (isFn) {
    ret += getMethodText(ast);
  } else {
    ret += ast.id;
  }

  ast.path?.forEach((ref) => {
    if (ref.type === 'method') {
      ret += '.' + getMethodText(ref);
      return;
    }

    if (ref.type === 'index') {
      let text = '';
      const id = ref.id;

      if (id.type === 'integer') {
        text = '' + id.value;
      } else if (id.type === 'string') {
        const sign = id.isEval ? '"' : "'";
        text = sign + id.value + sign;
      } else {
        text = getRefText(id as ReferencesAST);
      }

      ret += '[' + text + ']';
    }

    if (ref.type === 'property') {
      ret += '.' + ref.id;
    }
  });

  if (ast.isWraped) ret += '}';

  return ret;
}

function getMethodText(ref: Pick<ReferencesAST, 'id' | 'args'>) {
  const args = (ref.args || []).map((arg) => getLiteral(arg));
  return ref.id + '(' + args.join(',') + ')';
}

function getLiteral(ast: Param) {
  let ret = '';

  switch (ast.type) {
    case 'string': {
      const sign = ast.isEval ? '"' : "'";
      ret = sign + ast.value + sign;
      break;
    }

    case 'integer':
    case 'runt':
    case 'bool': {
      ret = ast.value + '';
      break;
    }

    case 'array': {
      ret = '[';
      ret += ast.value
        .map((arg) => {
          if (typeof arg === 'string' || typeof arg === 'number') {
            return String(arg);
          }
          return getLiteral(arg);
        })
        .join(', ');
      ret += ']';
      break;
    }

    // map handle?
    default:
      ret = getRefText(ast as ReferencesAST);
  }

  return ret;
}
