var addEqualsToArrayPrototype = require('../../../util/util.js').addEqualsToArrayPrototype;


function dischargeVerifier(rulePremises, curProofLine){
  var curAnnotations = curProofLine.annotations;
  for (var i = curAnnotations.length - 1; i >= 0; i--) {
    if(curAnnotations[i].discharge===null) continue;
    for (var j = rulePremises.length - 1; j >= 0; j--) {
      if (rulePremises[j].lineNo===curAnnotations[i].annotation){
        if (rulePremises[j].depAssumptions.indexOf(curAnnotations[i].discharge)<0){
          return {
            status:false,
            err: "Invalid discharge assumption. The discharge assumption in annotation " +
              curAnnotations[i].annotation + "[" + curAnnotations[i].discharge + "] is \
              not part of the dependent assumptions of line: " + rulePremises[j].lineNo
          }
        }
      }
    };
  };
  return {
    status: true
  }
}


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

  //Collect all the assumtions of rule premises.
  var premiseDepAssumptions = [];
  for (var i = rulePremises.length - 1; i >= 0; i--) {
    premiseDepAssumptions = premiseDepAssumptions.concat(rulePremises[i].depAssumptions);
  }

  //Filter out duplicates and sort.
  premiseDepAssumptions = premiseDepAssumptions.filter(function(elem, pos) {
    return premiseDepAssumptions.indexOf(elem) == pos;
  });
  premiseDepAssumptions.sort(function(a, b){return parseInt(a)-parseInt(b)});

  //creating and array of discharges used.
  var dischargeArray = createDischargeArray(curProofLine);

  //If discharged, then remove the discharged assumptions from the assumptions
  // of the rule premises.
  if (dischargeArray.length>0){
    var hasDischarged = true;
    for (var i = dischargeArray.length - 1; i >= 0; i--) {
        var dischargePos = premiseDepAssumptions.indexOf(dischargeArray[i]);
        //NOTE: this does not mean that the discharges assumtion is for the
        // correct premise, this has to be separately verified.
        if (dischargePos>=0){
            premiseDepAssumptions.splice(dischargePos, 1);
        } else {
            return {
                status:false,
                err: "Invalid discharge assumption. The discharged assumption [" +
                  dischargeArray[i] + "] is not part of any dependent assumptions."
            }
        }
    }
  }

  //Verify if the provided dependent assumptions for the proof line is equal
  //to the calculated dependent assumptions.
  if (premiseDepAssumptions.equals(curProofLineDep))
    return {
        status: true,
        discharged: hasDischarged
    }
  return {
    status: false,
    err: "Assumptions of the rule premises to not tally with the\
        dependent assumptions provided."
  }
}

module.exports.dependencyVerifier = dependencyVerifier;
module.exports.dischargeVerifier = dischargeVerifier;
