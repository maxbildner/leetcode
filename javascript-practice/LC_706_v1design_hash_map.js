// LC 706 Design HashMap
// EASY
// https://leetcode.com/problems/design-hashmap/
// 
// Design a HashMap without using any built-in hash table libraries.
// To be specific, your design should include these functions:
//   - put(key, value) : Insert a (key, value) pair into the HashMap. If the 
//     value already exists in the HashMap, update the value.
//   - get(key): Returns the value to which the specified key is mapped, or - 1 
//     if this map contains no mapping for the key.
//   - remove(key) : Remove the mapping for the value key if this map contains 
//     the mapping for the key.
//
// NOTE* PUT KEY WILL ALWAYS BE NUMBER!!!! 
// 
// Example:
// MyHashMap hashMap = new MyHashMap();
// hashMap.put(1, 1);
// hashMap.put(2, 2);
// hashMap.get(1);            // returns 1
// hashMap.get(3);            // returns -1 (not found)
// hashMap.put(2, 1);         // update the existing value
// hashMap.get(2);            // returns 1 
// hashMap.remove(2);         // remove the mapping for 2
// hashMap.get(2);            // returns -1 (not found) 


// TIME: 8/24/21		31min
// *****************************************************************************
// SOLUTION V1- Underlying array + 2D Array (for simplicity instead of Singly Linked List)
// TIME COMPLEXITY (all public methods):  O(N/K)
// 		N = number of items in hash table (due to hash collisions)
// 		K = number of predefined buckets (2069)
// SPACE COMPLEXITY: O(K + M)
//		M = number of unique keys that have been inserted into the hashmap

// [ 0: Bucket [ [key, value], ... ], 
// 	 1: Bucket [ [key, value], ... ],
// 	 2: Bucket [ [key, value], ... ],  
// 	 3: Bucket [ [key, value], ... ],
// 	 ...
// 	 2069: Bucket [ ] 
// ]
// HASH COLLISION = when 2 different keys (ex. 0, and 2069) are mapped to the same hash address

// HELPER CLASS
class Bucket {
	constructor() {

	}


	// returns undefined
	update(key, value) {

	}


	// returns -1 if not found
	get(key) {

	}


	// returns undefined (regardless of whether key is found or not)
	remove(key) {

	}
}


// MAIN CLASS
/**
 * Initialize your data structure here.
 */
var MyHashMap = function() {

};


// HELPER
// (int key) => hash address
// 0  => 0
// 1  => 1
// 2  => 2
// 2069  => 0		// hash collision!!
// 2070  => 1		// hash collision!!
MyHashMap.prototype._hashify = function(key) {		// HASHING NUMBERS ONLY

}
	

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {

};


/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {

};


/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {

};


/** 
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

let obj = new MyHashMap();
obj.put(0, 1);	
console.log(obj._hashTable.slice(0,3));
console.log(obj._hashTable[0]);							//=> Bucket { bucket: [ [ 0, 1 ] ] }
console.log(' ');
console.log(' ');
obj.put(1, 2);	
console.log(obj._hashTable.slice(0,3));
console.log(obj._hashTable[1]);							//=> Bucket { bucket: [ [ 1, 2 ] ] }
console.log(' ');
console.log(' ');
obj.put(2069, 7);														// should have hashing collision with key 0!
console.log(obj._hashTable.slice(0,3));
console.log(obj._hashTable[0]);							//=> Bucket { bucket: [ [ 0, 1 ], [ 2069, 7 ] ] }
console.log(' ');
console.log(' ');
obj.put(0, 42);															// overwriting value (key already exists)
console.log(obj._hashTable.slice(0,3));	
console.log(obj._hashTable[0]);							//=> Bucket { bucket: [ [ 0, 42 ], [ 2069, 7 ] ] }
console.log(' ');
console.log(' ');
// console.log(obj.get(0));										//=> 42											
// console.log(obj.get(3));										//=> -1
// console.log(' ');
// console.log(' ');
// obj.remove(0);	
// console.log(obj._hashTable.slice(0,3));
// console.log(obj._hashTable[0]);							//=> Bucket { bucket: [ [ 2069, 7 ] ] }