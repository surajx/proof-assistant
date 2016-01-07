var parser = require('../parser/parser.js');

function ProofLine(depAssumptions, lineNo, formule, annotations, rule){
  if (rule===null && annotations!=="A") {
    throw "The proof line does not have a valid Rule.";
  }
  var wffCheck = parser.isWFF(formule);
  if (wffCheck.status===false){
    throw "Invalid Fomule:\n" + wffCheck.err.join('\n');
  }
  this.formule = formule;

  //TODO: Consider the case of adding goals?
  if(!(/^\d+$/.test(lineNo))) {
    throw "Invalid Line Number"
  }
  this.lineNo = lineNo;

  this.depAssumptions = [];
  var depAssumptionsArr = depAssumptions.split(',');
  for (var i = 0; i<depAssumptionsArr.length; i++) {
    var oneDependecy = depAssumptionsArr[i];
    oneDependecy = oneDependecy.replace(/ /g,'');
    if(!(/^\d+$/.test(oneDependecy))) {
      throw "Invalid Dependent Assumption: " + oneDependecy;
    }
    if(parseInt(oneDependecy)>parseInt(this.lineNo)){
      throw "Dependent Assumption cannot be greater than \
        current Line No: " + oneDependecy;
    }
    this.depAssumptions.push(oneDependecy);
  }
  this.depAssumptions.sort(function(a, b){return parseInt(a)-parseInt(b)});

  this.annotations = [];
  this.annotationsStr = [];
  if (annotations==="A"){
    rule = "A";
    this.annotations.push({
      annotation: annotations,
      discharge : null
    });
    this.annotationsStr.push(annotations);
  } else {
    var annotationsArr = annotations.split(',');
    for (var i = 0; i<annotationsArr.length; i++) {
      var oneAnnotation = annotationsArr[i];
      oneAnnotation = oneAnnotation.replace(/ /g,'');
      var withDischarge = oneAnnotation.match(/^(\d)\[(\d*)\]$/);
      if(withDischarge!==null){
        if(this.depAssumptions.indexOf(withDischarge[2])>-1){
          throw "Discharged Assumption should not \
            be part of Dependent Assumptions";
        }
        if(parseInt(withDischarge[1])>=parseInt(this.lineNo)){
          throw "Annotation Assumption cannot be greate than or \
            equal to current Line No: " + withDischarge[1];
        }
        if(parseInt(withDischarge[2])>=parseInt(this.lineNo)){
          throw "Discharges Assumption cannot be greate than or \
            equal to current Line No: " + withDischarge[1];
        }
        this.annotations.push({
          annotation: withDischarge[1],
          discharge : withDischarge[2]
        });
        this.annotationsStr.push(withDischarge[1]+'['+withDischarge[2]+']');
      } else if(/^\d+$/.test(oneAnnotation)){
        if(parseInt(oneAnnotation)>=parseInt(this.lineNo)){
          throw "Annotation Assumption cannot be greate than or \
            equal to current Line No: " + oneAnnotation;
        }
        this.annotations.push({
          annotation: oneAnnotation,
          discharge : null
        });
        this.annotationsStr.push(oneAnnotation);
      } else {
        throw "Invalid annotation format: " + oneAnnotation;
      }
    }
  }

  if (rule==="A"  ||
      rule==="∧E" ||
      rule==="∧I" ||
      rule==="∨E" ||
      rule==="∨I" ||
      rule==="→E" ||
      rule==="RAA"||
      rule==="¬¬E"||
      rule==="¬¬I"||
      rule==="¬E" ||
      rule==="¬I"
    ) {
    this.rule = rule;
  } else{
    throw "Invalid Rule specified: " + rule;
  }
}

function genProofLine(proofLineData) {
  try {
    var proofLine = new ProofLine(
      proofLineData.depAssumptions,
      proofLineData.lineNo,
      proofLineData.formule,
      proofLineData.annotation,
      proofLineData.rule);
    return {
      status: true,
      proofLine: proofLine
    }
  } catch(err) {
    return {
      status: false,
      err: err
    }
  }
}

module.exports.genProofLine = genProofLine;
module.exports.ProofLine = ProofLine;
