// You are going to build a stone wall. The wall should be straight and N meters long, and its thickness should be constant; however, it should have different heights in different places. The height of the wall is specified by an array H of N positive integers. H[I] is the height of the wall from I to I+1 meters to the right of its left end. In particular, H[0] is the height of the wall's left end and H[N−1] is the height of the wall's right end.

// The wall should be built of cuboid stone blocks (that is, all sides of such blocks are rectangular). Your task is to compute the minimum number of blocks needed to build the wall.

// Write a function:

// function solution(H);

// that, given an array H of N positive integers specifying the height of the wall, returns the minimum number of blocks needed to build it.

// For example, given array H containing N = 9 integers:

//   H[0] = 8    H[1] = 8    H[2] = 5
//   H[3] = 7    H[4] = 9    H[5] = 8
//   H[6] = 7    H[7] = 4    H[8] = 8
// the function should return 7. The figure shows one possible arrangement of seven blocks.



// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array H is an integer within the range [1..1,000,000,000].


//...

// This problem was difficult to understand. I could not understand how they arrived at the diagram of blocks based on the information provided.
// I am not alone in this. See http://straightdeveloper.com/how-to-get-100-score-on-the-stonewall-exercise-on-codility/

// Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/StoneWall.md Score: 100%

function solution(H) {
	let stack = [];
    let head = -1;
    let block = 0;
    let i = 0;
    while (i < H.length) {
        let h = H[i];
        if (head < 0) {
            ++head;
            stack[head] = h; //stack push
            ++i;
        } else if (stack[head] == h) {
            ++i;
        } else if (stack[head] < h) {
            ++head;
            stack[head] = h; //stack push
            ++i;
        } else { //stack[head] > h
            --head; //stack pop
            ++block;
        }
    }
    return block + head + 1
}

// Credit: Jonatas Walker
function solution2(H) {
    let counter = 0;
    let height = 0;
    let blocks = [];
    let i = 0;
    
    while( i < H.length) {
        if(H[i] > height) {
            let newBlock = H[i] - height;
            blocks.push(newBlock);
            height += newBlock;
            counter++;
            i++;
        } else if(H[i] < height) {
            let lastBlock = blocks.pop();
            height -= lastBlock;
        } else {
            i++;
        }
    }
    
    return counter;
}

console.log( solution( [8, 8, 5, 7, 9, 8, 7, 4, 8] ) );