var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulasForConnective = require('./ruleUtil.js').getTopLevelFormulasForConnective;
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
  
  var topLevelConjuncts =  getTopLevelFormulasForConnective(curProofLine.formule, "¬");
  if (topLevelConjuncts.length===0) {
    throw lnoErrStr + "Could not find a top level conjunction for the given formule, check your \
    formule and make sure that ¬¬ is the outermost logical connective."
  }
  
  var tmpFormule = primeFormulaForCompare(rulePremises[0].formule);
  console.log(topLevelConjuncts[0], "¬" + tmpFormule)
  if (topLevelConjuncts[0] !== "¬" + tmpFormule){
    throw lnoErrStr + "A formule specified in the annotation is not a \
    top level conjunct in the proof line."
  }
  
  return true;
}

module.exports = DoubleNegationIntroRule;
