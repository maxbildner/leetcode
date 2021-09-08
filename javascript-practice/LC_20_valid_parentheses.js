// LC 20 Valid Parentheses
// EASY
// https://leetcode.com/problems/valid-parentheses/
// 
// Given a string containing just the characters '(', ')', '{', '}', '[' and ']'
// , determine if the input string is valid.
//
// An input string is valid if:
//  1) Open brackets must be closed by the same type of brackets.
//  2) Open brackets must be closed in the correct order.
// Note that an empty string is also considered valid.
//
// Constraints:
//  (1) Your function must run in linear time, O(N).
//  (2) Your function must consume (at maximum) linear space, O(N).
//
// EXAMPLES:
// balancedParens('()[]{}');     => true
// balancedParens('[{()}]');     => true
// balancedParens('[{])({)[}');  => false
// balancedParens('const roundDown = function(num) { return Math.floor(num) };');      => true
// balancedParens('{ array: [1, 2, [3, 4], 5], timesTwoMethod: (num) => num * 2; }');  => true 
// balancedParens('function printThirdElement(array) { console.log(array[3]]] }');     => false 


// TIME: 9/8/21   18min
// *****************************************************************************
// SOLUTION V1- Use hash table of valid parens + stack (to hold left parens)
// TIME COMPLEXITY:  O(N),    N = str length  
// SPACE COMPLEXITY: O(N)     = 1/2 * N => N 

// '([])'         => true
// '()[]'         => true
var isValid = function (str) {
  
}



console.log(isValid('()[]'));                  //=> true
console.log(isValid('()'));                    //=> true
console.log(isValid('(((((())))))'));          //=> true
console.log(isValid('[{()}]'));                //=> true
console.log(isValid(')('));                    //=> false
console.log(isValid('(((((((()'));             //=> false
console.log(isValid('((([[[{{{ ]]]}}})))'));   //=> false   