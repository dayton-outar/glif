function binarySearch(array, n) {
    var lowIndex = 0,
        highIndex = array.length - 1;

    while (lowIndex <= highIndex) {
        var midIndex = Math.floor((highIndex + lowIndex) / 2);
        if (array[midIndex] == n) {
            return midIndex;
        } else if (n > array[midIndex]) {
            lowIndex = midIndex+1;
        } else {
            highIndex = midIndex-1;
        }
    }
    return -1;
}
console.log(binarySearch([1,2,3,4], 4));
console.log(binarySearch([1,2,3,4], 5));