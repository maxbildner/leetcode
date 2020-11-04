// LC 704 Binary Search
// EASY
// https://leetcode.com/problems/reverse-linked-list/
// Given a sorted (in ascending order) integer array nums of n elements and a 
// target value, write a function to search target in nums. If target exists, 
// then return its index, otherwise return -1.
// Input:  [ -1, 0, 3, 5, 9, 12 ], 12			    takes in array, and number target
// Output: 5			                            returns integer index


// 26MIN
// *****************************************************************************
// VERSION 1- ITERATIVE, non recursive, O(1) Space
// TIME COMPLEXITY: 	O(log(N))		N = length of input array			log(N) = num recursive calls = num times to halve array to reach base case (array length 0)
// SPACE COMPLEXITY: 	O(N)
// - Only works on SORTED arrays!
// ([ -1, 0, 3, 5, 9, 12 ], 13)  =>  3
//     0  1  2  3  4   5 
function binarySearch(nums, target) {
  let left = 0;                                                                 // 1) left pointer, set to first index in array
  let right = nums.length - 1;                                                  // 2) right pointer, set to last index in array

  while (left <= right) {                                                       // 3) loop while <= right. (bec the delta btwn them refers to the subarray/halving, as soon as that disappears/becomes negative, we're done)
    let midIdx = Math.floor((left + right) / 2);                                // 4) grab middle index using left/right pointers
    // let m = parseInt((l + r) / 2);																						//    works. converts num to string, then truncates non numbers after first num (ex. 2.9 => 2)
    let midNum = nums[midIdx];                                                  // 5) grab num @ middle index

    if (midNum === target) return midIdx;                                       // 6) if midNum == target, found! return midIdx

    if (midNum > target) {                                                      // 7) if midNum > target, update right pointer
      right = midIdx - 1;
    } else {                                                                    // 8) if midNum < target, update left pointer
      left = midIdx + 1;
    }
  }

  return -1;                                                                    // 9) target not found if we reach this point after loop
}

// console.log(binarySearch([-1, 0, 3, 5, 9, 12], -1));    //=> 0
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 0));     //=> 1
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 3));     //=> 2
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 5));     //=> 3
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));     //=> 4
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 12));    //=> 5
// console.log(binarySearch([12], 12));                    //=> 0
// console.log(" ");
// console.log(binarySearch([12], 13));                    //=> -1
// console.log(binarySearch([], 12));                      //=> -1
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 13));    //=> -1
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], -2));    //=> -1
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 1));     //=> -1
