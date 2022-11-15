// Credit: Perceptron Algorithm with Code Example: https://youtu.be/-KLnurhX-Pg
// g++ perceptron.cpp -o perceptron
#include <vector>
#include <utility>
#include <cmath>

#include <iostream>

using namespace std;

int step(float weighted_sum, float threshold) {
    if (weighted_sum > threshold)
        return 1;
    else
        return 0;
}

int perceptron(vector<pair<float, float>> &iw, float threshold) {
    float wSum = 0;

    for (vector<pair<float,float>>::const_iterator it = iw.begin(); it != iw.end(); it++) {
        wSum += it->second * it->first; // input x weight
        cout << wSum << endl;
    }

    return step(wSum, threshold);
}

float cross_entropy(vector<pair<float, int>> &id) {
    float loss = 0;
    int n = id.size();

    for (vector<pair<float,int>>::const_iterator it = id.begin(); it != id.end(); it++) {
        float wSum = it->first; // add weights
        float y = static_cast<float>(it->second);
        float cl = -( (y * log10(wSum)) + ((1 - y) * log10(1 - wSum)) );
        loss += cl;
        cout << cl << endl;
    }

    return loss / n;
}

int main() {
    vector<pair<float, float>> iw;
    //
    iw.push_back(make_pair( 0.1, 0.4)); // input, weight
    iw.push_back(make_pair( 0.5, 0.3));
    iw.push_back(make_pair( 0.2, 0.6));

    float threshold = 0.5;

    int output = perceptron(iw, threshold);

    cout << "Output: " << output << endl;

    vector<pair<float, int>> id;
    id.push_back(make_pair( 0.26, 1));
    id.push_back(make_pair( 0.20, 0));
    id.push_back(make_pair( 0.48, 1));
    id.push_back(make_pair( 0.30, 0));

    float loss = cross_entropy(id);

    cout << "Cross Entropy Loss: " << loss << endl;
}