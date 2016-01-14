var rules = require('./rules/rules.js');
var genProofLine = require('./ProofLine.js').genProofLine;
var ProofGraph = require('./ProofGraph.js');
var FOLParser = require('../parser/parser.js');
var AssumptionRule = require('./rules/AssumptionRule.js');
var compareFormule = require('../../util/util.js').compareFormule;
var addEqualsToArrayPrototype = require('../../util/util.js').addEqualsToArrayPrototype;

function Proof(premises, goal) {
  this.premises = premises;
  this.goal = goal;
  this.proofLines = [];
}

function validateProof(proof) {
  var prfLineLen = proof.proofLines.length;
  var goal = proof.goal;
  var isProofValid = true;
  if (prfLineLen>0) {
    var proofGraph = new ProofGraph(proof.proofLines);
    var lastProoLineFormule = proof.proofLines[prfLineLen-1].formule;

    //Checking that the last line is derived using a graph data structure.
    try {
      isProofValid = DFS_VALIDATE(proofGraph, proof.proofLines[prfLineLen-1]);
    } catch (err) {
      console.log(err);
      return {
        isProofValid: false,
        err: err
      }
    }
  }

  var isPremiseMaintained = true;
  var premiseDepAssumptions = [];
  premiseLoop:
  for(var i=0; i<proof.premises.length;i++){
    for (var j = 0; j<proof.proofLines.length; j++) {
      if(compareFormule(proof.premises[i],proof.proofLines[j].formule)) {
        if(proof.proofLines[j].rule==="A") {
          premiseDepAssumptions.push(proof.proofLines[j].depAssumptions[0]);
          continue premiseLoop;
        }
      }
    }
    isPremiseMaintained = false;
  }

  var isGoalAttained = compareFormule(goal,lastProoLineFormule);
  if (isGoalAttained) {
    var lastLineDepAssumptions = proof.proofLines[prfLineLen-1].depAssumptions;
    for (var i = lastLineDepAssumptions.length - 1; i >= 0; i--) {
      if (premiseDepAssumptions.indexOf(lastLineDepAssumptions[i])<0) {
        isGoalAttained = false;
        break;
      }
    };
  }
  return {
    isProofValid       : isProofValid,
    isPremiseMaintained: isPremiseMaintained,
    isGoalAttained     : isGoalAttained
  }
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
  var rule = rules[ruleStr];
  if (rule===undefined){
    throw "Invalid Rule specified: " + ruleStr;
  }
  return rule;
}

function genNewProof(proofName){
  //Double validation: Ideally when code reaches here, its already validate
  //at the client side for WFS.
  if (FOLParser.isWFS(proofName).status){
    var seqArr = proofName.trim().split("⊢");
    var proofLines = [];
    var proofGoal = "";
    var premises = [];
    //Indexing is okay since its WFS.
    if (seqArr[0]!==''){
      premises = seqArr[0].split(",");
      for (var i=0; i<premises.length; i++){
        var proofLine = genProofLine({
          depAssumptions : (i+1).toString(),
          lineNo         : (i+1).toString(),
          formule        : premises[i],
          annotation     : "A",
          rule           : null
        });
        if (proofLine.status===true){
          proofLines.push(proofLine.proofLine);
        } else {
          return {
            status: false,
            err: proofLine.err
          };
        }
      }
    }
    proofGoal = seqArr[1];
    var proof = new Proof(premises, proofGoal);
    proof.proofLines = proofLines;
    //unwanted validation: Ideally a new proof object contains only assumptions
    //or nothing at all. But still...
    var proofStatus = validateProof(proof);
    return {
      status: true,
      proof: proof,
      proofStatus: proofStatus
    }
  } else {
    return {
      status: false,
      err: "Invalid sequent."
    }
  }
}

module.exports.validateProof = validateProof;
module.exports.Proof = Proof;
module.exports.genNewProof = genNewProof;
