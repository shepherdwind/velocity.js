fs = require 'fs'
spawn = (require 'child_process').spawn
#option  '-o', '--output [DIR]', 'directory for compiled code'
exec  = (require 'child_process').exec

task 'parse', 'rebuild the Jison parser', (options) ->
  comd = 'jison velocity.yy velocity.l && mv velocity.js index.js'
  parse = exec comd, {cwd: "./src/parse/"}, (error, stdout, stderr)->
    console.log 'finish parse'
    if error isnt null
      console.log 'exec error: ' + error

task 'build', 'build velocity for kissy', (options) ->
  files = fs.readdirSync 'src/compile'
  velocity = ''
  files.forEach (file) ->
    if file isnt 'index.js'
      text = (fs.readFileSync "./src/compile/#{file}").toString()
      text = text.replace 'module.exports = ', "/** file: ./src/compile/#{file}*/\n"
      text = text.replace /;\s*$/ , "(Velocity, utils);\n\n"
      velocity += text

  helper = (fs.readFileSync "./src/helper/text.js").toString()
  helper = helper.replace 'module.exports = ', ''
  helper = helper.replace /;\s*$/, "(Velocity.Helper, utils);"

  tpl = (fs.readFileSync "./build/tpl.js").toString()
  tpl = tpl.replace '#helper', helper
  tpl = tpl.replace '#velocity', velocity
  tpl += "\n  return Velocity;\n });
  "
  fs.writeFileSync 'build/velocity/index.js', tpl
  console.log 'build kissy success, file at build/velocity/'
