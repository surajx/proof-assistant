var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;
var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulasForConnective = require('./ruleUtil.js').getTopLevelFormulasForConnective;

function ImplicationElimRule(){};

ImplicationElimRule.prototype.validate = function(proofGraph, curProofLine) {
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==2){
    throw lnoErrStr + "→E rule should have two annotations. Given: " + curProofLine.annotationsStr.join(',');
  }
  if(rulePremises.length!==2) {
    throw lnoErrStr + "→E rule should have exactly two premises. Make sure that your \
      annotation contains reference to exactly two line-numbers.";
  }
  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);

  if (!dependencyVerifyObj.status){
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    throw lnoErrStr + "Discharge specified, but implication \
      elimination rule should not discharge."
  }

  var isAtecedentOf = function(formula1, formula2, curFormula){
    var topLevelImplicants =  getTopLevelFormulasForConnective(formula2, "→");
    formula1 = primeFormulaForCompare(formula1);
    if (topLevelImplicants.length===2 && (topLevelImplicants[0]===formula1)) {
      curFormula = primeFormulaForCompare(curFormula);
      if (topLevelImplicants[1]===curFormula){
        return true;
      }
    }
    return false;
  };

  var rulePremises1 = rulePremises[0].formule;
  var rulePremises2 = rulePremises[1].formule;
  if (isAtecedentOf(rulePremises1, rulePremises2, curProofLine.formule) ||
      isAtecedentOf(rulePremises2, rulePremises1, curProofLine.formule)) {
    return true;
  } else {
    throw lnoErrStr + "The premises provided by the annotation does not entail, " +
    curProofLine.formule + " by Implication Introduction rule.";
  }
}


module.exports = ImplicationElimRule;
