// LC 346 Moving Average from Data Stream
// https://leetcode.com/problems/moving-average-from-data-stream/


// ****************************************************************
// SOLUTION V1- MY SOLUTION- NAIVE TERRIBLE TIME (5%), 80% less space
// /**
//  * Initialize your data structure here.
//  * @param {number} size
//  */
// var MovingAverage = function(size) {
//   this.limit = size;
//   this.data = [];
// };


// /** 
//  * @param {number} val
//  * @return {number}
//  */
// MovingAverage.prototype.next = function(val) {
//   this.data.push(val);
//   let sum;

//   if (this.data.length > this.limit) {
//     this.data.shift();
//   } 

//   sum = this.data.reduce((a, b) => a + b, 0);
//   return sum/this.data.length;
// };

// /** 
//  * Your MovingAverage object will be instantiated and called as such:
//  * var obj = new MovingAverage(size)
//  * var param_1 = obj.next(val)
//  */
// let m = new MovingAverage(3);
// console.log(m.next(1))      //=> 1                = 1
// console.log(m.next(10))     //=> (1 + 10) / 2     = 5.5
// console.log(m.next(3))      //=> (1 + 10 + 3) / 3 = 4.66
// console.log(m.next(5))      //=> (10 + 3 + 5) / 3 = 6



// ****************************************************************
// SOLUTION V2- 
// https://leetcode.com/problems/moving-average-from-data-stream/discuss/187736/JavaScript-beats-100
/**
 * Initialize your data structure here.
 * @param {number} size
 */
var MovingAverage = function (size) {
  this.limit = size;
  this.queue = [];
  this.sum = 0;
};


/** 
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function (val) {
  let tail = 0;
  if (this.queue.length === this.limit) {
    tail = this.queue.shift();
  }

  this.queue.push(val);
  this.sum += val;
  this.sum -= tail;
  return this.sum / this.queue.length;
};

/** 
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
let m = new MovingAverage(3);
console.log(m.next(1))      //=> 1                = 1
console.log(m.next(10))     //=> (1 + 10) / 2     = 5.5
console.log(m.next(3))      //=> (1 + 10 + 3) / 3 = 4.66
console.log(m.next(5))      //=> (10 + 3 + 5) / 3 = 6