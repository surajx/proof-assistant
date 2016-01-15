// Replaces text in forms with the corresponding unicode symbols adjusts caret offset.
function dynamicTextFormInput() {
    
	var formInput = $(this).val();
    var prevCaretPos = this.selectionStart;
    var origProofNameLen = formInput.length;
    formInput = commandsToUnicode(formInput);
    curCaretOffset = origProofNameLen - formInput.length;
    if (curCaretOffset > 0){
        $(this).val(formInput);
        this.setSelectionRange(prevCaretPos-curCaretOffset, prevCaretPos-curCaretOffset);
    }
}

// Replaces defined commands with unicodes.
function commandsToUnicode(formInput) {
    
    formInput = formInput
        .replace(/\\i/g, "\u2192")
        .replace(/\\a/g, "\u2227")
        .replace(/\\o/g, "\u2228")
        .replace(/\\e/g, "\u22A2")
        .replace(/\\n/g, "\u00AC");
    
    // Output formInput
    return formInput;
}