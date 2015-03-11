'use strict';
var utils = require('../utils');
var Helper = require('../helper/index');
function Velocity(asts, config) {
  this.asts = asts;
  this.config = {
    // 自动输出为经过html encode输出
    escape: true,
    // 不需要转义的白名单
    unescape: {},
    // 是否支持异步宏
    isAsync: false
  };
  utils.mixin(this.config, config);
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
