var Velocity = require('../src/velocity');
var fs = require('fs');
var str = fs.readFileSync(__dirname + '/set.vm').toString();
var vm = new Velocity(str);
vm.render({
  customer: {
    Address: "China"
  },
  purchase: {
    Total1: 100
  },
  foo: {
    apple: {
      name: 'hanwen'
    }
  }
});
