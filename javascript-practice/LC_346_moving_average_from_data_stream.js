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




// TIME: 9/8/21   14min  
// ****************************************************************
// V2- slightly more efficient time O(N) instead of O(2N)
// no need to calculate sum at the end by looping

// var MovingAverage = function (size) {                                           

// };



// MovingAverage.prototype.next = function (val) {

// };





// TIME: 9/8/21     22min    
// ****************************************************************
// V3- QUEUE as DOUBLY LINKED LIST
// TIME COMPLEXITY (#next): 	O(1)  doubly linked list in JS
// SPACE COMPLEXITY: 	        O(N)  N = length of sliding window/queue 


class Node {
  constructor(val, next, prev) {
    
  }
}


// QUEUE as a DOUBLY LINKED LIST
var Queue = function () {   
  
}

// add to tail
Queue.prototype.enqueue = function (val) {
  
}


// remove from head
Queue.prototype.dequeue = function () {
  
}



var MovingAverage = function (size) {                                           
 
};


MovingAverage.prototype.next = function (val) {
  
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