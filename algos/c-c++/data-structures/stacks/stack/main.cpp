#include <iostream>
#include "stack-vectors.h"
#include "stack-list.h"

int main() {
    Stack<int> s;

    s.push(12);
    s.push(14);
    s.push(80);

    int t;
    while (!s.isEmpty()) {
        t = s.pop();
        std::cout << "Popped: " << t << std::endl;
    }

    std::cout << "Now let's try this with a stack using linked list." << std::endl;

    LLStack<float> f;

    f.push(34.50);
    f.push(12.33);
    f.push(25.50);
    f.push(77.05);

    float b;
    while (!f.isEmpty()) {
        b = f.pop();
        std::cout << "Popped: " << b << std::endl;
    }

    std::cout << "Done!" << std::endl;
}