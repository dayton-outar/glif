
var maxSubarraySumCircular = function(nums) {
    let curMin = 0, curMax = 0, sum = 0, minSum = nums[0], maxSum = nums[0]
    console.log(`current max: ${curMax}; max sum: ${maxSum}; current min: ${curMin}; minimum sum: ${minSum}; sum: ${sum}`)
    for (let num of nums) {
        curMax = Math.max(curMax, 0) + num
        maxSum = Math.max(curMax, maxSum)
        curMin = Math.min(curMin, 0) + num
        minSum = Math.min(curMin, minSum)
        sum += num
        console.log(`current max: ${curMax}; max sum: ${maxSum}; current min: ${curMin}; minimum sum: ${minSum}; sum: ${sum}`)
    }
    return sum == minSum ? maxSum : Math.max(sum - minSum, maxSum)
};

console.log( maxSubarraySumCircular([1, -2, 3, -2]) );
console.log( maxSubarraySumCircular([1, 2, 3, 2]) );