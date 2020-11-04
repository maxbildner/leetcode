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
// SOLUTION V1- SORT ARRAY, NO HELPER FUNCTION
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

    // pointer `i` represents the "left" most number in our sorted set
    // once this number hits 0, no need to go further since it impossible
    // for positive numbers to sum to target 0
    if (left > target) break;                                                   // 4) if current left > target, break. remaining values impossible to sum to target 0 (bec nums are sorted)

    // ? why i > 0  
    if (i > 0 && left === prev) continue;                                       // 5) we don't want repeats, so skip numbers we've already seen

    let k = nums.length - 1                                                     // 6) set pointer `k`, represents "right" end most num

    // `j` represents the "middle" element between `i` and `k`
    // we will increment `j` up through the array while `i` and `k`
    // are anchored to their positions. we will decrement `k` for
    // each pass through the array, and finally increment `i`
    // once `j` and `k` meet
    let j = i + 1;                                                              // 7) set pointer `j`, represents "middl" num

    // to summarize our setup, we have `i` that starts at the beginning,
		// `k` that starts at the end, and `j` that races in between the two.
		//
		// note that `i` is controlled by our outer for-loop and will move the slowest.
		// in the meantime, `j` and `k` will take turns inching towards each other depending
		// on some logic we'll set up below. once they collide, `i` will be incremented up
    // and we'll repeat the process.
    
    while (j < k) {                                                             // 8) loop while middle j pointer < right k pointer

      let middle = nums[j];                                                     // grab "middle" num, with pointer `j`
      let right = nums[k];                                                      // grab "right" end most num, with pointer `k`, must be done inside this loop in order to update values each loop
      let sum = left + middle + right;                                          // 9) sum = left + middle + right
      
      // if we find the target sum, increment `j` and decrement `k` for
      // other potential combos where `i` is the anchor
      if (sum === target) {                                                     // 10) if sum == target, add left,middle,right to results

        results.push([left, middle, right]);
        
        // continue to increment  `j` and decrement `k` as long as those
        // values are duplicated. in other words, we wanna skip values
        // we've already seen. otherwise, an input array of [ -2, 0, 0, 2, 2]
        // would result in [ [-2,0,2], [-2,0,2] ]
        while (middle === nums[j + 1]) j++;
      
        while (right === nums[k - 1]) k--;
    
        j++;                                                                    // move `j` forward and `k` backward to next unique elements. 
        k--;
        
      } else if (sum < target) {                                                // if sum too small, increment `j` to get closer to target                       
        j++;

      } else {                                                                  // if sum too large, decrement `k` to get closer to target
        k--;
      }
    }


  }

  return results;
};


// console.log(threeSum([-1, 0, 1, 2, -1, -4]));     
//=> [ [-1, 0, 1], [-1, -1, 2] ]

// console.log(threeSum([-2, 0, 0, 2, 2]));     
//=> [ [ -2, 0, 2 ] ]







// *****************************************************************************
// SOLUTION V2- SORT ARRAY, USES HELPER FUNCTION
// TIME COMPLEXITY:  O(N^2),      N = array nums length.    TwoSumII is O(N), and we call it N times  
//                   O(N log(N) Sorting array + N^2    =>   N^2
// SPACE COMPLEXITY: O(N or logN) depending on sorting algo used (here we ignore memory required for output)
// MUTATES INPUT ARRAY


// [-1, 0, 1, 2, -1, -4]   =>  [[-1,-1,2],[-1,0,1]]
var threeSum = function (nums) {
  // 1) sort array in place (N * logN Time Complexity)
  nums = nums.sort((a, b) => a - b);
  // nums = [ -4, -1, -1, 0, 1, 2 ]
  
  let result = [];

  // 2) loop through numbers
  for (let i = 0; i < nums.length; i++) {
    
    // 3) track current num, and prev num
    let num = nums[i];
    let prev = nums[i - 1];
    // i = 0:   num = -4    prev = undefined

    // 4) if current num > 0, exit loop since its impossible for remaining
    // numbers to sum to 0
    if (num > 0) break;

    // 5) if current num equal to prev num, skip current loop so we don't
    // count duplicates
    if (num === prev) {
      continue;

      // 6) call helper function twoSumII
    } else {

      // takes in current index of num
      twoSumII(i);
    }
  }


  // O(N) search through numbers starting with num @ idx to see if 3 add up to 0
  // since function is inside main function, we have access to nums and result
  function twoSumII(idx) {

    // 7) create left and right pointers that refer to nums on opposite ends
    //    of array
    // nums = [ -4, -1, -1, 0, 1, 2 ]
    //           0   1   2  3  4  5
    //    current^   ^left        ^right
    let left = idx + 1;
    let right = nums.length - 1;
    // idx = 0:   left = 1    right = 5

    let current = nums[idx];
    // idx = 0:   current = -4

    // 8) loop until pointers "collide"
    while (left < right) {

      let leftNum = nums[left];
      let rightNum = nums[right];
      let sum = current + leftNum + rightNum;

      // 9) if sum < 0, increase left pointer by 1
      // sum too low, so we increasing left pointer will increase sum
      if (sum < 0) {
        left++;
        
        // 10) if sum > 0, decrease right pointer by 1
      } else if (sum > 0) {
        right--;
        
        // 11) sum == 0, push them to result
      } else {
        result.push([current, leftNum, rightNum]);

        // 12) update both pointers
        left++;
        right--;

        // 13) increment left while leftNum same as before to avoid duplicates
        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }
      }
    }
  }

  return result;
};



// console.log(threeSum([-1, 0, 1, 2, -1, -4]));   //=> [ [-1, -1, 2], [-1, 0, 1] ]
// console.log(threeSum([-2, 0, 0, 2, 2]));        //=> [ [ -2, 0, 2 ] ]
// console.log(threeSum([]));                      //=> []
// console.log(threeSum([0]));                     //=> []







// *****************************************************************************
// PRACTICE
// TIME COMPLEXITY:  O(N^2),      N = array nums length.    TwoSumII is O(N), and we call it N times  
//                   O(N log(N) Sorting array + N^2    =>   N^2
// SPACE COMPLEXITY: O(N or logN) depending on sorting algo used (here we ignore memory required for output)
// MUTATES INPUT ARRAY


// [-1, 0, 1, 2, -1, -4]   =>  [[-1,-1,2],[-1,0,1]]
var threeSum = function (nums) {

}


console.log(threeSum([-1, 0, 1, 2, -1, -4]));   //=> [ [-1, -1, 2], [-1, 0, 1] ]
console.log(threeSum([-2, 0, 0, 2, 2]));        //=> [ [ -2, 0, 2 ] ]
console.log(threeSum([]));                      //=> []
console.log(threeSum([0]));                     //=> []