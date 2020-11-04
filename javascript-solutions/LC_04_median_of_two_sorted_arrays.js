// LC 04 Median of Two Sorted Arrays
// HARD
// There are two sorted arrays nums1 and nums2 of size m and n respectively.
// Find the median of the two sorted arrays. The overall run time complexity 
// should be O(log(m + n)). You may assume nums1 and nums2 cannot be both empty.
// https://leetcode.com/problems/median-of-two-sorted-arrays/
// Ex.
// Input:  nums1 = [1, 2], nums2 = [3, 4]
// Output: (2 + 3)/2 = 2.5

// V1- merges arrays in O(n + m) time, then calculates median
// Time: O(n + m)
// Space: ??
function findMedianSortedArrays(nums1, nums2) {
	let merged = mergeTwoArrays(nums1, nums2);
	let midIdx = Math.floor(merged.length/2);

	// if merged array has even num, return average of two middle
	if (merged.length % 2 === 0) {
		return (merged[midIdx] + merged[midIdx - 1])/2.0;
	} else {                    // if merged array has odd num, return middle
		return merged[midIdx];
	}
}
console.log(findMedianSortedArrays([1,2], [3,4]));  //=> 2.5
console.log(findMedianSortedArrays([1,3], [2]));    //=> 2.0



// Time: O(n + m)
// Space: O(n + m) ?
// [1,3,4], [2,5]   
/*
function mergeTwoArrays(arr1, arr2) {
	let merged = [];
	// need two different pointers to track nums in both arrays
	let index1 = 0;		
	let index2 = 0;

	// loop num times equal to sum of lengths of both input arrays
	for (let i = 0; i < (arr1.length + arr2.length); i++) {
		// grab ith num of each input array
		let unmerged1 = arr1[index1];
		// i = 0: unmerged1 = [1,3,4][0] = 1
		// i = 1: unmerged1 = [1,3,4][1] = 3
		// i = 2: unmerged1 = [1,3,4][1] = 3
		// i = 3: unmerged1 = [1,3,4][2] = 4
		// i = 4: unmerged1 = [1,3,4][3] = undefined
		let unmerged2 = arr2[index2];
		// i = 0: unmerged2 = [2,5][0] = 2		// only 1 index changes per loop!
		// i = 1: unmerged2 = [2,5][0] = 2		// Note how index2 doesn't change between i = 0, and i = 1
		// i = 2: unmerged2 = [2,5][1] = 5		
		// i = 3: unmerged2 = [2,5][1] = 5		
		// i = 4: unmerged2 = [2,5][1] = 5		

		// booleans to track whether we've reached the end of one of the arrs
		let isArr1Depleted = index1 >= arr1.length;		// ?? try using undefined as a boolean
		// i = 0: isArr1Depleted = 0 >= 3	false
		// i = 1: isArr1Depleted = 1 >= 3	false
		// i = 2: isArr1Depleted = 1 >= 3	false
		// i = 3: isArr1Depleted = 2 >= 3	false
		// i = 4: isArr1Depleted = 3 >= 3	true
		let isArr2Depleted = index2 >= arr2.length;
		// i = 0: isArr2Depleted = 0 >= 2	false
		// i = 1: isArr2Depleted = 0 >= 2	false
		// i = 2: isArr2Depleted = 1 >= 2	false
		// i = 3: isArr2Depleted = 1 >= 2	false
		// i = 4: isArr2Depleted = 1 >= 2	false

		// only add num from arr1 to merged if num1 < num2 
		// if arr1 is NOT depleted AND (arr2 IS depleted OR num1 < num2 )
		if (!isArr1Depleted && (isArr2Depleted || (unmerged1 < unmerged2))) {				// ?? WHY IS THIS NEEDED? V2 solution below is simpler!!!!
			// i = 0: !false && (false || 1 < 2)		!false && (false || true)		true && (true)   	true
			// i = 1: !false && (false || 3 < 2)		!false && (false || false)	true && (false)  	false
			// i = 2: !false && (false || 3 < 5)		!false && (false || true)		true && (true)  	true
			// i = 3: !false && (false || 4 < 5)		!false && (false || true)		true && (true)  	true
			// i = 4: !true && (false || undef < 5)	!true && (false || false)		false && (false)  false
			merged[i] = unmerged1;
			// i = 0: merged[0] = 1		merged = [1]
			// i = 2: merged[2] = 3		merged = [1, 2, 3]
			// i = 3: merged[3] = 4		merged = [1, 2, 3, 4]
			index1++;
			// i = 0: index1 = 1
			// i = 2: index1 = 2
			// i = 3: index1 = 3
		} else {
			merged[i] = unmerged2;
			// i = 1: merged[1] = 2		merged = [1, 2]
			// i = 4: merged[4] = 5		merged = [1, 2, 3, 4, 5]
			index2++;
			// i = 1: index2 = 1
			// i = 4: index2 = 2
		}
	}

	return merged;
}
// console.log(mergeTwoArrays([2, 5, 6, 7], [1, 3, 4]));    // [1,2,3,4,5,6,7]
// console.log(mergeTwoArrays([1, 3, 4], [2, 5, 6, 7]));    // [1,2,3,4,5,6,7]
// console.log(mergeTwoArrays([2, 5, 6], [1, 3, 4]));       // [1,2,3,4,5,6]
*/


