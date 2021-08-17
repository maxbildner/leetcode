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
  


// TIME: 8/17/21	16min
// *****************************************************************************
// VERSION 1- LEET CODE SOLUTION
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
function hasCycle(head) {	
	
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

