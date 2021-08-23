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


// TIME: 8/19/21	31min
// *****************************************************************************
// SOLUTION V1- Underlying array + 2D Array (for simplicity instead of linked list)
// TIME COMPLEXITY (all public methods):  O(N),  N = number if items in hash table (due to hash collisions)
// SPACE COMPLEXITY: O(N)

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
		this.bucket = [];
	}


	// returns undefined
	update(key, value) {
		for (let i = 0; i < this.bucket.length; i++) {		// loop through arrays in bucket and find matching key (if any)
			let keyValue = this.bucket[i];
			if (key === keyValue[0]) {											// match found! replace value and exit
				keyValue[1] = value;
				return;
			}
		}

		this.bucket.push([key, value]);										// if no matching key, than append new array to end of bucket
	}


	// returns -1 if not found
	get(key) {
		for (let i = 0; i < this.bucket.length; i++) {		// loop through buckets and find matching key
			let keyValue = this.bucket[i];	
			if (keyValue[0] === key) return keyValue[1];		// return value
		}

		return -1;
	}


	// returns undefined (regardless of whether key is found or not)
	remove(key) {
		for (let i = 0; i < this.bucket.length; i++) {	// loop through all the arrays in buckets
			let keyValue = this.bucket[i];
			if (key === keyValue[0]) {
				this.bucket.splice(i, 1);										// remove 1 element at index i
				return;
			}
		}
	}
}


// MAIN CLASS
/**
 * Initialize your data structure here.
 */
var MyHashMap = function() {
	this.keySize = 2069;												// use prime number to minimmize # of collisions (can happen if keys have patterns ex. multiples of 2's)
	this._hashTable = [];												// array with 2069 Bucket objects (2D arrays)
	for (let i = 0; i < this.keySize; i++) {
		this._hashTable.push(new Bucket());
	}
};


// HELPER
// (int key) => hash address
// 0  => 0
// 1  => 1
// 2  => 2
// 2069  => 0		// hash collision!!
// 2070  => 1		// hash collision!!
MyHashMap.prototype._hashify = function(key) {		// HASHING NUMBERS ONLY
	return key % this.keySize;											// will have collisions with keys 0 & 2069, 1 & 2070...
}
	

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
	let hash = this._hashify(key);									// convert key into hash address
	let bucket = this._hashTable[hash];							// grab the bucket (2D array) associated with that hash address
	bucket.update(key, value);											// update bucket object
};


/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
	let hash = this._hashify(key);								// convert key into hash address
	let bucket = this._hashTable[hash];						// grab bucket at that hash address
	return bucket.get(key);												// find key in 2D array that matches
};


/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
	let hash = this._hashify(key);							// convert key to hash address
	let bucket = this._hashTable[hash];					// grab bucket at hash address (2D array)
	bucket.remove(key);													// remove key/value array in bucket (if exists)
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
console.log(obj._hashTable.slice(0,5));
console.log(obj._hashTable[0]);
console.log(' ');
console.log(' ');
// obj.put(1, 2);	
// console.log(obj._hashTable.slice(0,5));
// console.log(obj._hashTable[1]);
// console.log(' ');
// console.log(' ');
// obj.put(2069, 7);														// should have hashing collision with key 0!
// console.log(obj._hashTable.slice(0,5));
// console.log(obj._hashTable[0]);
// console.log(' ');
// console.log(' ');
// obj.put(0, 42);															// overwriting value (key already exists)
// console.log(obj._hashTable.slice(0,5));
// console.log(obj._hashTable[0]);
// console.log(' ');
// console.log(' ');
// console.log(obj.get(0));												//=> 1											
// console.log(obj.get(3));												//=> -1
// console.log(' ');
// console.log(' ');
obj.remove(0);	
console.log(obj._hashTable.slice(0,5));
console.log(obj._hashTable[0]);