// V2- SIMPLER 
// Time: O(n + m)
// Space: ??
// [2,5], [1,3,4] 		=>  [1, 2, 3, 4, 5]
function mergeTwoArrays(arr1, arr2) {
	// create empty array to return merged array later
	let merged = [];

	// create 2 pointers to track nums in both arrays
	let index1 = 0;				// corresponds to index in arr1
	let index2 = 0;				// corresponds to index in arr2

	// loop num of times equal to sum of lengths of both arrays
	for (let i = 0; i < (arr1.length + arr2.length); i++) {
		// create 2 vars to track nums in both arrays using pointers made outside loop
		let num1 = arr1[index1];
		let num2 = arr2[index2];

		// create boolean flag
		let isArr2Depleted = num2 == undefined;		
		
		// if num1 < num2, add num1 to merged, increment index1
		if (isArr2Depleted || num1 < num2) {
			merged.push(num1);
			index1++;
		} else {								// else add num2 to merged, udate index2
			merged.push(num2);
			index2++;
		}
	}

	// return merged array
	return merged;
}
// console.log(mergeTwoArrays([1, 3, 4], [2, 5]));    			// [1, 2, 3, 4, 5]
// console.log(mergeTwoArrays([2, 5], [1, 3, 4]));    			// [1, 2, 3, 4, 5]
// console.log(mergeTwoArrays([2, 5, 6, 7], [1, 3, 4]));   // [1, 2, 3, 4, 5, 6, 7]
// console.log(mergeTwoArrays([1, 3, 4], [2, 5, 6, 7]));   // [1, 2, 3, 4, 5, 6, 7]
// console.log(mergeTwoArrays([2, 5, 6], [1, 3, 4]));      // [1, 2, 3, 4, 5, 6]
// console.log(mergeTwoArrays([2, 2, 6], [3, 3, 4]));      // [2, 2, 3, 3, 4, 6]
// console.log(mergeTwoArrays([1, 3, 20, 101], [2, 5, 30, 31, 100]));   // [1, 2, 3, 5, 20, 30, 31, 100, 101]



// UNFINISHED V3- O(log(n + m)) time
// var findMedianSortedArrays = function (nums1, nums2) {
//     let l1 = nums1.length;
//     let l2 = nums2.length;
//     let totalLength = l1 + l2;
//     let max, min, half;
//     if (l1 > l2) {
//         max = l1;
//         min = l2;
//     } else {
//         max = l2;
//         min = l1;
//     }
//     half = (l1 + l2 + 1) / 2;
//     while (min <= max) {
//         let i = (min + max) / 2;
//         let j = half - i;
//         if (i < m && nums2[j - 1] > nums1[j]) {
//             min = i + 1;
//         } else if (i > 0 && nums1[i - 1] > nums2[j]) {
//             max = i - 1;
//         }
//     }
// }