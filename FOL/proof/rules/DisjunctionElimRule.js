var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var dischargeVerifier = require('./dependencyVerifier.js').dischargeVerifier;
var getTopLevelFormulasForConnective = require('./ruleUtil.js').getTopLevelFormulasForConnective;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function DisjunctionElimRule(){};

DisjunctionElimRule.prototype.validate = function(proofGraph, curProofLine){
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==3){
    throw lnoErrStr + "∨E rule should have exactly three annotations. \
    Given: " + curProofLine.annotationsStr.join(',');
  }
  //TODO: consider vacuous discharge also.
  if(rulePremises.length!==5) {
    throw lnoErrStr + "∨E rule should have exactly three premises. \
      Make sure that your annotation contains two  premises with discharge \
      assumptions and one without. Eg: 1,5[2],8[6]";
  }
  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);
  if (!dependencyVerifyObj.status) {
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(!dependencyVerifyObj.discharged) {
    throw lnoErrStr + "Discharge not specified, but disjunction \
      introduction rule should discharge."
  }

  var dischargingPremises = [];
  for (var i = curProofLine.annotationsStr.length - 1; i >= 0; i--) {
    if(curProofLine.annotationsStr[i].match(/^(\d+)\[(\d*)\]$/)===null){
      for (var j = 0; j < rulePremises.length; j++) {
        if(rulePremises[j].lineNo===curProofLine.annotations[i].annotation){
          var nonDischargingPremise = rulePremises[j];
        } else {
          dischargingPremises.push(rulePremises[j]);
        }
      };
    }
    if (nonDischargingPremise!==undefined) break;
  };

  if(nonDischargingPremise===undefined){
    throw "∨E rule should have exactly one non-discharging annotation, \
    non-given. Eg: 1,5[2],8[6]"
  }

  var disjuncts = [];
  var derivitives = [];
  for (var i = 1; i <=dischargingPremises.length; i++) {
    if (i%2===0)
      disjuncts.push(primeFormulaForCompare(dischargingPremises[i-1].formule));
    else
      derivitives.push(primeFormulaForCompare(dischargingPremises[i-1].formule));
  };

  var topLevelDisjuncts =  getTopLevelFormulasForConnective(nonDischargingPremise.formule, "∨");
  if (topLevelDisjuncts.length===0) {
    throw lnoErrStr + "Could not find top level disjuncts for the \
    formule"+ nonDischargingPremise.formule +", check the formule \
    and make sure that an ∨ symbol is the top-most logical connective."
  }
  if(disjuncts.length!==2 || derivitives.length!==2) {
    throw lnoErrStr + "System error!. Could not gather the annotation formulas \
    assumptions correctly";
  }
  if(!((disjuncts[0]===topLevelDisjuncts[0] &&
      disjuncts[1]===topLevelDisjuncts[1]) ||
     (disjuncts[1]===topLevelDisjuncts[0] &&
      disjuncts[0]===topLevelDisjuncts[1]))) {
    throw lnoErrStr + "Assumptions "+disjuncts[0]+" and " +disjuncts[1]+
    " on disjunction do not form the premise " + nonDischargingPremise.formule;
  }
  if(derivitives[0]!==derivitives[1]) {
    throw lnoErrStr + "The independently derivied results from "+
    disjuncts[0]+" and " + disjuncts[1]+ " does not match. " + derivitives[0]+
    " is derived from " + disjuncts[0] +", and " + derivitives[1] +
    " is derived from " + disjuncts[1];
  }
  var tmpCurFormule = primeFormulaForCompare(curProofLine.formule);
  if (derivitives[0]!==tmpCurFormule) {
    throw lnoErrStr + "The given formule is not same as the formule \
    derived from the individual disjuncts of "+ nonDischargingPremise.formule;
  }
  return true;
}


module.exports = DisjunctionElimRule;
