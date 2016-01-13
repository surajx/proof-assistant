var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulasForConnective = require('./ruleUtil.js').getTopLevelFormulasForConnective;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function ConjunctionIntroRule(){};

//No Discharge
ConjunctionIntroRule.prototype.validate = function(proofGraph, curProofLine){
  var rulePremises = proofGraph.getAdjOf(curProofLine);

  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);

  if (!dependencyVerifyObj.status){
    throw dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    throw "Discharge specified, but conjunction \
      introduction rule should not discharge."
  }

  var topLevelConjuncts =  getTopLevelFormulasForConnective(curProofLine.formule, "∧");
  if (topLevelConjuncts.length===0) {
    throw "Could not find a top level conjunction for the given formule, check your \
    formule and make sure that an ∧ symbol is the outermost logical connective."
  }
  for (var i = rulePremises.length - 1; i >= 0; i--) {
    var tmpFormule = primeFormulaForCompare(rulePremises[i].formule);
    if (topLevelConjuncts.indexOf(tmpFormule)<0){
      throw "A formule specified in the annotation is not a \
        top level conjuct in the proof line."
    }
  }
  return true;
}

module.exports = ConjunctionIntroRule;
