// LC 15 3 Sum
// MEDIUM
// https://leetcode.com/problems/3sum/
// 
// INPUTS: array
// OUTPUT: array (2D)
// 
// Given an array nums of n integers, are there elements a, b, c in nums such 
// that a + b + c = 0? Find all unique triplets in the array which gives the sum 
// of zero.
// Note:
// The solution set must not contain duplicate triplets.
//
// EXAMPLE: 
// Given array nums = [-1, 0, 1, 2, -1, -4],
// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]


// *****************************************************************************
// SOLUTION V1- 
// TIME COMPLEXITY:  O(N^2),      N = array nums length.    TwoSumII is O(N), and we call it N times  
//      O(N log(N) Sorting array + N^2    =>   N^2
// SPACE COMPLEXITY: O(N or logN) depending on sorting algo used (here we ignore memory required for output)
// MUTATES INPUT ARRAY
// https://leetcode.com/problems/3sum/discuss/281302/JavaScript-with-lots-of-explanatory-comments!

// [ -1, 0, 1, 2, -1, -4 ]      =>   [ [-1, 0, 1], [-1, -1, 2] ]
var threeSum = function (nums) {
  let results = [];

  // obviously cant have 3 sum if there are not 3 numbers
  if (nums.length < 3) return results;

  // having the numbers in ascending order will make this problem much easier.
  // also, knowing the overall problem  will take at least O(N^2) time, we can
  // afford the O(NlogN) sort operation
  nums = nums.sort((a, b) => a - b);                                            // 1) sort nums in place
  // nums = [ -4, -1, -1, 0, 1, 2 ]

  // if the question asks us for a custom target, we can control it here
  let target = 0

  for (let i = 0; i < nums.length - 2; i++) {                                   // 2) loop through array (excluding last 2 nums)
    let left = nums[i];                                                         // 3) grab "left" most num, with slow pointer `i` 
    let prev = nums[i - 1];
    // i = 0:    prev = undefined   left = -4
    // i = 1:    prev = -4          left = -1
    // i = 2:    prev = -1          left = -1

    // pointer `i` represents the "left" most number in our sorted set
    // once this number hits 0, no need to go further since it impossible
    // for positive numbers to sum to target 0
    if (left > target) break;                                                   // 4) if current left > target, break. remaining values impossible to sum to target 0 (bec nums are sorted)
    // i = 0:   -4 > 0   false
    // i = 1:   -1 > 0   false
    // i = 2:   -1 > 0   false

    // ? why i > 0  
    if (i > 0 && left === prev) continue;                                       // 5) we don't want repeats, so skip numbers we've already seen
    // i = 0:   0 > 0 && -4 === undefined   false && false    false
    // i = 1:   1 > 0 && -1 === -4          true  && false    false
    // i = 2:   2 > 0 && -1 === -1          true  && true     true

    let k = nums.length - 1                                                     // 6) set pointer `k`, represents "right" end most num
    // i = 0:   k = 6 - 1 = 5
    // i = 1:   k = 6 - 1 = 5

    // `j` represents the "middle" element between `i` and `k`
    // we will increment `j` up through the array while `i` and `k`
    // are anchored to their positions. we will decrement `k` for
    // each pass through the array, and finally increment `i`
    // once `j` and `k` meet
    let j = i + 1;                                                              // 7) set pointer `j`, represents "middl" num
    // i = 0:   j = 0 + 1 = 1
    // i = 1:   j = 1 + 1 = 2

    // to summarize our setup, we have `i` that starts at the beginning,
		// `k` that starts at the end, and `j` that races in between the two.
		//
		// note that `i` is controlled by our outer for-loop and will move the slowest.
		// in the meantime, `j` and `k` will take turns inching towards each other depending
		// on some logic we'll set up below. once they collide, `i` will be incremented up
    // and we'll repeat the process.
    
    while (j < k) {                                                             // 8) loop while middle j pointer < right k pointer
      // i = 0,  j = 1,  k = 5:   1 < 5   true
      // i = 0,  j = 2,  k = 5:   2 < 5   true
      // i = 0,  j = 3,  k = 5:   3 < 5   true
      // i = 0,  j = 4,  k = 5:   4 < 5   true
      // i = 0,  j = 5,  k = 5:   5 < 5   false

      // i = 1,  j = 2,  k = 5:   2 < 5   true
      // i = 1,  j = 3,  k = 5:   3 < 5   true
      // i = 1,  j = 4,  k = 4:   4 < 4   false
      let middle = nums[j];                                                     // grab "middle" num, with pointer `j`
      let right = nums[k];                                                      // grab "right" end most num, with pointer `k`, must be done inside this loop in order to update values each loop
      let sum = left + middle + right;                                          // 9) sum = left + middle + right
      // i = 0,  j = 1,  k = 5:   sum = -4 + -1 + 2   = -3
      // i = 0,  j = 2,  k = 5:   sum = -4 + -1 + 2   = -3
      // i = 0,  j = 3,  k = 5:   sum = -4 + 0 + 2    = -2
      // i = 0,  j = 4,  k = 5:   sum = -4 + 1 + 2    = -1

      // i = 1,  j = 2,  k = 5:   sum = -1 + -1 + 2   = 0
      // i = 1,  j = 3,  k = 4:   sum = -1 + -1 + 2   = 0
      
      // if we find the target sum, increment `j` and decrement `k` for
      // other potential combos where `i` is the anchor
      if (sum === target) {                                                     // 10) if sum == target, add left,middle,right to results
        // i = 0,  j = 1,  k = 5:   -3 == 0   false
        // i = 0,  j = 2,  k = 5:   -3 == 0   false
        // i = 0,  j = 3,  k = 5:   -2 == 0   false
        // i = 0,  j = 4,  k = 5:   -1 == 0   false

        // i = 1,  j = 2,  k = 5:    0 == 0   true
        results.push([left, middle, right]);
        // i = 1,  j = 2,  k = 5:    results = [ [-1, -1, 2] ]
        // i = 1,  j = 3,  k = 4:    results = [ [-1, -1, 2], [-1, 0, 1] ]
        
        // continue to increment  `j` and decrement `k` as long as those
        // values are duplicated. in other words, we wanna skip values
        // we've already seen. otherwise, an input array of [ -2, 0, 0, 2, 2]
        // would result in [ [-2,0,2], [-2,0,2] ]
        while (middle === nums[j + 1]) {
          j++;
        }     
        while (right === nums[k - 1])  {
          k--;
        }

        j++;                                                                    // move `j` forward and `k` backward to next unique elements. 
        k--;
        // i = 1,  j = 3,  k = 4: 
        // i = 1,  j = 4,  k = 3: 
        
        
      } else if (sum < target) {                                                // if sum too small, increment `j` to get closer to target                       
        // i = 0,  j = 1,  k = 5:   -3 < 0   true
        // i = 0,  j = 2,  k = 5:   -3 < 0   true
        // i = 0,  j = 3,  k = 5:   -2 < 0   true
        // i = 0,  j = 4,  k = 5:   -1 < 0   true
        j++;
        // i = 0,  j = 2,  k = 5: 
        // i = 0,  j = 3,  k = 5: 
        // i = 0,  j = 4,  k = 5: 
        // i = 0,  j = 5,  k = 5: 

      } else {                                                                  // if sum too large, decrement `k` to get closer to target
      k--;
      }
    }


  }

  return results;
};






console.log(threeSum([-1, 0, 1, 2, -1, -4]));     
//=> [ [-1, 0, 1], [-1, -1, 2] ]

// console.log(threeSum([-2, 0, 0, 2, 2]));     
//=> [ [ -2, 0, 2 ] ]





// function twoSumII(nums, i, result) {
//   let low = i + 1;                                        // set low pointer to i + 1, and high pointer to last index in nums
//   let high = nums.length - 1;
//   while (low < high) {                                    // loop while low pointer < high
//     let sum = nums[i] + nums[low] + nums[high];
//     if (sum < 0) {
//       low++;
//     }
//   }
//   // // 2) loop through array
//   // for (let i = 0; i < nums.length; i++) {
//   //   let num = nums[i];
//   //   // i = 0: num = -1
//   //   // if current num > 0, break. remaining values impossible to sum to 0 (bec nums are sorted)
//   //   if (num > 0) break;
//   //   // if current num not same as before, call helper function 
//   //   if (i === 0 || num !== nums[i - 1]) {
//   //     twoSumII(nums, i, result);
//   //   }
//   // }
//   // return result;