var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;
var dischargeVerifier = require('./dependencyVerifier.js').dischargeVerifier;
var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var getTopLevelFormulasForConnective = require('./ruleUtil.js').getTopLevelFormulasForConnective;

function ImplicationIntroRule(){};

ImplicationIntroRule.prototype.validate = function(proofGraph, curProofLine) {
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==1){
    throw lnoErrStr + "→I rule should have only one annotation. Given: " + curProofLine.annotationsStr.join(',');
  }
  if(rulePremises.length===0 || rulePremises.length>2) {
    throw lnoErrStr + "→I rule should have only one or two premises. \
      Make sure that your annotation contains reference to a line-number \
      and an optional discharge assumption in the format: 2[1] or 2[]";
  }
  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);

  if (!dependencyVerifyObj.status) {
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged) {
    var verifierContainer =  dischargeVerifier(rulePremises, curProofLine);
    if(!verifierContainer.status) {
      throw lnoErrStr + verifierContainer.err;
    }
  }

  var topLevelImplicants =  getTopLevelFormulasForConnective(curProofLine.formule, "→");
  if (topLevelImplicants.length===0) {
    throw lnoErrStr + "Could not find a top level implicants for the given \
    formule, check your formule and make sure that an → symbol is the \
    top-most logical connective."
  }
  if (rulePremises.length===1) {
    var rulePremisFormula = primeFormulaForCompare(rulePremises[0].formule);
    if (topLevelImplicants[1]===rulePremisFormula){
      return true;
    } else {
      throw lnoErrStr + "The consequent of the given implication does not \
      match the annotated premise formule: " + rulePremises[0].formule;
    }
  } else if(rulePremises.length===2) {
    //TODO: Change to below code to not depend on the order of array entry
    // to determine antecendent and consequent.
    var pAntecedent = primeFormulaForCompare(rulePremises[1].formule);
    var pConsequent = primeFormulaForCompare(rulePremises[0].formule);
    if (pAntecedent===topLevelImplicants[0] &&
        pConsequent===topLevelImplicants[1]){
      return true;
    }
    throw lnoErrStr + "The discharged assumption: "+ rulePremises[1].formule +" does not \
      imply the annotated premise: "+ rulePremises[0].formule + " in the given \
      formule: " + curProofLine.formule + " by Implication Introduction rule.";
  }

}


module.exports = ImplicationIntroRule;
