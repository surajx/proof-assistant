var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulasForConnective = require('./ruleUtil.js').getTopLevelFormulasForConnective;
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
    var topLevelConjuncts =  getTopLevelFormulasForConnective(rulePremises[i].formule, "∧");
    if (topLevelConjuncts.length===0) {
      throw "Could not find a top level conjunction for the premise formule, "+
      rulePremises[i].formule + ". Check the formule and make sure that an ∧ symbol \
      is the outermost logical connective."
    }
    for (var j = topLevelConjuncts.length - 1; j >= 0; j--) {
      var oneTopLevelConjunct = topLevelConjuncts[j].replace(/ /g,'');
      if (curFormule===oneTopLevelConjunct) return true;
    }
  }
  throw "Formule not derived from a top \
    level conjunct specified in the rule annotations."
}

module.exports = ConjunctionElimRule;
