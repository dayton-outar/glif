CC=gcc
CLFAGS=-g -Wall
OBJS=main.o matrix.o ui.o

all: main

main: $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^ -lncurses

%.0: %.c
	$(CC) $(CFLAGS) -c $^ -o $@

clean:
	rm -rf *.o main
