if (ns_proover===undefined) var ns_proover={};

ns_proover.addProofListener = function(){
  $("#startProofBtn").click(function(){
    startProof();
  });
}

function addAutoProofLine(depAssumptions, formule, annotation, selectedRule) {
  var curLineNo = parseInt($('#proofTable tr:last').find('.hidden-lno').text());
  if (isNaN(curLineNo)) curLineNo = 0;
  var lineNo = (curLineNo+1).toString();
  var FOLParser = require('FOLParser');
  var wffCheck = FOLParser.isWFF(formule);
  if (!wffCheck.status){
    ns_proover.showError('[Parser Error]: Not a Well Formed \
      formule. ' + wffCheck.err, isEdit);
    return false;
  }
  var FOLProofLine = require('FOLProofLine');
  var proofLineContainer = FOLProofLine.genProofLine({
    depAssumptions : depAssumptions,
    lineNo         : lineNo,
    formule        : formule,
    annotation     : annotation,
    rule           : selectedRule
  });
  if (proofLineContainer.status!==true) {
    ns_proover.showError(proofLineContainer.err, isEdit);
    return false;
  }
  var proofLine = proofLineContainer.proofLine;
  proof.proofLines.push(proofLine);
  try {
    var FOLValidator = require('FOLValidator');
    var v_st = FOLValidator.validateProof(proof);
    if(!v_st.isProofValid) {
      /*
      //Not allowing users to add proof lines that invalidate the proof.
      $("#ps_h").text("INVALID PROOF");
      removeAllLabelModifiers();
      $( '#proofStatus' ).addClass("label-danger");
      */
      proof.proofLines.splice(-1,1);
      ns_proover.showError(v_st.err);
    } else {
      ns_proover.updateUIProofStatus(v_st);
    }
    if (v_st.isProofValid) {
      ns_proover.addProofLine(proofLine);
    }
  } catch (err){
    ns_proover.showError(err);
  }
}

function startProof() {
  var FOLValidator = require('FOLValidator');
  // Get the auto proof result from the backend
  var autoProofResult = FOLValidator.autoProof();
  // Render all the result to the page.
  for(var i=0; i<autoProofResult.length; ++i) {
    var autoProofLine = autoProofResult[i];
    addAutoProofLine(autoProofLine['depAssumptions'],
                     autoProofLine['formule'],
                     autoProofLine['annotation'],
                     autoProofLine['selectedRule']);
  }
}
