// Generated from FOL.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var FOLListener = require('./FOLListener').FOLListener;
var grammarFileName = "FOL.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003\f@\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0003\u0002",
    "\u0005\u0002\u0010\n\u0002\u0003\u0002\u0003\u0002\u0007\u0002\u0014",
    "\n\u0002\f\u0002\u000e\u0002\u0017\u000b\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0007\u0004!\n\u0004\f\u0004\u000e\u0004$\u000b\u0004\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0007\u0005)\n\u0005\f\u0005\u000e\u0005,\u000b\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u00061\n\u0006\f\u0006\u000e",
    "\u00064\u000b\u0006\u0003\u0007\u0005\u00077\n\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007>\n\u0007\u0003",
    "\u0007\u0002\u0002\b\u0002\u0004\u0006\b\n\f\u0002\u0002@\u0002\u000f",
    "\u0003\u0002\u0002\u0002\u0004\u001b\u0003\u0002\u0002\u0002\u0006\u001d",
    "\u0003\u0002\u0002\u0002\b%\u0003\u0002\u0002\u0002\n-\u0003\u0002\u0002",
    "\u0002\f6\u0003\u0002\u0002\u0002\u000e\u0010\u0005\u0004\u0003\u0002",
    "\u000f\u000e\u0003\u0002\u0002\u0002\u000f\u0010\u0003\u0002\u0002\u0002",
    "\u0010\u0015\u0003\u0002\u0002\u0002\u0011\u0012\u0007\t\u0002\u0002",
    "\u0012\u0014\u0005\u0004\u0003\u0002\u0013\u0011\u0003\u0002\u0002\u0002",
    "\u0014\u0017\u0003\u0002\u0002\u0002\u0015\u0013\u0003\u0002\u0002\u0002",
    "\u0015\u0016\u0003\u0002\u0002\u0002\u0016\u0018\u0003\u0002\u0002\u0002",
    "\u0017\u0015\u0003\u0002\u0002\u0002\u0018\u0019\u0007\n\u0002\u0002",
    "\u0019\u001a\u0005\u0004\u0003\u0002\u001a\u0003\u0003\u0002\u0002\u0002",
    "\u001b\u001c\u0005\u0006\u0004\u0002\u001c\u0005\u0003\u0002\u0002\u0002",
    "\u001d\"\u0005\b\u0005\u0002\u001e\u001f\u0007\u0005\u0002\u0002\u001f",
    "!\u0005\b\u0005\u0002 \u001e\u0003\u0002\u0002\u0002!$\u0003\u0002\u0002",
    "\u0002\" \u0003\u0002\u0002\u0002\"#\u0003\u0002\u0002\u0002#\u0007",
    "\u0003\u0002\u0002\u0002$\"\u0003\u0002\u0002\u0002%*\u0005\n\u0006",
    "\u0002&\'\u0007\u0007\u0002\u0002\')\u0005\n\u0006\u0002(&\u0003\u0002",
    "\u0002\u0002),\u0003\u0002\u0002\u0002*(\u0003\u0002\u0002\u0002*+\u0003",
    "\u0002\u0002\u0002+\t\u0003\u0002\u0002\u0002,*\u0003\u0002\u0002\u0002",
    "-2\u0005\f\u0007\u0002./\u0007\u0006\u0002\u0002/1\u0005\f\u0007\u0002",
    "0.\u0003\u0002\u0002\u000214\u0003\u0002\u0002\u000220\u0003\u0002\u0002",
    "\u000223\u0003\u0002\u0002\u00023\u000b\u0003\u0002\u0002\u000242\u0003",
    "\u0002\u0002\u000257\u0007\b\u0002\u000265\u0003\u0002\u0002\u00026",
    "7\u0003\u0002\u0002\u00027=\u0003\u0002\u0002\u00028>\u0007\u000b\u0002",
    "\u00029:\u0007\u0003\u0002\u0002:;\u0005\u0004\u0003\u0002;<\u0007\u0004",
    "\u0002\u0002<>\u0003\u0002\u0002\u0002=8\u0003\u0002\u0002\u0002=9\u0003",
    "\u0002\u0002\u0002>\r\u0003\u0002\u0002\u0002\t\u000f\u0015\"*26="].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'('", "')'", "'→'", "'∧'", "'∨'", "'¬'", "','", 
                     "'⊢'" ];

