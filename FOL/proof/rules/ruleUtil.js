var antlr4 = require('antlr4/index');
var FOLTreeWalker = require('../../parser/FOLTreeWalker.js');
var FormulaContext  = require('../../parser/gen/FOLParser.js').FormulaContext;

var getParserForFormule  = require('../../parser/parser.js').getParserForFormule;


function getTopLevelFormulasForConnective(input, connective) {
  //At this point input is validated to be a WFF.
  var parser = getParserForFormule(input);
  var topLevelFormulas = [];
  //Very innefficient: not walking the entire tree.
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
  if (!(formula[0]==='¬' || formula.length===1)){
    //TODO: check the case if already paranthesized.
    formula = '('+formula+')';
  }
  return formula;
}

module.exports.getTopLevelFormulasForConnective = getTopLevelFormulasForConnective;
module.exports.primeFormulaForCompare = primeFormulaForCompare
