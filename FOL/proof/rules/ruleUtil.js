var antlr4 = require('antlr4/index');
var FOLTreeWalker = require('../../parser/FOLTreeWalker.js');
var FormulaContext  = require('../../parser/gen/FOLParser.js').FormulaContext;

var checkNeedParen  = require('../../parser/parser.js').checkNeedParen;
var getParserForFormule  = require('../../parser/parser.js').getParserForFormule;


function getTopLevelFormulasForConnective(input, connective) {
  //At this point input is validated to be a WFF.
  var parserContainer = getParserForFormule(input);
  if (parserContainer.status) {
    var parser = parserContainer.parser;
  } else {
    throw parserContainer.err + " on input: " + input;
  }
  var topLevelFormulas = [];
  //Very inefficient: not walking the entire tree.
  //Need to figure out how to stop the walk once the top is found
  var gotTopLevelFormulas = false;
  FOLTreeWalker.prototype.enterFormula = function(ctx) {
    if (!gotTopLevelFormulas){
      gotTopLevelFormulas = true;
      var foundConnective = false;
      var childrenLen = ctx.children.length;
      for (var i = 0; i<childrenLen ; i++) {
        if (ctx.children[i] instanceof FormulaContext){
          topLevelFormulas.push(ctx.children[i].getText());
        }
        if (ctx.children[i].getText()===connective){
          foundConnective = true;
        }
      }
      if (!foundConnective){
        topLevelFormulas = [];
      }
    }
  };

  var tree = parser.formula();
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(new FOLTreeWalker(), tree);
  return topLevelFormulas;
}

function primeFormulaForCompare(formula) {

  var formula = formula.replace(/ /g,'');
  var parenContainer = checkNeedParen(formula);
  if(parenContainer.status) {
    return parenContainer.formule;
  } else {
    throw parenContainer.err + " on input: " + formula;
  }
}

module.exports.getTopLevelFormulasForConnective = getTopLevelFormulasForConnective;
module.exports.primeFormulaForCompare = primeFormulaForCompare
