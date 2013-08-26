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

KISSY.use('velocity/index, web/bench/obj, web/bench/items-vm', function(S, Velocity, data, templ){
  var compile = new Velocity(templ);
  compile.render(data);
  console.log(compile.cost);
  S.one('body').on('click', function(){
    var html = compile.render(data);
    //console.log(html);
    console.log(compile.cost);
  });
});
