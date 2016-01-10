function NegationIntroRule(){
  NegationIntroRule.rulename = "";
}

NegationIntroRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = NegationIntroRule;
