var antlr4 = require('antlr4/index');
var FOLTreeWalker = require('../../parser/FOLTreeWalker.js');
var FOLLexer   = require('../../parser/gen/FOLLexer').FOLLexer;
var FOLParser  = require('../../parser/gen/FOLParser').FOLParser;


function getTopLevelConjuncts(input){
  var inputStream = new antlr4.InputStream(input);
  var lexer = new FOLLexer(inputStream);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new FOLParser(tokens);

  var conjunctionTopElements = [];
  var gotConjunctionTop = false;
  FOLTreeWalker.prototype.enterConjunction = function(ctx) {
    if (ctx.children.length>=3 && !gotConjunctionTop){
      gotConjunctionTop = true;
      for (var i = ctx.children.length - 1; i >= 0; i--) {
        var val = ctx.children[i].getText();
        if (val!=='∧'){
          conjunctionTopElements.push(val);
        }
      };
    }
  }

  var tree = parser.formula();
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new FOLTreeWalker(), tree);
  return conjunctionTopElements;
}

module.exports.getTopLevelConjuncts = getTopLevelConjuncts;
