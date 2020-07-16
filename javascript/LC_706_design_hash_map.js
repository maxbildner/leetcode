// LC 706 Design HashMap
// EASY
// https://leetcode.com/problems/design-hashmap/
// 
// Design a HashMap without using any built-in hash table libraries.
// To be specific, your design should include these functions:
//   - put(key, value) : Insert a(key, value) pair into the HashMap. If the 
//     value already exists in the HashMap, update the value.
//   - get(key): Returns the value to which the specified key is mapped, or - 1 
//     if this map contains no mapping for the key.
//   - remove(key) : Remove the mapping for the value key if this map contains 
//     the mapping for the key.
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


// 3:51
// *****************************************************************************
// SOLUTION V1- 
// TIME COMPLEXITY:  
// SPACE COMPLEXITY: 


var MyHashMap = function () {
  // use underlying array, values are singly linked list nodes
  this._hashTable = [];
};


// HELPER
// (string) => number
// 'a'  => 0
// 'b'  => 1
// 'c'  => 2
// 'd'  => 3
MyHashMap.prototype._hashify = function(key) {
  // let hash = 0;

  // for (let i = 0; i < key.length; i++) {
  //   hash += key[i].charCodeAt(0) - 97;
  // }

  // return hash;
  return key % 10;
}

// value will always be non-negative. 
MyHashMap.prototype.put = function (key, value) {
  // convert key into unique integer using hashing function
  let hash = this._hashify(key);    // 3
  // let binKey = hash % 10;        // 10 == bin size

  // if hash not a key in hashTable (array)
  if (!this._hashTable[hash]) {
    this._hashTable[hash] = { key, value, next: null };

  } else {                          // we have a hashing collision
    let node = this._hashTable[hash];
    let found = false;
    while (node) {
      if (node.key === key) {       // if node found, update value
        node.value = value;
        found = true;
      }
      node = node.next;
    }

    if (!found) {                   // if node not found, add it to tail
      oldHead = this._hashTable[hash];
      oldHead.next = { key, value, next: null };
    }
  }
};


// Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
MyHashMap.prototype.get = function (key) {
  // convert key to hash
  let hash = this._hashify(key);

  let node = this._hashTable[hash];
  while (node) {
    if (node.key === key) return node.value;
    node = node.next;
  }

  return -1;  
};


// Removes the mapping of the specified value key if this map contains a mapping for the key 
MyHashMap.prototype.remove = function (key) {
  // convert key to hash
  let hash = this._hashify(key);

  if (!this._hashTable[hash]) return;     // exit if key not in hash

  let node = this._hashTable[hash];
  let prev = null;
  let next = null;

  // find node
  while (node) {
    next = node.next;

    if (node.key === key) {               // node found
      if (prev === null) {                // if node is head
        this._hashTable[hash] = next;     // need to account for empty later

      } else if (next === null) {         // if node is tail
        prev.next = null;

      } else {                            // if node is in middle
        prev.next = next;
      }
      return;
    }

    prev = node;
    node = node.next;
  }
};


// // EXAMPLE 1:
// let pantry = new MyHashMap();
// console.log(pantry.put('d', 2));          // 'd'   hashify => 3
// console.log(pantry.put('a', 2));          // 'a'   hashify => 0
// console.log(pantry.put('abc', 1));        // 'abc' hashify => 3
// console.log(pantry._hashTable);
// // [{ key: 'a', value: 2, next: null },
// //   < 2 empty items >,
// //   {
//   //     key: 'd',
//   //     value: 2,
//   //     next: { key: 'abc', value: 1, next: null }
//   //   }]
// console.log(' ');
// console.log(pantry.put('abc', 3));        // 'abc' hashify => 3
// console.log(pantry.get('d'));             //=> 2
// console.log(pantry.get('a'));             //=> 2
// console.log(pantry.get('abc'));           //=> 3
// console.log(pantry.get('z'));             //=> -1 (not found)
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'d', value:2, next:{ key:'abc', value:3, next:null }}
// // }
// console.log(' ');
// console.log(pantry.remove('abc'));        // 'abc' hashify => 3
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'d', value:2, next:null }
// // }
// console.log(pantry._hashTable);



// // EXAMPLE 2:
// let pantry = new MyHashMap();
// console.log(pantry.put('abc', 1));        // 'abc' hashify => 3
// // hashtable = {
// //   3: { key:'abc', value:1, next:null }
// // }
// console.log(pantry.put('a', 2));          // 'a'   hashify => 0
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'abc', value:1, next:null }
// // }
// console.log(pantry.put('d', 2));          // 'd'   hashify => 3
// console.log(pantry._hashTable);
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'abc', value:1, next:{ key:'d', value:2, next:null } }
// // }

// console.log(' ');
// console.log(pantry.remove('abc'));        // 'abc' hashify => 3
// console.log(pantry._hashTable);
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'d', value:2, next:null }
// // }


