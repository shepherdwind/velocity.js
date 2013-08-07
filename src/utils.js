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

var number = 0;
utils.guid = function(){
  return number++;
};

utils.mixin = function (to, from){
  utils.forEach(from, function(val, key){
    var toString = {}.toString.call(val);
    if (utils.isArray(val) || utils.isObject(val)) {
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

utils.isObject = function(obj){
  return {}.toString.call(obj) === '[object Object]';
};

utils.indexOf = function(elem, arr){
  if (utils.isArray(arr)) {
    return arr.indexOf(elem);
  }
};

utils.keys = Object.keys;
utils.now  = Date.now;

function makeLevel(block, index){

  var blockTypes = {'if': 1, 'foreach': 1, 'macro': 1, 'noescape': 1, 'define': 1};
  var len = block.length;
  index = index || 0;
  var ret = [];
  var ignore = index - 1;

  for (var i = index; i < len; i++) {

    if (i <= ignore) continue;

    var ast = block[i];
    var type = ast.type;

    if (!blockTypes[type] && type !== 'end') {

      ret.push(ast);

    } else if (type === 'end') {

      return {arr: ret, step: i};

    } else {

      var _ret = makeLevel(block, i + 1);
      ignore = _ret.step;
      _ret.arr.unshift(block[i]);
      ret.push(_ret.arr);

    }

  }

  return ret;
}

utils.makeLevel = makeLevel;

module.exports = utils;
