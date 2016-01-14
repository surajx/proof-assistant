// replace LaTex with unicode
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