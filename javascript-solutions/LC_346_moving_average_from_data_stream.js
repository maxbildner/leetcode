// LC 346 Moving Average from Data Stream
// EASY
// https://leetcode.com/problems/moving-average-from-data-stream/
// Given a stream of integers and a window size, calculate the moving average of 
// all integers in the sliding window.
// Design 1) a data structure and 2) a method to calculate the moving average
// 
// Example:
// MovingAverage m = new MovingAverage(3);
// m.next(1) = 1
// m.next(10) = (1 + 10) / 2
// m.next(3) = (1 + 10 + 3) / 3
// m.next(5) = (10 + 3 + 5) / 3


// ****************************************************************
// SOLUTION V1- MY SOLUTION- Naive- MASSIVE ARRAY + MOVING WINDOW
// TIME COMPLEXITY (#next): 	O(N), N = length of data array (all nums that have been pushed)
// SPACE COMPLEXITY: 	        O(M), M = length of moving window (limited by size)
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
// SOLUTION V2- Fake Queue + WindowSum
// https://leetcode.com/problems/moving-average-from-data-stream/discuss/187736/JavaScript-beats-100
// - We do not need to keep all values from the data stream, but rather the 
//   last n values which falls into the moving window.
// - we add a new element to the window, and at the same time we remove the 
//   oldest element from the window.
// - to calculate sum, we don't need to loop through all nums in queue/window!
//   we use our previous sum to calculate the next sum w/ help of head (front)
//   of queue
// See LC solution 2 diagram
//
// TIME COMPLEXITY (#next): 	O(N)  Array to implement queue because .shift() is O(N)
// SPACE COMPLEXITY: 	        O(N)  N = length of sliding window/queue 

// var MovingAverage = function (size) {                                           // 1) main Data Structure has 3 properties: size, queue, windowSum
//   this.size = size;
//   this.queue = [];
//   this.sum = 0;
// };


// MovingAverage.prototype.next = function (val) {
//   let head = 0;
//   if (this.queue.length === this.size) head = this.queue.shift();               // 1) if length of queue exceeds size limit, delete head and store to var
//   this.queue.push(val);                                                         // 2) push val to queue
//   this.sum += val - head;                                                       // 3) calculate windowSum. sum at time t = previous sum + val - head.  sum(t) = sum(t - 1) + val - head
//   return this.sum / this.queue.length;
// };


/** 
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
// let m = new MovingAverage(3);
// console.log(m.next(1))      //=> 1                = 1
// console.log(m.next(10))     //=> (1 + 10) / 2     = 5.5
// console.log(m.next(3))      //=> (1 + 10 + 3) / 3 = 4.66
// console.log(m.next(5))      //=> (10 + 3 + 5) / 3 = 6






// TIME: 9/8/21     22min    
// ****************************************************************
// SOLUTION V3-  QUEUE as DOUBLY LINKED LIST- O(1) TIME

// TIME COMPLEXITY (#next): 	O(1)  doubly linked list in JS
// SPACE COMPLEXITY: 	        O(N)  N = length of sliding window/queue 

class Node {
  constructor(val, next, prev) {
    this.val = val === undefined ? null : val;
    this.next = next === undefined ? null : next;
    this.prev = prev === undefined ? null : prev;
  }
}


// QUEUE as a DOUBLY LINKED LIST
var Queue = function () {   
  this.length = 0;
  this.head = null;
  this.tail = null;
}

// add to tail
Queue.prototype.enqueue = function (val) {
  let node = new Node(val);

  if (!this.head) {
    this.head = node;
    
  } else {
    this.tail.next = node;
    node.prev = this.tail;
  }

  this.tail = node;
  this.length++;
}


// remove from head
Queue.prototype.dequeue = function () {
  let oldHead = this.head;
  this.head = oldHead.next;
  this.length--;
  return oldHead;
}



var MovingAverage = function (size) {                                           
  this.size = size;
  this.sum = 0;

  // - .dequeue()     => removes head node
  // - .enqueue(val)  => enqueues or adds val to tail of queue
  // - .length    
  // - .head 
  // - .tail
  this.queue = new Queue();
};


MovingAverage.prototype.next = function (val) {
  let head = 0;

  // if queue is at size capacity, then we need to remove first val from queue
  if (this.queue.length === this.size) {
    head = this.queue.dequeue().val;
  } 

  this.queue.enqueue(val);

  this.sum = this.sum + val - head;

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