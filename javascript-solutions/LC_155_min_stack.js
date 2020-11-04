// LC 155 Min Stack
// EASY
// https://leetcode.com/problems/min-stack/
// INPUT:  2 Nodes, representing heads of two different singly linked lists
// OUTPUT: Node, representing head of singly linked list
// 
// Design a stack that supports push, pop, top, and retrieving the minimum 
// element in constant time O(1)
//    push(x)-- Push element x onto stack.
//    pop()-- Removes the element on top of the stack.
//    top()-- Get the top element.
//    getMin()-- Retrieve the minimum element in the stack.
// Methods pop, top and getMin operations will always be called on non-empty 
// stacks.
// 
// EXAMPLE:
// Input
// ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"]
// [[], [-2], [0], [-3], [], [], [], []]
// 
// Output
// [null, null, null, null, -3, null, 0, -2]
// 
// Explanation
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); // return -3
// minStack.pop();
// minStack.top();    // return 0
// minStack.getMin(); // return -2



// *****************************************************************************
// SOLUTION V1- 2 Stacks, with private helper method
//    (1 stack to track main, another for history of mins)
// TIME COMPLEXITY:   O(1),  all methods, N = number of items in stack
// SPACE COMPLEXITY:  O(N)   2N ->  O(N)

var MinStack = function () {
  this.stack = [];
  this.mins = [];
  return this;
};


// Helper
MinStack.prototype._updateMin = function(num, pop=false) {
  let currentMin = this.mins[this.mins.length - 1];

  if (this.mins.length === 0 || num <= currentMin && !pop) {
    this.mins.push(num);
  }

  if (pop && currentMin === num) {
    this.mins.pop();
  }
};

MinStack.prototype.push = function(el) {
  this.stack.push(el);
  this._updateMin(el);
};

MinStack.prototype.pop = function() {
  let removed = this.stack.pop();
  this._updateMin(removed, true);
};

MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function() {
  return this.mins[this.mins.length - 1];
};



// EXAMPLE 1:
// let minStack = new MinStack();
// minStack.push(-2);                
// console.log(minStack);              //=> { stack: [ -2 ], mins: [ -2 ] }
// console.log(minStack.getMin());     //=> -2

// minStack.push(0);                 
// console.log(minStack);              //=> { stack: [ -2, 0 ], mins: [ -2 ] }
// console.log(minStack.getMin());     //=> -2

// minStack.push(-3);                 
// console.log(minStack);              //=> { stack: [ -2, 0, -3 ], mins: [ -2, -3 ] }
// console.log(minStack.getMin());     //=> -3

// minStack.pop();                   
// console.log(minStack);              //=> { stack: [ -2, 0 ], mins: [ -2 ] }
// console.log(minStack.getMin());     //=> -2

// console.log(minStack.top());        //=>  0
// console.log(minStack.getMin());     //=> -2


// EXAMPLE 2:
// let minStack = new MinStack();
// minStack.push(0);                
// console.log(minStack);              //=> { stack: [ 0 ], mins: [ 0 ] }
// console.log(minStack.getMin());     //=> 0

// minStack.push(1);                 
// console.log(minStack);              //=> { stack: [ 0, 1 ], mins: [ 0 ] }
// console.log(minStack.getMin());     //=> 0

// minStack.push(0);                 
// console.log(minStack);              //=> { stack: [ 0, 1, 0 ], mins: [ 0 ] }
// console.log(minStack.getMin());     //=> 0

// minStack.pop();                   
// console.log(minStack);              //=> { stack: [ 0, 1 ], mins: [ 0 ] }
// console.log(minStack.getMin());     //=> 0




// *****************************************************************************
// SOLUTION V2- 2 Stacks, NO HELPER
//    (1 stack to track main, another for history of mins)
// TIME COMPLEXITY:   O(1),  all methods, N = number of items in stack
// SPACE COMPLEXITY:  O(N)   2N ->  O(N)

// MinStack Data Structure has two properties (both are stacks):
// - main stack (array): 
// - mins stack (array): another stack that tracks history of mins
var MinStack = function () {
  this.stack = [];
  this.mins = [];
  return this;
};


// return undefined
MinStack.prototype.push = function (num) {
  this.stack.push(num);                                                         // push number to stack

  let currentMin = this.mins[this.mins.length - 1];                             // current min is last num in mins array (top)
  
  // update/check if mins stack needs to be updated
  if (this.mins.length === 0 || num <= currentMin) {                            // if num <= currentMin, update currentMin. "<=" because we want to push the number or else ex 1 below wont work
    this.mins.push(num);
  }
};


// return undefined
MinStack.prototype.pop = function () {
  let removed = this.stack.pop();                                               // remove last number from stack, store in var

  let currentMin = this.mins[this.mins.length - 1];                             // grab currentMin (last num in mins array)

  if (currentMin === removed) {                                                 // if currentMin == removed, delete last num in mins stack
    this.mins.pop();
  }
};


// return Number
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];                                     // top of stack is last num in main stack array
};


// return Number
MinStack.prototype.getMin = function () {
  return this.mins[this.mins.length - 1];                                       // currentMin is last num in mins stack array
};



// EXAMPLE 1:
// let minStack = new MinStack();        // { stack: [], mins: [] }
// minStack.push(0);                
// console.log(minStack);                //=> { stack: [ 0 ], mins: [ 0 ] }
// console.log(minStack.getMin());       //=> 0

// minStack.push(1);                 
// console.log(minStack);                //=> { stack: [ 0, 1 ], mins: [ 0 ] }
// console.log(minStack.getMin());       //=> 0

// minStack.push(0);                 
// console.log(minStack);                //=> { stack: [ 0, 1, 0 ], mins: [ 0, 0 ] }
// console.log(minStack.getMin());       //=> 0

// minStack.pop();                   
// console.log(minStack);                //=> { stack: [ 0, 1 ], mins: [ 0 ] }
// console.log(minStack.getMin());       //=> 0