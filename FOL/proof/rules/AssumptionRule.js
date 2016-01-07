function AssumptionRule(){
  AssumptionRule.rulename = "";
}

AssumptionRule.prototype.validate = function(){
  return true;
}


module.exports = AssumptionRule;
