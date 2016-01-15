if (ns_proover===undefined) var ns_proover={};

ns_proover.initiateSave = function($btn){
  $.ajax({
    url: '/proover/save/' + proofID,
    data: proof,
    type: 'POST',
    dataType: 'json',
    success: function (data) {
        $btn.button('reset');
        if(data.status){
          $("#saveProofBtn").removeClass("btn-danger");
          $("#saveProofBtn").addClass("btn-success");
        }
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + JSON.stringify(error));
    },
  });
}

ns_proover.addSaveListener = function(){
  $("#saveProofBtn").click(function(){
    var $btn = $(this);
    $btn.button('loading');
    setTimeout(function () {
        $btn.button('reset');
    }, 10000);
    ns_proover.initiateSave($btn);
  });
}
