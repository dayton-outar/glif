# 8.3 Shortest Paths

Finding the shortest path is a classical problem in graph theory, and a large number of different solutions have been proposed. Edges are assigned certain weights representing, for example,

 - distances between cities
 - times separating the execution of certain tasks
 - costs of transmitting information between locations
 - amounts of some substance transported from one place to another,

and so on.

When determining the shortest path from vertex $v$ to vertex $u$, information about distances between intermediate vertices $w$ has to be recorded.

In Dijkstra’s algorithm, a number of paths $p_1, \dots, p_n$ from a vertex $v$ are tried, and each time, the shortest path is chosen among them, which may mean that the same path $p_i$ can be continued by adding one more edge to it. But if $p_i$ turns out to be longer than any other path that can be tried, $p_i$ is abandoned and this other path is tried by resuming from where it was left off and by adding one more edge to it. ­Because paths can lead to vertices with more than one outgoing edge, new paths for possible exploration are added for each outgoing edge. Each vertex is tried once, all paths leading from it are opened, and the vertex itself is put away and not used anymore. After all vertices are visited, the algorithm is finished. This is a [greedy approach](../../../js/codility/greedy/).

## Observations

Let's start the observation of the C++ implementation of _Dijkstra_ algorithm found in the `dijkstra.cpp` file.

```c
#include <iostream>
#include <climits>
using namespace std;

int miniDist(int distance[], bool Tset[]) // finding minimum distance
{
    int minimum = INT_MAX, index;
              
    for(int k = 0; k < 6; k++) 
    {
        if( Tset[k] == false && distance[k] <= minimum )      
        {
            minimum = distance[k];
            index = k;
        }
    }

    return index;
}

void DijkstraAlgo(int graph[6][6],int src) // pass in adjacency matrix and index of source
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
            }
        }
    }

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
```

The program starts off with an adjacency matrix as follows,

```c
    int graph[6][6]={
        {0, 1, 2, 0, 0, 0},
        {1, 0, 0, 5, 1, 0},
        {2, 0, 0, 2, 3, 0},
        {0, 5, 2, 0, 2, 2},
        {0, 1, 3, 2, 0, 1},
        {0, 0, 0, 2, 1, 0}};
```

Let's visualize this in a table, where the columns and rows are the vertices of the graph. See table below,

|       | A | B | C | D | E | F |
|:-----:|:-:|:-:|:-:|:-:|:-:|:-:|
| **A** |   | 1 | 2 |   |   |   |
| **B** | 1 |   |   | 5 | 1 |   |
| **C** | 2 |   |   | 2 | 3 |   |
| **D** |   | 5 | 2 |   | 2 | 2 |
| **E** |   | 1 | 3 | 2 |   | 1 |
| **F** |   |   |   | 2 | 1 |   |

A visual representation of this graph with the weights mentioned in the table can be shown below,

![Graph representing the 6 by 6 adjacency matrix](/.attachments/dijkstra.graph-1.png)

Entering the `DijkstraAlgo` function, the arrays, `distance` and `Tset`, are given initial values in the first loop. All values of `distance` are set to the closest thing to infinity in _C++_, which is `INT_MAX` from the `<climits>` library.[^1] The `Tset` array keeps track of the vertices that are visited.

The first critical part of the second loop informs the program of the vertex that has the shortest path from the source vertex, which for this use case is $A$ (with index of 0). This is done by calling `miniDist`. After this is done, the vertex chosen as the shortest distance is marked as visited when `Tset[m]` is set to `true`.

The second critical part of the second loop is summing the distance between ...

... there are two paths from source, A, to destination, D, that offer the shortest path.

![2 shortest path from A to D](/.attachments/dijkstra.graph-a-d.png)

The complexity of Dijkstra’s algorithm is $O(|v|^2)$. The first `for` loop and the `while` loop are executed $|v|$ times. For each iteration of the `while` loop,
 1. a vertex $v$ in `Tset` with minimal current distance has to be found, which requires $O(|v|)$ steps
 2. the `for` loop iterates deg(v) times, which is also $O(|v|)$.


## Further Reading

 1. [Dijkstra's Algorithm in C++ | Shortest Path Algorithm](https://favtutor.com/blogs/dijkstras-algorithm-cpp)

[^1]: [Numeric limits. cppreference.com](https://en.cppreference.com/w/c/types/limits)