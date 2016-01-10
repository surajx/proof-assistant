var FOLLexer   = require('./gen/FOLLexer').FOLLexer;
var FOLParser  = require('./gen/FOLParser').FOLParser;
var FOLListener = require('./gen/FOLListener').FOLListener;
var FOLErrorListener = require('./FOLErrorListener').FOLErrorListener;
var antlr4    = require('antlr4/index');

function tokenizeInput(input, errListener) {
  var inputStream = new antlr4.InputStream(input);
  var lexer = new FOLLexer(inputStream);

  if (errListener) {
    lexer.removeErrorListeners();
    lexer.addErrorListener(errListener);
  }

  var tokens = new antlr4.CommonTokenStream(lexer);
  return tokens;
}

function getParserForTokens(tokens, errListener) {
  var parser = new FOLParser(tokens);

  if (errListener) {
    parser.removeErrorListeners();
    parser.addErrorListener(errListener);
  }

  return parser;
}

//Is input a Well Formed Formule
function isWFF(input) {
  var errListener = new FOLErrorListener();
  var tokens = tokenizeInput(input, errListener);
  var parser = getParserForTokens(tokens, errListener);
  parser.formula();
  if (errListener.getErrorMessages().length>0) {
    return {
      status: false,
      err: errListener.getErrorMessages()
    }
  } else {
    return { status: true }
  }
}

//Is input a Well Formed Sequent
function isWFS(input) {
  var errListener = new FOLErrorListener();
  var tokens = tokenizeInput(input, errListener);
  var parser = getParserForTokens(tokens, errListener);
  parser.sequent();
  if (errListener.getErrorMessages().length>0) {
    return {
      status: false,
      err: errListener.getErrorMessages()
    }
  } else {
    return { status: true }
  }
}

module.exports.isWFF = isWFF;
module.exports.isWFS = isWFS;
