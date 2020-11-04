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


// *****************************************************************************
// SOLUTION V1- Use hash table of valid parens + stack (to hold left parens)
// TIME COMPLEXITY:  O(N),    N = str length  
// SPACE COMPLEXITY: O(N)     = 1/2 * N => N 

// '([])'         => true
// '()[]'         => true
var isValid = function (str) {
  // Here is an example of using a "Poor Man's Stack" to 
  // manage limited-time interviews and get to the meat of the 
  // interview problem quickly. 
  //
  // We are relying on arrays and on the developer following the
  // honor system here. They must treat the array as if it is
  // Stack.
  //
  // NEVER do this in an interview setting without confirming
  // with the interviewer that they know you are purposefully
  // taking a shortcut to avoid boring them with your Stack
  // implementation. 
  //
  // You must look at your interviewer here, gauge their affect
  // and the tonality of their voice, and make sure they appreciate 
  // this as a gesture and that they will not dock points for 
  // skipping something they originally wanted to test you on.
  //
  // Pulling this off is almost entirely a matter of how confidently
  // you appear when you do it. If you exude so much confidence that
  // the interivewer feels that implementing a proper OOP Stack class 
  // from scratch is a waste of everyone's time in the room, 
  // than you win.

  let stack = [];                                                               // 1) create array lazy stack only holds valid LEFT brackets (push and pop methods only)

  const validPairs = {                                                          // 2) create hash table of valid bracket pairs (k/v = left parens/right parens)
    '(': ')',
    '[': ']',
    '{': '}'
  };

  for (let i = 0; i < str.length; i++) {                                        // 3) loop through all chars in string
    let char = str[i];

    if (validPairs[char]) {                                                     // 4) if char is a valid LEFT bracket, push char to stack
      stack.push(char);

    } else if (char === ')' || char === ']' || char === '}') {                  // 5) else if char is valid RIGHT bracket

      if (validPairs[stack.pop()] !== char) return false;                       // 6) invalid if the last char in stack NOT equal to char
    }
  }

  return stack.length === 0;                                                    // 7) invalid if stack isn't empty (i.e. left/right brackets unbalanced)
}



console.log(isValid('()[]'));                  //=> true
console.log(isValid('()'));                    //=> true
console.log(isValid('(((((())))))'));          //=> true
console.log(isValid('[{()}]'));                //=> true
console.log(isValid(')('));                    //=> false
console.log(isValid('(((((((()'));             //=> false
console.log(isValid('((([[[{{{ ]]]}}})))'));   //=> false   