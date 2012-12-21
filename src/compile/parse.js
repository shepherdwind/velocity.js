module.exports = function(Velocity, utils){
  /**
   * #parse解析
   */
  utils.mixin(Velocity.prototype, {

    getParse: function(ast){

      var param = this.getLiteral(ast.id);

      var getString = Velocity.getParseString;
      var Parser = Velocity.Parser;

      if (!getString || !Parser) {
        return '#parse(' + (ast.id.type === 'references' ? 
          Velocity.Helper.getRefText(ast.id) : ('"' + ast.id + '"') ) + ')';
      } else {
        var str = getString(param);
        if (str) {
          var asts = Parser.parse(str);
          return this._render(asts);
        } else {
          return '';
        }
      }

    }

  });
};
