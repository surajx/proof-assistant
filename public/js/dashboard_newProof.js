if(ns_dashboard===undefined) var ns_dashboard = {};

ns_dashboard.addNewProofListeners = function(){

  $("#proofName").on("input propertychange paste",function(){
    var isDisabled = true;
    ($(this).val() === "") ? isDisabled=true : isDisabled=false;
    $("#formSubmitBtn").prop("disabled", isDisabled);
  });

  $('#formSubmitBtn').click(function(){
    var FOLParser = require('FOLParser');
    var proofName = $('#proofName').val().trim().replace(/\s\s+/g, ' ');
    var wfsCheck = FOLParser.isWFS(proofName);
    if (wfsCheck.status){
      $('#modalForm').submit();
    } else {
      $( '#wfsErrDiv' ).removeClass( "hidden" );
      $('#wfsErrDiv').show();
      if (wfsCheck.err instanceof Array){
        var wfsErrMsg = wfsCheck.err.join('\n');
      } else {
        var wfsErrMsg = wfsCheck.err;
      }
      $('#wfsErrMsg').text('[Parser Error]: Not a Well Formed \
        sequent. ' + wfsErrMsg);
    }
  });
}
