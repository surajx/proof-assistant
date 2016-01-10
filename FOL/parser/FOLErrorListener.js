var antlr4 = require('antlr4/index');

FOLErrorListener = function (){
    this.errorMessages = [];
    antlr4.error.ErrorListener.call(this);
    return this;
  }

  FOLErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
  FOLErrorListener.prototype.constructor = FOLErrorListener;

  FOLErrorListener.prototype.getErrorMessages = function(){
    return this.errorMessages;
  };

  FOLErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    this.errorMessages.push(msg);
  };


exports.FOLErrorListener = FOLErrorListener;
