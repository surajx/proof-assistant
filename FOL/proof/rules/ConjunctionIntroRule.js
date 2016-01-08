function ConjunctionIntroRule(){
  ConjunctionIntroRule.rulename = "";
}

ConjunctionIntroRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = ConjunctionIntroRule;
