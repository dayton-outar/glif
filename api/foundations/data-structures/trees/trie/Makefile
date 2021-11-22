CC := g++
CFLAGS := -Wall -g
TARGET := main

# $(wildcard *.cpp /xxx/xxx/*.cpp): get all .cpp files from the current directory and dir "/xxx/xxx/"
SRCS := $(wildcard *.cpp)
# $(patsubst %.cpp,%.o,$(SRCS)): substitute all ".cpp" file name strings to ".o" file name strings
OBJS := $(patsubst %.cpp,%.o,$(SRCS))

all: $(TARGET)
$(TARGET): $(OBJS)
	$(CC) -pthread -o $@ $^
%.o: %.cpp
	$(CC) $(CFLAGS) -c $<
clean:
	rm -rf $(TARGET) *.o

clean-o:
	rm -rf *.o
	
.PHONY: all clean dist

clean:
	-rm *.o $(TARGET) *core

dist: clean
	-tar -chvj -C .. -f ../$(TARGET).tar.bz2 $(TARGET)