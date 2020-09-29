// LC 937 Reorder Data in Log Files
// EASY
// https://leetcode.com/problems/reorder-data-in-log-files/
//
// You have an array of logs.  Each log is a space delimited string of words.
// For each log, the first word in each log is an alphanumeric identifier.
// Then, either:
// Each word after the identifier will consist only of lowercase letters, or;
// Each word after the identifier will consist only of digits.
// We will call these two varieties of logs letter - logs and digit - logs.
// It is guaranteed that each log has at least one word after its identifier.
// Reorder the logs so that all of the letter - logs come before any digit - log
// The letter - logs are ordered lexicographically ignoring identifier, with the 
// identifier used in case of ties.The digit - logs should be put in their 
// original order.
// Return the final order of the logs.
// 
// Constraints:
//    0 <= logs.length <= 100
//    3 <= logs[i].length <= 100
//    logs[i] is guaranteed to have an identifier, and a word after the identifier
// 
// Note* not all identifiers will start with "dig" or "let"
// 
// Example 1:
// Input: logs = ["dig1 8 1 5 1", "let1 art can", "dig2 3 6", "let2 own kit dig", "let3 art zero"]
// Output:       ["let1 art can", "let3 art zero", "let2 own kit dig", "dig1 8 1 5 1", "dig2 3 6"]



// *****************************************************************************
// VERSION 1- 
// https://leetcode.com/problems/reorder-data-in-log-files/discuss/302285/Javascript-sort()
// TIME COMPLEXITY:  O(M * N * log(N)),    N = number of logs, M = max length of a single log 
//      N * log(N)   comes from Array.sort() based on quickSort. The compare() function is called N * log(N) times
//      M            comes from each compare() function
// SPACE COMPLEXITY: O(M * log(N))
//      M            each call of compare() uses O(M)

// (array) => array
var reorderLogFiles = function (logs) {

  // Gets after-identifier part of log (exlcuding space)
  // ("dig1 8 1 5 1")   =>   "8 1 5 1"
  function getLog(log) {
    return log.slice(log.indexOf(' ') + 1);
  }

  // The condition is that either ALL str[i] are digits or they ALL are symbols
  // so we may check str[0] only
  // ("art")        =>    false
  // ("8")          =>    true
  function isDigitStr(str) {
    // return (str[0] >= '0' && str[0] <= '9') ? true : false;
    return !isNaN(str[0]);
  }

  // main comparing function for 2 strings, if they're equal then compares identifiers
  // ("8", "1")       =>  
  // ("art", "can")   =>
  function compare(a, b) {
    let res = getLog(a).localeCompare(getLog(b));
    // str1.localeCompare(str2)   =>  integer
    // => -neg int if str1 occurs before str2, +pos int if str1 occurs after, 0 if equal
    // letters alphabetically  'a'.localeCompare('c')  => -1
    // nums before letters     '9'.localeCompare('a')  => -1
    //                         'aa'.localeCompare('a') => 1

    // if a,b equal => 
    return (res == 0) ? a.slice(0, a.indexOf(' ')).localeCompare(b.slice(0, b.indexOf(' '))) : res;
  }

  // separate digitLogs from letterLogs in 2 different arrays
  let digitLogs = [];
  let letterLogs = []; 

  // loop through all logs
  for (let i = 0; i < logs.length; i++) {
    let log = logs[i];

    if (isDigitStr(getLog(log))) {
      digitLogs.push(log);

    } else {
      letterLogs.push(log);
    }
  }

  // digitLogs =  [ 'dig1 8 1 5 1', 'dig2 3 6' ]
  // letterLogs = [ 'let1 art can', 'let2 own kit dig', 'let3 art zero' ]
  // console.log(digitLogs);
  // console.log(letterLogs);

  // digitalLogs come after all letterLogs
  return [ ...letterLogs.sort(compare), ...digitLogs ];
};


// EXAMPLE 1:
console.log(reorderLogFiles(["dig1 8 1 5 1", "let1 art can", "dig2 3 6", "let2 own kit dig", "let3 art zero"]));
//=> ["let1 art can", "let3 art zero", "let2 own kit dig", "dig1 8 1 5 1", "dig2 3 6"]

// EXAMPLE 2:
// console.log(reorderLogFiles(["a1 9 2 3 1", "g1 act car", "zo4 4 7", "ab1 off key dog", "a8 act zoo"]));
//=> ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
