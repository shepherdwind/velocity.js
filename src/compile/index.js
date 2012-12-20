var utils = require('../utils');
var Helper = require('../helper/');
function Velocity(asts) {
  this.asts = asts;
  this.init();
}

Velocity.Helper = Helper;
Velocity.prototype = {
  constructor: Velocity
};

var fs = require('fs');

Velocity.getParseString = function(file, basePath){

  if (!basePath) basePath = process.cwd();
  file = basePath + '/' + file;
  if (!fs.existsSync(file)) {
    return 'file load fail: ' + file + '\n';
  } else {
    return fs.readFileSync(file).toString();
  }
};

require('./blocks')(Velocity, utils);
require('./literal')(Velocity, utils);
require('./references')(Velocity, utils);
require('./set')(Velocity, utils);
require('./expression')(Velocity, utils);
require('./compile')(Velocity, utils);
require('./parse')(Velocity, utils);
module.exports = Velocity;
