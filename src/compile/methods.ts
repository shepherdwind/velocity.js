function hasProperty(context: object, field: string) {
  if (typeof context === 'number' || typeof context === 'string') {
    return (
      context[field] || Object.prototype.hasOwnProperty.call(context, field)
    );
  }
  if (!context) {
    return false;
  }
  return field in context;
}

const matchProperty =
  (value: string, notInContext: boolean) =>
  ({ property, context }: IHandlerParams) =>
    value === property &&
    (notInContext ? !hasProperty(context, property) : true);

const matchStartWith =
  (value: string) =>
  ({ property, context }: IHandlerParams) =>
    property.indexOf(value) === 0 &&
    !(property in context) &&
    property.length > value.length;

function getter(base: any, property: number | string) {
  // get(1)
  if (typeof property === 'number') {
    return base[property];
  }

  const letter = property.charCodeAt(0);
  const isUpper = letter < 91;
  const ret = base[property];

  if (ret !== undefined) {
    return ret;
  }

  if (isUpper) {
    // Address => address
    property = String.fromCharCode(letter).toLowerCase() + property.slice(1);
  }

  if (!isUpper) {
    // address => Address
    property = String.fromCharCode(letter).toUpperCase() + property.slice(1);
  }

  return base[property];
}

function getSize(obj: any) {
  if (Array.isArray(obj)) {
    return obj.length;
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).length;
  }

  return undefined;
}

interface IHandlerParams {
  context: any;
  params: any[];
  property: string;
}

const handlers = {
  // $foo.get('bar')
  get: {
    match: matchProperty('get', true),
    resolve: ({ context, params }: IHandlerParams) =>
      getter(context, params[0]),
  },
  // $foo.set('a', 'b')
  set: {
    match: matchProperty('set', true),
    resolve: ({ context, params }: IHandlerParams) => {
      context[params[0]] = params[1];
      return '';
    },
  },
  // getAddress()
  getValue: {
    match: matchStartWith('get'),
    resolve: ({ context, property }: IHandlerParams) =>
      getter(context, property.slice(3)),
  },
  isValue: {
    match: matchStartWith('is'),
    resolve: ({ context, property }: IHandlerParams) =>
      getter(context, property.slice(2)),
  },
  // $page.setName(123)
  setValue: {
    match: matchStartWith('set'),
    resolve: ({ context, property, params }: IHandlerParams) => {
      context[property.slice(3)] = params[0];
      // set value will not output anything
      context.toString = function () {
        return '';
      };
      return context;
    },
  },
  keySet: {
    match: matchProperty('keySet', true),
    resolve: ({ context }: IHandlerParams) => Object.keys(context),
  },
  entrySet: {
    match: matchProperty('entrySet', true),
    resolve: ({ context }: IHandlerParams) =>
      Object.keys(context).map((key) => ({
        key,
        value: context[key],
      })),
  },
  size: {
    match: matchProperty('size', true),
    resolve: ({ context }: IHandlerParams) => getSize(context),
  },
  put: {
    match: matchProperty('put', true),
    resolve: ({ context, params }: IHandlerParams) =>
      (context[params[0]] = params[1]),
  },
  add: {
    match: matchProperty('add', true),
    resolve: ({ context, params }: IHandlerParams) => {
      if (typeof context.push !== 'function') {
        return;
      }
      return context.push(params[0]);
    },
  },
  remove: {
    match: matchProperty('remove', true),
    resolve: ({ context, params }: IHandlerParams) => {
      if (Array.isArray(context)) {
        let index;
        if (typeof index === 'number') {
          index = params[0];
        } else {
          index = context.indexOf(params[0]);
        }

        const ret = context[index];
        context.splice(index, 1);
        return ret;
      }

      if (typeof context === 'object' && context !== null) {
        const ret = context[params[0]];
        delete context[params[0]];
        return ret;
      }

      return undefined;
    },
  },
  subList: {
    match: matchProperty('subList', true),
    resolve: ({ context, params }: IHandlerParams) =>
      context.slice(params[0], params[1]),
  },
};

type HandleKeys = keyof typeof handlers;
const keys = Object.keys(handlers) as HandleKeys[];

export default keys.map((key) => ({
  uid: 'system: ' + key,
  match: handlers[key].match,
  resolve: handlers[key].resolve,
}));
