var AssumptionRule = require('./AssumptionRule.js');
var ConjunctionElimRule = require('./ConjunctionElimRule.js');
var ConjunctionIntroRule = require('./ConjunctionIntroRule.js');
var DisjunctionElimRule = require('./DisjunctionElimRule.js');
var DisjunctionIntroRule = require('./DisjunctionIntroRule.js');
var ImplicationElimRule = require('./ImplicationElimRule.js');
var ImplicationIntroRule = require('./ImplicationIntroRule.js');
var ReductioAdAbsurdumRule = require('./ReductioAdAbsurdumRule.js');
var DoubleNegationElimRule = require('./DoubleNegationElimRule.js');
var DoubleNegationIntroRule = require('./DoubleNegationIntroRule.js');
var NegationElimRule = require('./NegationElimRule.js');
var NegationIntroRule = require('./NegationIntroRule.js');

module.exports = {
    "A"  : new AssumptionRule(),
    "∧E" : new ConjunctionElimRule(),
    "∧I" : new ConjunctionIntroRule(),
//    "∨E" : new DisjunctionElimRule(),
    "∨I" : new DisjunctionIntroRule(),
    "→E" : new ImplicationElimRule(),
    "→I" : new ImplicationIntroRule(),
//    "RAA": new ReductioAdAbsurdumRule(),
    "¬¬E": new DoubleNegationElimRule(),
    "¬¬I": new DoubleNegationIntroRule(),
//    "¬E" : new NegationElimRule(),
//    "¬I" : new NegationIntroRule()
}

