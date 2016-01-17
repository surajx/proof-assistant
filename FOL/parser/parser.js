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
  var parenContainer = checkNeedParen(input);
  if(parenContainer.status){
    input = parenContainer.formule;
  } else {
    return {
      status: false,
      err: parenContainer.err
    }
  }
  return {
    status: true,
    parser: getParserForTokens(tokenizeInput(input))
  }
}

function addParensToSequent(proofName){
    var seqArr = proofName.trim().split("⊢");
    var proofGoal = "";
    var premises = [];

    if (seqArr.length===2){
      if (seqArr.length==2 && seqArr[0]!==''){
        premises = seqArr[0].split(",");
        for (var i=0; i<premises.length; i++){
          var parenContainer = checkNeedParen(premises[i].trim());
          if(parenContainer.status){
            premises[i] = parenContainer.formule;
          } else {
            return {
              status: false,
              err: parenContainer.err
            }
          }
        }
      }
      var parenContainer = checkNeedParen(seqArr[1].trim());
      if(parenContainer.status){
        proofGoal = parenContainer.formule;
      } else {
        return {
          status: false,
          err: parenContainer.err
        }
      }
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

function checkNeedParen(formule) {
  var parened_input = "("+formule+")";
  if(isWFFCheck(parened_input).status) {
    return {
      status: true,
      formule: parened_input
    }
  } else {
    var wffContainer = isWFFCheck(formule);
    if(wffContainer.status) {
      return {
        status: true,
        formule: formule
      }
    } else {
      return wffContainer
    }
  }
}

function isWFF(input) {
  var parened_input = "("+input+")";
  var isWFFCheckContainer = isWFFCheck(parened_input);
  if(isWFFCheckContainer.status) {
    return isWFFCheckContainer
  } else {
    return isWFFCheck(input);
  }
}


//Is input a Well Formed Formule
function isWFFCheck(input) {
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
module.exports.checkNeedParen = checkNeedParen;
module.exports.getParserForFormule = getParserForFormule;
