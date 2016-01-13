/*
* FOL originally written for Antlr3 by Stephan Opfer
*
* Ported to Antlr4 by Tom Everett
*
* Stripped down to PL by Boris Repasky and Suraj Narayanan S
*
*/

grammar FOL;

/*------------------------------------------------------------------
 * PARSER RULES
 *------------------------------------------------------------------*/

sequent
    : formula? (COMMA formula)* ENTL formula EOF
    ;

wff
    : formula EOF
    ;

formula
    : PREPOSITION | NOT formula | LPAREN formula AND formula RPAREN | LPAREN formula OR formula RPAREN | LPAREN formula IMPL formula RPAREN
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
