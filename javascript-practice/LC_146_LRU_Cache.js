// LC 146 LRU CACHE
// MEDIUM
// Design and implement a data structure for Least Recently Used (LRU) cache. 
// It should support the following operations: get and put.
// 
// get(key) - Get the value(will always be positive) of the key if the key 
// exists in the cache, otherwise return -1.
// 
// put(key, value) - Set or insert the value if the key is not already present.
// When the cache reached its capacity, it should invalidate the least recently 
// used item before inserting a new item. The cache is initialized with a 
// positive capacity.
// 
// Follow up:
// Could you do both operations in O(1) time complexity ?
// https://leetcode.com/problems/lru-cache/
// 
// Ex1.
// LRUCache cache = new LRUCache( 2 );                  // 2 == capacity/limit
// 1) 
// cache.put(1, 1);
//    Order = 1             Head = 1,  Tail = 1
//
// 2) 
// cache.put(2, 2);
//    Order = 2 -> 1        Head = 2,  Tail = 1
//
// 3)
// cache.get(1);                                        //=> 1
//    Order = 1 -> 2        Head = 1,  Tail = 2
//
// 4)
// cache.put(3, 3);                                     //   evicts key 2
//    Order = 3 -> 1        Head = 3,  Tail = 1
//
// 5)
// cache.get(2);                                        //=> -1 (not found)
//    Order = 3 -> 1        Head = 3,  Tail = 1
//
// 6)
// cache.put(4, 4);                                     //   evicts key 1
//    Order = 4 -> 3        Head = 4,  Tail = 3
//
// 7)
// cache.get(1);                                        //=> -1 (not found)
//    Order = 4 -> 3        Head = 4,  Tail = 3
//
// 8)
// cache.get(3);                                        //=> 3
//    Order = 3 -> 4        Head = 3,  Tail = 4
//   
// 9)
// cache.get(4);                                        //=> 4
//    Order = 4 -> 3        Head = 4,  Tail = 3





// TIME: 
// *****************************************************************************
// SOLUTION 2- MY SOLUTION (Faster than 44% of submissions, memory usage less than 80% of submissions)
// Time Complexity get() and put() methods:    O(1)
// Space Complexity get():                     O(1)   
// Space Complexity put():                     O(C)   C = max Capacity of LRUCache
// Hint: DoubleLinked List + hashTable property but creates new methods to 
//       separate/abstract linked list node manipulations

// General Strategy:
// - main DS will have underlying DOUBLY LINKED LIST to track order
// - main DS will have 4 properties (head, tail, capacity, size, hash table):
//    - head and tail = (node objects)
//    - capacity = (number) max capacity of LRUCache
//    - count = (number) current size of LRUCache (num nodes)
//    - cache = (hash table). use table for fast lookup. values = nodes
// - 4 private helper methods:
//    - add node to head                 ()     => undefined
//    - remove tail node                 ()     => node (removed)
//    - remove non head or non tail node (node) => undefined
//    - promote node to head             (node) => undefined
// - main methods:
//    - get(key)        => value      O(1)  TIME
//    - put(key, value) => undefined  O(1)  TIME


// (number) => undefined
var LRUCache = function (capacity) {

};
  
  
// HELPER 1
// (node) => undefined
LRUCache.prototype._addToHead = function (node) {
												
};


// HELPER 2
// () => node (old tail node deleted)
// returns undefined if no tail exists
LRUCache.prototype._removeTail = function() {

};


// HELPER 3
// (node) => undefined
// removes NON HEAD or NON TAIL node
LRUCache.prototype._removeNode = function (node) {

};


// HELPER 4
// (node) => undefined
LRUCache.prototype._promoteToHead = function (node) {  
	
};


// (number) => number
// gets value at key, and moves node to head
// returns -1 if not found
LRUCache.prototype.get = function (key) {

};


