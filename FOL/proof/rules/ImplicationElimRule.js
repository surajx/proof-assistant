function ImplicationElimRule(){
  ImplicationElimRule.rulename = "";
}

ImplicationElimRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = ImplicationElimRule;
