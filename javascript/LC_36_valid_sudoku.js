// LC 36 Valid Sudoku
// MEDIUM
// https://leetcode.com/problems/valid-sudoku/
//
// Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be 
// validated according to the following rules:
//    - Each row must contain the digits 1 - 9 without repetition.
//    - Each column must contain the digits 1 - 9 without repetition.
//    - Each of the 9 3x3 sub - boxes of the grid must contain the digits 1 - 9 
//      without repetition.
//
// Note: 
//    - The Sudoku board could be partially filled, where empty cells are 
//      filled with the character '.'.
//    - A Sudoku board(partially filled) could be valid but is not necessarily 
//      solvable.
//    - Only the filled cells need to be validated according to the mentioned 
//      rules.
//    - The given board contain only digits 1 - 9 and the character '.'.
//    - The given board size is always 9x9.
// 
// EXAMPLE 1:
// Input:
// [
//   ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"]
// ]
// Output: true
//
// EXAMPLE 2:
// [
//   ["8", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"]
// ]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner 
// being modified to 8. Since there are two 8's in the top left 3x3 sub-box, 
// it is invalid.



// *****************************************************************************
// VERSION 1 
// TIME COMPLEXITY:  O(),			
// SPACE COMPLEXITY: O()		

// (array 2D) => boolean
var isValidSudoku = function (board) {
  let rowColBox = new Set();                                                    // create set to track nums in rows, cols, and boxes
  // each num will be stored like this:  5row0, 5col0, 5box0

  for (let i = 0; i < board.length; i++) {                                      // loop through rows in board
    let row = board[i];

    for (let j = 0; j < row.length; j++) {                                      // loop through each num in row
      let num = row[j];

      // 5row0, 5col0, 5box0-0
      let numRow = num + "row" + i;
      let numCol = num + "col" + j;
      let numBox = num + "box" + Math.floor(j/3) + "-" + Math.floor(i/3);
      // i = 0, j = 0:   numRow = "5row0",  numCol = "5col0",  numBox = "5box0-0"
      
      // if num IS in rowColBox set, we have a duplicate, so exit
      if (rowColBox.has(numRow) || 
          rowColBox.has(numCol) ||
          rowColBox.has(numBox)) {           

        return false;

      } else if (num !== ".") {                                                 // if num is NOT in rowColBox set, add it with corresponding postfix
        rowColBox.add(numRow).add(numCol).add(numBox);
      }
    }
  }
  
  return true;
}


// EXAMPLE 1:
let grid1 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
console.log(isValidSudoku(grid1));              //=> true


// EXAMPLE 2:
let grid2 = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
console.log(isValidSudoku(grid2));              //=> false



