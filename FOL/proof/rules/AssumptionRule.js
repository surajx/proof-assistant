function AssumptionRule(){};

AssumptionRule.prototype.validate = function(proofGraph, curProofLine){
  var depAssumptions = curProofLine.depAssumptions;
  if (depAssumptions.length!=1) return false;
  if (depAssumptions[0]!=curProofLine.lineNo) return false;
  return true;
}


module.exports = AssumptionRule;
