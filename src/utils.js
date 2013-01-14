"use strict";
var utils = {
  noop: function noop(){
    var arg = arguments;
    return function(){ return arg; };
  }
};

['forEach', 'some', 'every', 'filter', 'map'].forEach(function(fnName){
  utils[fnName] = function(arr, fn, context){
    if (!arr || typeof arr == 'string') return arr;
    context = context || this;
    if (arr[fnName]){
      return arr[fnName](fn, context);
    } else {
      var keys = Object.keys(arr);
      return keys[fnName](function(key){
        return fn.call(context, arr[key], key, arr);
      }, context);
    }
  };
});

var num = 0;
utils.guid = function(){
  return num++;
};

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

utils.mixin = function (to, from){
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

utils.isArray = function(obj){
  return {}.toString.call(obj) === '[object Array]';
};

utils.indexOf = function(elem, arr){
  if (utils.isArray(arr)) {
    return arr.indexOf(elem);
  }
};

utils.keys = Object.keys;
utils.now  = Date.now;

module.exports = utils;
