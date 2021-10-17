#include "list.h"
#include <iostream>

int main() {
    kList<int> list;

    list.kListInsert(20);
    list.kListInsert(14);
    list.kListInsert(31);
    list.kListInsert(53);
    list.kListInsert(16);
    list.kListInsert(12);

    auto found = list.kListSearch(53);     

    std::cout << *found << std::endl;
    //std::cout << list << std::endl;
}