if (ns_proover===undefined) var ns_proover={};

ns_proover.launchModelForLno = function(line){
  var lineArray = [];
  $("#line_" + line).children().each(function(){
    lineArray.push($(this).find('span:first').text().trim());
  });
  lineArray.splice(-1,1);
  $("#e_depAssumptions").val(lineArray[0]);
  $("#e_formule").val(lineArray[2]);
  $("#e_annotation").val(lineArray[3]);
  $("#e_selectedRule").val(lineArray[4]);

  $("#modelLineNo").text(line);
  $('#myModalLabel').text("Edit Line: " + line);
  $('#editLineModal').modal('show');
}

ns_proover.addEdtLineListner = function(){

  $(".edt-btn").click(function(){
    $('#e_errDiv').addClass( "hidden" );
    ns_proover.launchModelForLno($(this).find(".hidden-lno").text());
  });

  $("#lineSaveBtn").click(function(){
    var updatingLine = $("#modelLineNo").text();
    if (isNaN(parseInt(updatingLine))) {
      ns_proover.showError("unable to find lineNo, try restarting \
        proof or deleting till that line!", true);
      return;
    }
    var proofLine = ns_proover.genProofLineForLno(updatingLine, true);
    if (proofLine===false) return;
    var oldProofLine = proof.proofLines[updatingLine-1];
    proof.proofLines[updatingLine-1] = proofLine;
    try {
      var FOLValidator = require('FOLValidator');
      var v_st = FOLValidator.validateProof(proof, updatingLine);
      if(!v_st.isProofValid) {
        /*
        //Not allowing users to add proof lines that invalidate the proof.
        $("#ps_h").text("INVALID PROOF");
        removeAllLabelModifiers();
        $( '#proofStatus' ).addClass("label-danger");
        */
        proof.proofLines[updatingLine-1] = oldProofLine;
        ns_proover.showError(v_st.err, true);
      } else {
        ns_proover.updateUIProofStatus(v_st);
      }
      if (v_st.isProofValid) {
        ns_proover.addProofLine(proofLine, updatingLine);
        //TODO: Update in server by ajax
        ns_proover.resetModal();
        $('#editLineModal').modal('hide');
      }
    } catch (err){
      ns_proover.showError(err, true);
    }
  });

}
