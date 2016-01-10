// Generated from FOL.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0002\f9\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0007\n,\n\n\f\n\u000e",
    "\n/\u000b\n\u0003\u000b\u0003\u000b\u0003\f\u0006\f4\n\f\r\f\u000e\f",
    "5\u0003\f\u0003\f\u0002\u0002\r\u0003\u0003\u0005\u0004\u0007\u0005",
    "\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013\u000b\u0015\u0002\u0017",
    "\f\u0003\u0002\u0005\u0005\u0002C\\c|\u22a6\u22a7\u0006\u00022;C\\a",
    "ac|\u0005\u0002\u000b\f\u000f\u000f\"\"9\u0002\u0003\u0003\u0002\u0002",
    "\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002",
    "\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002\u0002",
    "\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002",
    "\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002\u0002",
    "\u0002\u0002\u0017\u0003\u0002\u0002\u0002\u0003\u0019\u0003\u0002\u0002",
    "\u0002\u0005\u001b\u0003\u0002\u0002\u0002\u0007\u001d\u0003\u0002\u0002",
    "\u0002\t\u001f\u0003\u0002\u0002\u0002\u000b!\u0003\u0002\u0002\u0002",
    "\r#\u0003\u0002\u0002\u0002\u000f%\u0003\u0002\u0002\u0002\u0011\'\u0003",
    "\u0002\u0002\u0002\u0013)\u0003\u0002\u0002\u0002\u00150\u0003\u0002",
    "\u0002\u0002\u00173\u0003\u0002\u0002\u0002\u0019\u001a\u0007*\u0002",
    "\u0002\u001a\u0004\u0003\u0002\u0002\u0002\u001b\u001c\u0007+\u0002",
    "\u0002\u001c\u0006\u0003\u0002\u0002\u0002\u001d\u001e\u0007\u2194\u0002",
    "\u0002\u001e\b\u0003\u0002\u0002\u0002\u001f \u0007\u2229\u0002\u0002",
    " \n\u0003\u0002\u0002\u0002!\"\u0007\u222a\u0002\u0002\"\f\u0003\u0002",
    "\u0002\u0002#$\u0007\u00ae\u0002\u0002$\u000e\u0003\u0002\u0002\u0002",
    "%&\u0007.\u0002\u0002&\u0010\u0003\u0002\u0002\u0002\'(\u0007\u22a4",
    "\u0002\u0002(\u0012\u0003\u0002\u0002\u0002)-\t\u0002\u0002\u0002*,",
    "\u0005\u0015\u000b\u0002+*\u0003\u0002\u0002\u0002,/\u0003\u0002\u0002",
    "\u0002-+\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002\u0002.\u0014\u0003",
    "\u0002\u0002\u0002/-\u0003\u0002\u0002\u000201\t\u0003\u0002\u00021",
    "\u0016\u0003\u0002\u0002\u000224\t\u0004\u0002\u000232\u0003\u0002\u0002",
    "\u000245\u0003\u0002\u0002\u000253\u0003\u0002\u0002\u000256\u0003\u0002",
    "\u0002\u000267\u0003\u0002\u0002\u000278\b\f\u0002\u00028\u0018\u0003",
    "\u0002\u0002\u0002\u0005\u0002-5\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function FOLLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

FOLLexer.prototype = Object.create(antlr4.Lexer.prototype);
FOLLexer.prototype.constructor = FOLLexer;

FOLLexer.EOF = antlr4.Token.EOF;
FOLLexer.LPAREN = 1;
FOLLexer.RPAREN = 2;
FOLLexer.IMPL = 3;
FOLLexer.AND = 4;
FOLLexer.OR = 5;
FOLLexer.NOT = 6;
FOLLexer.COMMA = 7;
FOLLexer.ENTL = 8;
FOLLexer.PREPOSITION = 9;
FOLLexer.WS = 10;


FOLLexer.modeNames = [ "DEFAULT_MODE" ];

FOLLexer.literalNames = [ 'null', "'('", "')'", "'→'", "'∧'", "'∨'", "'¬'", 
                          "','", "'⊢'" ];

FOLLexer.symbolicNames = [ 'null', "LPAREN", "RPAREN", "IMPL", "AND", "OR", 
                           "NOT", "COMMA", "ENTL", "PREPOSITION", "WS" ];

FOLLexer.ruleNames = [ "LPAREN", "RPAREN", "IMPL", "AND", "OR", "NOT", "COMMA", 
                       "ENTL", "PREPOSITION", "CHARACTER", "WS" ];

FOLLexer.grammarFileName = "FOL.g4";



exports.FOLLexer = FOLLexer;

