// LC 141 Linked List Cycle
// EASY
// https://leetcode.com/problems/linked-list-cycle/
// INPUT:  head node of singly linked list
// OUTPUT: boolean, true if linked list has cycle, false if list terminates
// Write a function that returns true if the linked list contains a cycle, or 
// false if terminates somewhere.
// To represent a cycle in the given linked list, we use an integer pos which 
// represents the position(0 - indexed) in the linked list where tail connects 
// to. If pos is - 1, then there is no cycle in the linked list.
// 
// ------------
// Constraints:
// ------------ 
// (1) Your function must run in linear time, O(n).
// (2) Your function must use constant space, O(1).
// (3) Do not mutate the linked list or it's nodes in any way.
// ---------- 
// Example 1:
// ----------
// ({Node A})  =>  true
// 
//                         A → B → C
//                             ↑   ↓
//                             E ← D
// Leetcode Definition for singly - linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}


// *****************************************************************************
// VERSION 1- MY SOLUTION
// HINT: Imagine two runners running on a track at different speed. What happens 
//  when the track is actually a circle? Consider a slow pointer that moves one 
//  step at a time while the fast pointer moves two steps at a time.
// 
// TIME COMPLEXITY:   O(N),   O(N + K) => O(N),  N = Length of list
//      N = Non-Cyclic length of list (num nodes)
//      K = Cyclic length of list (if a -> b -> c -> d -> b, then k = 3, n = 4) 
// SPACE COMPLEXITY:  O(1),
// INPUTS:  1 linked list object (head node)
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we DO NOT have O(1) access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
// if there is a cycle, eventually slow and fast will meet
function hasCycle(head) {
  if (!head) return false;																	// edge case if no head

	let slow = head;																					// create two pointers initialized to head, slow moves 1 node, fast moves 2 nodes at a time
	let fast = head;

	while (fast) {																						// loop while fast pointer is NOT null (or while fast pointer exists)
		
		if (fast.next == null || fast == null) return false;		// if fast.next or fast is null, we do NOT have a cycle

		slow = slow.next;																				// update slow and fast pointers
		fast = fast.next.next;

		if (slow === fast) return true;													// if pointers equal, runners have met, we have a cycle!
 	}

	return false;																							// if fast pointer IS null, we do NOT have a cycle
}




// *****************************************************************************
// VERSION 2- LEETCODE SOLUTION (SIMILAR)
// HINT: Imagine two runners running on a track at different speed. What happens 
//  when the track is actually a circle? Consider a slow pointer that moves one 
//  step at a time while the fast pointer moves two steps at a time.
// 
// TIME COMPLEXITY:   O(N),   O(N + K) => O(N),  N = Length of list
//      N = Non-Cyclic length of list (num nodes)
//      K = Cyclic length of list
// SPACE COMPLEXITY:  O(1),
// INPUTS:  1 linked list object (head node)
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we DO NOT have O(1) access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
// if there is a cycle, eventually slow and fast will meet
function hasCycleV2(head) {
  if (!head) return false;                        // edge case if no node

  let slow = head;				                        // moves 1 node at a time
  let fast = head.next;			                      // moves 2 nodes at a time (initialize to next node)
  
  while (slow != fast) {                          // loop while pointers are NOT equal

    if (fast === null || fast.next === null) {    // if fast or fast.next are null, exit false
      return false;
    } 
    
    slow = slow.next;
    fast = fast.next.next;
  }

  return true;
}


// *****************************************************************************
// VERSION 3- LEETCODE SOLUTION (SIMILAR)
// HINT: Imagine two runners running on a track at different speed. What happens 
//  when the track is actually a circle? Consider a slow pointer that moves one 
//  step at a time while the fast pointer moves two steps at a time.
// 
// TIME COMPLEXITY:   O(N),   O(N + K) => O(N),  N = Length of list
//      N = Non-Cyclic length of list (num nodes)
//      K = Cyclic length of list
// SPACE COMPLEXITY:  O(1),
// INPUTS:  1 linked list object (head node)
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we DO NOT have O(1) access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
// if there is a cycle, eventually slow and fast will meet
function hasCycleV3(head) {
	if (!head) return false;						// edge case- exit if no head

	let slow = head;										// slow pointer moves 1 node at a time, fast pointer moves 2 nodes
	let fast = head;

	while (fast && fast.next) {					// loop while fast and fast.next exist (not null)!!
		
		slow = slow.next;
		fast = fast.next.next;
		
		if (slow === fast) return true;		// runners meet, cycle exists!
	}

	return false;
}





// Example 1
// A -> B -> C -> D -> E -> B     		
let a = new ListNode('A');
let b = new ListNode('B');
let c = new ListNode('C');
let d = new ListNode('D');
let e = new ListNode('E');
a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = b;
console.log(hasCycle(a));           	//=> true


// Example 2
let n1 = new ListNode(1);
console.log(hasCycle(n1));						//=> false

// Example 3
console.log(hasCycle(null));					//=> false

// Example 4
// 1 -> 2
n1 = new ListNode(1);
n2 = new ListNode(2);
n1.next = n2;
console.log(hasCycle(n1));						//=> false