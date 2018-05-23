var rules = require('./rules/rules.js');
var genProofLine = require('./ProofLine.js').genProofLine;
var validateProofLine = require('./ProofLine.js').validateProofLine;
var ProofGraph = require('./ProofGraph.js');
var FOLParser = require('../parser/parser.js');
var AssumptionRule = require('./rules/AssumptionRule.js');
var compareFormule = require('../../util/util.js').compareFormule;

function Proof(premises, goal) {
  // a proof is consist of the premises we have
  //                       the ultimate goal we need to achieve
  //                   and the natural deduction in between
  this.premises = premises;
  this.goal = goal;
  this.proofLines = [];
}

function validateProofAsync(proof, callback){
  process.nextTick(function(){
    callback(validateProofServer(proof));
  });
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
  var validateProofStatus;
  for (var i = proof.proofLines.length; i >= 1; i--) {
    validateProofStatus = validateProof(proof, i);
    if(!validateProofStatus.isProofValid) return validateProofStatus;
  }
  return validateProofStatus;
}

function validateProof(proof, prfLineLen) {
  if(!prfLineLen){
    prfLineLen = proof.proofLines.length
  }
  //TODO: check if some malicious data can throw DFS_VALIDATE into
  //a infinite recursive loop.
  var goal = proof.goal;
  var isProofValid = true;
  if (prfLineLen>0) {
    var proofGraph = new ProofGraph(proof.proofLines);
    var lastProoLineFormule = proof.proofLines[proof.proofLines.length-1].formule;

    //Checking that the last line is derived using a graph data structure.
    try {
      for (var i = proof.proofLines.length; i >= prfLineLen; i--) {
        isProofValid = DFS_VALIDATE(proofGraph, proof.proofLines[i-1]);
        if(!isProofValid) break;
      }
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
      var lastLineDepAssumptions = proof.proofLines[proof.proofLines.length-1].depAssumptions;
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

function genNewProofAsync(proofName, callback){
  process.nextTick(function(){
    callback(genNewProof(proofName));
  });
}

function genNewProof(proofName){
  //Double validation: Ideally when code reaches here, its already validate
  //at the client side for WFS.
  if (FOLParser.isWFS(proofName).status){
    //separate the logic sequence in two parts by ⊢
    var seqArr = proofName.trim().split("⊢");
    var proofLines = [];
    var proofGoal = "";
    var premises = [];
    //Indexing is okay since its WFS.
    //situations where premises exist, sometimes we may have some tautology without any premises
    if (seqArr[0]!==''){
      // separate each conditions by ,
      premises = seqArr[0].split(",");
      for (var i=0; i<premises.length; i++){
        //automatially assume by the program to save some time
        var proofLine = genProofLine({
          depAssumptions : (i+1).toString(),
          lineNo         : (i+1).toString(),
          formule        : premises[i],
          annotation     : "A",
          rule           : ""
        });
        //if the proof line is correct, we store this line
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
    // the second part is the final formula we need to derive in the end
    proofGoal = seqArr[1];
    //create the new proof
    var proof = new Proof(premises, proofGoal);
    //assign the assumption to the new proof
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

function autoProof() {
  //! FIXME: Add auto proof code here!!!!!!!!!!
  // return [{
  //   "depAssumptions":"7",
  //   "formule": "qwerfasdf",
  //   "annotation": "A",
  //   "selectedRule": "A"
  // },
  // {
  //   "depAssumptions":"8",
  //   "formule": "qwerfasdf",
  //   "annotation": "A",
  //   "selectedRule": "A"
  // }];
  return [];
}

module.exports.validateProofAsync = validateProofAsync;
module.exports.validateProof = validateProof;
module.exports.genNewProofAsync = genNewProofAsync;
module.exports.autoProof = autoProof;
