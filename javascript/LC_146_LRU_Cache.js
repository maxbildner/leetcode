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
// SOLUTION 1- LC User gztcahn SOLUTION
// https://leetcode.com/problems/lru-cache/discuss/178988/HashMap%2BDoubleLinkedList-in-JavaScript
// Time Complexity get() and put() methods:    O(1)
// Space Complexity get() and put() methods:   O(1)
// Hint: HashMap + DoubleLinked List (but without creating a new linked list class)
// - Create function expression that will be called constructor style (new __ )
//   analagous to creating class definition in AA DSA problem
//
var LRUCache = function (capacity) {
  this.capacity = capacity;                                                     // set properties of LRUCache to track capacity, length, head, tail, hashTable
  this.count = 0;
  this.head = null;                                                             // will point to value (object) in hashTable at key. object analagous to LRUCacheItem in AA DSA problem
  this.tail = null;
  this.hashTable = {};
};


// returns value (LRUCacheItem in hashTable) at key, returns -1 if not found
LRUCache.prototype.get = function (key) {
  if (this.hashTable[key] !== undefined) {                                      // if key/val DOES exist in LRUCache hashTable
    // const { value } = this.hashTable[key];                                   // grab value (LRUCacheItem object) at key in hashTable
    // const { prev, next } = this.hashTable[key];                              // grab prev and next nodes of lruCacheItem
    const { value, prev, next } = this.hashTable[key];                          // same as above 2 lines- destructure value, prev, next

    // update pointers of nodes to left and right of current node/lruCacheItem
    if (prev) { prev.next = next; }                                             // if prev DOES exist, update [prev's next] to point to current node's (lruCacheItem) next
    if (next) { next.prev = prev || next.prev; }                                // if next DOES exist, update [next's prev] to point to prev or next's prev

    if (this.tail === this.hashTable[key]) {
      this.tail = prev || this.hashTable[key];
    }
    
    this.hashTable[key].prev = null;
    if (this.head !== this.hashTable[key]) {
      this.hashTable[key].next = this.head;
      this.head.prev = this.hashTable[key];
    }

    this.head = this.hashTable[key];

    return value;
  }

  return -1;                                                                    // return -1 if key/val does NOT exisit in LRUCache HashTable
};


// returns undefined ?
// sets key/value
LRUCache.prototype.put = function (key, value) {
  if (this.hashTable[key] !== undefined) {                                      // if key/val DOES exist in LRUCache hashTable
    this.hashTable[key].value = value;                                          // update object's value at key 
    this.get(key);                                                              // update ordering by calling .get()

  } else {                                                                      // key/val does NOT exist in LRUCache
    this.hashTable[key] = { key, value, prev: null, next: null };               // set val at key in Hashtable to be an object with 4 keys (k,v,prev,next). This object is analagous to LRUCacheItem in AA DSA

    if (this.head) {                                                            // if head node DOES exist (i.e. num nodes not 0)
      this.head.prev = this.hashTable[key];                                     // update head node's (LRUCacheItem) prev property to point to new LRUCacheItem/object we just made above 
      this.hashTable[key].next = this.head;                                     // update newly made (LRUCacheItem) next property to point to old head
    }

    this.head = this.hashTable[key];                                            // update the head property of LRUCache to point to new object we just made above

    // if (!this.tail) {
    if (this.tail === null) {                                                   // if tail node does NOT exist (i.e. num LRUCachItems 0)
      this.tail = this.hashTable[key];                                          // set the tail property of the LRUCache to new LRUCacheItem just made above
    }

    this.count++;                                                               // update count/length property
  }

  if (this.count > this.capacity) {                                             // if LRUCache exceeds capacity
    let removedKey = this.tail.key;

    if (this.tail.prev) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      this.hashTable[removedKey].prev = null;
    }

    delete this.hashTable[removedKey];

    this.count -= 1;
  }
};






// *****************************************************************************








// *****************************************************************************
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

var fancyLRUCache = new LRUCache(2);
// 1)
fancyLRUCache.put(1, 1);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 1  Tail: 1   Length: 1
console.log(' ');

// 2) 
fancyLRUCache.put(2, 2);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '2 -> 1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 2  Tail: 1   Length: 2
console.log(' ');

// 3)
console.log(fancyLRUCache.get(1));                                                          //=> 1
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '1 -> 2'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 1  Tail: 2   Length: 2
console.log(' ');

// 4)
fancyLRUCache.put(3, 3);                                                                    //   evicts key 2
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '3 -> 1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 3  Tail: 1   Length: 2
console.log(' ');

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