var dependencyVerifier = require('./dependencyVerifier.js');
var getTopLevelConjuncts = require('./ruleUtil.js').getTopLevelConjuncts;

function ConjunctionIntroRule(){};

//No Discharge
ConjunctionIntroRule.prototype.validate = function(proofGraph, curProofLine){
  var rulePremises = proofGraph.getAdjOf(curProofLine);

  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);

  if (!dependencyVerifyObj.status){
    //TODO: return an error message also.
    // var err = "Dependent assumptions does not match \
    //  the provided annotations of the rule."
    // OR use the one that came from verification.
    return false;
  } else if(dependencyVerifyObj.discharged){
    //TODO: return an error message also.
    // var err = "Discharge specified, but conjunction \
    //  introduction rule should not discharge."
    //OR use the error message that come from verification.
    return false;
  }

  var topLevelConjuncts =  getTopLevelConjuncts(curProofLine.formule);
  for (var i = rulePremises.length - 1; i >= 0; i--) {
    var tmpFormule = rulePremises[i].formule;
    if (tmpFormule.length>=3) tmpFormule = '('+tmpFormule+')';
    if (topLevelConjuncts.indexOf(tmpFormule)<0){
      //TODO: return an error message also.
      //var err = "A formule specified in the annotation is not a \
      //  top level conjuct in the proof line."
      return false;
    }
  }
  return true;
}

module.exports = ConjunctionIntroRule;
