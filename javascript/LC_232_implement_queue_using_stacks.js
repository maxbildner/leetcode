// LC 232 Implement Queue using Stacks
// EASY
// https://leetcode.com/problems/implement-queue-using-stacks/
// 
// Implement the following operations of a queue using stacks.
//    push(x) -- O(1) TIME. Push element x to the back of queue.
//    pop()   -- O(1) TIME. Removes the element from in front of queue.
//    peek()  -- O(1) TIME. Get the front element.
//    empty() -- O(1) TIME. Return whether the queue is empty.
//
// Constraints:
// - You must use only standard operations of a stack -- which means only push 
//   to top, peek/pop from top, size, and is empty operations are valid. 
// - Depending on your language, stack may not be supported natively. You may 
//   simulate a stack by using a list or deque(double - ended queue), as long as 
//   you use only standard operations of a stack.
// - You may assume that all operations are valid (for example, no pop or peek 
//   operations will be called on an empty queue).
// 
// EXAMPLE 1:
// MyQueue queue = new MyQueue();
// queue.push(1);     // [ 1 ]
// queue.push(2);     // [ 1, 2 ]
// queue.peek();      //=> returns 1
// queue.pop();       //=> returns 1
// queue.empty();     //=> returns false


// TIME: 1HR
// *****************************************************************************
// SOLUTION V1- BOTH #push/#pop are O(N) Time, builds whole new stack/queue for each method call
// TIME COMPLEXITY (push/pop):  O(N), N = queue/stack length
// SPACE COMPLEXITY (push/pop): O(N)    

var MyQueueV1 = function () {
  // main stack which helps build other stack (for pop)
  // need some way to reverse numbers
  this.queue = [];        // can only use push, pop, peek last ele (top), size

  // another array stack just the reverse of queue
  this.stack = [];        // can only use push, pop, peek last ele (top), size
};


// Push element x to the back of queue
// (number) => undefined
// TIME COMPLEXITY: O(N), N = queue length
MyQueueV1.prototype.push = function (x) {
  this.queue.push(x);     

  let queueCopy = this.queue.slice();

  // build a reversed queue (stack) by continuously popping queue and pushing into another stack 
  this.stack = [];
  for (let i = queueCopy.length - 1; i >= 0; i--) {
    this.stack.push(queueCopy.pop());
  }
};


// Removes the element from in front of queue and returns that element
// ()  =>  number
// TIME COMPLEXITY: O(N), N = stack length
MyQueueV1.prototype.pop = function () {

  // pop last num off in stack (i.e. front of queue)
  let popped = this.stack.pop();

  let stackCopy = this.stack.slice();

  // rebuild queue, by continously popping stackCopy and pushing into queue
  this.queue = [];
  for (let i = stackCopy.length - 1; i >= 0; i--) {
    this.queue.push(stackCopy.pop());
  }

  return popped;
};


// Get the front element
// ()  =>  number
// TIME COMPELXITY: O(1)
MyQueueV1.prototype.peek = function () {
  // get front element by peeking last num in stack
  return this.stack[this.stack.length - 1];
};


// returns whether queue is empty
// ()  => boolean
// TIME COMPELXITY: O(1)
MyQueueV1.prototype.empty = function () {
  return this.queue.length === 0;
};


// EXAMPLES
// let niceQueue = new MyQueueV1();
// console.log('empty: ', niceQueue.empty());   //=> true
// console.log(' ');
// niceQueue.push(1);
// console.log('queue: ', niceQueue.queue);     //=> [ 1 ]
// console.log('stack: ', niceQueue.stack);     //=> [ 1 ]
// console.log('peek: ', niceQueue.peek());     //=> 1 
// console.log('empty: ', niceQueue.empty());   //=> false

// console.log(' ');
// niceQueue.push(2);
// console.log('queue: ', niceQueue.queue);     //=> [ 1, 2 ]
// console.log('stack: ', niceQueue.stack);     //=> [ 2, 1 ]
// console.log('peek: ', niceQueue.peek());     //=> 1 
// console.log('empty: ', niceQueue.empty());   //=> false

// console.log(' ');
// niceQueue.push(3);
// console.log('queue: ', niceQueue.queue);     //=> [ 1, 2, 3 ]
// console.log('stack: ', niceQueue.stack);     //=> [ 3, 2, 1 ]
// console.log('peek: ', niceQueue.peek());     //=> 1 
// console.log('empty: ', niceQueue.empty());   //=> false

