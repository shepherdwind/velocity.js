var utils = require('../utils');
var Helper = require('../helper/index');
var methods = require('./methods');
function Velocity(asts, config) {
  this.asts = asts;
  this.config = utils.mixin(
    {
      /**
       * if escapeHtml variable, is set true
       * $foo value will handle by escapeHtml
       */
      escape: false,
      // whiteList which no need escapeHtml
      unescape: {},
      valueMapper(value) {
        return value;
      },
    },
    config
  );
  this._state = { stop: false, break: false };
  this.customMethodHandlers = methods.concat(config ? config.customMethodHandlers : []);
  this.init();
}

Velocity.Helper = Helper;
Velocity.prototype = {
  constructor: Velocity
};

require('./blocks')(Velocity, utils);
require('./literal')(Velocity, utils);
require('./references')(Velocity, utils);
require('./set')(Velocity, utils);
require('./expression')(Velocity, utils);
require('./compile')(Velocity, utils);
module.exports = Velocity;
