// LC 125 Valid Palindrome
// EASY
// https://leetcode.com/problems/valid-palindrome/
// 
// Given a string, determine if it is a palindrome, considering only 
// alphanumeric characters and ignoring cases.
// Note: For the purpose of this problem, we define empty string as valid 
// palindrome.
// string input only has printable ASCII characters
// 
// INPUT:  string
// OUTPUT: boolean
// 
// Example 1:
// "A man, a plan, a canal: Panama" => true
//
// Example 2:
// "race a car"  => false



// *****************************************************************************
// SOLUTION 1- O(N) Space
//    1- remove punctuation, store in new string
//    2- use pointer technique (left and right pointers at opposite ends of string)
//       loop while left < right
//    3- exit early if left char != right char
// TIME:  O(N),  N = string length
// SPACE: O(N)    

// "A man, a plan, a canal: Panama" => true
var isPalindromeV1 = function (str) {

  // remove punctuation
  let validChars = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  str = str.toLowerCase();
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (validChars.has(char)) newStr += char;
  }

  let i = 0;
  let j = newStr.length - 1;
  while (i < j) {
    let char = newStr[i];
    let opposite = newStr[j];
    if (char !== opposite) return false;
    i++;
    j--;
  }

  return true;
}


// console.log(isPalindromeV1("A man, a plan, a canal: Panama"));    //=> true
// console.log(isPalindromeV1("race a car"));                        //=> false



// *****************************************************************************
// SOLUTION 1- O(1) Space
//    1- use pointer technique (left and right pointers at opposite ends of string)
//       loop while left < right
//    2- 2 conditions to handle if left or right chars arent validChars, update pointers
//    3- exit early if left char != right char
// TIME:  O(N),  N = string length
// SPACE: O(N)    

// "A man, a plan, a canal: Panama" => true
var isPalindromeV2 = function (str) {

  // invalidChars
  let validChars = "abcdefghijklmnopqrstuvwxyz0123456789";

  // use two pointers (l, r) to starting on opposite ends of string and both moving
  // inward by 1 each loop
  let l = 0;
  let r = str.length - 1;
  while (l < r) {

    // grab left and right chars
    let left = str[l].toLowerCase();
    let right = str[r].toLowerCase();

    // if left or right not a validChar, update pointers, and skip iteration
    if (!validChars.includes(left)) {
      l++;
      continue;
    }
    if (!validChars.includes(right)) {
      r--;
      continue;
    }

    // exit if they're not the same
    if (left !== right) return false;

    // update pointers
    l++;
    r--;
  }

  return true;
}


console.log(isPalindromeV2("A man, a plan, a canal: Panama"));    //=> true
console.log(isPalindromeV2("race a car"));                        //=> false