// (number, number) => undefined
// if key not in list, creates node and adds node to head
// if key in list, reassigns value at key, and moves node to head
LRUCache.prototype.put = function (key, value) {

};
  
  
  
  
  
  
// *****************************************************************************
// EXAMPLE SEQUENCE 1
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// var fancyLRUCache = new LRUCache(2);
// // 1)
// console.log('PUT: 1');
// fancyLRUCache.put(1, 1);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 1  Tail: 1   Length: 1
// console.log(' ');

// // 2) 
// console.log('PUT: 2');
// fancyLRUCache.put(2, 2);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '2 -> 1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 2  Tail: 1   Length: 2
// console.log(' ');

// // 3)
// console.log('GET: 1');
// console.log(fancyLRUCache.get(1));                                                          //=> 1
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '1 -> 2'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// console.log(' ');
// //=>                                                                                              Head: 1  Tail: 2   Length: 2

// // 4)
// console.log('PUT: 3');
// fancyLRUCache.put(3, 3);                                                                    //   evicts key 2
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '3 -> 1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 3  Tail: 1   Length: 2
// console.log(' ');

// // 5)
// console.log('GET: 2');
// console.log(fancyLRUCache.get(2));                                                          //=>  -1
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '3 -> 1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 3  Tail: 1   Length: 2
// console.log(' ');

// // 6)
// console.log('PUT: 4');
// fancyLRUCache.put(4, 4);                                                                    //    evicts key 1
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '4 -> 3'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 4  Tail: 3   Length: 2
// console.log(' ');

// // 7)
// console.log('GET: 1');
// console.log(fancyLRUCache.get(1));                                                          //=> -1
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '4 -> 3'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 4  Tail: 3   Length: 2
// console.log(' ');

// // 8)
// console.log('GET: 3');
// console.log(fancyLRUCache.get(3));                                                          //=> 3
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '3 -> 4'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 3  Tail: 4   Length: 2
// console.log(' ');

// // 9)
// console.log('GET: 4');
// console.log(fancyLRUCache.get(4));                                                          //=> 4
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '4 -> 3'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 4  Tail: 3   Length: 2
// console.log(' ');




// *****************************************************************************
// EXAMPLE SEQUENCE 2

// var fancyLRUCache = new LRUCache(1);
// // 1)
// console.log('PUT: 1');
// fancyLRUCache.put(2, 1);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'k:2, v:1'   '1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// //=>                                                                                              Head: 1  Tail: 1   Length: 1
// // console.log(fancyLRUCache.cache);   //=> { '2': { key: 2, value: 1, prev: null, next: null } }
// console.log(' ');

// // 2) 
// console.log('GET: 2');
// console.log(fancyLRUCache.get(2));
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'k:2, v:1'    '1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// //=>                                                                                              Head: 1  Tail: 1   Length: 1
// // console.log(fancyLRUCache.cache);   //=> { '2': { key: 2, value: 1, prev: null, next: null } }
// console.log(' ');

// // 3)
// console.log('PUT: 2');
// fancyLRUCache.put(3, 2);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'k:3, v:2'     '2'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// console.log(' ');                                                                           
// //=>                                                                                              Head: 2  Tail: 2   Length: 1

// // 4)
// console.log('GET: 2');
// console.log(fancyLRUCache.get(2));
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> -1
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// //=>                                                                                              Head: 1  Tail: 1   Length: 1
// console.log(' ');                                                                                 

// // 5)
// console.log('GET: 3');
// console.log(fancyLRUCache.get(3));
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '2'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// //=>                                                                                              Head: 1  Tail: 1   Length: 1
// console.log(' ');                                                                                       





// *****************************************************************************
// EXAMPLE SEQUENCE 3

// var fancyLRUCache = new LRUCache(2);
// // 1)
// console.log('PUT: 1, 1');
// fancyLRUCache.put(1, 1);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// //=>                                                                                              Head: 1  Tail: 1   Length: 1
// console.log(' ');

// // 2) 
// console.log('PUT: 2, 2');
// fancyLRUCache.put(2, 2);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '2 -> 1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// //=>                                                                                              Head: 2  Tail: 1   Length: 2
// console.log(' ');

