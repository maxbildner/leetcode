// LC 01 Two Sum
// EASY
// Given an array of integers, return indices of the two numbers such that they 
// add up to a specific target. You may assume that each input would have 
// exactly one solution, and you may not use the same element twice.
// https://leetcode.com/problems/two-sum/
// Ex1.
// Input:  nums = [2, 7, 11, 15], target = 9,
// Output:  [0, 1]  Because nums[0] + nums[1] = 2 + 7 = 9


// SOLUTION1- Hash Table
// Time Complexity: O(n), where n = input array length
// Space Complexity: O(n) 
// Solution Description: 
//  0  1  2  3  4
// [2, 7, 1, 0, 6], 8   => [ [1, 2], [0, 4] ]
const twoSum = (array, target) => {
    let pairs = [];              // to return
    let complements = {};

    // loop through each num in array
    for (let i = 0; i < array.length; i++) {
        let num = array[i];
        // i = 0: num = 2
        // i = 1: num = 7
        let complement = target - num;
        // i = 0: complement = 8 - 2 = 6
        // i = 1: complement = 8 - 7 = 1

        // populate complements object with num and current index
        complements[num] = i;
        // i = 0: complements = { "2": 0 }
        // i = 1: complements = { "2": 0, "7":1 }

        // check if complement is a key in complements object, pair found!
        if (complements[complement] !== undefined) {
            // i = 0: complements[6] = undefined
            // i = 1: complements[1] = undefined
            pairs.push([complements[complement], i]);
        }
    }

    return pairs;
}
console.log(twoSum([2, 7, 1, 0, 6], 8));        //=> [ [1, 2], [0, 4] ]