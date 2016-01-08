function NegationElimRule(){
  NegationElimRule.rulename = "";
}

NegationElimRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = NegationElimRule;
