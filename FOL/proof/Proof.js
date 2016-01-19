var rules = require('./rules/rules.js');
var genProofLine = require('./ProofLine.js').genProofLine;
var validateProofLine = require('./ProofLine.js').validateProofLine;
var ProofGraph = require('./ProofGraph.js');
var FOLParser = require('../parser/parser.js');
var AssumptionRule = require('./rules/AssumptionRule.js');
var compareFormule = require('../../util/util.js').compareFormule;

function Proof(premises, goal) {
  this.premises = premises;
  this.goal = goal;
  this.proofLines = [];
}

function validateProofServer(proof){
  var goal = proof.goal.trim();
  //Check if received goal is valid.
  if (goal==='' || goal===undefined ||
      goal===null || !FOLParser.isWFF(goal).status){
    return {
      isProofValid: false,
      err: "Invalid goal format specified: " + goal
    }
  }
  //Check if all proofs lines are valid
  for (var i = proof.proofLines.length - 1; i >= 0; i--) {
    var pl_st = validateProofLine(proof.proofLines[i]);
    if(!pl_st.status){
      return {
        isProofValid: false,
        err: pl_st.err
      }
    }
  };
  //Check if all premises are valid.
  for (var i = proof.premises.length - 1; i >= 0; i--) {
    var premiseWFFCheck = FOLParser.isWFF(proof.premises[i].trim());
    if(!premiseWFFCheck.status){
      return {
        isProofValid: false,
        err: premiseWFFCheck.err
      }
    }
  };
  return validateProof(proof);
}

function validateProof(proof) {
  //TODO: check if some malicious data can throw DFS_VALIDATE into
  //a infinite recursive loop.
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
  var isGoalAttained = false;
  if(lastProoLineFormule!==undefined){
    isGoalAttained = compareFormule(goal,lastProoLineFormule);
    if (isGoalAttained) {
      var lastLineDepAssumptions = proof.proofLines[prfLineLen-1].depAssumptions;
      for (var i = lastLineDepAssumptions.length - 1; i >= 0; i--) {
        if (premiseDepAssumptions.indexOf(lastLineDepAssumptions[i])<0) {
          isGoalAttained = false;
          break;
        }
      };
    }
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
          rule           : ""
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

module.exports.validateProofServer = validateProofServer;
module.exports.validateProof = validateProof;
module.exports.genNewProof = genNewProof;
