function DoubleNegationIntroRule(){
  DoubleNegationIntroRule.rulename = "";
}

DoubleNegationIntroRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = DoubleNegationIntroRule;
