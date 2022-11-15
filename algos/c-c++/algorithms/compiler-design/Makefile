mbl: mbl.l mbl.y
	bison -d mbl.y
	flex mbl.l
	cc -o $@ mbl.tab.c lex.yy.c -lfl -lm