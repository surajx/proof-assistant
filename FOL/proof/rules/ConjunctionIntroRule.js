var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulasForConnective = require('./ruleUtil.js').getTopLevelFormulasForConnective;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function ConjunctionIntroRule(){};

//No Discharge
ConjunctionIntroRule.prototype.validate = function(proofGraph, curProofLine){
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==2) {
    throw lnoErrStr + "∧I rule should have two annotations. Given: " + curProofLine.annotationsStr.join(',');
  }
  if(rulePremises.length!==2) {
    throw lnoErrStr + "∧I rule should have exactly two premises. Make sure that your \
      annotation contains references to exactly two line-numbers.";
  }

  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);

  if (!dependencyVerifyObj.status){
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    throw lnoErrStr + "Discharge specified, but conjunction \
      introduction rule should not discharge."
  }

  var topLevelConjuncts =  getTopLevelFormulasForConnective(curProofLine.formule, "∧");
  if (topLevelConjuncts.length===0) {
    throw lnoErrStr + "Could not find a top level conjunction for the given formule, check your \
    formule and make sure that an ∧ symbol is the outermost logical connective."
  }
  for (var i = rulePremises.length - 1; i >= 0; i--) {
    var tmpFormule = primeFormulaForCompare(rulePremises[i].formule);
    if (topLevelConjuncts.indexOf(tmpFormule)<0){
      throw lnoErrStr + "A formule specified in the annotation is not a \
        top level conjunct in the proof line."
    }
  }
  return true;
}

module.exports = ConjunctionIntroRule;
