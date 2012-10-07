"use strict";
var utils = {
  noop: function noop(){}
};

['forEach', 'some', 'every'].forEach(function(fnName){
  utils[fnName] = function(arr, fn, context){
    if (!arr) return arr;
    context = context || this;
    if (arr[fnName]){
      return arr[fnName](fn, context);
    } else {
      var keys = Object.keys(arr);
      return keys[fnName](function(key, i){
        return fn.call(context, arr[key], key, arr);
      }, context);
    }
  };
});

utils.walks = function walks(arr, fn, callback){
  var rets = [];
  var num = 0;
  var len = arr.length;

  this.forEach(arr, function(val, i){

    fn(val, cb);
    function cb(err, ret){
      if (num === len) return;
      if (err){
        callback(err, rets);
        num = len;
      } else {
        num++;
        rets[i] = ret;
        if (num === len) callback(null, rets);
      }
    }

  });
};
utils.mixin = function (from, to){
  utils.forEach(from, function(val, key){
    var toString = {}.toString.call(val);
    if (toString == '[object Array]' || toString == '[object Object]') {
      to[key] = utils.mixin(val, to[key] || {});
    } else {
      to[key] = val;
    }
  });
  return to;
};

module.exports = utils;
