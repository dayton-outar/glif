# 5.9 Backtracking

Situations arise where there are different ways leading from a given position, none of them known to lead to a solution. After trying one path unsuccessfully, we return to this crossroads and try to find a solution using another path. However, we must ensure that such a return is possible and that all paths can be tried. This technique is called *backtracking*, and it allows us to systematically try all available avenues from a certain point after some of them lead to nowhere. Using backtracking, we can always return to a position that offers other possibilities for successfully solving the problem. While this technique is used by chess players, it is also used in artificial intelligence, and one of the problems in which backtracking is very useful is the eight queens problem.[^1]

## The Problem

The eight queens problem attempts to _place eight queens on a chessboard in such a way that no queen is attacking any other_.

The rules of chess say that a queen can take another piece if it lies on the same row, on the same column, or on the same diagonal as the queen (see Figure 5.11).

![Figure 5.11. Eight Queens Problem](/.attachments/eight-queens-problem.png)

## The Solution

To solve this problem, we try to put the first queen on the board, then the second so that it cannot take the first, then the third so that it is not in conflict with the two already placed, and so on, until all of the queens are placed. What happens if, for instance, the sixth queen cannot be placed in a non-conflicting position? We choose another position for the fifth queen and try again with the sixth. If this does not work, the fifth queen is moved again. If all the possible positions for the fifth queen have been tried, the fourth queen is moved and then the process restarts. This process requires a great deal of effort, most of which is spent ***backtracking*** to the first crossroads offering some untried avenues. In terms of code, however, the process is rather simple due to the power of recursion, which is a natural implementation of backtracking. Pseudocode for this backtracking algorithm is as follows (the last line pertains to backtracking):

```
putQueen(row)
   for every position col on the same row
     if position col is available
         place the next queen in position col;
        if (row < 8)
          putQueen(row+1);
        else success ;
         remove the queen from position col;
```

This algorithm finds all possible solutions without regard to the fact that some of them are symmetrical.

The most natural approach for implementing this algorithm is to declare an 8 × 8 array `board` of 1s and 0s representing a chessboard. The array is initialized to 1s, and each time a queen is put in a position (r, c), `board[r][c]` is set to 0. Also, a function must set to 0, as not available, all positions on row r, in column c, and on both diagonals that cross each other in position *(r, c)*. When backtracking, the same
positions (that is, positions on corresponding row, column, and diagonals) have to be set back to 1, as again available. Because we can expect hundreds of attempts to find available positions for queens, the setting and resetting process is the most time-consuming part of the implementation; for each queen, between 22 and 28 positions have to be set and then reset, 15 for row and column, and between 7 and 13 for diagonals.

In this approach, the board is viewed from the perspective of the player who sees the entire board along with all the pieces at the same time. However, if we focus solely on the queens, we can consider the chessboard from their perspective. For the queens, the board is not divided into squares, but into rows, columns, and diagonals. If a queen is placed on a single square, it resides not only on this square, but on the entire
row, column, and diagonal, treating them as its own temporary property. A different data structure can be utilized to represent this.

To simplify the problem for the first solution, we use a 4 × 4 chessboard instead of the regular 8 × 8 board. Later, we can make the rather obvious changes in the program to accommodate a regular board.

![Figure 5.12](/.attachments/fig-5.12.png)

Figure 5.12 contains the 4 × 4 chessboard. Notice that indexes in all fields in the indicated left diagonal all add up to two, *r + c = 2*; this number is associated with this ­diagonal. There are seven left diagonals, 0 through 6. Indexes in the fields of the indicated right diagonal all have the same difference, *r – c = –1*, and this number is unique among all right diagonals. Therefore, right diagonals are assigned numbers –3 through 3. The data structure used for all left diagonals is simply an array indexed by numbers 0 through 6. For right diagonals, it is also an array, but it cannot be indexed by negative numbers. Therefore, it is an array of seven cells, but to account for negative values obtained from the formula *r – c*, the same number is always added to it so as not to cross the bounds of this array.

![Figure 5.14](/.attachments/fig-5.14.png)

Figures 5.14 through 5.17 document the steps taken by `putQueen()` to place four queens on the chessboard. Figure 5.14 contains the move number, queen number, and row and column number for each attempt to place a queen. Figure 5.15 contains the changes to the arrays `positionInRow`, `column`, `leftDiagonal`, and `rightDiagonal`. Figure 5.16 shows the changes to the run-time stack during the eight steps. All changes to the run-time stack are depicted by an activation record for each iteration of the `for` loop, which mostly lead to a new invocation of `putQueen()`. Each
activation record stores a return address and the values of `row` and `col`. Figure 5.17 illustrates the changes to the chessboard. A detailed description of each step follows.

![Figure 5.15](/.attachments/fig-5.15.png)

![Figure 5.16](/.attachments/fig-5.16.png)

![Figure 5.17](/.attachments/fig-5.17.png)

**{1}** We start by trying to put the first queen in the upper left corner (0, 0). Because it is the very first move, the condition in the `if` statement is met, and the queen is placed in this square. After the queen is placed, the column 0, the main right diagonal, and the leftmost diagonal are marked as unavailable. In Figure 5.15, {1} is put underneath cells reset to `!available` in this step.

**{2}** Since `row < 3`, `putQueen()` calls itself with row+1 , but before its execution, an activation record is created on the run-time stack (see Figure 5.16a). Now we check the availability of a field on the second row (i.e., `row == 1`). For `col == 0`, column 0 is guarded, for
`col==1`, the main right diagonal is checked, and for `col == 2`, all three parts of the if statement condition are true. Therefore, the second queen is placed in position (1, 2), and this fact is immediately reflected in the proper cells of all four arrays. Again, `row < 3`. `putQueen()` is called trying to locate the third queen in row 2. After all the positions in this row, 0 through 3, are tested, no available position is found, the for loop is exited without executing the body of the `if` statement, and this call to `putQueen()` is complete. But this call was executed by `putQueen()` dealing with the second row, to which control is now returned.

**{3}** Values of `col` and `row` are restored and the execution of the second call of `putQueen()` continues by resetting some fields in three arrays back to available , and since `col == 2`, the `for` loop can continue iteration. The test in the `if` statement allows the second queen to be placed on the board, this time in position (1, 3).

**{4}** Afterward, `putQueen()` is called again with `row == 2`, the third queen is put in (2, 1), and after the next call to `putQueen()`, an attempt to place the fourth queen is unsuccessful (see Figure 5.17b). No calls are made, the call from step {3} is resumed, and the third queen is once again moved, but no position can be found for it. At the same time, `col` becomes 3, and the `for` loop is finished.

**{5}** As a result, the first call of putQueen() resumes execution by placing the first queen in position (0, 1).

**{6-8}** This time execution continues smoothly and we obtain a complete solution.

## Videos

1. [Solve Coding Interview Backtracking Problems - Crash Course](https://youtu.be/A80YzvNwqXA)

[^1]: Chapter 5, Recursion, Data Structures and Algorithms in C++, 4<sup>th</sup> Edition by Adam Drozdek