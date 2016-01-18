var dependencyVerifier = require('./dependencyVerifier.js').dependencyVerifier;
var dischargeVerifier = require('./dependencyVerifier.js').dischargeVerifier;
var primeFormulaForCompare = require('./ruleUtil.js').primeFormulaForCompare;

function NegationIntroRule(){
}

NegationIntroRule.prototype.validate = function(proofGraph, curProofLine){
  
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var rulePremises = proofGraph.getAdjOf(curProofLine);
  if(curProofLine.annotations.length!==1) {
    throw lnoErrStr + "¬I rule should have only one annotation. Given: " + curProofLine.annotationsStr.join(',');
  }
  
  if(rulePremises.length!==2) {
    throw lnoErrStr + "¬I rule should have exactly two premises. Make sure that your \
      annotation contains references to exactly two line-numbers.";
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
  
  //Check that rulePremises is correctly sorted
  if (curProofLine.annotations[0].annotation != rulePremises[0].lineNo){
    rulePremises.reverse();
  }
  
  //Check that rulePremise lines are correct (this may be redundant)
  if (curProofLine.annotations[0].annotation != rulePremises[0].lineNo 
      && curProofLine.annotations[0].discharge != rulePremises[1].lineNo){
    throw lnoErrStr + "lines referenced by given annotations do not match retrieved \
      lines"
  }
  
  //Check that formulae referenced by annotation only contains ⊥
  if(rulePremises[0].formule !== "⊥"){
    throw lnoErrStr + "¬I rule annotation can only referance the formule \'⊥\'";
  }
  
  //Check that current formulae correctly adds ¬ to formulae of line discharged
  var tmpCurForm = primeFormulaForCompare(curProofLine.formule);
  var tmpRefForm = primeFormulaForCompare(rulePremises[1].formule);
  if(tmpCurForm !== "¬" + tmpRefForm){
    throw lnoErrStr + "discharged formulae does not match the negated inputed formulae";
  }

  return true;
}


module.exports = NegationIntroRule;
