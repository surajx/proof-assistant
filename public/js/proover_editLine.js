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
  $('#lineSaveBtn').removeClass("hidden");
  $('#lineSubmitBtn').addClass("hidden");
  $('#newLineModal').modal('show');
}

ns_proover.addEdtLineListner = function(){

  $(".edt-btn").click(function(){
    ns_proover.launchModelForLno($(this).find(".hidden-lno").text());
  });

  $("#lineSaveBtn").click(function(){
    console.log("Saving...");
  });

}
