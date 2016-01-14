var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulasForConnective = require('./ruleUtil.js').getTopLevelFormulasForConnective;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function ConjunctionElimRule(){};

//No Discharge
ConjunctionElimRule.prototype.validate = function(proofGraph, curProofLine){
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==1){
    throw lnoErrStr + "∧E rule should have only one annotation. Given: " +
      curProofLine.annotationsStr.join(',');
  }
  if(rulePremises.length!==1) {
    throw lnoErrStr + "∧E rule should have exactly one premises. Make sure that your \
      annotation contains references to exactly one line-number.";
  }

  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);

  if (!dependencyVerifyObj.status){
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    throw lnoErrStr + "Discharge specified, but conjunction \
      elimination rule should not discharge."
  }

  //TODO: can remove for loop since we fixed valid a length for rulePremise.
  var curFormule = primeFormulaForCompare(curProofLine.formule);
  for (var i = rulePremises.length - 1; i >= 0; i--) {
    var topLevelConjuncts =  getTopLevelFormulasForConnective(rulePremises[i].formule, "∧");
    if (topLevelConjuncts.length===0) {
      throw lnoErrStr + "Could not find a top level conjunction for the premise \
      formule, " + rulePremises[i].formule + ". Check the formule and make sure \
      that an ∧ symbol is the outermost logical connective."
    }
    for (var j = topLevelConjuncts.length - 1; j >= 0; j--) {
      var oneTopLevelConjunct = topLevelConjuncts[j].replace(/ /g,'');
      if (curFormule===oneTopLevelConjunct) return true;
    }
  }
  throw lnoErrStr + "Formule not derived from a top \
    level conjunct specified in the rule annotations."
}

module.exports = ConjunctionElimRule;
