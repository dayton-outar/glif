// https://leetcode.com/problems/find-the-town-judge/
// 997. Find the Town Judge

// In a town, there are N people labelled from 1 to N. There is a rumor that one of these people is secretly the town judge.

// If the town judge exists, then:
// 1/ The town judge trusts nobody.
// 2/ Everybody (except for the town judge) trusts the town judge.
// 3/ There is exactly one person that satisfies properties 1 and 2.

// You are given trust, an array of pairs trust[i] = [a, b] representing that the person labelled a trusts the person labeled b.

// If the town judge exists and can be identified, return the label of the town judge. Otherwise, return -1.

// Example 1:
// Input: N = 2, trust = [[1,2]]
// Output: 2

// Example 2:
// Input: N = 3, trust = [[1,3],[2,3]]
// Output: 3

// Example 3:
// Input: N = 3, trust = [[1,3],[2,3],[3,1]]
// Output: -1

// Example 4:
// Input: N = 3, trust = [[1,2],[2,3]]
// Output: -1

// Example 5:
// Input: N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
// Output: 3

const findTheJudge = N => {
    let judge = -1;

    for( let i = 0; i < N.length; i++) {
        // 1. Find who is trusted
        if (judge == -1) {
            judge = N[i][1];
        }

        if (N[i][0] != N[i][1]) {
            if (judge == N[i][0]) {
                judge = -1;
            }
        }
    }
    
    return judge;
}

console.log( findTheJudge( [[1,2]] ) );
console.log( findTheJudge( [[1,3], [2,3]] ) );
console.log( findTheJudge( [[1,3], [2,3], [3,1]] ) );
console.log( findTheJudge( [[1,2], [2,3]] ) );
console.log( findTheJudge( [[1,3], [1,4], [2,3], [2,4], [4,3]] ) );

// Another approach: https://javascript.plainenglish.io/how-to-find-the-town-judge-92f07c5b7570