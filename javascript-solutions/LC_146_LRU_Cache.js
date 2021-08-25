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



/// TIME: 8/25/21		62min
// *****************************************************************************
// SOLUTION 2- MY SOLUTION (Faster than 44% of submissions, memory usage less than 80% of submissions)
// Time Complexity get() and put() methods:    O(1)
// Space Complexity get():                     O(1)   
// Space Complexity put():                     O(C)   C = max Capacity of LRUCache
// Hint: DoubleLinked List + hashTable property but creates new methods to 
//       separate/abstract linked list node manipulations

// General Strategy:
// Hash Table =
// {
// 		0: Doubly Linked List Node { key:int, value:int, prev:Node, next:Node },
//		1: {},
// }
//
// Doubly Linked List = 
// {} <-> {} <-> {}
// 
// - main DS will have underlying DOUBLY LINKED LIST to track order
// - main DS will have 5 properties (head, tail, capacity, count, cache/hash table):
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
	this.capacity = capacity;							// max num of nodes in doubly linked list/table
	this.count = 0;												// current num of nodes in doubly linked list/table
	this.head = null;											// node
	this.tail = null;											// node
	this.cache = {};											// table where keys=node keys, values=nodes
};
  
  
// HELPER 1
// (node) => undefined		(assumes list never at capacity, modifys count)
LRUCache.prototype._addToHead = function (node) {
	let oldHead = this.head;							// grab old head node
	if (oldHead === null) {								// if list EMPTY
		this.tail = node;										//  make tail the new node
		
	} else {															// if list NOT EMPTY
		oldHead.prev = node;								//  make old head.prev point to new node
		node.next = oldHead;								//  make new node/head.next point to old head
	}

	node.prev = null;											// reset prev of new node to null
	this.head = node;											// make head the new node
	this.count++;													// increment count by 1
};


// HELPER 2
// () => node (old tail node deleted)
// returns undefined if no tail exists (modifys count)
LRUCache.prototype._removeTail = function() {
	let oldTail = this.tail;							// grab old tail
	if (oldTail === null) return;					// if list EMPTY, exit
	if (this.count === 1) {								// if list only has 1 node
		this.tail = null;										//  reset head, reset tail
		this.head = null;		

	} else {															// if list has > 1 node
		let prev = oldTail.prev;						//  grab prev node
		prev.next = null;										//  make prev node.next point to null
		this.tail = prev;										//  make tail equal to prev
	}
	
	this.count--;													// decrement count by 1
	return oldTail;												// return oldTail
};


// HELPER 3
// (node) => undefined
// removes NON HEAD or NON TAIL node (modifys count)
LRUCache.prototype._removeNode = function (node) {
	let prev = node.prev;									// grab prev, and next nodes
	let next = node.next;	
	prev.next = next;											// connect prev node to next node
	next.prev = prev;											// connect next.prev to prev ndoe
	this.count--;													// decrement count by 1
};


// HELPER 4
// (node) => undefined
LRUCache.prototype._promoteToHead = function (node) {  
	if (this.count <= 1 || this.head === node) return;	// if list EMPTY, or node is head, do nothing!
	
	if (this.tail === node) {														// if node is tail (& count > 1)
		let removedTail = this._removeTail();							//  remove tail
		this._addToHead(removedTail);											//  add removed tail to head 
		
	} else {																						// if node in middle (& count > 1)
		this._removeNode(node);														//  remove node
		this._addToHead(node);														//  add node to head
	}
};


// (number) => number
// gets value at key, and moves node to head
// returns -1 if not found
LRUCache.prototype.get = function (key) {
	let node = this.cache[key];													// grab node in cache at key
	if (node === undefined) {														// if node does NOT exist, return -1
		return -1;
	} else {																						// else node DOES exists, so promote node to head, return node value
		this._promoteToHead(node);
		return node.value;
	}
};


