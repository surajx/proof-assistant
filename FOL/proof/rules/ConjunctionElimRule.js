var dependencyVerifier = require('./dependencyVerifier.js');
var getTopLevelConjuncts = require('./ruleUtil.js').getTopLevelConjuncts;

function ConjunctionElimRule(){};

//No Discharge
ConjunctionElimRule.prototype.validate = function(proofGraph, curProofLine){
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
    //  elimination rule should not discharge."
    //OR use the error message that come from verification.
    return false;
  }

  for (var i = rulePremises.length - 1; i >= 0; i--) {
    var topLevelConjuncts =  getTopLevelConjuncts(rulePremises[i].formule);
    for (var j = topLevelConjuncts.length - 1; j >= 0; j--) {
      var curFormule = curProofLine.formule.replace(/ /g,'');
      var oneTopLevelConjunct = topLevelConjuncts[j].replace(/ /g,'');
      if (curFormule===oneTopLevelConjunct) return true;
    }
  }
  //TODO: return an error message also.
  //var err = "Formule not derived from a top \
  //  level conjunct specified in the rule annotations."
  return false;
}

module.exports = ConjunctionElimRule;
