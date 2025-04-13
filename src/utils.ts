let number = 0;
export const guid = (): number => {
  return number++;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyMixins = (derivedCtor: any, constructors: any[]): void => {
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
};

/**
 * escapeHTML
 */
export const convert = (str: string): string => {
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
};

export const format = (value: unknown): string => {
  if (Array.isArray(value)) {
    return '[' + value.map((v) => format(v)).join(', ') + ']';
  }

  if (typeof value === 'object' && value !== null) {
    if (value.toString.toString().indexOf('[native code]') === -1) {
      return value as unknown as string;
    }

    const kvJoin = (k: string) => `${k}=${format((value as Record<string, unknown>)[k])}`;
    return '{' + Object.keys(value).map(kvJoin).join(', ') + '}';
  }

  return value as string;
};