// (number, number) => undefined
// if key not in list, creates node and adds node to head
// if key in list, reassigns value in node, and moves node to head
LRUCache.prototype.put = function (key, value) {
	let node = this.cache[key];											// grab node in table using key
	if (node === undefined) {												// if node does NOT exist
		node = { key, value, prev:null, next:null } 	//  create a new node
		
		if (this.count === this.capacity) {						//  if list is at capacity, delete end tail node, delete key/value in cache
			let removedTail = this._removeTail();
			delete this.cache[removedTail.key];
		}

		this.cache[key] = node;												//  populate cache/table with key/value
		this._addToHead(node);												//  add new node to head of list

	} else {																				// if node DOES exist
		node.value = value;														//  update value in node
		this._promoteToHead(node);										//  promote node to head
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

var fancyLRUCache = new LRUCache(2);
// 1)
console.log('PUT: 1');
fancyLRUCache.put(1, 1); // stringifyListOrder prints node VALUES
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 1  Tail: 1   Length: 1
console.log(stringifyListOrder(fancyLRUCache.head) === '1' && fancyLRUCache.head.value === 1 && fancyLRUCache.tail.value === 1 && fancyLRUCache.count === 1 ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');

// 2) 					
console.log('PUT: 2');		// node doesnt exist- not at capacity
fancyLRUCache.put(2, 2);
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '2 -> 1'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
console.log(stringifyListOrder(fancyLRUCache.head) === '2 -> 1' && fancyLRUCache.head.value === 2 && fancyLRUCache.tail.value === 1 && fancyLRUCache.count === 2 ? 'PASS' : 'FAIL');
//=>                                                                                              Head: 2  Tail: 1   Length: 2
console.log('--------------');
console.log(' ');

// 3)
console.log('PUT: 3');		// node doesnt exist- reached capacity, need to remove tail
fancyLRUCache.put(3, 3);                                                                    //   evicts key 1
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '3 -> 2'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 3  Tail: 1   Length: 2
console.log(stringifyListOrder(fancyLRUCache.head) === '3 -> 2' && fancyLRUCache.head.value === 3 && fancyLRUCache.tail.value === 2 && fancyLRUCache.count === 2 ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');

// 4)
console.log('PUT: 4');		// node exists- UPDATING value 
fancyLRUCache.put(2, 4);                                                                    
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '4 -> 3'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 4  Tail: 3   Length: 2
console.log(stringifyListOrder(fancyLRUCache.head) === '4 -> 3' && fancyLRUCache.head.value === 4 && fancyLRUCache.tail.value === 3 && fancyLRUCache.count === 2 ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');

// 5)
console.log('GET: 1');		// GET nonexistant key
console.log(fancyLRUCache.get(1));                                                          //=> -1
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '4 -> 3'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 4  Tail: 3   Length: 2
console.log(stringifyListOrder(fancyLRUCache.head) === '4 -> 3' && fancyLRUCache.head.value === 4 && fancyLRUCache.tail.value === 3 && fancyLRUCache.count === 2 && fancyLRUCache.get(1) === -1 ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');

// 6)
console.log('GET: 3');		// GET tail node
console.log(fancyLRUCache.get(3));                                                          //=> 3
console.log(stringifyListOrder(fancyLRUCache.head));                                        //=> '3 -> 4'
console.log('Head: ', fancyLRUCache.head.value, '   ', 'Tail: ', fancyLRUCache.tail.value, '   ', 'Length: ', fancyLRUCache.count); 
//=>                                                                                              Head: 3  Tail: 4   Length: 2
console.log(stringifyListOrder(fancyLRUCache.head) === '3 -> 4' && fancyLRUCache.head.value === 3 && fancyLRUCache.tail.value === 4 && fancyLRUCache.count === 2 && fancyLRUCache.get(3) === 3 ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');




// *****************************************************************************
// HELPER TEST function- returns nice fancy string of node VALUES ex. => '3 -> 2 -> 1'
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