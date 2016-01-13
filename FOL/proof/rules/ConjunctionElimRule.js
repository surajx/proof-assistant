var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulas = require('./ruleUtil.js').getTopLevelFormulas;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function ConjunctionElimRule(){};

//No Discharge
ConjunctionElimRule.prototype.validate = function(proofGraph, curProofLine){
  var rulePremises = proofGraph.getAdjOf(curProofLine);

  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);

  if (!dependencyVerifyObj.status){
    throw dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    throw "Discharge specified, but conjunction \
      elimination rule should not discharge."
  }

  var curFormule = primeFormulaForCompare(curProofLine.formule);
  for (var i = rulePremises.length - 1; i >= 0; i--) {
    var topLevelConjuncts =  getTopLevelFormulas(rulePremises[i].formule);
    for (var j = topLevelConjuncts.length - 1; j >= 0; j--) {
      var oneTopLevelConjunct = topLevelConjuncts[j].replace(/ /g,'');
      if (curFormule===oneTopLevelConjunct) return true;
    }
  }
  throw "Formule not derived from a top \
    level conjunct specified in the rule annotations."
}

module.exports = ConjunctionElimRule;
