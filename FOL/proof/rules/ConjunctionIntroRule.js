var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulas = require('./ruleUtil.js').getTopLevelFormulas;
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

  var topLevelConjuncts =  getTopLevelFormulas(curProofLine.formule);
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
