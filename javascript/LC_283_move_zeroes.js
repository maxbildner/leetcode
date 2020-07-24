// LC 283 Move Zeroes
// EASY
// https://leetcode.com/problems/move-zeroes/
//
// Given an array nums, write a function to move all 0's to the end of it while 
// maintaining the relative order of the non-zero elements.
// 
// CONSTRAINTS:
//  - You must do this in -place without making a copy of the array.
//  - Minimize the total number of operations.
//
// EXAMPLE:
// Input:  [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]


// TIME COMPLEXITY:   O(N)
// SPACE COMPLEXITY:  O(1)
// MUTATES INPUT

// [0, 1, 0, 0, 3, 12]            //=>     [ 1, 3, 12, 0, 0, 0 ]
var moveZeroes = function (nums) {
  let last0Idx = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [ nums[i], nums[last0Idx]] = [nums[last0Idx], nums[i] ];
      last0Idx++;
    }
  }

  return nums;
};

console.log(moveZeroes([0, 1, 0, 0, 3, 12]));         //=>   [ 1, 3, 12, 0, 0, 0 ]
console.log(moveZeroes([0, 1, 0, 3, 12]));            //=>   [ 1, 3, 12, 0, 0]
console.log(moveZeroes([0, 1, 0, 3, 12, 0, 0]));      //=>   [ 1, 3, 12, 0, 0, 0, 0 ]
