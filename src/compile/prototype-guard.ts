const PROTO_KEY = '__proto__';
const PROTOTYPE_CHAIN_KEYS = new Set(['constructor', 'prototype']);

export function hasOwnProperty(baseRef: unknown, key: string): boolean {
  return (
    (typeof baseRef === 'object' || typeof baseRef === 'function') &&
    baseRef !== null &&
    Object.prototype.hasOwnProperty.call(baseRef, key)
  );
}

export function isBlockedPrototypeKey(baseRef: unknown, key: string, isEnd = false): boolean {
  if (key === PROTO_KEY) {
    return true;
  }

  // Function.prototype is a shared prototype object; reading or assigning
  // through it can expose or affect objects created by that constructor.
  if (key === 'prototype' && typeof baseRef === 'function') {
    return true;
  }

  // `constructor` and `prototype` are valid own data fields. They are only
  // dangerous when traversal would fall through to inherited prototype-chain
  // properties such as Object.constructor.prototype.
  return !isEnd && PROTOTYPE_CHAIN_KEYS.has(key) && !hasOwnProperty(baseRef, key);
}

export function hasBlockedUnknownPrototypePath(keys: string[], startIndex: number): boolean {
  // If an earlier safe segment is missing, the RHS may create it. Before
  // evaluating RHS we can only allow the path when the remaining unresolved
  // suffix does not contain keys that could later traverse prototypes.
  return keys.slice(startIndex).some((key, i) => {
    const isEnd = startIndex + i === keys.length - 1;
    return key === PROTO_KEY || (!isEnd && PROTOTYPE_CHAIN_KEYS.has(key));
  });
}
