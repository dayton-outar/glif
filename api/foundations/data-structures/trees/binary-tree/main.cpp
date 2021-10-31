#include <iostream>
#include "binary-tree.h"

int main() {
    Tree<int> t;

    t.insert(45);
    t.insert(52);
    t.insert(13);
    t.insert(20);
    t.insert(10);
    t.insert(7);

    std::cout << "In order" << std::endl;

    t.inorder();

    std::cout << std::endl;

    std::cout << "Pre order" << std::endl;

    t.preorder();

    std::cout << std::endl;

    std::cout << "Post order" << std::endl;

    t.postorder();

    std::cout << std::endl;


    std::cout << "Done!" << std::endl;
}