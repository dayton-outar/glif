PROGRAM   = main
CXX       = g++
CXXFLAGS  = -g -std=c++2a -Wall

$(PROGRAM): main.o
	$(CXX) -o $(PROGRAM) main.o list.cpp

.PHONY: clean dist

clean:
	-rm *.o $(PROGRAM) *core

dist: clean
	-tar -chvj -C .. -f ../$(PROGRAM).tar.bz2 $(PROGRAM)