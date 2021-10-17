#include <iostream>

class C {
public:
    int& getRefN() {
        return n;
    }

    int getN() {
        return n;
    }
private:
    int n;
};

int main(int argc, char *argv[])
{
    C c;

    int& k = c.getRefN();
    k = 7;

    std::cout << c.getN() << std::endl;

}