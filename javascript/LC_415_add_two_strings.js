// LC 415 Add Strings
// EASY
// https://leetcode.com/problems/add-strings/
// 
// Given two non-negative integers num1 and num2 represented as string, return 
// the sum of num1 and num2.
// Note:
// - The length of both num1 and num2 is < 5100.
// - Both num1 and num2 contains only digits 0 - 9.
// - Both num1 and num2 does not contain any leading zero.
// - You must not use any built -in BigInteger library or convert the inputs to 
//   integer directly.
// This problem is a variation of LC_02 Add Two Numbers (linked list)


// *****************************************************************************
// SOLUTION V1- for loop, 1 pointer, just sum, carry, and result variables
// TIME COMPLEXITY:  O(Max(N1, N2)),   N1 = num1 length,   N2 = num2 length
// SPACE COMPLEXITY: O(Max(N1, N2))    

// "1789", "15"  => "1804"
var addStrings = function (num1, num2) {
  let result = "";
  let carry = 0;
  let sum = 0;
  let num1Len = num1.length;
  let num2Len = num2.length;
  let maxLen = Math.max(num1Len, num2Len);

  // loop maxLen times
  for (let i = 0; i < maxLen || carry > 0; i++) {                               // cary > 0 for edge case if nums are single digits and there's a carry ex "9", "1"
    let digit1 = Number(num1[num1.length - 1 - i]) || 0;
    let digit2 = Number(num2[num2.length - 1 - i]) || 0;
    sum = digit1 + digit2 + carry;

    if (sum >= 10) {
      carry = 1;
      sum = sum - 10;

    } else {
      carry = 0;
    }

    result = sum + result;
  }

  return result;
};


// console.log(addStrings("1789", "15"));          //=> "1804"
// console.log(addStrings("15", "1789"));          //=> "1804"
// console.log(addStrings("1994", "993"));         //=> "2987"
// console.log(addStrings("9", "1"));              //=> "10"