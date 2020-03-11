// LC 121 Best Time to Buy and Sell Stock
// EASY
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
// Say you have an array for which the ith element is the price of a given stock
// on day i. If you were only permitted to complete at most one transaction(i.e., 
// buy one and sell one share of the stock), design an algorithm to find the 
// maximum profit. Note that you cannot sell a stock before you buy one.
// 
// Ex1:
// Input:  [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), 
// profit = 6-1 = 5. Not 7 - 1 = 6, as selling price needs to be larger than 
// buying price.
// 
// Ex2:
// Input:  [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.


// SOLUTION1- 
// Time Complexity: 
// Space Complexity: 
// Solution Description:
// Ex. [7,1,5,3,6,4]    => 5
// function maxProfit(prices) {
//   let low = Infinity;
//   let high = 0;
//   let lowIdx = null;
//   let highIdx = null;
//   let profit = 0;


// *****************************************************************************
// SOLUTION1- Naive Brute Force
// TIME: O(N^2), where n = prices length
// SPACE: O(N^2)
// Summary: find all possible valid price trading pairs, (nested loop) and
// keep track of maxProfit
function maxProfit(prices) {
  let pairs = [];
  let profit = 0;

  for (let t = 0; t < prices.length; t++) {
    for (let j = t + 1; j < prices.length; j++) {
      let price1 = prices[t];
      let price2 = prices[j];
      if (price2 - price1 > 0) { 
        pairs.push([price1, price2]);
        
        let currentProfit = price2 - price1;
        if (currentProfit > profit) profit = currentProfit;
      }
    }
  }

  return profit;
}
console.log(maxProfit([7, 1, 5, 3, 6, 4]));     //=> 5
console.log(maxProfit([7, 6, 4, 3, 1]));        //=> 0
console.log(maxProfit([7, 1]));                 //=> 0
console.log(maxProfit([7]));                    //=> 0
console.log(maxProfit([]));                     //=> 0