function DisjunctionElimRule(){
  DisjunctionElimRule.rulename = "";
}

DisjunctionElimRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = DisjunctionElimRule;
