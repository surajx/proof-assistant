function AssumptionRule(){};

AssumptionRule.prototype.validate = function(proofGraph, curProofLine){
  var lnoErrStr = "[line: "+curProofLine.lineNo+"]: "
  var depAssumptions = curProofLine.depAssumptions;
  if (depAssumptions.length!=1) {
    throw lnoErrStr + "An asusmtption rule should have only one dependency, itself!"
  }
  if (depAssumptions[0]!=curProofLine.lineNo) {
    throw lnoErrStr + "An asusmtption rule's dependency should be same as its own line number."
  }
  return true;
}


module.exports = AssumptionRule;
