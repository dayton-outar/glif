// Adopted from: https://stackoverflow.com/questions/53055563/what-is-the-c-equivalent-of-python-collections-counter
#include <iostream>
#include <fstream>
#include <map>
#include <vector>
#include <regex>

using namespace std;

std::string readfile(std::string const &filename) {
    ifstream rf(filename);
    std::string content((std::istreambuf_iterator<char>(rf)),
                 std::istreambuf_iterator<char>());
    rf.close();

    return content;
}

std::vector<std::string> words_split(std::string &text) {
    std::vector<std::string> words;
    const std::regex exp("\\w+"); // FIX: It's not finding all the words
    std::smatch sm;

    // Adapted from: https://www.geeksforgeeks.org/program-to-find-all-match-of-a-regex-in-a-string/
    while (std::regex_search(text, sm, exp)) {
        words.push_back(sm.str(0));

        text = sm.suffix().str();
    }

    return words;
}

std::map<std::string, int> word_counter(std::vector<std::string> const &words) {
    std::map<std::string,int> counter;

    // TODO: use STL foreach
    for (auto word : words) {
        counter[word]++;
    }
    
    return counter;
}

int main()
{
    std::string content = readfile("words.txt");
    std::map<std::string,int> counter = word_counter(words_split(content));

    for (auto pair : counter) {
        cout << pair.first << ":" << pair.second << std::endl;
    }
}