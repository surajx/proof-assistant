// Generated from FOL.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by FOLParser.
function FOLListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

FOLListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
FOLListener.prototype.constructor = FOLListener;

// Enter a parse tree produced by FOLParser#sequent.
FOLListener.prototype.enterSequent = function(ctx) {
};

// Exit a parse tree produced by FOLParser#sequent.
FOLListener.prototype.exitSequent = function(ctx) {
};


// Enter a parse tree produced by FOLParser#wff.
FOLListener.prototype.enterWff = function(ctx) {
};

// Exit a parse tree produced by FOLParser#wff.
FOLListener.prototype.exitWff = function(ctx) {
};


// Enter a parse tree produced by FOLParser#formula.
FOLListener.prototype.enterFormula = function(ctx) {
};

// Exit a parse tree produced by FOLParser#formula.
FOLListener.prototype.exitFormula = function(ctx) {
};



exports.FOLListener = FOLListener;