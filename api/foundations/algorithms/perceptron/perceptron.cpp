// Credit: Perceptron Algorithm with Code Example: https://youtu.be/-KLnurhX-Pg
#include <vector>
#include <utility>

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

int main() {
    vector<pair<float, float>> iw;
    //
    iw.push_back(make_pair( 0.1, 0.4)); // input, weight
    iw.push_back(make_pair( 0.5, 0.3));
    iw.push_back(make_pair( 0.2, 0.6));

    float threshold = 0.5;

    int output = perceptron(iw, threshold);

    cout << output << endl;
}