var symbolicNames = [ 'null', "LPAREN", "RPAREN", "IMPL", "AND", "OR", "NOT", 
                      "COMMA", "ENTL", "PREPOSITION", "WS" ];

var ruleNames =  [ "sequent", "formula", "implication", "disjunction", "conjunction", 
                   "negation" ];

function FOLParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

FOLParser.prototype = Object.create(antlr4.Parser.prototype);
FOLParser.prototype.constructor = FOLParser;

Object.defineProperty(FOLParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

FOLParser.EOF = antlr4.Token.EOF;
FOLParser.LPAREN = 1;
FOLParser.RPAREN = 2;
FOLParser.IMPL = 3;
FOLParser.AND = 4;
FOLParser.OR = 5;
FOLParser.NOT = 6;
FOLParser.COMMA = 7;
FOLParser.ENTL = 8;
FOLParser.PREPOSITION = 9;
FOLParser.WS = 10;

FOLParser.RULE_sequent = 0;
FOLParser.RULE_formula = 1;
FOLParser.RULE_implication = 2;
FOLParser.RULE_disjunction = 3;
FOLParser.RULE_conjunction = 4;
FOLParser.RULE_negation = 5;

function SequentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FOLParser.RULE_sequent;
    return this;
}

SequentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SequentContext.prototype.constructor = SequentContext;

SequentContext.prototype.ENTL = function() {
    return this.getToken(FOLParser.ENTL, 0);
};

SequentContext.prototype.formula = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FormulaContext);
    } else {
        return this.getTypedRuleContext(FormulaContext,i);
    }
};

SequentContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(FOLParser.COMMA);
    } else {
        return this.getToken(FOLParser.COMMA, i);
    }
};


SequentContext.prototype.enterRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.enterSequent(this);
	}
};

SequentContext.prototype.exitRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.exitSequent(this);
	}
};




FOLParser.SequentContext = SequentContext;

FOLParser.prototype.sequent = function() {

    var localctx = new SequentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, FOLParser.RULE_sequent);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 13;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << FOLParser.LPAREN) | (1 << FOLParser.NOT) | (1 << FOLParser.PREPOSITION))) !== 0)) {
            this.state = 12;
            this.formula();
        }

        this.state = 19;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===FOLParser.COMMA) {
            this.state = 15;
            this.match(FOLParser.COMMA);
            this.state = 16;
            this.formula();
            this.state = 21;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 22;
        this.match(FOLParser.ENTL);
        this.state = 23;
        this.formula();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FormulaContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FOLParser.RULE_formula;
    return this;
}

FormulaContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FormulaContext.prototype.constructor = FormulaContext;

FormulaContext.prototype.implication = function() {
    return this.getTypedRuleContext(ImplicationContext,0);
};

FormulaContext.prototype.enterRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.enterFormula(this);
	}
};

FormulaContext.prototype.exitRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.exitFormula(this);
	}
};




FOLParser.FormulaContext = FormulaContext;

FOLParser.prototype.formula = function() {

    var localctx = new FormulaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, FOLParser.RULE_formula);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 25;
        this.implication();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ImplicationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FOLParser.RULE_implication;
    return this;
}

ImplicationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ImplicationContext.prototype.constructor = ImplicationContext;

ImplicationContext.prototype.disjunction = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DisjunctionContext);
    } else {
        return this.getTypedRuleContext(DisjunctionContext,i);
    }
};

ImplicationContext.prototype.IMPL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(FOLParser.IMPL);
    } else {
        return this.getToken(FOLParser.IMPL, i);
    }
};


ImplicationContext.prototype.enterRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.enterImplication(this);
	}
};

ImplicationContext.prototype.exitRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.exitImplication(this);
	}
};




