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
  var compile = new Velocity(asts);
  S.all('body').html(compile.render());
});
