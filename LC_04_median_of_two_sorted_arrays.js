// LC 04 Median of Two Sorted Arrays
// HARD
// There are two sorted arrays nums1 and nums2 of size m and n respectively.
// Find the median of the two sorted arrays. The overall run time complexity 
// should be O(log(m + n)). You may assume nums1 and nums2 cannot be both empty.
// https://leetcode.com/problems/median-of-two-sorted-arrays/
// Ex.
// Input:  nums1 = [1, 2], nums2 = [3, 4]
// Output: (2 + 3)/2 = 2.5

// V1- merges arrays in O(n) time, then calculates median
// Time: O(n)
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


// Time: O(n)
// Space: O(n)
// [1,3,4], [2,5]   
function mergeTwoArrays(arr1, arr2) {
    let merged = [];
    let index1 = 0;
    let index2 = 0;

    // loop num times equal to sum of lengths of both input arrays
    for (let i = 0; i < (arr1.length + arr2.length); i++) {
        // grab ith num of each input array
        let unmerged1 = arr1[index1];
        // i = 0: unmerged1 = [1,3,4][0] = 1
        let unmerged2 = arr2[index2];
        // i = 0: unmerged2 = [2,5][0] = 2

        let isArr1Depleted = index1 >= arr1.length;
        let isArr2Depleted = index2 >= arr2.length;

        if (!isArr1Depleted && (isArr2Depleted || (unmerged1 < unmerged2))) {
            merged[i] = unmerged1;
            index1++;
        } else {
            merged[i] = unmerged2;
            index2++;
        }
    }

    return merged;
}
// console.log(mergeTwoArrays([2, 5, 6, 7], [1, 3, 4]));    // [1,2,3,4,5,6,7]
// console.log(mergeTwoArrays([1, 3, 4], [2, 5, 6, 7]));    // [1,2,3,4,5,6,7]
// console.log(mergeTwoArrays([2, 5, 6], [1, 3, 4]));       // [1,2,3,4,5,6]




// UNFINISHED V2- O(log(n + m)) time
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
// };