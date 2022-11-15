%{
// Links .y (yacc file tokens) to this .l (lexer file)
#include "mbl.tab.h"

int yylval;

%}

%%
"+"	        { return ADD; }
"-"         { return SUB; }
"×"         { return MUL; }
"÷"         { return DIV; }
"|"         { return ABS; }
"√"         { return RAD; }
"%"         { return MOD; }
"&"         { return AMP; }
"⊻"         { return XOR; }
"~"         { return TIL; }
"⇒"         { return IMP; }
"¬"         { return NOT; }
"∧"         { return AND; }
"∨"         { return OR;  }
"?"         { return QRY; }
">"         { return GT;  }
"≥"         { return GEQ; }
"<"         { return LT;  }
"≤"         { return LEQ; }
"≠"         { return NEQ; }
"="         { return EQ;  }
"("         { return LPR; }
")"         { return RPR; }
"{"         { return LBR; }
"}"         { return RBR; }
"["         { return LBK; }
"]"         { return RBK; }
","         { return COM; }
":"         { return COL; }

[0-9]+      { yylval = atoi(yytext); return NUMBER; }
\n          { return EOL; }
[ \t]       { /* ignore white space */ }
.           { printf("Mystery character %c\n", *yytext); }
%%