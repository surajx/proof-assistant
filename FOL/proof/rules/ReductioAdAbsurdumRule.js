var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var dischargeVerifier = require('./dependencyVerifier.js').dischargeVerifier;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function ReductioAdAbsurdumRule(){
}

ReductioAdAbsurdumRule.prototype.validate = function(proofGraph, curProofLine){
  console.log("function called");
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==2) {
    throw lnoErrStr + "RAA rule should have two annotations. Given: " + curProofLine.annotationsStr.join(',');
  }
  console.out("rulePremises", rulePremises);
  
  var dependencyVerifyObj = dependencyVerifier(rulePremises, curProofLine);
  if (!dependencyVerifyObj.status){
    throw lnoErrStr + dependencyVerifyObj.err;
  } else if(dependencyVerifyObj.discharged){
    var verifierContainer =  dischargeVerifier(rulePremises, curProofLine);
    if(!verifierContainer.status) {
      throw lnoErrStr + verifierContainer.err;
    }
  }
  
  //Check that the formulae referenced to by the annotations form a contradiction
  var tmpFormuleArray = [primeFormulaForCompare(rulePremises[0].formule), primeFormulaForCompare(rulePremises[1].formule)];
  if (tmpFormuleArray[0].length > tmpFormuleArray[1].length) {tmpFormuleArray.reverse()};
  if ("¬" + tmpFormuleArray[0] !== tmpFormuleArray[1]){
      throw lnoErrStr + "formulae referenced to by the annotations \
      do not form a contradiction."
  }
    
  // If discharge is vacuous rulePremises should equal 2 otherwise 3
  if(rulePremises.length === 2){
    var tmpCurForm = primeFormulaForCompare(curProofLine.formule);
    if (tmpCurForm.charAt(0)!== '¬'){
      throw lnoErrStr + "Inputted formulae does not have a negation"
    }
  } else if (rulePremises.length === 3){
    var tmpCurForm = primeFormulaForCompare(curProofLine.formule);
    var tmpRefForm = primeFormulaForCompare(rulePremises[2].formule);
    if(tmpCurForm !== "¬" + tmpRefForm){
      throw lnoErrStr + "discharged formulae does not match the negated input formulae";
    }
  } else {
    throw lnoErrStr + "RAA rule should have 2 or 3 premises. Make sure that your \
      annotation contains references to one or more line-numbers.";
  }
  
  return true;
}


module.exports = ReductioAdAbsurdumRule;
