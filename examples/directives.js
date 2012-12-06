var Velocity = require('../src/velocity');
var fs = require('fs');
var str = fs.readFileSync(__dirname + '/directives.vm').toString();
var vm = new Velocity(str);
vm.render({
  a: 1,
  allProducts: {"books": "computers", "user": "phones"},
  customerList: [
    {Name: 'hanwen'},
    {Name: "yuanhuang"},
    {Name: 'hanwen2'},
    {Name: 'hanwen3'}
  ]
});
