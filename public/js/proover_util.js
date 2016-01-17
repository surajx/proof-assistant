if (ns_proover===undefined) var ns_proover={};

ns_proover.resetModal = function(){
  $("#depAssumptions").val("");
  $("#formule").val("");
  $("#annotation").val("");
  $("#selectedRule").val("");
  $('#errDiv').addClass( "hidden" );
}

ns_proover.showError = function(err){
  $('#errDiv').removeClass( "hidden" );
  $('#errDiv').show();
  $('#errMsg').text(err);
}

ns_proover.removeAllLabelModifiers = function(){
  $( '#proofStatus' ).removeClass("label-success");
  $( '#proofStatus' ).removeClass("label-warning");
  $( '#proofStatus' ).removeClass("label-danger");
  $( '#proofStatus' ).removeClass("label-info");
  $( '#proofStatus' ).removeClass("label-default");
}

ns_proover.addMiscListeners = function(){
  $("[data-hide]").on("click", function(){
    $(this).closest("." + $(this).attr("data-hide")).hide();
  });

  $('.modal').on('shown.bs.modal', function () {
    $(this).find('input:text:visible:first').focus();
  });

  $(".proof-rule").click(function() {
    $("#selectedRule").val($(this).text());
  });

  $("#formule").on("input propertychange paste", function(){
    dynamicTextFormInput.call(this)
  });

  $("#selectedRule").on("input propertychange paste", function(){
    dynamicTextFormInput.call(this)
  });

  $("#delLineBtn").click(function(){
    if(proof.proofLines.length>0){
      var delLine = proof.proofLines[proof.proofLines.length -1];
      proof.proofLines.splice(-1,1);
      try {
        var FOLValidator = require('FOLValidator');
        var v_st = FOLValidator.validateProof(proof);
        ns_proover.updateUIProofStatus(v_st);
        $('#proofTable tr:last').remove();
        $("#saveProofBtn").removeClass("btn-success");
        $("#saveProofBtn").addClass("btn-danger");
      } catch (err){
        proof.proofLines.push(delLine);
        $.toaster({ settings : {timeout: 8000} });
        $.toaster({ priority : 'danger',
          title : 'Delete', message : 'Unable to delete last row. ' + err});
      }
    }
  });
}
