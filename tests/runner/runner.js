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

KISSY.use('velocity/index, velocity/parse', function(S, Compile, Parser){
  window.Compile = Compile;
  window.Parser = Parser;
  S.getScript('./spec.js', function(){
    mocha.run();
  });
});
