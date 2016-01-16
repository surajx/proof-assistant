function addEqualsToArrayPrototype() {
    if(Array.prototype.equals)
        console.warn("Overriding existing Array.prototype.equals. \
            Possible causes: New API defines the method, there's a framework \
            conflict or you've got double inclusions in your code.");
    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});
}

function compareFormule(formule1, formule2){
    return formule1.replace(/ /g,'')===formule2.replace(/ /g,'')
}

function proofObjSanitize(proof){
    if(!(proof.hasOwnProperty('proofLines') &&
        (proof.proofLines instanceof Array)))
        proof.proofLines = []
    if(!(proof.hasOwnProperty('premises') &&
        (proof.premises instanceof Array)))
        proof.premises = []
    if(!proof.hasOwnProperty('goal'))
        proof.goal = '';

    for (var i = proof.proofLines.length - 1; i >= 0; i--) {
        var curProofLine = proof.proofLines[i];
        if(!curProofLine.hasOwnProperty('rule'))
            curProofLine.rule = '';
        if(!(curProofLine.hasOwnProperty('annotationsStr') &&
            (curProofLine.annotationsStr instanceof Array)))
            curProofLine.annotationsStr = [];
        if(!(curProofLine.hasOwnProperty('annotations') &&
            (curProofLine.annotations instanceof Array)))
            curProofLine.annotations = [];
        if(!(curProofLine.hasOwnProperty('depAssumptions') &&
            (curProofLine.depAssumptions instanceof Array)))
            curProofLine.depAssumptions = [];
        if(!curProofLine.hasOwnProperty('lineNo'))
            curProofLine.lineNo = '';
        if(!curProofLine.hasOwnProperty('formule'))
            curProofLine.formule = '';
        proof.proofLines[i] = curProofLine;
    };

    return proof;
}

module.exports.compareFormule = compareFormule;
module.exports.proofObjSanitize = proofObjSanitize;
module.exports.addEqualsToArrayPrototype = addEqualsToArrayPrototype;
