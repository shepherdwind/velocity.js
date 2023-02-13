const utils = require('../utils');

function hasProperty(context, field) {
  if (typeof context === 'number' || typeof context === 'string') {
    return context[field] || Object.prototype.hasOwnProperty.call(context, field);
  }
  if (!context) {
    return false;
  }
  return field in context;
}

function matchProperty(value, notInContext) {
  return function({ property, context }) {
    return value === property && (
      notInContext ? !hasProperty(context, property) : true
    );
  }
}

function matchStartWith(value) {
  return function({ property, context }) {
    return property.indexOf(value) === 0 &&
      !(property in context) &&
      property.length > value.length;
  }
}

function getter(base, property) {
  // get(1)
  if (typeof property === 'number') {
    return base[property];
  }

  var letter = property.charCodeAt(0);
  var isUpper = letter < 91;
  var ret = base[property];

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

function getSize(obj) {
  if (utils.isArray(obj)) {
    return obj.length;
  } else if (utils.isObject(obj)) {
    return utils.keys(obj).length;
  }

  return undefined;
}

const handlers = {
  // $foo.get('bar')
  get: {
    match: matchProperty('get', true),
    resolve: function({ context, params }) {
      return getter(context, params[0]);
    },
  },
  // $foo.set('a', 'b')
  set: {
    match: matchProperty('set', true),
    resolve: function({ context, params, property }) {
      context[params[0]] = params[1];
      return '';
    },
  },
  // getAddress()
  getValue: {
    match: matchStartWith('get'),
    resolve: function({ context, property }) {
      return getter(context, property.slice(3))
    },
  },
  isValue: {
    match: matchStartWith('is'),
    resolve: function({ context, property }) {
      return getter(context, property.slice(2))
    },
  },
  // $page.setName(123)
  setValue: {
    match: matchStartWith('set'),
    resolve: function({ context, property, params }) {
      context[property.slice(3)] = params[0];
      // set value will not output anything
      context.toString = function() { return ''; };
      return context;
    },
  },
  keySet: {
    match: matchProperty('keySet', true),
    resolve: function({ context }) {
      return utils.keys(context);
    },
  },
  entrySet: {
    match: matchProperty('entrySet', true),
    resolve: function({ context }) {
      const ret = [];
      utils.forEach(context, function(value, key) {
        ret.push({ key: key, value: value });
      });
      return ret;
    },
  },
  size: {
    match: matchProperty('size', true),
    resolve: function({ context }) {
      return getSize(context);
    },
  },
  put: {
    match: matchProperty('put', true),
    resolve: function({ context, params }) {
      return context[params[0]] = params[1];
    },
  },
  add: {
    match: matchProperty('add', true),
    resolve: function({ context, params }) {
      if (typeof context.push !== 'function') {
        return;
      }
      return context.push(params[0]);
    },
  },
  remove: {
    match: matchProperty('remove', true),
    resolve: function({ context, params }) {
      if (utils.isArray(context)) {

        let index;
        if (typeof index === 'number') {
          index = params[0];
        } else {
          index = context.indexOf(params[0]);
        }

        ret = context[index];
        context.splice(index, 1);
        return ret;

      } else if (utils.isObject(context)) {
        ret = context[params[0]];
        delete context[params[0]];
        return ret;
      }

      return undefined;
    },
  },
  subList: {
    match: matchProperty('subList', true),
    resolve: function({ context, params }) {
      return context.slice(params[0], params[1]);
    },
  }
};

module.exports = utils.keys(handlers).map(function(key) {
  return {
    uid: 'system: ' + key,
    match: handlers[key].match,
    resolve: handlers[key].resolve,
  };
});