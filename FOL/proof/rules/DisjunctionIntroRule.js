function DisjunctionIntroRule(){
  DisjunctionIntroRule.rulename = "";
}

DisjunctionIntroRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = DisjunctionIntroRule;
