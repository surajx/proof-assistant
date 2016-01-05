/*
* FOL originally written for Antlr3 by Stephan Opfer
*
* Ported to Antlr4 by Tom Everett
*
* Stripped down to PL by Suraj Narayanan
*
*/

grammar FOL;

/*------------------------------------------------------------------
 * PARSER RULES
 *------------------------------------------------------------------*/

sequent
    : formula? (COMMA formula)* ENTL formula
    ;

formula
    : implication
    ;

implication
    : disjunction (IMPL disjunction)*
    ;

disjunction
    : conjunction (OR conjunction)*
    ;

conjunction
    : negation (AND negation)*
    ;

negation
    : NOT? (PREPOSITION | LPAREN formula RPAREN)
    ;

LPAREN
    : '('
    ;

RPAREN
    : ')'
    ;

IMPL
    : '→'
    ;

AND
    : '∧'
    ;

OR
    : '∨'
    ;

NOT
    : '¬'
    ;

COMMA
    : ','
    ;

ENTL
    : '⊢'
    ;

PREPOSITION
    : ('a'..'z' | 'A'..'Z' | '⊤' | '⊥') CHARACTER*
    ;

fragment CHARACTER
    : ('0'..'9' | 'a'..'z' | 'A'..'Z' | '_')
    ;

WS
    : (' ' | '\t' | '\r' | '\n')+ ->skip
    ;
