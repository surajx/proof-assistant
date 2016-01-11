var rules = require('./rules/rules.js');
var genProofLine = require('./ProofLine.js').genProofLine;
var ProofGraph = require('./ProofGraph.js');
var FOLParser = require('../parser/parser.js');
var AssumptionRule = require('./rules/AssumptionRule.js');
var addEqualsToArrayPrototype = require('../../util/util.js').addEqualsToArrayPrototype;

function Proof(premises, goal) {
  this.premises = premises;
  this.goal = goal;
  this.proofLines = [];
}

function validateProof(proof) {
  var prfLineLen = proof.proofLines.length;
  var goal = proof.goal.replace(/ /g,'');
  var isProofValid = true;
  if (prfLineLen>0) {
    var proofGraph = new ProofGraph(proof.proofLines);
    var lastProoLineFormule = proof.proofLines[prfLineLen-1].formule.replace(/ /g,'');

    //Checking that the last line is derived using a graph data structure.
    try {
      var isProofValid = DFS_VALIDATE(proofGraph, proof.proofLines[prfLineLen-1]);
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
  for(var i=0; i<proof.premises.length;i++){
    premiseDepAssumptions = premiseDepAssumptions.concat(proof.proofLines[i].depAssumptions);
    isPremiseMaintained = isPremiseMaintained && (proof.premises[i].replace(/ /g,'')===
      proof.proofLines[i].formule.replace(/ /g,''));
  }

  var isGoalAttained = goal===lastProoLineFormule;
  if (isGoalAttained) {
    if (Array.prototype.equals===undefined) addEqualsToArrayPrototype();
    if(!proof.proofLines[prfLineLen-1].depAssumptions.equals(premiseDepAssumptions))
      isGoalAttained = false;
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
module.exports.genProofLine = genProofLine;
