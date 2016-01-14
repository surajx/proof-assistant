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
}
