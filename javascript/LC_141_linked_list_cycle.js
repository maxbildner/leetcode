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



// *****************************************************************************
// VERSION 1- LEET CODE SOLUTION
// HINT: Imagine two runners running on a track at different speed. What happens 
//  when the track is actually a circle? Consider a slow pointer that moves one 
//  step at a time while the fast pointer moves two steps at a time.
// 
// TIME COMPLEXITY:   O(N),   O(N + K) => O(N),  N = Length of list
//      N = Non-Cyclic length of list (num nodes)
//      K = Cyclic length of list
// SPACE COMPLEXITY:  O(1),
// INPUTS:  1 linked list object
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we DO NOT have O(1) access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
// if there is a cycle, eventually slow and fast will meet
function hasCycle(head) {
  if (!head) return false;                                                      //    edge case if list empty
  let slow = head;                                                              // 1) slow runner will move 1 node at a time
  let fast = head;                                                              // 2) fast runner will move 2 nodes at a time

  while (fast) {                                                                // 3) keep looping as long as fast node exists (not null)
    if (fast.next === null) {                                                   // 4) if no node after fast (null), then there's no cycle
      return false;

    } else {                                                                    // 5) else there is a node after fast, update slow/fast pointers
      fast = fast.next.next;
      slow = slow.next;
    }

    if (slow === fast) return true;                                             // 6) if slow == fast, then we have a cycle (runners meet)
  }

  return false;                                                                 // 7) if we get here that means we've looped through all nodes and we've reached null, so no cycle
}