// Adopted from: https://stackoverflow.com/questions/53055563/what-is-the-c-equivalent-of-python-collections-counter
#include <iostream>
#include <map>
#include <vector>

using namespace std;

std::map<std::string, int> word_counter(std::vector<std::string> &words) {
    std::map<std::string,int> counter;

    // TODO: use STL foreach
    for (auto word : words) {
        counter[word]++;
    }
    
    return counter;
}

int main()
{
    std::vector<std::string> words = { "dog", "cat", "cat", "beer" };
    std::map<std::string,int> counter = word_counter(words);

    for (auto pair : counter) {
        cout << pair.first << ":" << pair.second << std::endl;
    }
}