// Adopted from: https://stackoverflow.com/questions/53055563/what-is-the-c-equivalent-of-python-collections-counter
#include <iostream>
#include <map>
#include <vector>

using namespace std;

std::map<std::string, int> word_counter(std::vector<std::string> &words) {
    std::map<std::string,int> counter;

    // TODO: use STL foreach
    //counter.insert()
}

int main()
{
    std::map<std::string,int> counter;
    counter["dog"] = 8;
    counter["cat"]++;
    counter["cat"]++;
    counter["1"] = 0;

    for (auto pair : counter) {
        cout << pair.first << ":" << pair.second << std::endl;
    }
}