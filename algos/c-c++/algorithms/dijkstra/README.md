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

... there are two paths from source, A, to destination, D, that offer the shortest path.

![2 shortest path from A to D](/.attachments/dijkstra.graph-a-d.png)

## Further Reading

 1. [Dijkstra's Algorithm in C++ | Shortest Path Algorithm](https://favtutor.com/blogs/dijkstras-algorithm-cpp)

