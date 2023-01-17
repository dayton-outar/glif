
# Fundamental Structures and Algorithms

## Data Structures

Some fundamental data structures that are used for solving problems includes,

1. Arrays
2. Hashtables
3. Stack
4. Queue
5. Linked Lists
6. Graphs
7. Trees
8. Heaps

### Graphs

There are various ways to represent undirected graphs as a data structure class. Two of the most common ways to do this are by using an _adjacency matrix_ or an _adjacency list_.

![Graph, adjacency list and adjacency matrix](/.attachments/adjacency-matrix.png)

### Heaps

A _heap_ is a type of tree-like data structure in which the parent is bigger than its children (if max-heap) or smaller than its children (if min-heap). This property of the heap makes it useful for sorting data.

Heaps, unlike other tree data structures, use an array to store data instead of having pointers to their children. A heap node’s children’s positions (indices) in the array can be calculated easily. This is because the parent-child relationship is easily defined with a heap.

There are many types of heaps that have different numbers of children. Let's consider binary heaps for this explanation. Since a heap uses an array to store the data, the indices of the array define the order/height of each element. A binary heap can be built by placing the first array element as the root and then filling each left and right element in order.

For example, for the heap shown below,

![Heap indices](/.attachments/heap-indices.png)

would look like this: [2, 4, 23, 12, 13].

There are two types of binary heaps: max-heap and min-heap. In _max-heap_, the root node has the highest value, and each node’s value is greater than its children. In _min-heap_, the root node has the lowest value, and each node’s value is smaller than its children.

Heaps can store any values of any type: strings, integer, and even custom classes.

A ***max-heap*** is a heap where the parent is always greater than any of its children.

![Max-heap](/.attachments/max-heap.png)

A ***min-heap*** is a heap where the parent is always smaller than any of its children

![Min-heap](/.attachments/min-heap.png)

For a binary heap, an array is used to represent the heap by using the following indices, where N is the index of the node:

| Node          | Index              |
|:--------------|-------------------:|
| (itself)      | $N$                |
| Parent        | $(N - 1) / 2$      |
| Left Child    | $(N \times 2) + 1$ |
| Right Child   | $(N \times 2) + 2$ |

See below illustration of formulas used in reference to node relations,

![Heap relationship](/.attachments/heap-relationship.png)

## Sorting Algorithms' Time Complexities

