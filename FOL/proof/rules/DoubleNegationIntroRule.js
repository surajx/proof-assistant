var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function DoubleNegationIntroRule(){
}

DoubleNegationIntroRule.prototype.validate = function(proofGraph, curProofLine){
    
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==1) {
    throw lnoErrStr + "¬¬I rule should have only one annotation. Given: " + curProofLine.annotationsStr.join(',');
  }
  
  if(rulePremises.length!==1) {
    throw lnoErrStr + "¬¬I rule should have exactly one premise. Make sure that your \
      annotation references exactly one line-number.";
  }
  
  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);
  if (!dependencyVerifyObj.status){
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    throw lnoErrStr + "Discharge specified, but double \
      negation introduction rule should not discharge."
  }
  
  var tmpCurForm = primeFormulaForCompare(curProofLine.formule);
  var tmpFormule = primeFormulaForCompare(rulePremises[0].formule);
  if (tmpCurForm !== "¬¬" + tmpFormule){
    throw lnoErrStr + "A formule specified in the annotation does not \
    match the inputed formula."
  }

  return true;
}

module.exports = DoubleNegationIntroRule;
