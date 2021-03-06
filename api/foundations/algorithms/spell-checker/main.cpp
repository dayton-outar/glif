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
    std::regex e ("\\w+");    

    // Adapted from: https://www.geeksforgeeks.org/program-to-find-all-match-of-a-regex-in-a-string/
    for (sregex_iterator it = sregex_iterator(text.begin(), text.end(), e);
         it != sregex_iterator(); it++) {
        std::smatch sm;
        sm = *it;
        words.push_back(sm.str(0));
    }

    return words;
}

std::map<std::string, int> word_counter(std::vector<std::string> const &words) {
    std::map<std::string,int> counter;

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

#pragma region WordCombo

std::map<std::string, std::string> splits(std::string const &word) {
    std::map<std::string, std::string> wordSplits;

    auto len = word.length() + 1;
    for (int i = 0; i < len; i++) {
        wordSplits[word.substr(0, i)] = word.substr(i, len);
    }

    return wordSplits;
}

std::vector<std::string> deletes(std::map<std::string, std::string> const &splits) {
    std::vector<std::string> dels;

    // Adapted from: https://thispointer.com/how-to-copy-all-values-from-a-map-to-a-vector-in-c/
    std::for_each(splits.begin(), splits.end(),
        [&](auto &el) {
            if (!el.second.empty()) {
                auto len = el.second.length() - 1;
                dels.push_back( el.first + el.second.substr(1, len) );
            }
        }
    );

    return dels;
}

std::vector<std::string> transposes(std::map<std::string, std::string> const &splits) {
    std::vector<std::string> tsps;

    std::for_each(splits.begin(), splits.end(),
        [&](auto &el) {
            auto len = el.second.length();
            if (len > 1) {
                tsps.push_back( el.first + el.second.substr(1, 1) + el.second.substr(0, 1) + el.second.substr(2, len) );
            }
        }
    );

    return tsps;
}

std::vector<std::string> replaces(std::map<std::string, std::string> const &splits) {
    std::vector<std::string> rplcs;
    std::string letters = "abcdefghijklmnopqrstuvwxyz";

    std::for_each(splits.begin(), splits.end(),
        [&](auto &el) {
            for (int x = 0; x < letters.length(); x++) {
                if (!el.second.empty()) {
                    auto len = el.second.length() - 1;
                    rplcs.push_back( el.first + letters[x] + el.second.substr(1, len) );
                }
            }
        }
    );

    return rplcs;
}

std::vector<std::string> inserts(std::map<std::string, std::string> const &splits) {
    std::vector<std::string> insts;
    std::string letters = "abcdefghijklmnopqrstuvwxyz";

    std::for_each(splits.begin(), splits.end(),
        [&](auto &el) {
            for (int x = 0; x < letters.length(); x++) {
                insts.push_back( el.first + letters[x] + el.second );
            }
        }
    );

    return insts;
}

auto variants(std::string const &word) { // edits1
    std::vector<std::string> vrnts;
    std::vector<std::string> unique;

    auto flowers = splits(word);

    auto dels = deletes(flowers);
    auto tsps = transposes(flowers);
    auto rplcs = replaces(flowers);
    auto insts = inserts(flowers);

    // Append vectors
    // Learnt from https://www.delftstack.com/howto/cpp/append-vector-to-vector-cpp/
    vrnts.insert(vrnts.end(), dels.begin(), dels.end());
    vrnts.insert(vrnts.end(), tsps.begin(), tsps.end());
    vrnts.insert(vrnts.end(), rplcs.begin(), rplcs.end());
    vrnts.insert(vrnts.end(), insts.begin(), insts.end());

    for ( auto w : vrnts) {
        if (std::find(unique.begin(), unique.end(), w) == unique.end()) {
            // someName not in name, add it
            unique.push_back(w);
        }
    }

    return unique;
}

auto mutations(std::string const &word) { // edits2
    std::vector<std::string> muts;

    for (auto var : variants(word)) {
        for (auto mut: variants(var)) {
            muts.push_back(mut);
        }
    }

    return muts;
}

#pragma endregion Helpers

auto known(std::vector<std::string> words, std::map<std::string, int> &wordMap) {
    std::vector<std::string> wordFound;

    for (auto w: words) {
        // https://stackoverflow.com/questions/1939953/how-to-find-if-a-given-key-exists-in-a-c-stdmap
        if ( wordMap.find(w) != wordMap.end() ) {
            wordFound.push_back(w);
        }
    }

    return wordFound;
}

auto candidates(std::string const &word, std::map<std::string, int> &wordCounts) {
    std::vector<std::string> response;
    std::vector<std::string> candidateWords{ word };

    response = known(candidateWords, wordCounts);

    if ( response.empty() ) {
        auto v = variants(word);
        response = known(v, wordCounts);
    }

    if ( response.empty() ) {
        auto m = mutations(word);
        response = known(m, wordCounts);
    }

    if ( response.empty() ) {
        response = candidateWords;
    }

    return response;
}

auto correct(std::string const &word, std::map<std::string, int> &wordCounts) {
    string correction = "";
    std::vector<std::string> words = candidates( word, wordCounts);    

    if (words.size() > 0) {
        correction = *max_element(words.begin(), words.end(), [&wordCounts](std::string const &wa, std::string const &wb) {
                            auto wpa = probability(wa, wordCounts);
                            auto wpb = probability(wb, wordCounts);
                            
                            return wpa < wpb;
                        });
    }

    return correction;
}

int main(int argc, char** argv)
{
    cout << "read file ..." << endl;
    string content = readfile(argv[1]);
    cout << endl;

    cout << "splitting words ..." << endl;
    auto words = words_split(content);
    cout << endl;

    cout << "mapping words ..." << endl;
    map<string, int> wordMap = word_counter(words);
    cout << endl;

    // Adapted from https://github.com/felipefarinon/spellingcorrector/blob/master/spellingcorrector/main.cpp
    string request;
	while (request != "quit")
	{
		cout << "Enter a word\n";
		cin >> request;

		string suggestion = correct(request, wordMap);

		if (suggestion != "")
			cout << "You meant: " << suggestion << "?\n\n\n";
		else
			cout << "No correction suggestion\n\n\n";
	}

	cin.get();
}