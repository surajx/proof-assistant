function DoubleNegationElimRule(){
  DoubleNegationElimRule.rulename = "";
}

DoubleNegationElimRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = DoubleNegationElimRule;
