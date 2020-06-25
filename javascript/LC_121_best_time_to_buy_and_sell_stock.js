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


// *****************************************************************************
// SOLUTION1- Naive Brute Force
// TIME: O(N^2), where n = prices length    loop runs n(n-1)/2 times
// SPACE: O(1)   only 2 variables used
// Summary: find all possible valid price trading pairs, (nested loop) and
// keep track of maxProfit
// function maxProfit(prices) {
//   let profit = 0;

//   // loop through prices
//   for (let t = 0; t < prices.length - 1; t++) {

//     // loop through prices again to get all unique pair combos
//     for (let j = t + 1; j < prices.length; j++) {
//       let currentProfit = prices[j] - prices[t];
      
//        // track max profit
//        if (currentProfit > profit) profit = currentProfit;
//     }
//   }

//   return profit;
// }


// *****************************************************************************
// SOLUTION2- One Pass
// TIME: O(N), where n = prices length   
// SPACE: O(1)  
// Summary: track two variables: the lowest price (minPrice) and the max profit
// Ex. [7, 1, 5, 3, 6, 4]   => 5    bec 6 - 1

function maxProfit(prices) {
  // 1) initialize vars to track minPrice and max profit
  // initialize them to extreme points so we can reassign propper values later
  let minPrice = Infinity;
  let profit = 0;

  // 2) loop through prices array
  for (let t = 0; t < prices.length; t++) {
    let currentPrice = prices[t];
    let currentProfit = currentPrice - minPrice;

    // 3) check if minPrice can be updated
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
      
      // 4) else check if max profit can be updated
    } else if (currentProfit > profit) {
      profit = currentProfit;
    }
  }

  return profit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));     //=> 5
console.log(maxProfit([7, 6, 4, 3, 1]));        //=> 0
console.log(maxProfit([7, 1]));                 //=> 0
console.log(maxProfit([7]));                    //=> 0
console.log(maxProfit([]));                     //=> 0
console.log(maxProfit([1, 2]));                 //=> 1