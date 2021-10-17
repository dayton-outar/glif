PROGRAM   = database
CXX       = g++
CXXFLAGS  = -g -std=c++14 -Wall

$(PROGRAM): database.o
	$(CXX) -o $(PROGRAM) database.o personal.cpp student.cpp

.PHONY: clean dist

clean:
	-rm *.o $(PROGRAM) *core

dist: clean
	-tar -chvj -C .. -f ../$(PROGRAM).tar.bz2 $(PROGRAM)