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
          $.toaster({ settings : {timeout: 2000} });
          $.toaster({ priority : 'success',
            title : 'Server Message', message : data.msg});
        } else {
          $.toaster({ settings : {timeout: 8000} });
          $.toaster({ priority : 'danger',
            title : 'Server Message', message : 'Save Error: ' + data.err});
        }
    },
    error: function (xhr, status, error) {
        $btn.button('reset');
        $.toaster({ settings : {timeout: 13000} });
        $.toaster({ priority : 'danger',
          title : 'Error Message', message : 'It seems like you are \
          logged out, or we are unable to reach the server. \
          Please re-login in a different window to save current proof.'});
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
