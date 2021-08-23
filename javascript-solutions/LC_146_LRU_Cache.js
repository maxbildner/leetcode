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



// *****************************************************************************
// SOLUTION 1- LC User gztcahn SOLUTION (Faster than 20% of submissions)
// https://leetcode.com/problems/lru-cache/discuss/178988/HashMap%2BDoubleLinkedList-in-JavaScript
// Time Complexity get() and put() methods:    O(1)
// Space Complexity get() and put() methods:   O(1)
// Hint: HashMap + DoubleLinked List (but without creating a new linked list class)
// - Create function expression that will be called constructor style (new __ )
//   analagous to creating class definition in AA DSA problem
//
// var LRUCache = function (capacity) {
//   this.capacity = capacity;                                                     // set properties of LRUCache to track capacity, length, head, tail, hashTable
//   this.count = 0;
//   this.head = null;                                                             // will point to value (object) in hashTable at key. object analagous to LRUCacheItem in AA DSA problem
//   this.tail = null;
//   this.hashTable = {};
// };


// // returns value (LRUCacheItem in hashTable) at key, returns -1 if not found
// LRUCache.prototype.get = function (key) {
//   if (this.hashTable[key] !== undefined) {                                      // if key/val DOES exist in LRUCache hashTable
//     // const { value } = this.hashTable[key];                                   // grab value (LRUCacheItem object) at key in hashTable
//     // const { prev, next } = this.hashTable[key];                              // grab prev and next nodes of lruCacheItem
//     const { value, prev, next } = this.hashTable[key];                          // same as above 2 lines- destructure value, prev, next

//     // update pointers of nodes to left and right of current node/lruCacheItem
//     if (prev) { prev.next = next; }                                             // if prev DOES exist, update [prev's next] to point to current node's (lruCacheItem) next
//     if (next) { next.prev = prev || next.prev; }                                // if next DOES exist, update [next's prev] to point to prev or next's prev

//     if (this.tail === this.hashTable[key]) {
//       this.tail = prev || this.hashTable[key];
//     }
    
//     this.hashTable[key].prev = null;
//     if (this.head !== this.hashTable[key]) {
//       this.hashTable[key].next = this.head;
//       this.head.prev = this.hashTable[key];
//     }

//     this.head = this.hashTable[key];

//     return value;
//   }

//   return -1;                                                                    // return -1 if key/val does NOT exisit in LRUCache HashTable
// };


// // returns undefined ?
// // sets key/value
// LRUCache.prototype.put = function (key, value) {
//   if (this.hashTable[key] !== undefined) {                                      // if key/val DOES exist in LRUCache hashTable
//     this.hashTable[key].value = value;                                          // update object's value at key 
//     this.get(key);                                                              // update ordering by calling .get()

//   } else {                                                                      // key/val does NOT exist in LRUCache
//     this.hashTable[key] = { key, value, prev: null, next: null };               // create new "node". I.E. set val at key in Hashtable to be an object with 4 keys (k,v,prev,next). This object is analagous to LRUCacheItem in AA DSA

//     if (this.head) {                                                            // if head node DOES exist (i.e. num nodes not 0)
//       this.head.prev = this.hashTable[key];                                     // update head node's (LRUCacheItem) prev property to point to new LRUCacheItem/object we just made above 
//       this.hashTable[key].next = this.head;                                     // update newly made (LRUCacheItem) next property to point to old head
//     }

//     this.head = this.hashTable[key];                                            // update the head property of LRUCache to point to new object we just made above

//     // if (!this.tail) {
//     if (this.tail === null) {                                                   // if tail node does NOT exist (i.e. num LRUCachItems 0)
//       this.tail = this.hashTable[key];                                          // set the tail property of the LRUCache to new LRUCacheItem just made above
//     }

//     this.count++;                                                               // update count/length property
//   }

//   if (this.count > this.capacity) {                                             // if LRUCache exceeds capacity
//     let removedKey = this.tail.key;

//     if (this.tail.prev) {
//       this.tail.prev.next = null;
//       this.tail = this.tail.prev;
//       this.hashTable[removedKey].prev = null;
//     }

//     delete this.hashTable[removedKey];

//     this.count -= 1;
//   }
// };






// *****************************************************************************
// SOLUTION 2- MY SOLUTION (Faster than 44% of submissions, memory usage less than 80% of submissions)
// Time Complexity get() and put() methods:    O(1)
// Space Complexity get():                     O(1)   
// Space Complexity put():                     O(C)   C = max Capacity of LRUCache
// Hint: DoubleLinked List + hashTable property but creates new methods to 
//       separate/abstract linked list node manipulations

// var LRUCache = function (capacity) {                                            // analagous to doubly linked list, but with hashTable property for fast lookup
//   this.capacity = capacity;                                                     // set properties of LRUCache to track capacity, length, head, tail, hashTable
//   this.count = 0;
//   this.head = null;                                                             // will point to value (object) in hashTable at key. object analagous to LRUCacheItem in AA DSA problem
//   this.tail = null;
//   this.hashTable = {};
// };


