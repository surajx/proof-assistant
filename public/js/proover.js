var proof = proofModel.proofData;
if (ns_proover===undefined) var ns_proover={};
$(document).ready(function(){

  //Debug info
  console.log(proof);

  ns_proover.addMiscListeners();
  ns_proover.addNewLineListener();
  ns_proover.addEdtLineListner();
});
