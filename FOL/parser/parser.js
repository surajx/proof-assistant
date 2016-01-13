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

function getParserForFormule(input){
  input = addParensToFormule(input);
  return getParserForTokens(tokenizeInput(input));
}

function addParensToSequent(proofName){
    var seqArr = proofName.trim().split("⊢");
    var proofGoal = "";
    var premises = [];

    if (seqArr.length===2){
      if (seqArr.length==2 && seqArr[0]!==''){
        premises = seqArr[0].split(",");
        for (var i=0; i<premises.length; i++){
          premises[i] = addParensToFormule(premises[i].trim());
        }
      }
      proofGoal = addParensToFormule(seqArr[1]);
      return {
        status: true,
        input: premises.join(', ') + " ⊢ " + proofGoal
      }
    }
    return {
      state: false,
      err: "Invalid Sequent: Missing Entails symbol"
    }
}

function addParensToFormule(formule){
  if(formule[0]==="¬" || formule.length===1) {
    return formule;
  }
  //TODO: check the case if already paranthesized.
  return '(' + formule + ')';
}



//Is input a Well Formed Formule
function isWFF(input) {
  input = addParensToFormule(input);
  var errListener = new FOLErrorListener();
  var tokens = tokenizeInput(input, errListener);
  var parser = getParserForTokens(tokens, errListener);
  parser.wff();
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
  var inputContainer = addParensToSequent(input);
  if (!inputContainer.status){
    return {
      status: false,
      err: inputContainer.err
    }
  }
  input = inputContainer.input;
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
module.exports.getParserForFormule = getParserForFormule;