// // HELPER Method- insert a new node at the head of the list
// LRUCache.prototype._insertHead = function(node) {
//   let oldHead = this.head;                                                      // capture old head node in temp var
//   this.head = node;                                                             // update LRUCache (doubly linked list) head property to new node
  
//   if (this.tail === null) {                                                     // if list is EMPTY
//     this.tail = node;                                                           // set tail property to new node

//   } else {                                                                      // list NOT empty
//     node.next = oldHead;                                                        // update new head node's next to old head
//     oldHead.prev = node;                                                        // update old head node's prev to new node
//   }

//   this.count++;                                                                 // update count
// }


// // HELPER Method- removes a NON-TAIL, or NON-HEAD node from a list
// // Returns node removed
// LRUCache.prototype._removeNode = function(node) {
//   let prev = node.prev;                                                         // grab previous node
//   let next = node.next;                                                         // grab next node
//   prev.next = next;                                                             // update previous node's next to point to next node
//   next.prev = prev;                                                             // update next node's prev to point to previous node

//   // node.prev.next = node.next;                                                // below 2 also work instead of above
//   // node.next = node.prev;

//   this.count--;                                                                 // update lists count property
//   return node;
// }


// // HELPER Method- remove node from tail of the list
// // Returns tail node removed
// LRUCache.prototype._removeTail = function() {
//   let oldTail = this.tail;
//   let newTail = this.tail.prev;                                                 // grab previous node (will become newTail)
  
//   if (newTail !== null) {                                                       // if previous node is null (node is head)  
//     newTail.next = null;                                                        // update previous node's (newTail's) next to point to null
//     this.tail = newTail;                                                        // update LRUCache's (List's) tail to newTail
//   } 

//   this.count--;                                                                 // update lists count
//   return oldTail;
// }


// // HELPER Method- Move Node to head of list
// LRUCache.prototype._moveToHead = function(node){  
//   if (node === this.head) {                                                     // exit if node is head (no need to do anyting, list already ordered)
//     return;   
//   } else if (node === this.tail) {                                              // if node is tail, removeTail
//     this._removeTail();
//   } else {                                                                      // if node is NOT head and NOT tail, removeNode 
//     this._removeNode(node);                                                     
//   }
//   this._insertHead(node);                                                       // insert removed node to head of list
// }


// // returns value (LRUCacheItem in hashTable) at key, returns -1 if not found
// LRUCache.prototype.get = function (key) {                                       // this.hashTable[key] == "node" {key, value, prev, next}
//   if (this.hashTable[key] === undefined) return -1;                             // return -1 if key/val does NOT exisit in LRUCache HashTable

//   // if key/val DOES exist in LRUCache hashTable
//   const { value, prev, next } = this.hashTable[key];                            // destructure value, prev, next from value at key in hashTable
//   this._moveToHead(this.hashTable[key]);                                        // move node retrieved to front of list
//   return value;                                                                 // return value from node
// };


// // returns undefined ?
// // sets key/value
// LRUCache.prototype.put = function (key, value) {
//   if (this.hashTable[key] !== undefined) {                                      // if key/val DOES exist in LRUCache hashTable
//     this.hashTable[key].value = value;                                          // update the value at that node
//     this._moveToHead(this.hashTable[key]);                                      // move node to head
//   } else {                                                                      // key/val does NOT exist in LRUCache
//     if (this.count >= this.capacity) {                                          // if LRUCache is full
//       let oldTail = this._removeTail();                                         // removeTail, store in temp var
//       delete this.hashTable[oldTail.key];                                       // delete key/value from hashTable
//     } 
//     this.hashTable[key] = { key, value, prev: null, next: null };               // create new "node". I.E. set val at key in Hashtable to be an object with 4 keys (k,v,prev,next). This object is analagous to LRUCacheItem in AA DSA
//     this._insertHead(this.hashTable[key]);                                      // insert new node at head of list
//   }
// };


// *****************************************************************************
// ATTEMPT 2 (Same Logic as Above)
// TIME: 2.5HRS
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
  this.capacity = capacity;                                                     // max capacity of LRUCache
  this.count = 0;                                                               // current capacity of LRUCache
  this.head = null;                                                             // node
  this.tail = null;                                                             // node
  this.cache = {};                                                              // values = nodes
};


// HELPER 1
// (node) => undefined
LRUCache.prototype._addToHead = function (node) {
  let currentHead = this.head;

  if (currentHead) {                                                            // if currentHead exists (i.e. not null). list not empty
    currentHead.prev = node;                                                    // update old head's previous to point to new node
    node.next = currentHead;                                                    // update node's next pointer to old head

  } else {                                                                      // if currentHead doesn't exist (i.e. null). list empty
    this.tail = node;
  }

  node.prev = null;                                                             // update node (new head) prev to point to null
  this.head = node;                                                             // update LRUCache head property
  this.count++;                                                                 // update LRUCache size property
};


