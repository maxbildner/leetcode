// LC 70 Climbing Stairs
// EASY
// https://leetcode.com/problems/climbing-stairs/
// You are climbing a stair case. It takes n steps to reach to the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can 
// you climb to the top ? Note : Given n will be a positive integer.
// 
// Ex1:
// Input: 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// 
// Ex2:
// Input: 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step


// SOLUTION1- AA Solution using Dynamic Programming Tabulation
// Time Complexity: O(n),   where n = input num
// Space Complexity: O(n),  size of table array
// Solution Description:
// Create a table array where each idx refers to input n, and each corresponding
// value refers to the output (distinct ways to climb steps). Then we use
// a recursive fib like formula to calculate f(n) = dp[i]
// n      DP Table          Output dp[i]
// 0      [1, 1]            1
// 1      [1, 1]            1
// 2      [1, 1, 2]         2
// 3      [1, 1, 2, 3]      3
// 4      [1, 1, 2, 3, 5]   5
// f(2) = dp[2] = dp[2 - 1] + dp[2 - 2]
// f(2) = dp[2] = dp[1] + dp[0]
// f(2) = dp[2] = 1 + 1
// f(2) = dp[2] = 2
// f(n) = dp[i] = dp[i - 1] + dp[i - 2]
// 
// Ex. (3)  => 3
function climbStairs(n) {
  // 1) create table of length n + 1, this so so our input n matches up with the i in dp[i]
  let table = new Array(n + 1);

  // 2) populate the first two values in the table
  table[0] = 1;
  table[1] = 1;

  // 3) loop through the rest of the table
  for (let i = 2; i < table.length; i++) {
    
    // 4) use recursive fib-like formula to populate
    table[i] = table[i - 1] + table[i - 2];
  }

  // 5) return last value in table
  return table[table.length - 1];
}


console.log(climbStairs(0));     //=> 1
console.log(climbStairs(1));     //=> 1
console.log(climbStairs(2));     //=> 2
console.log(climbStairs(3));     //=> 3
console.log(climbStairs(4));     //=> 5