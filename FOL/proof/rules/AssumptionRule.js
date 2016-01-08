function AssumptionRule(){};

AssumptionRule.prototype.validate = function(proofGraph, curProofLine){
  return true;
}


module.exports = AssumptionRule;
