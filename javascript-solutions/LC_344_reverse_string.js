// LC 344 Reverse String
// EASY
// Write a function that reverses a string.The input string is given as an array 
// of characters char[].
// Do not allocate extra space for another array, you must do this by modifying 
// the input array in -place with O(1) extra memory.
// You may assume all the characters consist of printable ascii characters.
// Example 1:
// Input: ["h", "e", "l", "l", "o"]
// Output: ["o", "l", "l", "e", "h"]
/*
 	@param {character[]} s
	@return {void} Do not return anything, modify s in-place instead.
*/

// V1- mutates input array!, Does NOT return anything (undefined)
// Time: O(n), where n = input array length
// Space: O(1)
function reverseString(arr) {
	// create counter for var to track opposite char in array
	let j = 0;

	// midpoint idx
	let midIdx = Math.floor(arr.length/2);

	// loop through chars in array from end to midpoint (inclusive)
	for (let i = arr.length - 1; i >= midIdx; i--) {
		let char = arr[i];
		let oppositeChar = arr[j];
		// swap chars in place
		arr[i] = oppositeChar;
		arr[j] = char;
		j++;
	}
}


let arr1 = ["h", "e", "l", "l", "o"];
let arr2 = ["o", "k", "a", "y"];
reverseString(arr1);
console.log(arr1);													// ["o", "l", "l", "e", "h"]

reverseString(arr2);
console.log(arr2);													// ["y", "a", "k", "o"]

