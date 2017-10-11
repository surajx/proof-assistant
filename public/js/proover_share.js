if (ns_proover===undefined) var ns_proover={};

ns_proover.initiateSave = function($btn){
  $.ajax({
    url: '/proover/share/' + proofID,
    data: proof,
    type: 'POST',
    dataType: 'json',
    success: function (data) {
        $btn.button('reset');
        if(data.status){
          $("#saveProofBtn").removeClass("btn-info");
          $("#saveProofBtn").addClass("btn-success");
          $("#saveProofBtn").html('Stop Sharing');
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
          Please re-login or try opening in a different window.'});
    },
  });
}

ns_proover.addShareListeners = function(){
  $("#shareProofBtn").click(function(){
    var $btn = $(this);
    $btn.button('loading');
    setTimeout(function () {
        $btn.button('reset');
    }, 10000);
    ns_proover.initiateSave($btn);
  });
}
