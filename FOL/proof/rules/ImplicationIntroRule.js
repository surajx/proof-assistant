function ImplicationIntroRule(){
  ImplicationIntroRule.rulename = "";
}

ImplicationIntroRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = ImplicationIntroRule;