// // EXAMPLE 3:
// let pantry = new MyHashMap();
// console.log(pantry.put('abc', 1));        // 'abc'    hashify => 3
// // hashtable = {
// //   3: { key:'abc', value:1, next:null }
// // }
// console.log(pantry.put('a', 2));          // 'a'      hashify => 0
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'abc', value:1, next:null }
// // }
// console.log(pantry.put('d', 2));          // 'd'      hashify => 3
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'abc', value:1, next:{ key:'d', value:2, next:null } }
// // }
// console.log(pantry.put('aaabc', 7));      // 'aaabc'  hashify => 3
// console.log(pantry._hashTable);
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'abc', value:1, next:{ key:'d', value:2, next:{ key: 'aaabc', value:7, next:null } } }
// // }

// console.log(' ');
// console.log(pantry.remove('d'));          // 'd'    hashify => 3
// console.log(pantry._hashTable);
// // hashtable = {
// //   0: { key:'a', value:2, next:null },
// //   3: { key:'abc', value:1, next:{ key:'aaabc', value:7, next:null } }
// // }


// EXAMPLE 4:
// let pantry = new MyHashMap();
// console.log(pantry.put('abc', 1));        // 'abc'    hashify => 3
// console.log(pantry._hashTable);
// // hashtable = {
// //   3: { key:'abc', value:1, next:null }
// // }

// console.log(' ');
// console.log(pantry.remove('abc'));         // 'd'    hashify => 3
// console.log(pantry._hashTable);
// // hashtable = {
//   //   3: null
//   // }
  
// console.log(pantry.get('abc'));           // 'd'    -1
// console.log(pantry.put('abc', 69));       
// console.log(pantry._hashTable);



// EXAMPLE 5:
//   1              2        3       4         5        6       7        8       9
// ["MyHashMap", "remove", "put", "remove", "remove", "get", "remove", "put", "get", "remove", "put", "put", "put", "put", "put", "put", "put", "put", "put", "put", "put", "remove", "put", "put", "get", "put", "get", "put", "put", "get", "put", "remove", "remove", "put", "put", "get", "remove", "put", "put", "put", "get", "put", "put", "remove", "put", "remove", "remove", "remove", "put", "remove", "get", "put", "put", "put", "put", "remove", "put", "get", "put", "put", "get", "put", "remove", "get", "get", "remove", "put", "put", "put", "put", "put", "put", "get", "get", "remove", "put", "put", "put", "put", "get", "remove", "put", "put", "put", "put", "put", "put", "put", "put", "put", "put", "remove", "remove", "get", "remove", "put", "put", "remove", "get", "put", "put"]
// [[],  [27], [65, 65], [19], [0], [18], [3], [42, 0], [19], [42], [17, 90], [31, 76], [48, 71], [5, 50], [7, 68], [73, 74], [85, 18], [74, 95], [84, 82], [59, 29], [71, 71], [42], [51, 40], [33, 76], [17], [89, 95], [95], [30, 31], [37, 99], [51], [95, 35], [65], [81], [61, 46], [50, 33], [59], [5], [75, 89], [80, 17], [35, 94], [80], [19, 68], [13, 17], [70], [28, 35], [99], [37], [13], [90, 83], [41], [50], [29, 98], [54, 72], [6, 8], [51, 88], [13], [8, 22], [85], [31, 22], [60, 9], [96], [6, 35], [54], [15], [28], [51], [80, 69], [58, 92], [13, 12], [91, 56], [83, 52], [8, 48], [62], [54], [25], [36, 4], [67, 68], [83, 36], [47, 58], [82], [36], [30, 85], [33, 87], [42, 18], [68, 83], [50, 53], [32, 78], [48, 90], [97, 95], [13, 8], [15, 7], [5], [42], [20], [65], [57, 9], [2, 41], [6], [33], [16, 44], [95, 30]]
//   1   2        3       4     5   6     7     8       9

// actual:
// [null, null, null, null, null, -1, null, null, -1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1, null, -1, null, null, -1, null, null, null, null, null, -1, null, null, null, null, -1, null, null, null, null, null, null, null, null, null, -1, null, null, null, null, null, null, -1, null, null, -1, null, null, -1, -1, null, null, null, null, null, null, null, -1, -1, null, null, null, null, null, -1, null, null, null, null, null, null, null, null, null, null, null, null, null, -1, null, null, null, null, -1, null, null]

// expected:
// [null, null, null, null, null, -1, null, null, -1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 90, null, -1, null, null, 40, null, null, null, null, null, 29, null, null, null, null, 17, null, null, null, null, null, null, null, null, null, 33, null, null, null, null, null, null, 18, null, null, -1, null, null, -1, 35, null, null, null, null, null, null, null, -1, -1, null, null, null, null, null, -1, null, null, null, null, null, null, null, null, null, null, null, null, null, -1, null, null, null, null, 87, null, null]
//    1     2    3     4     5     6   7     8    9

let pantry = new MyHashMap();          // null    1
console.log(pantry.remove(27));        // null    2
console.log(pantry.put(65, 65));       // null    3
console.log(pantry._hashTable);
// [ { key: 65, value: 65, next: null } ]
console.log(pantry.remove(19));        // null    4
console.log(pantry.remove(0));         // null    5
console.log(pantry.get(18));           // -1      6
console.log(pantry.remove(3));         // null    7
console.log(pantry.put(42, 0));        // null    8
console.log(pantry._hashTable);
// [ { key: 65, value: 65, next: null } ]