// console.log(' ');
// console.log('pop: ', niceQueue.pop());       //=> 1
// console.log('queue: ', niceQueue.queue);     //=> [ 2, 3 ]
// console.log('stack: ', niceQueue.stack);     //=> [ 3, 2 ]
// console.log('peek: ', niceQueue.peek());     //=> 2 
// console.log('empty: ', niceQueue.empty());   //=> false






// *****************************************************************************
// SOLUTION V2- BETTER TIME, also uses two stacks, has additional front property
//    - ONLY #pop is       O(N) TIME
//    - #push/#peek/#empty O(1) TIME
// TIME COMPLEXITY:  O(N),      N = length of stack
// SPACE COMPLEXITY: O(N)    

// () => undefined
var MyQueue = function () {                                                     // no params          
  this.queue = [];                                                              // stack1 can only use push, pop, peek last ele (top), size
  this.stack = [];                                                              // stack2 another array stack just the reverse of queue
  this.front = null;                                                            // stores front of queue for fast peek retrieval
};


// Push element x to the back of queue
// (number) => undefined
// TIME COMPLEXITY: O(1) 
MyQueue.prototype.push = function (x) {
  if (this.queue.length === 0) {                                                // pushing num to stack no matter what, but capturing front only if queue is empty
    this.front = x;
  }

  this.queue.push(x);
};


// Removes the element from in front of queue and returns that element
// ()  =>  number
// TIME COMPLEXITY: O(N) TIME, N = stack length
MyQueue.prototype.pop = function () {
  if (this.stack.length === 0) {                                                // only popping queue if stack is empty
    while (this.queue.length > 0) {                                             // build a reversed queue (stack) by continuously popping queue and pushing into another stack
      this.stack.push(this.queue.pop());
    }
  }

  return this.stack.pop();
};


// Get the front element
// ()  =>  number
// TIME COMPELXITY: O(1)
MyQueue.prototype.peek = function () {
  if (this.stack.length !== 0) {                                                // if stack is not empty, return last num in stack
    return this.stack[this.stack.length - 1];
  }
  return this.front;                                                            // first num property pushed to queue
};


// returns whether queue is empty
// ()  => boolean
// TIME COMPELXITY: O(1)
MyQueue.prototype.empty = function () {
  return this.queue.length === 0 && this.stack.length === 0;                    // empty if both stacks are empty
};


// EXAMPLES
let niceQueue = new MyQueue();
console.log('empty: ', niceQueue.empty());   //=> true
console.log(' ');
niceQueue.push(1);
console.log('queue: ', niceQueue.queue);     //=> [ 1 ]
console.log('stack: ', niceQueue.stack);     //=> [ ]
console.log('peek: ', niceQueue.peek());     //=> 1 
console.log('empty: ', niceQueue.empty());   //=> false

console.log(' ');
niceQueue.push(2);
console.log('queue: ', niceQueue.queue);     //=> [ 1, 2 ]
console.log('stack: ', niceQueue.stack);     //=> [ ]
console.log('peek: ', niceQueue.peek());     //=> 1 
console.log('empty: ', niceQueue.empty());   //=> false

console.log(' ');
niceQueue.push(3);
console.log('queue: ', niceQueue.queue);     //=> [ 1, 2, 3 ]
console.log('stack: ', niceQueue.stack);     //=> [ ]             
console.log('peek: ', niceQueue.peek());     //=> 1 
console.log('empty: ', niceQueue.empty());   //=> false

console.log(' ');
console.log('pop: ', niceQueue.pop());       //=> 1
console.log('queue: ', niceQueue.queue);     //=> [ ]
console.log('stack: ', niceQueue.stack);     //=> [ 3, 2 ]    
console.log('peek: ', niceQueue.peek());     //=> 2 
console.log('empty: ', niceQueue.empty());   //=> false

console.log(' ');
niceQueue.push(4);
console.log('queue: ', niceQueue.queue);     //=> [ 4 ]
console.log('stack: ', niceQueue.stack);     //=> [ 3, 2 ]
console.log('peek: ', niceQueue.peek());     //=> 2
console.log('empty: ', niceQueue.empty());   //=> false

console.log(' ');
console.log('pop: ', niceQueue.pop());       //=> 2
console.log('queue: ', niceQueue.queue);     //=> [ 4 ]
console.log('stack: ', niceQueue.stack);     //=> [ 3 ]
console.log('peek: ', niceQueue.peek());     //=> 3 
console.log('empty: ', niceQueue.empty());   //=> false