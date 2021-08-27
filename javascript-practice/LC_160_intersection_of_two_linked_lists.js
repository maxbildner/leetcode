// LC 160 Intersection of Two Linked Lists
// EASY
// https://leetcode.com/problems/intersection-of-two-linked-lists/
// Given two head nodes, write a function linkedListIntersection that 
// returns the node at which the intersection of two singly linked lists 
// begins, or null if there is no such intersection.
// ---------- 
// Example 1:
// ----------
// Should return node D as the node of intersection.
// 
//  A → B → C
//           ↘
//             D → E → F
//           ↗
//      X → Y
//
// ---------- 
// Example 2:
// ----------
// Should return null as there is no point of intersection.
// 
//    A → B → C → D
//
//    X → Y → Z
// 
// Leetcode Definition for singly - linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}



// TIME: 8/25/21     4min
// *****************************************************************************
// VERSION 1- HASH TABLE/SET, Easy to understand, but uses more memory than V2
// TIME COMPLEXITY: O(M + N)        M = list1 length,  N = list2 length
// SPACE COMPLEXITY: O(M) or O(N)   depending on which list you use to store the hash/set

function linkedListIntersection(head1, head2) {

}
  


  
  

// TIME: 8/25/21     9min
// *****************************************************************************
// VERSION 2- 2 POINTERS BEST SOLUTION
// LC 160 Intersection of Two Linked Lists
// TIME COMPLEXITY: O(M + N)        M = list1 length,  N = list2 length
// SPACE COMPLEXITY: O(1)   

function linkedListIntersectionV2(head1, head2) {

}