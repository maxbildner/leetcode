// LC 167 Two Sum II - Input array is sorted
// EASY
// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
//
// Given an array of integers that is already sorted in ascending order, find 
// two numbers such that they add up to a specific target number.
// The function twoSum should return indices of the two numbers such that they 
// add up to the target, where index1 must be less than index2.
//
// Note:
// - Your returned answers(both index1 and index2) are not zero - based.
// - You may assume that each input would have exactly one solution and you may 
//   not use the same element twice.
// 
// Constraints:
// - 2 <= nums.length <= 3 * 104
// - 1000 <= nums[i] <= 1000
// - nums is sorted in increasing order.
// - 1000 <= target <= 1000
//
// Example 1:
// Input: numbers = [2, 7, 11, 15], target = 9
// Output: [1, 2]
// Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.
//
// Example 2:
// Input: numbers = [2, 3, 4], target = 6
// Output: [1, 3]
//
// Example 3:
// Input: numbers = [-1, 0], target = -1
// Output: [1, 2]



// *****************************************************************************
// VERSION 1- TWO POINTERS (one on each end of input array)
// TIME COMPLEXITY:  O(N),			N = input length array
// SPACE COMPLEXITY: O(1)		    

// ([2, 7, 11, 15], 18) => [2, 3]
//   0  1   2   3
var twoSum = function (nums, target) {
  let leftIdx = 0;                                                              // create two pointers, one on each end of the input array
  let rightIdx = nums.length - 1;
  
  while (leftIdx < rightIdx) {                                                  // loop while leftIdx < rightIdx

    let leftNum = nums[leftIdx];                                                // grab numbers at left and right indexes, grab sum
    let rightNum = nums[rightIdx];
    let sum = leftNum + rightNum;

    if (sum === target) {                                                       // if actual sum equals target,  pair found! so exit
      return [ leftIdx + 1, rightIdx + 1];
    
    } else if (sum < target) {                                                  // sum < target,  increment left pointer
      leftIdx++;
    
    } else {                                                                    // sum > target,  decrement right pointer
      rightIdx--;
    }
  }
};

// console.log(twoSum([2, 7, 11, 15], 18));      //=> [2, 3]
// console.log(twoSum([2, 7, 11, 15], 9));       //=> [1, 2]
// console.log(twoSum([2, 3, 4], 6));            //=> [1, 3]
// console.log(twoSum([-1, 0], -1));             //=> [1, 2]





// PRACTICE
// *****************************************************************************
// VERSION 1- 
// TIME COMPLEXITY:  O(N),			N = input length array
// SPACE COMPLEXITY: O(1)		 


// var twoSum = function (numbers, target) {

// };

// console.log(twoSum([2, 7, 11, 15], 18));      //=> [2, 3]
// console.log(twoSum([2, 7, 11, 15], 9));       //=> [1, 2]
// console.log(twoSum([2, 3, 4], 6));            //=> [1, 3]
// console.log(twoSum([-1, 0], -1));             //=> [1, 2]