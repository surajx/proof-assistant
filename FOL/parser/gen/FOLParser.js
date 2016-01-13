// Generated from FOL.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var FOLListener = require('./FOLListener').FOLListener;
var grammarFileName = "FOL.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003\f1\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0003\u0002\u0005\u0002\n\n\u0002\u0003\u0002\u0003\u0002\u0007\u0002",
    "\u000e\n\u0002\f\u0002\u000e\u0002\u0011\u000b\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0005\u0004/\n\u0004\u0003\u0004\u0002",
    "\u0002\u0005\u0002\u0004\u0006\u0002\u00023\u0002\t\u0003\u0002\u0002",
    "\u0002\u0004\u0016\u0003\u0002\u0002\u0002\u0006.\u0003\u0002\u0002",
    "\u0002\b\n\u0005\u0006\u0004\u0002\t\b\u0003\u0002\u0002\u0002\t\n\u0003",
    "\u0002\u0002\u0002\n\u000f\u0003\u0002\u0002\u0002\u000b\f\u0007\t\u0002",
    "\u0002\f\u000e\u0005\u0006\u0004\u0002\r\u000b\u0003\u0002\u0002\u0002",
    "\u000e\u0011\u0003\u0002\u0002\u0002\u000f\r\u0003\u0002\u0002\u0002",
    "\u000f\u0010\u0003\u0002\u0002\u0002\u0010\u0012\u0003\u0002\u0002\u0002",
    "\u0011\u000f\u0003\u0002\u0002\u0002\u0012\u0013\u0007\n\u0002\u0002",
    "\u0013\u0014\u0005\u0006\u0004\u0002\u0014\u0015\u0007\u0002\u0002\u0003",
    "\u0015\u0003\u0003\u0002\u0002\u0002\u0016\u0017\u0005\u0006\u0004\u0002",
    "\u0017\u0018\u0007\u0002\u0002\u0003\u0018\u0005\u0003\u0002\u0002\u0002",
    "\u0019/\u0007\u000b\u0002\u0002\u001a\u001b\u0007\b\u0002\u0002\u001b",
    "/\u0005\u0006\u0004\u0002\u001c\u001d\u0007\u0003\u0002\u0002\u001d",
    "\u001e\u0005\u0006\u0004\u0002\u001e\u001f\u0007\u0006\u0002\u0002\u001f",
    " \u0005\u0006\u0004\u0002 !\u0007\u0004\u0002\u0002!/\u0003\u0002\u0002",
    "\u0002\"#\u0007\u0003\u0002\u0002#$\u0005\u0006\u0004\u0002$%\u0007",
    "\u0007\u0002\u0002%&\u0005\u0006\u0004\u0002&\'\u0007\u0004\u0002\u0002",
    "\'/\u0003\u0002\u0002\u0002()\u0007\u0003\u0002\u0002)*\u0005\u0006",
    "\u0004\u0002*+\u0007\u0005\u0002\u0002+,\u0005\u0006\u0004\u0002,-\u0007",
    "\u0004\u0002\u0002-/\u0003\u0002\u0002\u0002.\u0019\u0003\u0002\u0002",
    "\u0002.\u001a\u0003\u0002\u0002\u0002.\u001c\u0003\u0002\u0002\u0002",
    ".\"\u0003\u0002\u0002\u0002.(\u0003\u0002\u0002\u0002/\u0007\u0003\u0002",
    "\u0002\u0002\u0005\t\u000f."].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'('", "')'", "'→'", "'∧'", "'∨'", "'¬'", "','",
                     "'⊢'" ];

var symbolicNames = [ 'null', "LPAREN", "RPAREN", "IMPL", "AND", "OR", "NOT",
                      "COMMA", "ENTL", "PREPOSITION", "WS" ];

var ruleNames =  [ "sequent", "wff", "formula" ];

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
FOLParser.RULE_wff = 1;
FOLParser.RULE_formula = 2;

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

SequentContext.prototype.EOF = function() {
    return this.getToken(FOLParser.EOF, 0);
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
        this.state = 7;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << FOLParser.LPAREN) | (1 << FOLParser.NOT) | (1 << FOLParser.PREPOSITION))) !== 0)) {
            this.state = 6;
            this.formula();
        }

        this.state = 13;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===FOLParser.COMMA) {
            this.state = 9;
            this.match(FOLParser.COMMA);
            this.state = 10;
            this.formula();
            this.state = 15;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 16;
        this.match(FOLParser.ENTL);
        this.state = 17;
        this.formula();
        this.state = 18;
        this.match(FOLParser.EOF);
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

function WffContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FOLParser.RULE_wff;
    return this;
}

WffContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
WffContext.prototype.constructor = WffContext;

WffContext.prototype.formula = function() {
    return this.getTypedRuleContext(FormulaContext,0);
};

WffContext.prototype.EOF = function() {
    return this.getToken(FOLParser.EOF, 0);
};

WffContext.prototype.enterRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.enterWff(this);
	}
};

WffContext.prototype.exitRule = function(listener) {
    if(listener instanceof FOLListener ) {
        listener.exitWff(this);
	}
};




FOLParser.WffContext = WffContext;

FOLParser.prototype.wff = function() {

    var localctx = new WffContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, FOLParser.RULE_wff);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 20;
        this.formula();
        this.state = 21;
        this.match(FOLParser.EOF);
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

FormulaContext.prototype.PREPOSITION = function() {
    return this.getToken(FOLParser.PREPOSITION, 0);
};

FormulaContext.prototype.NOT = function() {
    return this.getToken(FOLParser.NOT, 0);
};

FormulaContext.prototype.formula = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FormulaContext);
    } else {
        return this.getTypedRuleContext(FormulaContext,i);
    }
};

FormulaContext.prototype.LPAREN = function() {
    return this.getToken(FOLParser.LPAREN, 0);
};

FormulaContext.prototype.AND = function() {
    return this.getToken(FOLParser.AND, 0);
};

FormulaContext.prototype.RPAREN = function() {
    return this.getToken(FOLParser.RPAREN, 0);
};

FormulaContext.prototype.OR = function() {
    return this.getToken(FOLParser.OR, 0);
};

FormulaContext.prototype.IMPL = function() {
    return this.getToken(FOLParser.IMPL, 0);
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
    this.enterRule(localctx, 4, FOLParser.RULE_formula);
    try {
        this.state = 44;
        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 23;
            this.match(FOLParser.PREPOSITION);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 24;
            this.match(FOLParser.NOT);
            this.state = 25;
            this.formula();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 26;
            this.match(FOLParser.LPAREN);
            this.state = 27;
            this.formula();
            this.state = 28;
            this.match(FOLParser.AND);
            this.state = 29;
            this.formula();
            this.state = 30;
            this.match(FOLParser.RPAREN);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 32;
            this.match(FOLParser.LPAREN);
            this.state = 33;
            this.formula();
            this.state = 34;
            this.match(FOLParser.OR);
            this.state = 35;
            this.formula();
            this.state = 36;
            this.match(FOLParser.RPAREN);
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 38;
            this.match(FOLParser.LPAREN);
            this.state = 39;
            this.formula();
            this.state = 40;
            this.match(FOLParser.IMPL);
            this.state = 41;
            this.formula();
            this.state = 42;
            this.match(FOLParser.RPAREN);
            break;

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
exports.FormulaContext = FormulaContext;
