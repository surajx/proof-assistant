var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var dischargeVerifier = require('./dependencyVerifier.js').dischargeVerifier;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function ReductioAdAbsurdumRule(){
}

ReductioAdAbsurdumRule.prototype.validate = function(proofGraph, curProofLine){
  
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==2) {
    throw lnoErrStr + "RAA rule should have two annotations. Given: " + curProofLine.annotationsStr.join(',');
  }
  
  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);
  if (!dependencyVerifyObj.status){
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    var verifierContainer =  dischargeVerifier(rulePremises, curProofLine);
    if(!verifierContainer.status) {
      throw lnoErrStr + verifierContainer.err;
    }
  }
  
  // Variable to keep track of the position of the discharged ProofLine in RulePremises 
  var arrDischrOffset = 0;  
  
  // If discharge is vacuous rulePremises should equal 2 otherwise 3
  if(rulePremises.length === 2){
    var tmpCurForm = primeFormulaForCompare(curProofLine.formule);
    if (tmpCurForm.charAt(0)!== '¬'){
      throw lnoErrStr + "Inputted formulae does not have a negation"
    }
  } else if (rulePremises.length === 3){
      if (curProofLine.annotations[0].discharge !== '') {arrDischrOffset = 1;}
      var tmpCurForm = primeFormulaForCompare(curProofLine.formule);
      var tmpRefForm = primeFormulaForCompare(rulePremises[2 - arrDischrOffset].formule);
      if(tmpCurForm !== "¬" + tmpRefForm){
        throw lnoErrStr + "discharged formulae does not match the negated input formulae";
    }
  } else {
      throw lnoErrStr + "RAA rule should have 2 premises. Make sure that your \
        annotation contains references to one or more line-numbers.";
  }
  
  //Check that the formulae referenced to by the annotations form a contradiction
  var tmpFormuleArray = [primeFormulaForCompare(rulePremises[0].formule), primeFormulaForCompare(rulePremises[1 + arrDischrOffset].formule)];
  if (tmpFormuleArray[0].length > tmpFormuleArray[1].length) {tmpFormuleArray.reverse()};
  if ("¬" + tmpFormuleArray[0] !== tmpFormuleArray[1]){
      throw lnoErrStr + "formulae referenced to by the annotations \
      do not form a contradiction."
  }
  
  return true;
}


module.exports = ReductioAdAbsurdumRule;
