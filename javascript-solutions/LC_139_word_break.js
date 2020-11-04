// LC 139 Word Break
// EASY
// https://leetcode.com/problems/word-break/
// Given a non - empty string s and a dictionary wordDict containing a list of 
// non - empty words, determine if s can be segmented into a space - separated 
// sequence of one or more dictionary words.
// The same word in the dictionary may be reused multiple times in the 
// segmentation. You may assume the dictionary does not contain duplicate words.
// Example 1:
// Input: s = "leetcode", wordDict = ["leet", "code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
//
// Example 2:
// Input: s = "applepenapple", wordDict = ["apple", "pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.
//
// Example 3:
// Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output: false

// SOLUTION1- TABULATION
// TIME: O(n^2), where n = string length
// SPACE: O(n)
// ('applepen', ['app', 'apple', 'pen'])  => true
// a p p l e p e n
// 0 1 2 3 4 5 6 7
var wordBreak = function (string, wordDict) {
  // 1) create a table/array length string + 1
  let table = new Array(string.length + 1).fill(false);

  // 2) populate first value with true bec. empty string ''
  table[0] = true;
  // table = [ true, false, false, false, false, false, false, false, false ]

  // need nested loop to get all contiguous substrings
  // 3) loop through table
  for (let i = 0; i < table.length; i++) {

    // If current value we're looping through is false, skip/move to next iteration
    // if we didn't have this below the input "catsandog", ["cats","dog","sand","and","cat"] would be true (but false is correct)
    if (table[i] === false) continue;

    // loop through rest of table, but increment counter by 1
    for (let j = i + 1; j < table.length; j++) {
      // 4) check if substring is in dictionary
      // grab substring
      let substring = string.slice(i, j);
      // i = 0, j = 1: substring = 'a'
      // i = 0, j = 2: substring = 'ap'
      // i = 0, j = 3: substring = 'app'      true
      // i = 0, j = 4: substring = 'appl'
      // i = 0, j = 5: substring = 'apple'    true
      // i = 0, j = 6: substring = 'applep'   
      // i = 0, j = 7: substring = 'applepe'   
      // i = 0, j = 8: substring = 'applepen'
      
      // i = 1, j = 2: substring = 'p'
      // i = 1, j = 3: substring = 'pp'
      // i = 1, j = 4: substring = 'ppl'
      // i = 1, j = 5: substring = 'pple'

      if (wordDict.includes(substring)) {
        // populate table at current position with true
        table[j] = true;
        // i = 0, j = 3: table = [ true, false, false, true, false, false, false, false, false ]
        // i = 0, j = 5: table = [ true, false, false, true, false, true, false, false, false ]
      }
    }
  }

  // return last value in table
  return table[table.length - 1];
};

// console.log(wordBreak('applepen', ['app', 'apple', 'pen']));
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));