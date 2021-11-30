// Adopted from: https://stackoverflow.com/questions/53055563/what-is-the-c-equivalent-of-python-collections-counter
/**
 * Originally from Peter Norvig (2007-2016) and written in Python.
 * See http://norvig.com/spell-correct.html
 * 
 */
#include <iostream>
#include <fstream>
#include <map>
#include <vector>
#include <regex>
#include <numeric>

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

/**
 * Returns the probability of a word existing within a word collection
 * 
 * This is using basic probability, where the word count is 
 * divided by the total number of words in the collection gathered
 * from the document. 
 * 
 * @param word Word to be checked for a probability score
 * @param wordCount Mapping of words to their word count from a given document
 * @return Probability score of word in this collection
 */
double probability(std::string const &word, std::map<std::string, int> &wordCounts) {

    // Adapted from https://stackoverflow.com/questions/31354947/adding-all-values-of-map-using-stdaccumulate
    int n = std::accumulate(std::begin(wordCounts)
              , std::end(wordCounts)
              , 0
              , [] (int value, const std::map<std::string, int>::value_type& p)
                   { return value + p.second; }
               );
    
    return static_cast<double>(wordCounts[word]) / n;
}

int main()
{
    std::string content = readfile("words.txt");
    std::map<std::string,int> counter = word_counter(words_split(content));

    for (auto pair : counter) {
        cout << pair.first << ":" << pair.second << std::endl;
    }

    cout << "probability of rat: " << probability("rat", counter) << endl;
}