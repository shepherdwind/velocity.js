KISSY.config({
  packages: [
    {
      name: 'velocity',
      path: '../../build/'
    }
  ]
});

KISSY.use('velocity/index, velocity/parse', function(S, Velocity, Parser){
  var html = (S.all('#tpl').html());
  var asts = Parser.parse(html);
  var compile = new Velocity(asts);
  console.log(compile.render());
});
