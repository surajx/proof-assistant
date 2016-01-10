var addEqualsToArrayPrototype = require('../../../util/util.js').addEqualsToArrayPrototype;

function createDischargeArray (curProofLine) {
    var annotations = curProofLine.annotations;
    var dischargeArray = [];
    for (var i = annotations.length - 1; i >= 0; i--) {
        if (annotations[i].discharge!==null){
            dischargeArray.push(annotations[i].discharge);
        }
    };
    dischargeArray.sort(function(a, b){return parseInt(a)-parseInt(b)});
    return dischargeArray;
}

function dependencyVerifier(rulePremises, curProofLine){
  if (Array.prototype.equals===undefined) addEqualsToArrayPrototype();
  var curProofLineDep = curProofLine.depAssumptions;
  var premiseDepAssumptions = [];
  for (var i = rulePremises.length - 1; i >= 0; i--) {
    premiseDepAssumptions = premiseDepAssumptions.concat(rulePremises[i].depAssumptions);
  }
  premiseDepAssumptions = premiseDepAssumptions.filter(function(elem, pos) {
    return premiseDepAssumptions.indexOf(elem) == pos;
  });
  premiseDepAssumptions.sort(function(a, b){return parseInt(a)-parseInt(b)});
  var dischargeArray = createDischargeArray(curProofLine);
  if (dischargeArray.length>0){
    var hasDischarged = true;
    for (var i = dischargeArray.length - 1; i >= 0; i--) {
        var dischargePos = premiseDepAssumptions.indexOf(dischargeArray[i]);
        if (dischargePos>=0){
            premiseDepAssumptions.splice(dischargePos, 1);
        } else {
            return {
                status:false,
                err: "Invalid discharge assumption."
            }
        }
    }
  }
  if (premiseDepAssumptions.equals(curProofLineDep))
    return {
        status: true,
        discharged: hasDischarged
    }
  return {
    status: false,
    err: "assumetions of the rule premises to not tally with \
        assumptions of the current proof line."
  }
}

module.exports = dependencyVerifier;
