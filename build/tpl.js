KISSY.add(function(S){
  var Velocity = function(asts){
    this.asts = asts;
    this.init();
  };
  Velocity.Helper = {};
  Velocity.prototype = {
    constructor: Velocity
  };

  var hasEnumBug = !({toString: 1}.propertyIsEnumerable('toString'));

  var keys = Object.keys || function (o) {
    var result = [], p, i;

    for (p in o) {
      result.push(p);
    }

    if (hasEnumBug) {
      for (i = enumProperties.length - 1; i >= 0; i--) {
        p = enumProperties[i];
        if (o.hasOwnProperty(p)) {
          result.push(p);
        }
      }
    }

    return result;
  };

  //api map
  var utils = {
    forEach : S.each,
    some    : S.some,
    mixin   : S.mix,
    guid    : S.guid,
    isArray : S.isArray,
    indexOf : S.indexOf,
    // 1.2没有keys方法，考虑独立utils
    keys    : keys,
    now     : S.now
  };

  {helper}
  {velocity}
  return Velocity;
});
