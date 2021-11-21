CC=gcc
CFLAGS=-g -Wall
OBJ=queue.o
BIN=main

all: $(BIN)

%.o: %.c %.h
	$(CC) $(CFLAGS) -c $< -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

$(BIN): main.c $(OBJ)
	$(CC) $(CFLAGS) $^ -o $@

.PHONY: clean

clean:
	$(RM) -r $(OBJ) $(BIN) *.dSYM