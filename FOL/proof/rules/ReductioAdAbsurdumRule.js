function ReductioAdAbsurdumRule(){
  ReductioAdAbsurdumRule.rulename = "";
}

ReductioAdAbsurdumRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = ReductioAdAbsurdumRule;
