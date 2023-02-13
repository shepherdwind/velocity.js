let number = 0;
export const guid = () => {
  return number++;
};

export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

/**
 * escapeHTML
 */
export function convert(str: string) {
  if (typeof str !== 'string') return str;

  let result = '';
  let escape = false;
  let i, c, cstr;

  for (i = 0; i < str.length; i++) {
    c = str.charAt(i);
    if ((' ' <= c && c <= '~') || c === '\r' || c === '\n') {
      if (c === '&') {
        cstr = '&amp;';
        escape = true;
      } else if (c === '"') {
        cstr = '&quot;';
        escape = true;
      } else if (c === '<') {
        cstr = '&lt;';
        escape = true;
      } else if (c === '>') {
        cstr = '&gt;';
        escape = true;
      } else {
        cstr = c.toString();
      }
    } else {
      cstr = '&#' + c.charCodeAt(0).toString() + ';';
    }

    result = result + cstr;
  }

  return escape ? result : str;
}