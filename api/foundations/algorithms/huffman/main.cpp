#include <iostream>
#include <fstream>
#include <cstring>

using namespace std;

#include "huffman.h"

int main(int argc, char* argv[]) {
    char fileName[30];
    HuffmanCoding Huffman;
    if (argc != 2) {
        cout << "Enter a file name: ";
        cin  >> fileName;
    }
    else strcpy(fileName,argv[1]);
    ifstream fIn(fileName);
    // use this line on a PC:
    // ifstream fIn(fileName,ios::binary);
    if (fIn.fail()) {
        cerr << "Cannot open " << fileName << endl;
        return 0;
    }
    Huffman.compress(fileName,fIn);
    fIn.close();

    cout << "File compressed!\n";

    // Decompress
    if (argc != 2) {
        cout << "Enter a file name: ";
        cin  >> fileName;
    }
    else strcpy(fileName,argv[1]);
    
    // use this line on a PC:
    // ifstream fIn(fileName,ios::binary);
    if (fIn.fail()) {
        cerr << "Cannot open " << fileName << endl;
        return 0;
    }
    
    Huffman.decompress(fileName,fIn);
    fIn.close();

    return 0;
}