FOLParser.ImplicationContext = ImplicationContext;

FOLParser.prototype.implication = function() {

    var localctx = new ImplicationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, FOLParser.RULE_implication);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 27;
        this.disjunction();
        this.state = 32;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===FOLParser.IMPL) {
            this.state = 28;
            this.match(FOLParser.IMPL);
            this.state = 29;
            this.disjunction();
            this.state = 34;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DisjunctionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FOLParser.RULE_disjunction;
    return this;
}

DisjunctionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DisjunctionContext.prototype.constructor = DisjunctionContext;

DisjunctionContext.prototype.conjunction = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ConjunctionContext);
    } else {
        return this.getTypedRuleContext(ConjunctionContext,i);
    }
};

DisjunctionContext.prototype.OR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(FOLParser.OR);
    } else {
        return this.getToken(FOLParser.OR, i);
    }
};


DisjunctionContext.prototype.enterRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.enterDisjunction(this);
	}
};

DisjunctionContext.prototype.exitRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.exitDisjunction(this);
	}
};




FOLParser.DisjunctionContext = DisjunctionContext;

FOLParser.prototype.disjunction = function() {

    var localctx = new DisjunctionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, FOLParser.RULE_disjunction);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 35;
        this.conjunction();
        this.state = 40;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===FOLParser.OR) {
            this.state = 36;
            this.match(FOLParser.OR);
            this.state = 37;
            this.conjunction();
            this.state = 42;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ConjunctionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FOLParser.RULE_conjunction;
    return this;
}

ConjunctionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConjunctionContext.prototype.constructor = ConjunctionContext;

ConjunctionContext.prototype.negation = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(NegationContext);
    } else {
        return this.getTypedRuleContext(NegationContext,i);
    }
};

ConjunctionContext.prototype.AND = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(FOLParser.AND);
    } else {
        return this.getToken(FOLParser.AND, i);
    }
};


ConjunctionContext.prototype.enterRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.enterConjunction(this);
	}
};

ConjunctionContext.prototype.exitRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.exitConjunction(this);
	}
};




FOLParser.ConjunctionContext = ConjunctionContext;

FOLParser.prototype.conjunction = function() {

    var localctx = new ConjunctionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, FOLParser.RULE_conjunction);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 43;
        this.negation();
        this.state = 48;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===FOLParser.AND) {
            this.state = 44;
            this.match(FOLParser.AND);
            this.state = 45;
            this.negation();
            this.state = 50;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function NegationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FOLParser.RULE_negation;
    return this;
}

NegationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NegationContext.prototype.constructor = NegationContext;

NegationContext.prototype.PREPOSITION = function() {
    return this.getToken(FOLParser.PREPOSITION, 0);
};

NegationContext.prototype.LPAREN = function() {
    return this.getToken(FOLParser.LPAREN, 0);
};

NegationContext.prototype.formula = function() {
    return this.getTypedRuleContext(FormulaContext,0);
};

NegationContext.prototype.RPAREN = function() {
    return this.getToken(FOLParser.RPAREN, 0);
};

NegationContext.prototype.NOT = function() {
    return this.getToken(FOLParser.NOT, 0);
};

NegationContext.prototype.enterRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.enterNegation(this);
	}
};

NegationContext.prototype.exitRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.exitNegation(this);
	}
};




FOLParser.NegationContext = NegationContext;

FOLParser.prototype.negation = function() {

    var localctx = new NegationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, FOLParser.RULE_negation);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 52;
        _la = this._input.LA(1);
        if(_la===FOLParser.NOT) {
            this.state = 51;
            this.match(FOLParser.NOT);
        }

        this.state = 59;
        switch(this._input.LA(1)) {
        case FOLParser.PREPOSITION:
            this.state = 54;
            this.match(FOLParser.PREPOSITION);
            break;
        case FOLParser.LPAREN:
            this.state = 55;
            this.match(FOLParser.LPAREN);
            this.state = 56;
            this.formula();
            this.state = 57;
            this.match(FOLParser.RPAREN);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.FOLParser = FOLParser;