// HELPER 2
// () => node (old tail node deleted)
// returns undefined if no tail exists
LRUCache.prototype._removeTail = function() {
  let oldTail = this.tail;      
  let newTail = oldTail.prev;   

  if (!oldTail) return;                                                         // edge case if oldTail does NOT exist (so we don't error out calling this on empty list)
  
  if (this.count === 1) {                                                       // edge case if list has 1 node
    this.head = null;
  } else {                                                                      // if list length > 1
    newTail.next = null;
  }

  this.tail = newTail;                                                    
  this.count--;
  return oldTail;
};


// HELPER 3
// (node) => undefined
// removes NON HEAD or NON TAIL node
LRUCache.prototype._removeNode = function (node) {
  let prevNode = node.prev;                                                     // get prevNode
  let nextNode = node.next;                                                     // get nextNode
  prevNode.next = nextNode;                                                     // connect prevNode to nextNode
  nextNode.prev = prevNode;
  this.count--;
};


// HELPER 4
// (node) => undefined
LRUCache.prototype._promoteToHead = function (node) {  
  if (node === this.head) {                                                     // if node is head, no need to promote    
    return;
    
  } else if (node === this.tail) {                                              // if node is tail, delete tail node, add deleted node to head
    let removedNode = this._removeTail();
    this._addToHead(removedNode);

  } else {                                                                      // if node is in middle, delete node, add to head
    this._removeNode(node);
    this._addToHead(node);
  }
};


// (number) => number
// gets value at key, and moves node to head
// returns -1 if not found
LRUCache.prototype.get = function (key) {
  if (this.cache[key] === undefined) {                                          // return -1 if node does NOT exist in cache
    return -1;
  } else {                                                                      // key DOES exist in cache, 
    let node = this.cache[key];                                                 // grab node (value at key in cache)
    this._promoteToHead(node);                                                  // promote node to head
    return node.value;                                                          // return node value
  }
};


// (number, number) => undefined
// if key not in list, creates node and adds node to head
// if key in list, reassigns value at key, and moves node to head
LRUCache.prototype.put = function (key, value) {
  if (this.cache[key] === undefined) {                                          // if key NOT in cache (hash table)
    let newNode = { key, value, prev: null, next: null };                       // create new node

    if (this.count === this.capacity) {                                         // check if we've reached capacity, make room for newNode 
      let removedNode = this._removeTail();                                     // delete tail node, delete tail node k / v in cache
      delete this.cache[removedNode.key];
    }

    this._addToHead(newNode);                                                   // add new node to head, add newNode to cache (hash table)
    this.cache[key] = newNode;

  } else {                                                                      // key IS in cache, grab node from cache, update node's value, promote to head
    let node = this.cache[key];
    node.value = value;
    this._promoteToHead(node);
  }
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

// 2) 
console.log('GET: 2');
console.log(fancyLRUCache.get(3));                                                          //=> -1
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'k:2, v:1'     '1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
//=>                                                                                              Head: 1   Tail: 1   Length: 1
console.log(' ');

// 3)
console.log('PUT: 3, 2');
fancyLRUCache.put(3, 2);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> 'k:3, v:2' -> 'k:2, v:1'     '2 -> 1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
console.log(' ');
//=>                                                                                              Head: 2   Tail: 1   Length: 2

// 4)
console.log('PUT: 2, 9');
fancyLRUCache.put(2, 9);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:2, v:9' -> 'k:3, v:2'     '9 -> 2'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
console.log(' ');
//=>                                                                                              Head: 9   Tail: 2   Length: 2

// 5)
console.log('PUT: 1, 1');
fancyLRUCache.put(1, 1);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:1, v:1' ->  'k:2, v:9' ->  'k:3, v:2'     '1 -> 9 -> 2'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
console.log(' ');
//=>                                                                                              Head: 1   Tail: 2   Length: 3

// 6)
console.log('PUT: 2, 3');
fancyLRUCache.put(2, 3);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:2, v:3'  ->  'k:1, v:1'  ->   'k:3, v:2'     '3 -> 1 -> 2'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
console.log(' ');
//=>                                                                                              Head: 3   Tail: 2   Length: 3

// 7)
console.log('PUT: 4, 4');
fancyLRUCache.put(4, 4);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:4, v:4'  ->  'k:2, v:3'  ->  'k:1, v:1'      '4 -> 3 -> 1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
console.log(' ');
//=>                                                                                              Head: 4   Tail: 1   Length: 3

// 9)
console.log('GET: 1');
console.log(fancyLRUCache.get(1));                                                          //=> '1'
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=>  'k:1, v:1'  ->  'k:4, v:4'  ->  'k:2, v:3'      '1 -> 4 -> 3'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count);
console.log(' ');
//=>                                                                                              Head: 1   Tail: 3   Length: 3




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