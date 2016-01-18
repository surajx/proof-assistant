var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function NegationElimRule(){
}

NegationElimRule.prototype.validate = function(proofGraph, curProofLine){
  
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==2) {
    throw lnoErrStr + "¬E rule should have two annotations. Given: " + curProofLine.annotationsStr.join(',');
  }
  
  if(rulePremises.length!==2) {
    throw lnoErrStr + "¬E rule should have exactly two premises. Make sure that your \
      annotation contains references to exactly two line-numbers.";
  }
  
  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);
  if (!dependencyVerifyObj.status){
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    throw lnoErrStr + "Discharge specified, but negation elimination\
      rule should not discharge."
  }
  
  // Check if only ⊥ was input
  if (primeFormulaForCompare(curProofLine.formule) !== "⊥"){
    throw lnoErrStr + "only ⊥ is a valid formulae for ¬E"
  }
  
  // Check that the formulae referenced to by the annotations form a contradiction
  var tmpFormuleArray = [primeFormulaForCompare(rulePremises[0].formule), primeFormulaForCompare(rulePremises[1].formule)];
  if (tmpFormuleArray[0].length > tmpFormuleArray[1].length) {tmpFormuleArray.reverse()};
  if ("¬" + tmpFormuleArray[0] !== tmpFormuleArray[1]){
    throw lnoErrStr + "formulae referenced to by the annotations \
    do not form a contradiction."
  }
  
  return true;
}


module.exports = NegationElimRule;
