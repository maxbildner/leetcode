// LC 53 Maximum Subarray
// EASY
// Given an integer array nums, find the contiguous subarray(containing at least
// one number) which has the largest sum and return its sum.
// https://leetcode.com/problems/maximum-subarray/
// Ex.
// Input:  [-2, 1, -3, 4,-1, 2, 1, -5, 4],
// Output: 6
// Explanation: [4, -1, 2, 1] has the largest sum = 6.
/*
* @param {number[]} nums
* @return {number}
*/ 

// V0- Doesn't pass all cases
/*
// [-2, 1, -3, 4, -1, 2, 1, -5, 4])); 		=> 6
// [-2, 1]			 													=> 1
function maxSubArray(nums) {
	// exit if input array empty	
	if (nums.length === 0) return 0;	

	// create vars to track current and largest contiguous sums
	let currentSum = 0;
	let largestSum = nums[0];
	// largestSum = -2

	// loop through each number in input array
	for (let i = 0; i < nums.length; i++) {
		let num = nums[i];
		// i = 0: num = -2
		// i = 1: num = 1

		// calculate current sum
		currentSum += num;
		// i = 0: currentSum = 0 + -2 = -2
		// i = 1: currentSum = -2 + 1 = -1

		// if num > largestSum 
		if (num > largestSum) {
			largestSum = num;

			if (i === nums.length - 1) {
				// reset currentSum to num
				currentSum = num;
			}
		} 
		if (currentSum > largestSum) {
			// i = 0: -2 > -2			false
			largestSum = currentSum;
		} 
	}

	return largestSum;
}
*/


// V1- Greedy Approach
// make first num in arr the current and max sum
// Loop over array (from 1 to end), and update at each loop:
// - current element
// - contiguous sum
// - current local maximum (at this point)
// - global maximum sum seen so far
// Time Complexity: 	O(N), N = input array size
// Space Complexity: 	O(1)
function maxSubArray(nums) {
	let currentSum = largestSum = nums[0];																				// set current and max sum to first element in input array
	
	for (let i = 1; i < nums.length; i++) {																				// loop through each num in input array
		let num = nums[i];
		let contiguousSum = currentSum + num;
		currentSum = max(num, contiguousSum);																				// currentSum is the greater of the current num or current contiguous sum
		largestSum = max(largestSum, currentSum);																		// largestSum is the greater of the largestSum or the currentSum
	}

	return largestSum;
}

// helper function, returns max of two nums
function max(num1, num2) {
	return (num1 > num2) ? num1 : num2;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); 	//=> 6
console.log(maxSubArray([1])); 															//=> 1
console.log(maxSubArray([-1])); 														//=> -1
console.log(maxSubArray([])); 															//=> undefined
console.log(maxSubArray([1, 2])); 													//=> 3
console.log(maxSubArray([-1, 1, 2])); 											//=> 3
console.log(maxSubArray([-1, 4, 2, -2])); 									//=> 6
console.log(maxSubArray([-2, 1])); 													//=> 1
