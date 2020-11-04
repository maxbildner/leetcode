// LC 953 Verifying an Alien Dictionary
// EASY
// https://leetcode.com/problems/verifying-an-alien-dictionary/
//
// INPUTS: Array, String
// OUTPUT: Boolean
// 
// In an alien language, surprisingly they also use english lowercase letters, 
// but possibly in a different order. The order of the alphabet is some 
// permutation of lowercase letters.
// Given a sequence of words written in the alien language, and the order of the 
// alphabet, return true if and only if the given words are sorted 
// lexicographicaly in this alien language.
//
// Example 1:
// Input: words = ["hello", "leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
// Output: true
// Explanation: As 'h' comes before 'l' in this language, then the sequence is 
// sorted.
//
// Example 2:
// Input: words = ["word", "world", "row"], order = "worldabcefghijkmnpqstuvxyz"
// Output: false
// Explanation: As 'd' comes after 'l' in this language, 
// then words[0] > words[1], hence the sequence is unsorted.
//
// Example 3:
// Input: words = ["apple", "app"], order = "abcdefghijklmnopqrstuvwxyz"
// Output: false
// Explanation: The first three characters "app" match, and the second string is 
// shorter(in size.) According to lexicographical rules "apple" > "app", 
// because 'l' > '∅', where '∅' is defined as the blank character which is less 
// than any other character(More info).
//
// Constraints:
//  -  1 <= words.length <= 100
//  -  1 <= words[i].length <= 20
//  - order.length == 26
//  - All characters in words[i] and order are English lowercase letters.


// *****************************************************************************
// SOLUTION V1- 
// TIME COMPLEXITY:  O( ),  
// SPACE COMPLEXITY: O( )

// (["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")  =>   false
var isAlienSorted = function (words, order) {
  // check whether all adjacent words, a and b have a <= b

  // build hash table, key = order letter, value = order index
  let order_index = {};
  for (let i = 0; i < order.length; i++) {
    let char = order[i];
    order_index[char] = i;
  }
  // order_index = { 'w':0, "o":1, "r":2, ... }

  for (let i = 0; i < words.length - 1; i++) {                                  // loop through to second to last word
    let word1 = words[i];
    let word2 = words[i + 1];                                                   // grab current word and next word

    // find the difference between current word1[j] and word2[j]
    for (var j = 0; j < Math.min(word1.length, word2.length); j++) {  

      // if they compare badly, it's not sorted
      if (word1[j] != word2[j]) {

        if (order_index[word1[j]] > order_index[word2[j]]) {                    // if idx of char in word1 > idx of char in word2, not sorted!
          return false;
        } 
        break;
      }
    }
    if (order_index[word1[j]] < order_index[word2[j]]) continue;
    if (word1.length > word2.length) return false;                              // no difference was found, but words are like ex. "app", "apple"
  }


  // for (let i = 1; i < words.length; i++) {
  //   let prev = words[i - 1], curr = words[i];

  //   if (order_index[prev[0]] > order_index[curr[0]]) return false;
  //   else if (prev[0] === curr[0]) {
  //     let pointer = 1
  //     while (prev[pointer] === curr[pointer]) pointer++;
  //     if (curr[pointer] === undefined) return false;
  //     if (order_index[prev[pointer]] > order_index[curr[pointer]]) return false;
  //   }
  // }

  return true
  
};


// console.log(isAlienSorted(["kuvp", "q"], "ngxlkthsjuoqcpavbfdermiywz"));            //=> true
// console.log(isAlienSorted(["apap", "app"], "abcdefghijklmnopqrstuvwxyz"));          //=> true
// console.log(isAlienSorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"));    //=> true
// console.log(isAlienSorted(["apple", "app"], "abcdefghijklmnopqrstuvwxyz"));         //=> false
// console.log(isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")); //=> false




// *****************************************************************************
// SOLUTION V2- 37% faster
// TIME COMPLEXITY:  O( ),  
// SPACE COMPLEXITY: O( )

// (["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")  =>   false
var isAlienSorted = function (words, order) {
  // check whether all adjacent words, a and b have a <= b

  // build hash table, key = order letter, value = order index
  let order_index = {};
  for (let i = 0; i < order.length; i++) {
    let char = order[i];
    order_index[char] = i;
  }
  // order_index = { 'w':0, "o":1, "r":2, ... }

  for (let i = 1; i < words.length; i++) {
    let prev = words[i - 1], curr = words[i];

    if (order_index[prev[0]] > order_index[curr[0]]) return false;
    else if (prev[0] === curr[0]) {
      let pointer = 1
      while (prev[pointer] === curr[pointer]) pointer++;
      if (curr[pointer] === undefined) return false;
      if (order_index[prev[pointer]] > order_index[curr[pointer]]) return false;
    }
  }

  return true
};


console.log(isAlienSorted(["kuvp", "q"], "ngxlkthsjuoqcpavbfdermiywz"));            //=> true
console.log(isAlienSorted(["apap", "app"], "abcdefghijklmnopqrstuvwxyz"));          //=> true
console.log(isAlienSorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"));    //=> true
console.log(isAlienSorted(["apple", "app"], "abcdefghijklmnopqrstuvwxyz"));         //=> false
console.log(isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")); //=> false