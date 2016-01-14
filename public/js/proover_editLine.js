if (ns_proover===undefined) var ns_proover={};

ns_proover.launchModelForLno = function(line){
  var lineArray = [];
  $("#line_" + line).children().each(function(){
    lineArray.push($(this).find('span:first').text().trim());
  });
  lineArray.splice(-1,1);
  $("#depAssumptions").val(lineArray[0]);
  $("#formule").val(lineArray[2]);
  $("#annotation").val(lineArray[3]);
  $("#selectedRule").val(lineArray[4]);

  $("#modelLineNo").text(line);
  $('#myModalLabel').text("Edit Line: " + line);
  $('#lineSaveBtn').removeClass("hidden");
  $('#lineSubmitBtn').addClass("hidden");
  $('#newLineModal').modal('show');
}

ns_proover.addEdtLineListner = function(){

  $(".edt-btn").click(function(){
    $('#errDiv').addClass( "hidden" );
    ns_proover.launchModelForLno($(this).find(".hidden-lno").text());
  });

  $("#lineSaveBtn").click(function(){
    var updatingLine = $("#modelLineNo").text();
    if (isNaN(parseInt(updatingLine))) {
      ns_proover.showError("unable to find lineNo, try restarting \
        proof or deleting till that line!");
      return;
    }
    var proofLine = ns_proover.genProofLineForLno(updatingLine);
    if (proofLine===false) return;
    var oldProofLine = proof.proofLines[updatingLine-1];
    proof.proofLines[updatingLine-1] = proofLine;
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
        proof.proofLines[updatingLine-1] = oldProofLine;
        ns_proover.showError(v_st.err);
      } else {
        ns_proover.updateUIProofStatus(v_st);
      }
      if (v_st.isProofValid) {
        ns_proover.addProofLine(proofLine, updatingLine);
        //TODO: Update in server by ajax
        ns_proover.resetModal();
        $('#newLineModal').modal('hide');
      }
    } catch (err){
      ns_proover.showError(err);
    }
  });

}
