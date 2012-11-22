KISSY.config({
  packages: [
    {
      name: 'velocity',
      path: '../../build/'
    },
    {
      name: 'web',
      path: '../'
    }
  ]
});

KISSY.use('velocity/index, web/directives', function(S, Velocity, asts){
  //var html = (S.all('#tpl').html());
  //var asts = Parser.parse(html);
  var compile = new Velocity(asts);
  console.log(compile.render());
});
