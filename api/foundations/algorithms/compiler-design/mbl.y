%{
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int yylex();
int yyerror(char *);
%}

/* declare tokens */
%token NUMBER
%token ADD SUB ABS AMP XOR MUL DIV MOD RAD TIL IMP NOT AND OR GT GEQ LT LEQ NEQ EQ
%token QRY LPR RPR LBR RBR LBK RBK COM COL
%token EOL

%%

calclist: /* nothing */
 | calclist exp EOL { printf("= %d\n> ", $2); }
 | calclist EOL { printf("> "); } /* blank line or a comment */
 ;

exp: factor
 | exp ADD exp { $$ = $1 + $3; }
 | exp SUB factor { $$ = $1 - $3; }
 | exp ABS factor { $$ = $1 | $3; }
 | exp AMP factor { $$ = $1 & $3; }
 | exp XOR factor { $$ = $1 ^ $3; }
 ;

factor: rad
 | factor MUL rad { $$ = $1 * $3; }
 | factor DIV rad { $$ = $1 / $3; }
 | factor MOD rad { $$ = $1 % $3; }
 ;

rad: term
  | RAD term { $$ = sqrt((double)$2); }
  ;

term: NUMBER
 | ABS term ABS { $$ = $2 >= 0? $2 : - $2; }
 ;

%%

int main(int argc, char **argv)
{
  printf("> "); 
  yyparse();
}

int yyerror(char *s)
{
  fprintf(stderr, "error: %s\n", s);
  exit(1);
}