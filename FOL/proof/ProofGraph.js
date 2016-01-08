var HashMap = require('hashmap');

function ProofGraph(proofLines) {
  this.AdjList = new HashMap();
  for (var i = proofLines.length; i-- > 0;){
    var adjProofLines = [];
    for (var j = 0; j<proofLines[i].annotations.length; j++) {
      var annotation = proofLines[i].annotations[j];
      if (annotation.annotation!=="A")
        adjProofLines.push(proofLines[annotation.annotation-1]);
    };
    this.AdjList.set(proofLines[i], adjProofLines);
  }
}

ProofGraph.prototype.getAdjOf = function(proofLine){
  return this.AdjList.get(proofLine);
}

module.exports = ProofGraph;
