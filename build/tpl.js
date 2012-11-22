KISSY.add(function(S){
  var Velocity = function(ast, context){
    this.asts = asts;
    this.init();
  };
  Velocity.Helper = {};
  Velocity.prototype = {
    constructor: Velocity
  };

  //api map
  var utils = {
    forEach : S.each,
    some    : S.some,
    mixin   : S.mix,
    guid    : S.guid,
    isArray : S.isArray,
    indexOf : S.indexOf
  };

  #helper
  #velocity