// // 3)
// console.log('PUT: 3, 3');
// fancyLRUCache.put(3, 3);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '3 -> 2'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// console.log(' ');
// //=>                                                                                              Head: 3  Tail: 2   Length: 2

// // 4)
// console.log('GET: 2');
// console.log(fancyLRUCache.get(2));                                                          //=>  2
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '2 -> 3'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 2  Tail: 3   Length: 2
// console.log(' ');

// // 5)
// console.log('GET: 2');
// console.log(fancyLRUCache.get(2));                                                          //=>  2
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '2 -> 3'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
// //=>                                                                                              Head: 2  Tail: 3   Length: 2
// console.log(' ');

// // 6)
// console.log('PUT: 3, POTATO');
// fancyLRUCache.put(3, 'POTATO');
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'POTATO -> 2'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// console.log(' ');
// //=>                                                                                              Head: POTATO  Tail: 2    Length: 2




// *****************************************************************************
// EXAMPLE SEQUENCE 4

var fancyLRUCache = new LRUCache(3);  
// 1)
console.log('PUT: 2, 1');
fancyLRUCache.put(2, 1);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'k:2, v:1'     '1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
//=>                                                                                              Head: 1   Tail: 1   Length: 1
console.log(' ');

// // 2) 
// console.log('GET: 2');
// console.log(fancyLRUCache.get(3));                                                          //=> -1
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'k:2, v:1'     '1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// //=>                                                                                              Head: 1   Tail: 1   Length: 1
// console.log(' ');

// // 3)
// console.log('PUT: 3, 2');
// fancyLRUCache.put(3, 2);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'k:3, v:2' -> 'k:2, v:1'     '2 -> 1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// console.log(' ');
// //=>                                                                                              Head: 2   Tail: 1   Length: 2

// // 4)
// console.log('PUT: 2, 9');
// fancyLRUCache.put(2, 9);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:2, v:9' -> 'k:3, v:2'     '9 -> 2'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// console.log(' ');
// //=>                                                                                              Head: 9   Tail: 2   Length: 2

// // 5)
// console.log('PUT: 1, 1');
// fancyLRUCache.put(1, 1);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:1, v:1' ->  'k:2, v:9' ->  'k:3, v:2'     '1 -> 9 -> 2'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// console.log(' ');
// //=>                                                                                              Head: 1   Tail: 2   Length: 3

// // 6)
// console.log('PUT: 2, 3');
// fancyLRUCache.put(2, 3);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:2, v:3'  ->  'k:1, v:1'  ->   'k:3, v:2'     '3 -> 1 -> 2'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// console.log(' ');
// //=>                                                                                              Head: 3   Tail: 2   Length: 3

// // 7)
// console.log('PUT: 4, 4');
// fancyLRUCache.put(4, 4);
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:4, v:4'  ->  'k:2, v:3'  ->  'k:1, v:1'      '4 -> 3 -> 1'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// console.log(' ');
// //=>                                                                                              Head: 4   Tail: 1   Length: 3

// // 9)
// console.log('GET: 1');
// console.log(fancyLRUCache.get(1));                                                          //=> '1'
// console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:1, v:1'  ->  'k:4, v:4'  ->  'k:2, v:3'      '1 -> 4 -> 3'
// console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
// console.log(' ');
// //=>                                                                                              Head: 1   Tail: 3   Length: 3




// *****************************************************************************
// HELPER function- returns nice fancy string of node values ex. '3 -> 2 -> 1'
// headNode == { key, value, prev:[Node], next:[Node] };
function stringifyListOrder(headNode) {
let currentNode = headNode;
let string = '';

while (currentNode) {
	string += currentNode.value + ' -> ';
	currentNode = currentNode.next;
}

//           01234
// string = '1 -> '
let strLength = string.length;
// strLength = 5

//           0123456789
// string = '1 -> 2 -> '
// strLength = 10

string = string.slice(0, strLength - 4);
// string = '1'
// string = '1 -> 2'

return string;
}