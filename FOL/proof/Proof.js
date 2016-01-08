var ProofGraph = require('./ProofGraph.js');
var AssumptionRule = require('./rules/AssumptionRule.js');
var ProofLine = require('./ProofLine.js');

function Proof(premises, goal){
  this.premises = premises;
  this.goal = goal;
  this.proofLines = [];
}

function validateProof(proof) {
  var prfLineLen = proof.proofLines.length;
  var proofGraph = new ProofGraph(proof.proofLines);
  try{
    var isProofValid = DFS_VALIDATE(proofGraph, proof.proofLines[prfLineLen-1]);
  } catch (err) {
    console.log(err);
    return {
      isProofValid: false,
      err: err
    }
  }

  var isPremiseMaintained = true;
  for(var i=0; i<proof.premises.length;i++){
    isPremiseMaintained = isPremiseMaintained && (proof.premises[i].replace(/ /g,'')===
      proof.proofLines[i].formule.replace(/ /g,''));
  }

  var isGoalAttained = proof.goal.replace(/ /g,'')===
      proof.proofLines[prfLineLen-1].formule.replace(/ /g,'');
  return {
    isProofValid       : isProofValid,
    isPremiseMaintained: isPremiseMaintained,
    isGoalAttained     : isGoalAttained
  };
}

function DFS_VALIDATE(proofGraph, curProofLine){
  var isCurProofLineValid = true;
  var adjProofLines = proofGraph.getAdjOf(curProofLine);
  for(var i=0; i<adjProofLines.length;i++){
    var depProofLines = adjProofLines[i];
    if(!isCurProofLineValid) return false;
    isCurProofLineValid = isCurProofLineValid &&
      (DFS_VALIDATE(proofGraph, depProofLines));
  }
  isCurProofLineValid = isCurProofLineValid &&
    (matchRule(curProofLine.rule).validate(proofGraph, curProofLine));
  return isCurProofLineValid;
}

function matchRule(ruleStr) {
  var rules = require('./rules/rules.js');
  var rule = rules[ruleStr];
  if (rule===undefined){
    throw "Invalid Rule specified: " + ruleStr;
  }
  return rule;
}

module.exports.validateProof = validateProof;
module.exports.Proof = Proof;
module.exports.genProofLine = ProofLine.genProofLine;
