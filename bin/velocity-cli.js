var path   = require('path');
var fs     = require('fs');
var exists = fs.existsSync || path.existsSync;
var currentPath = process.cwd();

var Velocity = require('../src/velocity');
var Parser = Velocity.Parser;

function buildAst(files){
  var _template = fs.readFileSync(__dirname + '/build-tpl.js').toString();
  files.forEach(function(file){

    if (path.extname(file) === '.vm') {

      console.log('read file ' + file);
      var template = _template;

      var str = fs.readFileSync(currentPath + '/' + file).toString();
      var asts = Parser.parse(str);
      var requires = getAllLoad(asts);

      template = template.replace('{content}', JSON.stringify(asts, null, 2));
      template = template.replace('{requires}', requires.join(','));
      template = template.replace('"{del}', '');
      template = template.replace('{del}"', '');

      console.log('read js ' + file);
      fs.writeFileSync(currentPath + '/' + file.replace('.vm', '.js'), template);

    }

  });
}

function getAllLoad(asts){

  var requires = [];

  asts.forEach(function(ast, i){

    if (ast.type === 'parse') {

      var id = ast.id;
      if (id.type !== 'string') {
        throw Error('#parse arguments must be string');
      }

      requires.push('"' + id.value.replace('.vm', '') + '"');
      asts[i] = '{del}arguments[' + requires.length + ']{del}';
    }

  });

  return requires;
}

function parseVelocity(argv){

  var vmfile = argv[0];
  if (vmfile && vmfile.indexOf('.vm')) {
    vmfile = path.resolve(process.cwd(), vmfile);
  }

  var dataFile = argv[1];

  var data = {};
  var ext = path.extname(dataFile);
  dataFile = path.resolve(process.cwd(), dataFile);

  if (ext === '.json') {
    if (exists(dataFile)) data = fs.readFileSync(dataFile).toString();
  } else if(ext ==='.js') {
    if (exists(dataFile)) data = require(dataFile);
  }

  if (!exists(vmfile)) {
    console.log('velocity xx.vm [xx.js | xx.json]');
  } else {
    var str = fs.readFileSync(vmfile).toString();
    console.log(Velocity.render(str, data));
  }
}

module.exports = {
  parse: parseVelocity,
  buildAst: buildAst
};
