// LC 64 Minimum Path Sum
// MEDIUM
// https://leetcode.com/problems/minimum-path-sum/ 
// Given a m x n grid filled with non - negative numbers, find a path from top 
// left to bottom right which minimizes the sum of all numbers along its path.
// Note: You can only move either down or right at any point in time.
// 
// Ex:
// Input:
// [
//   [1, 3, 1],
//   [1, 5, 1],
//   [4, 2, 1]
// ]
// Output: 7
// Explanation: Because the path 1→3→1→1→1 minimizes the sum.


// SOLUTION1- AA Solution using Dynamic Programming Tabulation
// Time Complexity: O(h * w), where h = height length of grid, w = width of grid
// Space Complexity: O(h * w) bec. another matrix of same dimensions is created
// Solution Description:
// Build a table (2d array) w/ same length of input grid, where each innermost
// value represents that minpath sum to that position. Loop through each
// value in the table and assign it with the min path sum using the previous
// value of its top or left neighbor.
function minPathSum(grid) {
  // 1) get height and width of input grid
  let h = grid.length;
  let w = grid[0].length;

  // 2) build a table (2d array) same length of input grid (fill w/ infinitys)
  let table = new Array(h).fill().map(() => new Array(w).fill(Infinity));
  // table = 
  // [ [Infinity, Infinity, Infinity],
  //   [Infinity, Infinity, Infinity],
  //   [Infinity, Infinity, Infinity] ]

  // 3) reassign first innermost val in table (trivial case)
  table[0][0] = grid[0][0];
  // table = 
  // [ [1, Infinity, Infinity],
  //   [Infinity, Infinity, Infinity],
  //   [Infinity, Infinity, Infinity] ]

  // 4) loop through all innermost vals in table (nested loop)
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {

      // 5) make sure we don't go out of bounds (bottom of grid)
      // we have "h - 1" because we want to reassign the table value only to the
      // second to last position
      if (i < h - 1) {

        // 6) reassign value adjacent down of current position with min of:
        // - val we'd get by traversing down from current pos (in grid)
        // - val already in table at target position
        // we need to get the min of those two in order to overwrite any previous
        // value that was not as efficient
        table[i + 1][j] = Math.min(table[i][j] + grid[i + 1][j], table[i +1][j]);
      }
      
      // 7) make sure we don't go out of bounds (right of grid)
      if (j < w - 1) {

        // 8) reassign value adjacent right of current position
        table[i][j + 1] = Math.min(table[i][j] + grid[i][j + 1], table[i][j + 1]);
      }
    }
  }

  // 9) return last innermost val in table (bottom right)
  return table[h - 1][w - 1];
}

grid = 
[ [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1] ]
console.log(minPathSum(grid));      //= > 7