var ProofGraph = require('./ProofGraph.js');
var AssumptionRule = require('./rules/AssumptionRule.js');

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
  proofGraph.getAdjOf(curProofLine).forEach(function(depProofLines){
    if(!isCurProofLineValid) return false;
    isCurProofLineValid = isCurProofLineValid &&
      (DFS_VALIDATE(proofGraph, depProofLines));
  });
  isCurProofLineValid = isCurProofLineValid &&
    (matchRule(curProofLine.rule).validate(proofGraph, curProofLine));
  return isCurProofLineValid;
}

function matchRule(rule) {
  switch (rule) {
    case "A" :
      return new AssumptionRule();
    case "∧E":
      return new ConjunctionElimRule();
    case "∧I":
      return new ConjunctionIntroRule();
    case "∨E":
      return new DisjunctionElimRule();
    case "∨I":
      return new DisjunctionIntroRule();
    case "→E":
      return new ImplicationElimRule();
    case "→I":
      return new ImplicationIntroRule();
    case "RAA":
      return new ReductioAdAbsurdumRule();
    case "¬¬E":
      return new DoubleNegationElimRule();
    case "¬¬I":
      return new DoubleNegationIntroRule();
    case "¬E":
      return new NegationElimRule();
    case "¬I":
      return new NegationIntroRule();
    default:
      throw "Invalid Rule specified: " + rule;
  }
}

module.exports.validateProof = validateProof;
module.exports.Proof = Proof;
