// LC 88 Median of Two Sorted Arrays
// EASY
// Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as 
// one sorted array.
// Note:
// The number of elements initialized in nums1 and nums2 are m and n respectively.
// You may assume that nums1 has enough space(size that is greater or equal to 
// m + n) to hold additional elements from nums2.
// DO NOT RETURN ANYTHING, modify nums1 in-place instead.
// https://leetcode.com/problems/median-of-two-sorted-arrays/
// Ex.
// Input:  [1,2,3,0,0,0], [2,5,6], m=3, n=3
// Output: [1,2,2,3,5,6]

// V1- works, but not the leetcode inputs (assumes we don't modify inputs)
// DOESN'T Work for all edge cases for leetcode
/*
// Time: O(m + n), where m and n = lengths off arr1, arr2 respectively
// Space: O(m + n)
// [2, 5], [1, 2, 3]  =>  [1,2,2,3,5]
function merge(arr1, arr2) {
	let merged = [];																															// to return
	// create 2 pointers to track nums in both arrays
	let index1 = 0;
	let index2 = 0;

	// loop num times = sum of lengths of both arrays (bec we need to at least look at every single num)
	for (let i = 0; i < (arr1.length + arr2.length); i++) {
		// create 2 vars to track nums in both arrays
		let num1 = arr1[index1];
		// i = 0: num1 = [2, 5][0] = 2
		// i = 1: num1 = [2, 5][0] = 2
		// i = 2: num1 = [2, 5][0] = 2
		// i = 3: num1 = [2, 5][1] = 5
		// i = 4: num1 = [2, 5][1] = 5
		let num2 = arr2[index2];
		// i = 0: num2 = [1,2,3][0] = 1
		// i = 1: num2 = [1,2,3][1] = 2
		// i = 2: num2 = [1,2,3][2] = 3
		// i = 3: num2 = [1,2,3][2] = 3
		// i = 4: num2 = [1,2,3][3] = undefined

		// create boolean flag to check if one of arrays is "depleted"
		let arr2Depleted = num2 == undefined;		// i = 4 true

		// check which num is smaller, push smaller one to merged array
		if (arr2Depleted || (num1 < num2)) {
			// i = 0: 2 < 1						false
			// i = 1: 2 < 2						false
			// i = 2: 2 < 3						true
			// i = 3: 5 < 3						false
			// i = 4: 5 < undefined		false
			
			merged.push(num1);						
			// i = 2: merged = [1, 2, 2]
		
			index1++;																																	// update index from array which had smaller num
			// i = 2: index1 = 1
		} else {
			merged.push(num2);
			// i = 0: merged = [1]
			// i = 1: merged = [1, 2]
			// i = 3: merged = [1, 2, 2, 3]
		
			index2++;
			// i = 1: index2 = 1
			// i = 2: index2 = 2
			// i = 3: index2 = 3
		}
	}

	// return merged array
	return merged;
}

// console.log(merge([1, 2, 3], [2, 5]));								// [1,2,2,3,5]
// console.log(merge([2, 5], [1, 2, 3]));								// [1,2,2,3,5]
// console.log(merge([1, 2, 3], [2, 5, 6]));							// [1,2,2,3,5,6]
// console.log(merge([1, 2, 3, 10], [2, 5, 6]));					// [1,2,2,3,5,6,10]
// console.log(merge([1, 2, 3], [2, 5, 6, 10]));					// [1,2,2,3,5,6,10] 
*/




/*
// V2- assumes we modify input array 1
// DON'T RETURN ANYTHING
// Time: O(m + n), where m and n = lengths off arr1, arr2 respectively
// Space: O(1), because we mutate input array instead of duplicating/making new merged array
// [1, 2, 3, 0, 0, 0,], [2, 5, 6]
// [2,0], [1] 		=>  [1,2]
function merge(nums1, nums2) {
	// shallow copy nums1
	let nums1Copy = nums1.slice();

	// create 2 pointers to track nums in both arrays
	let index1 = 0;
	let index2 = 0;

	if (nums2.length == 0) return nums1;			// edge case if nums2 is empty

	// loop num times = sum of lengths of both arrays (bec we need to at least look at every single num)
	for (let i = 0; i < nums1.length; i++) {

		if (nums2.length == nums1.length) { 		// edge case if nums1 is "empty"
			nums1[i] = nums2[i];
			continue;
		}

		// create 2 vars to track nums in both arrays
		let num1 = nums1Copy[index1];
		// i = 0: num1 = [1, 2, 3, 0, 0, 0,][0] = 1
		let num2 = nums2[index2];
		// i = 0: num2 = [2, 5, 6][0] = 2

		// create boolean flag to check if one of arrays is "depleted"
		let prevNum1 = nums1[i - 1];
		let arr1Depleted = num1 === 0 && num1 < prevNum1;
		let arr2Depleted = num2 == undefined;

		// check which num is smaller, push smaller one to merged array
		if ((!arr1Depleted && (num1 < num2)) || arr2Depleted) {
			nums1[i] = num1;
			index1++;	// update index from array which had smaller num														
		} else {
			nums1[i] = num2;
			index2++;
		}
	}
};
*/


// V3- MOST UPVOTED SOLUTION
// Time: O(n + m)
// Space: O(1)
function merge(nums1, m, nums2, n) {
	let len = nums1.length - 1
	m--;
	n--;

	while (n >= 0) {
		if (nums1[m] > nums2[n]) {
			nums1[len] = nums1[m], m--
		} else {
			nums1[len] = nums2[n], n--
		}
		len--

	}
	return nums1
}


let list1 = [1, 2, 3, 0, 0, 0,];
let list2 = [2, 5, 6];
merge(list1, 3, list2, 3);
console.log(list1);					// [ 0, 1, 2, 2, 5, 6 ]

list1 = [0, 1, 2, 0, 0 ];
list2 = [2, 5];
merge(list1, 3, list2, 2);						
console.log(list1);						// [ 0, 1, 2, 2, 5 ]

list1 = [0, 1, 2, 5, 100, 101, 0, 0];
list2 = [100, 102];
merge(list1, 6, list2, 2);						
console.log(list1);						// [ 0, 1, 2, 2, 5 ]

list1 = [1];
list2 = [];
merge(list1, 1, list2, 0);						
console.log(list1);						// [ 1 ]

list1 = [0];
list2 = [1];
merge(list1, 0, list2, 1);						
console.log(list1);						// [ 1 ]

list1 = [2, 0];
list2 = [1];
merge(list1, 1, list2, 1);						
console.log(list1);						// [ 1, 2 ]

list1 = [-1, 0, 1, 1, 0, 0, 0, 0, 0];
list2 = [-1, 0, 2, 2, 3];
merge(list1, 4, list2, 5);
console.log(list1);								// [-1, -1, 0, 0, 1, 1, 2, 2, 3]  FAIL