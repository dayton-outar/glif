CC=gcc
CFLAGS=-g -Wall

%.o: %.c
	$(CC) $(CFLAGS) -c $^ -o $@

$(BIN): $(OBJ)
	$(CC) $(CFLAGS) $(BIN).c $^ -o $@

.PHONY: clean vis

vis: $(BIN)
	./$(BIN) | dot -Tpdf > vis.pdf

clean:
	$(RM) -r $(BIN) $(OBJ) *.dSYM vis.pdf