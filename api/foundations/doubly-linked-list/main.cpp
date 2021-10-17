#include "list.h"
#include <iostream>

int main() {
    dList<int> list;

    list.addToDLLHead(9);
    list.addToDLLTail(70);
    

    std::cout << list << std::endl;
}