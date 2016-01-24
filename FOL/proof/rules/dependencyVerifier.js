var addEqualsToArrayPrototype = require('../../../util/util.js').addEqualsToArrayPrototype;

function dependencyVerifier(rulePremises, curProofLine, rule){
  if (Array.prototype.equals===undefined) addEqualsToArrayPrototype();
  var calcDepAssumptions = [];
  var curProofLineDep = curProofLine.depAssumptions;
  var curAnnotationsStr = curProofLine.annotationsStr;
  var dischargeArray = [];
  for (var i = curAnnotationsStr.length - 1; i >= 0; i--) {
    var tmpAnnotation = curAnnotationsStr[i].match(/^(\d+)\[(\d*)\]$/);
    if(tmpAnnotation!==null) {
      var premiseDep = [];
      dischargeArray.push(tmpAnnotation[2]);
      for (var j = rulePremises.length - 1; j >= 0; j--) {
        if (rulePremises[j].lineNo===tmpAnnotation[1]){
          premiseDep = premiseDep.concat(rulePremises[j].depAssumptions);
          break;
        }
      };
      var dischargePos = premiseDep.indexOf(tmpAnnotation[2]);
      if (dischargePos>=0) {
        premiseDep.splice(dischargePos, 1);
      } else {
        if (tmpAnnotation[2]!==''){
          return {
            status:false,
            err: "Invalid discharge assumption. The discharged assumption [" +
              tmpAnnotation[2] + "] is not part of the dependent assumptions \
              of premise at line: " + tmpAnnotation[1] + "."
          }
        }
      }
    } else {
      var premiseDep = [];
      for (var j = rulePremises.length - 1; j >= 0; j--) {
        if (rulePremises[j].lineNo===curAnnotationsStr[i]) {
          premiseDep = premiseDep.concat(rulePremises[j].depAssumptions);
          break;
        }
      };
    }
    calcDepAssumptions = calcDepAssumptions.concat(premiseDep);
  };

  //Filter out duplicates and sort.
  calcDepAssumptions = calcDepAssumptions.filter(function(elem, pos) {
    return calcDepAssumptions.indexOf(elem) == pos;
  });
  calcDepAssumptions.sort(function(a, b){return parseInt(a)-parseInt(b)});
  curProofLineDep.sort(function(a, b){return parseInt(a)-parseInt(b)});

  for (var i = dischargeArray.length - 1; i >= 0; i--) {
    for (var j = rulePremises.length - 1; j >= 0; j--) {
      if(rulePremises[j].lineNo===dischargeArray[i]){
        if (rulePremises[j].rule!=="A"){
          return {
            status:false,
            err: "Invalid discharge assumption. The discharge \
              assumption: [" + dischargeArray[i] + "] is not an assumption"
          }
        }
      }
    };
  };


  //For RAA the discharge is universal.
  if(rule==="RAA") {
    for (var i = dischargeArray.length - 1; i >= 0; i--) {
      var dischargePos = calcDepAssumptions.indexOf(dischargeArray[i])
      if(dischargePos>=0) {
        calcDepAssumptions.splice(dischargePos, 1);
      }
    };
  }

  //Verify if the provided dependent assumptions for the proof line is equal
  //to the calculated dependent assumptions.
  if (calcDepAssumptions.equals(curProofLineDep))
    return {
        status: true,
        discharged: dischargeArray.length>0
    }
  return {
    status: false,
    err: "Assumptions of the rule premises do not tally with the\
        dependent assumptions provided."
  }
}

module.exports.dependencyVerifier = dependencyVerifier;
