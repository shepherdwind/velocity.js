let number = 0;
export const guid = () => {
  return number++;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name === 'constructor') return;
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
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

  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);
    let cstr = '';
    if ((c >= ' ' && c <= '~') || c === '\r' || c === '\n') {
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

export const format = (value: unknown): string => {
  if (Array.isArray(value)) {
    return '[' + value.map(format.bind(this)).join(', ') + ']';
  }

  if (typeof value === 'object' && value !== null) {
    if (value.toString.toString().indexOf('[native code]') === -1) {
      return value as unknown as string;
    }

    const kvJoin = (k: string) => `${k}=${format(value[k])}`;
    return '{' + Object.keys(value).map(kvJoin).join(', ') + '}';
  }

  return value as string;
};