| Algorithm                                        | Best Time       | Average Time | Worst Time      | Worst Space |
|:-------------------------------------------------|:---------------:|:------------:|:---------------:|:-----------:|
| [Selection Sort](https://youtu.be/xWBP4lzkoyM)	| $Ω(n^2)$        | $θ(n^2)$     | $O(n^2)$        |	$O(1)$     |
| [Bubble Sort](https://youtu.be/nmhjrI-aW5o)	   | $Ω(n)$          | $θ(n^2)$	   | $O(n^2)$        |	$O(1)$     |
| [Insertion Sort](https://youtu.be/OGzPmgsI-pQ)   | $Ω(n)$	         | $θ(n^2)$     | $O(n^2)$        |	$O(1)$     |
| [Heap Sort](https://youtu.be/MtQL_ll5KhQ)	      | $Ω(n \cdot log(n))$	| $θ(n \cdot log(n))$| $O(n  \cdot log(n))$   |	$O(1)$     |
| [Quick Sort](https://youtu.be/PgBzjlCcFvc)       | $Ω(n \cdot log(n))$	| $θ(n \cdot log(n))$| $O(n^2)$        |	$O(n)$     |
| [Merge Sort](https://youtu.be/JSceec-wEyw)       | $Ω(n \cdot log(n))$	| $θ(n \cdot log(n))$| $O(n \cdot log(n))$   |	$O(n)$     |
| [Bucket Sort](https://youtu.be/VuXbEb5ywrU)      | $Ω(n +k)$       | $θ(n +k)$    | $O(n^2)$        |	$O(n)$     |
| [Radix Sort](https://youtu.be/nu4gDuFabIM)       | $Ω(n \cdot k)$  |$θ(n \cdot k)$| $O(n \cdot k)$  |	$O(n + k)$ |
| [Counting Sort](https://youtu.be/7zuGmKfUt7s)    | $Ω(n + k)$	   | $θ(n +k)$    | $O(n +k)$       |	$O(k)$     |
| [Shell Sort](https://youtu.be/SHcPqUe2GZM)       | $Ω(n \cdot log(n))$	| $θ(n \cdot log(n))$| $O(n^2)$        |	$O(1)$     |

`swap` is a common function used in sorting. It simply switches two array element values.

```js
function swap(array, index1, index2) {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

let arr = [3, 7, 6];
swap(arr, 0, 2); // arr: [6, 7, 3]
```

### Selection Sort

Selection sorting works by scanning the elements for the smallest element and inserting it into the current position of the array. This algorithm is marginally better than bubble sort.

```js
function selectionSort(items) {
    var len = items.length,
        min;

    for (var i = 0; i < len; i++) {
        // set minimum to this position
        min = i;
        //check the rest of the array to see if anything is smaller
        for (j = i + 1; j < len; j++) {
            if (items[j] < items[min]) {
                min = j;
            }
        }
        //if the minimum isn't in the position, swap it
        if (i != min) {
            swap(items, i, min);
        }
    }

    return items;
}

selectionSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23]
```

### Bubble Sort

Bubble sorting is the simplest sorting algorithm. It simply iterates over the entire array and swaps elements if one is bigger than the other.

```js
function bubbleSort(array) {
    for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
        for (var j = 0; j <= i; j++) {
            if (array[j] > array[j+1]) {
                swap(array, i, j);
            }
        }
    }
    return array;
}

bubbleSort([6, 1, 2, 3, 4, 5]); // [1,2,3,4,5,6]
```

### Insertion Sort

Insertion sort works similarly to selection sort by searching the array sequentially and moving the unsorted items into a sorted sublist on the left side of the array.

```js
function insertionSort(items) {
    var len = items.length, // number of items in the array
        value, // the value currently being compared
        i, // index into unsorted section
        j; // index into sorted section

    for (i = 0; i < len; i++) {
        // store the current value because it may shift later
        value = items[i];

        // Whenever the value in the sorted section is greater than the value
        // in the unsorted section, shift all items in the sorted section over
        //by one. This creates space in which to insert the value.

        for (j = i - 1; j > -1 && items[j] > value; j--) {
            items[j + 1] = items[j];
        }
        items[j + 1] = value;
    }
    return items;
}

insertionSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23]
```

### Quick Sort

Quick sort works by obtaining a pivot and partitioning the array around it (bigger elements on one side and smaller elements on the other side) until everything is sorted. The ideal pivot is the median of the array since it will partition the array evenly but getting the median of an unsorted array linear time to compute. Hence, a pivot is typically obtained by taking the median value of the first, middle, and last elements in the partition. This sort is a recursive one and uses the divide-and-conquer methodology to break the quadratic complexity barrier and get the time complexity down to $O(n \cdot log_2 n)$. However, with a pivot that partitions everything on one side, the time complexity is worse case: $O(n^2)$.

```js
function quickSort(items) {
    return quickSortHelper(items, 0, items.length - 1);
}

function quickSortHelper(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);

        if (left < index - 1) {
            quickSortHelper(items, left, index - 1);
        }

        if (index < right) {
            quickSortHelper(items, index, right);
        }
    }
    return items;
}

function partition(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)];
    while (left <= right) {
        while (pivot > array[left]) {
            left++;
        }
        while (pivot < array[right]) {
            right--;
        }
        if (left <= right) {
            var temp = array[left];
            array[left] = array[right];
            array[right] = temp;
            left++;
            right--;
        }
    }
    return left;
}

quickSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23]
```

### Merge Sort

Merge sort works by dividing the array into subarrays until each array has one element. Then, each subarray is concatenated (merged) in a sorted order.

The `merge` function should add all the elements from both arrays in sorted order in a “result array.” To do this, the index of each array can be created to keep track of elements already compared. Once one array exhausts all its elements, the rest can be appended to the result array.

```js
function merge(leftA, rightA){
    var results= [], leftIndex= 0, rightIndex= 0;

    while (leftIndex < leftA.length && rightIndex < rightA.length) {
        if( leftA[leftIndex]<rightA[rightIndex] ){
            results.push(leftA[leftIndex++]);
        } else {
            results.push(rightA[rightIndex++]);
        }
    }
    var leftRemains = leftA.slice(leftIndex),
        rightRemains = rightA.slice(rightIndex);

    // add remaining to resultant array
    return results.concat(leftRemains).concat(rightRemains);
}

function mergeSort(array) {
    if(array.length<2){
        return array; // Base case: array is now sorted since it's just 1 element
    }

    var midpoint = Math.floor((array.length)/2),
        leftArray = array.slice(0, midpoint),
        rightArray = array.slice(midpoint);

    return merge(mergeSort(leftArray), mergeSort(rightArray));
}

mergeSort([6,1,23,4,2,3]); // [1, 2, 3, 4, 6, 23]
```

### Count Sort

Count sort can be done in $O(k + n)$ because it does not compare values. It works only for numbers and given a certain range. Instead of sorting by swapping elements, this count works by counting occurrences of each element in the array. Once occurrences of each element are counted, the new array can be created using those occurrences. This sorts the data without having to swap elements.

```js
function countSort(array) {
    let hash = {};
    let countArr = [];

    for( let i = 0; i < array.length; i++ ) {
        if (!hash[array[i]]) {
            hash[array[i]] = 1;
        } else {
            hash[array[i]]++;
        }
    }

    for(const key in hash) { // This is not k + n but k + (k * n)
        // for any number of _ element, add it to array
        for ( let i = 0; i < hash[key]; i++ ) {
            countArr.push(parseInt(key));
        }
    }

    return countArr;
}

countSort([6, 1, 23, 2, 3, 2, 1, 2, 2, 3, 3, 1, 123, 123, 4, 23]);
```

## Graph Traversal

There are 2 main methods of traversing a graph (or a tree, which is a type of graph): _Depth-first_ and _Breadth-first_.[^1]

### Reasons for Depth-First

- When you want to find the longest path between two nodes in a graph.
- When you want to detect a cycle in a graph.
- When the tree is very wide (has a lot of branches). BFS would use more memory.
- When you want to visit child nodes before sibling nodes.
- When solving a maze/puzzle problem, a DFS allows you to traverse through all possible paths. This is very useful for creating a decision tree.

There are 3 main ways to do _depth-first_ traversal.

1. Pre-order

   Visits nodes in the following order: root (the current node), left, right.

   ![Pre-order traversal](/.attachments/pre-order-traversal.png)

2. In-order

   Visits nodes in the following order: left, root (current node), right.

   ![In-order traversal](/.attachments/in-order-traversal.png)

3. Post-order

   Visits nodes in the following order: left, right, root (the current node).

   ![Post-order traversal](/.attachments/post-order-traversal.png)

### Reasons for Breadth-First

- When you want to find the shortest path between two nodes in a graph.
- When you have knowledge that a solution is not far from the root of a tree.
- When you want to prioritize searching vertices that are close to the start node.
- When you want to visit sibling nodes before child nodes.

This method essentially visits each node level by level instead of going deep into the left or right. This approach is also called _level-order_ traversal.

![Level-order traversal](/.attachments/level-order-traversal.png)


## References

1. [Time Complexities of all Sorting Algorithms](https://www.geeksforgeeks.org/time-complexities-of-all-sorting-algorithms/)
2. JavaScript Data Structures and Algorithms by Sammie Bae

## Videos

1. [Binary Heap | GeeksforGeeks](https://youtu.be/uZj0hetLFHU)
2. [Bubble Up and Bubble Down Heap Insertion](https://youtu.be/PkCBI4BKeb8)
3. [Binary Tree Algorithms for Technical Interviews - Full Course](https://youtu.be/fAAZixBzIAI)
4. [Graph Algorithms for Technical Interviews - Full Course](https://youtu.be/tWVWeAqZ0WU)

[^1]: [When to Use Depth-First Search (DFS) vs Breadth-First Search (BFS)](https://medium.com/@alexzelinsky124/when-to-use-depth-first-search-dfs-vs-breadth-first-search-8ad4c514e033)