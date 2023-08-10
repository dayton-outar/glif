// https://favtutor.com/blogs/dijkstras-algorithm-cpp
// g++ -std=c++11 dijkstra.cpp -o dijkstra.o
#include <iostream>
#include <climits>
using namespace std;

int miniDist(int distance[], bool Tset[]) // finding minimum distance
{
    int minimum = INT_MAX, index;

    cout << "minimum: " << minimum << "; index: " << index << endl;
              
    for(int k = 0; k < 6; k++) 
    {
        if( Tset[k] == false && distance[k] <= minimum )      
        {
            minimum = distance[k];
            index = k;
        }
        char str = 65 + k;
        cout << str << "; visited: " << Tset[k] << "; distance: " << distance[k] << "; minimum: " << minimum << endl;
    }

    char strIndex = 65 + index;
    cout << strIndex << endl;

    return index;
}

void DijkstraAlgo(int graph[6][6],int src) // adjacency matrix 
{
    int distance[6]; // array to calculate the minimum distance for each node                             
    bool Tset[6]; // boolean array to mark visited and unvisited for each node
    
     
    for(int k = 0; k < 6; k++)
    {
        distance[k] = INT_MAX;
        Tset[k] = false;    
    }
    
    distance[src] = 0;   // Source vertex distance is set 0               
    
    for(int k = 0; k < 6; k++)                           
    {
        int m = miniDist(distance, Tset);
        Tset[m] = true;

        for(int k = 0; k < 6; k++)                  
        {
            // updating the distance of neighbouring vertex
            if ( !Tset[k] && // if not visited
                graph[m][k] && // if there is an edge ... graph[m][k] is the weight of the edge that is greater than 0
                distance[m] != INT_MAX && // if source vertex is not infinity
                distance[m] + graph[m][k] < distance[k] // if the distance is less than the current distance
               )
            {
                distance[k] = distance[m] + graph[m][k];
                //
                char strK = 65 + k;
                char strM = 65 + m;
                cout << "k: " << strK << "; m: " << strM << "; " << distance[m] << " + " << graph[m][k] << " = " << distance[k] << endl;
            }
        }
    }

    cout << "Vertex\t\tDistance from source vertex" << endl;
    for(int k = 0; k < 6; k++)                      
    { 
        char str = 65 + k; 
        cout << str << "\t\t\t" << distance[k] << endl;
    }
}

int main()
{
    // graph[row][column]
    int graph[6][6]={
        {0, 1, 2, 0, 0, 0},
        {1, 0, 0, 5, 1, 0},
        {2, 0, 0, 2, 3, 0},
        {0, 5, 2, 0, 2, 2},
        {0, 1, 3, 2, 0, 1},
        {0, 0, 0, 2, 1, 0}};

    DijkstraAlgo(graph, 0);

    return 0;                           
}