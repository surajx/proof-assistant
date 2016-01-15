if (ns_proover===undefined) var ns_proover={};

ns_proover.addProofLine = function (proofLine, updateLineNo) {
  var dispRule = proofLine.rule==="A"?"":proofLine.rule;
  if(updateLineNo===undefined){
    $('#proofTable').append('<tr class= "proof-line" \
      id="line_'+proofLine.lineNo+'"></tr>');
  }
  $('#line_'+proofLine.lineNo).html(
    "<td class='vert-align'><span>"+ proofLine.depAssumptions.join(',') +" \
      </span></td> \
    <td class='vert-align'><span>("+ proofLine.lineNo +") \
      </span></td> \
    <td class='text-center vert-align'><span>"+ proofLine.formule +" \
      </span></td> \
    <td class='text-right vert-align'><span>"+ proofLine.annotationsStr.join(',') +" \
      </span></td> \
    <td class='text-right vert-align'><span>"+ dispRule +" \
      </span></td> \
    <td class='text-right vert-align'><button class='btn btn-default edt-btn' \
     type='button', id='edt_btn_" + proofLine.lineNo + "'><span class = \
     'glyphicon glyphicon-edit'></span><span \
     class='hidden hidden-lno'>"+ proofLine.lineNo +"</span></button></td>");

    $(".edt-btn").unbind();
    $(".edt-btn").click(function(){
      $('#errDiv').addClass( "hidden" );
      ns_proover.launchModelForLno($(this).find(".hidden-lno").text());
    });

    $("#saveProofBtn").removeClass("btn-success");
    $("#saveProofBtn").addClass("btn-danger");
}

ns_proover.genProofLineForLno = function(givenLineNo){
  var depAssumptions = $("#depAssumptions").val();
  var formule = $("#formule").val().trim().replace(/\s\s+/g, ' ');
  var annotation = $("#annotation").val();
  var selectedRule = $("#selectedRule").val();
  var lineNo = givenLineNo
  var FOLParser = require('FOLParser');
  var wffCheck = FOLParser.isWFF(formule);
  if (!wffCheck.status){
    ns_proover.showError(wffCheck.err);
    return false;
  }
  var FOLProofLine = require('FOLProofLine');
  var proofLineContainer = FOLProofLine.genProofLine({
    depAssumptions : depAssumptions,
    lineNo         : lineNo,
    formule        : formule,
    annotation     : annotation,
    rule           : selectedRule
  });
  if (proofLineContainer.status!==true) {
    ns_proover.showError(proofLineContainer.err);
    return false;
  }
  return proofLineContainer.proofLine;
}

ns_proover.updateUIProofStatus = function(v_st){
  if(!v_st.isPremiseMaintained) {
    $("#ps_h").text("MISSING PREMISE");
    ns_proover.removeAllLabelModifiers();
    $( '#proofStatus' ).addClass("label-info");
  } else if(!v_st.isGoalAttained) {
    $("#ps_h").text("GOAL NOT ATTAINED");
    ns_proover.removeAllLabelModifiers();
    $( '#proofStatus' ).addClass("label-warning");
  } else if(v_st.isProofValid &&
            v_st.isPremiseMaintained &&
            v_st.isGoalAttained){
    $("#ps_h").text("SUCCESS");
    ns_proover.removeAllLabelModifiers();
    $( '#proofStatus' ).addClass("label-success");
  } else {
    $("#ps_h").text("PROOF CURROPTED");
    ns_proover.removeAllLabelModifiers();
    $( '#proofStatus' ).addClass("label-default");
  }
}

ns_proover.addNewLineListener = function(){

  $("#addNewLineBtn").click(function(){
    var curLineNo = parseInt($('#proofTable tr:last').find('.hidden-lno').text());
    if (isNaN(curLineNo)) curLineNo = 0;
    $('#myModalLabel').text("Add New Line: " + (curLineNo+1).toString());
    $('#lineSaveBtn').addClass("hidden");
    $('#lineSubmitBtn').removeClass("hidden");
    ns_proover.resetModal();
  });

  $("#lineSubmitBtn").click(function(){
    var curLineNo = parseInt($('#proofTable tr:last').find('.hidden-lno').text());
    if (isNaN(curLineNo)) curLineNo = 0;
    var proofLine = ns_proover.genProofLineForLno((curLineNo+1).toString());
    if (proofLine===false) return;
    proof.proofLines.push(proofLine);
    try {
      var FOLValidator = require('FOLValidator');
      var v_st = FOLValidator.validateProof(proof);
      console.log(v_st);
      if(!v_st.isProofValid) {
        /*
        //Not allowing users to add proof lines that invalidate the proof.
        $("#ps_h").text("INVALID PROOF");
        removeAllLabelModifiers();
        $( '#proofStatus' ).addClass("label-danger");
        */
        proof.proofLines.splice(-1,1);
        ns_proover.showError(v_st.err);
      } else {
        ns_proover.updateUIProofStatus(v_st);
      }
      if (v_st.isProofValid) {
        ns_proover.addProofLine(proofLine);
        //TODO: Update in server by ajax
        ns_proover.resetModal();
        $('#newLineModal').modal('hide');
      }
    } catch (err){
      ns_proover.showError(err);
    }
  });
}
