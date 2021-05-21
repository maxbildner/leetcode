// LC 01 Two Sum VERSION 1 (ONLY 1 SOLUTION)
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
//   0  1  2  3  4
// [ 2, 7, 3, 0, 6 ], 8   => [ 0, 4 ]
const twoSum = (array, target) => {
	// create hash table, keys = nums in array, val = corresponding index in array
	let table = {};

	// loop through array
	for (let i = 0; i < array.length; i++) {
		let num = array[i];
		
		// calculate complementing number of current num
		let complement = target - num;
		
		// if complementing num is in hashtable, we have a match!
		if (table[complement] != undefined) {

			// return pair of indices
			return [table[complement], i];
		} 

		// populate table with current num and corresponding index
		table[num] = i;
	}
}
console.log(twoSum([2, 7, 3, 0, 6], 8));     	//=> [0, 4] 
console.log(twoSum([2, 7, 11, 15], 9));    		//=> [0, 1] 
console.log(twoSum([3, 2, 4], 6));    		  	//=> [1, 2] 




// ***************************************************************************
// LC 01 Two Sum VERSION 2 (OUTPUT CAN HAVE MULTIPLE INDICES)
// SOLUTION1- Hash Table
// Time Complexity: O(n), where n = input array length
// Space Complexity: O(n) 
// Solution Description: 
//   0  1  2  3  4
// [ 2, 7, 1, 0, 6 ], 8   => [ [1, 2], [0, 4] ]
const twoSumV2 = (array, target) => {
	// create hash table, keys = nums in array, val = corresponding index in array
	let table = {};

	// create empty array to return 
	let pairs = [];

	// loop through array
	for (let i = 0; i < array.length; i++) {
		let num = array[i];
		
		// calculate complementing number of current num
		let complement = target - num;
		
		// if complementing num is in hashtable, we have a match!
		if (table[complement] != undefined) {

			// add pairs to array
			pairs.push([table[complement], i]);
		} 

		// populate table with current num and corresponding index
		table[num] = i;
	}

	return pairs;
}
// console.log(twoSumV2([2, 7, 1, 0, 6], 8));       //=> [ [1, 2], [0, 4] ]
// console.log(twoSumV2([2, 7, 11, 15], 9));        //=> [ [0, 1] ]
// console.log(twoSumV2([3, 2, 4], 6));    		     	//=> [ [1, 2] ]
