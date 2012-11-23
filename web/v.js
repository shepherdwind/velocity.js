KISSY.config({
  packages: [
    {
      name: 'velocity',
      path: '../try/js/'
    },
    {
      name: 'web',
      path: '../'
    }
  ]
});

KISSY.use('velocity/index, web/directives', function(S, Velocity, asts){
  var compile = new Velocity(asts);
  S.all('.content').html(compile.render());
});
