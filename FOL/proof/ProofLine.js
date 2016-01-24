var parser = require('../parser/parser.js');

function ProofLine(depAssumptions, lineNo, formule, annotations, rule){
  annotations = annotations.trim();
  if (rule==='' && annotations!=="A") {
    throw "The proof line does not have a valid Rule.";
  }

  formule = formule.trim().replace(/\s\s+/g, ' ');
  var wffCheck = parser.isWFF(formule);
  if (wffCheck.status===false){
    throw "Invalid Fomule\n" + wffCheck.err.join('\n');
  }
  this.formule = formule;

  //TODO: Consider the case of adding goals?
  if(!(/^\d+$/.test(lineNo))) {
    throw "Invalid Line Number"
  }
  this.lineNo = lineNo;

  this.depAssumptions = [];
  var depAssumptionsArr = depAssumptions.trim().split(',');
  if (depAssumptionsArr.length===1 && depAssumptionsArr[0]===''){
    depAssumptionsArr = [];
  }
  for (var i = 0; i<depAssumptionsArr.length; i++) {
    var oneDependecy = depAssumptionsArr[i];
    oneDependecy = oneDependecy.replace(/ /g,'');
    if(!(/^\d+$/.test(oneDependecy))) {
      throw "Invalid Dependent Assumption: " + depAssumptions;
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
  if (annotations==="A" || rule==="A"){
    //TODO: Confirm if we should throw error if some annotation other than "A"
    //is give for assumption rule.
    rule = "A";
    annotations = "A";
    this.annotations.push({
      annotation: annotations,
      discharge : ''
    });
    this.annotationsStr.push(annotations);
  } else {
    var annotationsArr = annotations.split(',');
    for (var i = 0; i<annotationsArr.length; i++) {
      var oneAnnotation = annotationsArr[i];
      oneAnnotation = oneAnnotation.replace(/ /g,'');
      var withDischarge = oneAnnotation.match(/^(\d+)\[(\d*)\]$/);
      if(withDischarge!==null){
        if(parseInt(withDischarge[1])>=parseInt(this.lineNo)){
          throw "Annotation Assumption cannot be greater than or \
            equal to current Line No: " + this.lineNo;
        }
        if(parseInt(withDischarge[2])>=parseInt(this.lineNo)){
          throw "Discharges Assumption "+ '['+withDischarge[2]+']' +
            " cannot be greater than or equal to current Line No: " +
            this.lineNo;
        }
        if(parseInt(withDischarge[2])>parseInt(withDischarge[1])) {
          throw "Discharges Assumption "+ '['+withDischarge[2]+']' +
            " cannot be greater than the participating annotation: " +
            withDischarge[1];
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
          discharge : ''
        });
        this.annotationsStr.push(oneAnnotation);
      } else {
        throw "Invalid annotation format: " + annotations;
      }
    }
  }

  var ruleList = Object.keys(require('./rules/rules.js'));
  if (ruleList.indexOf(rule)<0){
    throw "Invalid Rule specified: " + rule;
  }
  this.rule = rule;
  if (this.rule==="∧E" || this.rule==="→I" || this.rule==="¬I" ||
      this.rule==="¬¬E" || this.rule==="¬¬I" || this.rule==="∨I") {
    if(this.annotations.length!==1)
      throw this.rule + " shoule have only one annotation.";
  } else if (this.rule==="∧I" || this.rule==="→E" ||
             this.rule==="¬E" || this.rule==="RAA") {
    if(this.annotations.length!==2)
      throw this.rule + " shoule have exactly two annotations.";
  } else if(this.rule==="∨E") {
    if(this.annotations.length!==3)
      throw this.rule + " shoule have exactly three annotations.";
  }

  var check_ORE_RAA = function(msg1, msg2, nd_count){
    var nonDischargeAssumption = -1;
    for (var i = this.annotationsStr.length - 1; i >= 0; i--) {
      if(this.annotationsStr[i].match(/^(\d+)\[(\d*)\]$/)===null){
        nonDischargeAssumption = i;
        break;
      }
    };
    if (nonDischargeAssumption<0){
      throw msg1;
    }
    var cnt = 0;
    for (var i = this.annotationsStr.length - 1; i >= 0; i--) {
      if (i===nonDischargeAssumption) continue;
      if(this.annotationsStr[i].match(/^(\d+)\[(\d*)\]$/)===null){
        throw msg2;
      }
      cnt+=1;
    };
    if(cnt!==nd_count) throw msg2;
  }
  if (this.rule==="→I" || this.rule==="¬I") {
    //We can index otherwise it would have thrown error before.
    if(this.annotationsStr[0].match(/^(\d+)\[(\d*)\]$/)===null){
      throw "Annotation for " + this.rule + " should be specified \
        in the format: premise line no[discharging assumption line no]. \
        Eg: 3[2]";
    }
  } else if(this.rule==="∨E") {
    var msg1 = "Annotation for " + this.rule + " should contain \
      exactly one non-discharging and two discharging annotations. No \
      non-discharging annotation was given. Eg: 1,5[2],8[6]"
    var msg2 = "Annotation for " + this.rule + " should contain \
      exactly one non-discharging and two discharging annotations. Did \
      not find two discharging annotation. Eg: 1,5[2],8[6]"
    check_ORE_RAA.call(this, msg1, msg2, 2);
  } else if(this.rule==="RAA") {
    var msg1 = "Annotation for " + this.rule + " should contain \
      exactly one non-discharging and one discharging(can be vacuous) \
      annotations. No non-discharging annotation was given. \
      Eg: 1,5[2] or 1,5[]"
    var msg2 = "Annotation for " + this.rule + " should contain \
      exactly one non-discharging and one discharging(can be vacuous) \
      annotations. Did not find the discharging annotation. \
      Eg: 1,5[2] or 1,5[]"
    check_ORE_RAA.call(this, msg1, msg2, 1);
  }
}

function validateProofLine(proofLine){
  try {
    var tmpProofLine = new ProofLine(
      proofLine.depAssumptions.join(','),
      proofLine.lineNo,
      proofLine.formule,
      proofLine.annotationsStr.join(','),
      proofLine.rule);
    return {
      status: true
    }
  } catch(err) {
    return {
      status: false,
      err: err
    }
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
module.exports.validateProofLine = validateProofLine;
