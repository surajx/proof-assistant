if(ns_dashboard===undefined) var ns_dashboard = {};

ns_dashboard.initiateDelete = function($btn, deleteArr) {
  $.ajax({
    url: '/dashboard/delete/',
    data: {delete: deleteArr},
    type: 'POST',
    dataType: 'json',
    success: function (data) {
        if(data.status) {
          $.toaster({ settings : {timeout: 2000} });
          $.toaster({ priority : 'success',
            title : 'Server Message', message : 'Delete Successful!'});
        } else {
          $.toaster({ settings : {timeout: 8000} });
          $.toaster({ priority : 'danger',
            title : 'Server Message', message : '[Delete Error]: ' +
            data.err + " Please refresh the page."});
          console.log(data.err);
        }
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + JSON.stringify(error));
    },
  });
};

ns_dashboard.addDelProofListeners = function(){

  $(".del-check-box").change(function(){
    console.log($("input[name='toDelete']:checked").length);
    if($("input[name='toDelete']:checked").length>0){
      $("#delProofBtn").removeClass("hidden");
    } else {
      $("#delProofBtn").addClass("hidden");
    }
  });

  $("#delChkAllBtn").click(function(){
    $.each($("input[name='toDelete']"), function(){
      $(this).prop('checked', true);
    });
    $(".del-check-box").change();
  });

  $("#delUnChkAllBtn").click(function(){
    $.each($("input[name='toDelete']"), function(){
      $(this).prop('checked', false);
    });
    $(".del-check-box").change();
  });

  $("#delProofBtn").click(function(){

    var deleteArr = [];
    $.each($("input[name='toDelete']:checked"), function(){
      deleteArr.push($(this).val());
      $("#"+$(this).val()).remove();
    });
    $(".del-check-box").change();
    if($("input[name='toDelete']").length===0){
      $("#delProofBtn").addClass("hidden");
      $("#noProofTxt").removeClass("hidden");
    }
    if(deleteArr.length>0) return;
      //ns_dashboard.initiateDelete(deleteArr);
  });
}
