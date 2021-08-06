// LC 21 Merge Two Sorted Lists
// EASY
// https://leetcode.com/problems/merge-two-sorted-lists/
// INPUT:  2 Nodes, representing heads of two different sorted singly linked lists
// OUTPUT: Node, representing head of singly linked list
//
// Merge two sorted linked lists and return it as a new sorted list (but use O(1) Space!).
// The new list should be made by splicing together the nodes of the first two lists.
// NOTE* lists could be different lengths
// Example:
// Inputs:  1 -> 2 -> 4,   1 -> 3 -> 4
// Output:  1 -> 1 -> 2 -> 3 -> 4 -> 4
//
// Definition of Node:
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}


// TIME: 45min
// *****************************************************************************
// SOLUTION V1- Iterative, just like merge helper in merge sort
// MUTATES BOTH INPUTS
// TIME COMPLEXITY:   O(M + N),   M = length of list 1,    N = length of list 2  
// SPACE COMPLEXITY:  O(1)        because we mutate both inputs
// (ListNode 1, ListNode 2)       =>  ListNode
// (1 -> 2 -> 4,   1 -> 3 -> 4)   =>  1 -> 1 -> 2 -> 3 -> 4 -> 4
function mergeTwoLists(l1, l2) {
  let merged = new ListNode(-1);                                                // 1) create new node (we'll return the next node to this). value can be anything, -1 to represent preHead index
  let prevNode = merged;                                                        // 2) var to track previous node

  while (l1 && l2) {                                                            // 3) loop through lists 1 node at a time (break when any of the lists are null)

    if (l1.val <= l2.val) {                                                     // 4) if l1 val <= l2 val, update prevNode to point to l1, update l1
      prevNode.next = l1;
      l1 = l1.next;

    } else {                                                                    // 5) if l1 val > l2 val, update prevNode to point to l2, update l2
      prevNode.next = l2;
      l2 = l2.next;
    }

    prevNode = prevNode.next;                                                   // 6) update prevNode
  }

  // if (l1) {
  //   prevNode.next = l1;
  // } else if (l2) {
  //   prevNode.next = l2;
  // }

  prevNode.next = l1 || l2;                                                     // 7) "adds" any remainder to the longer list (same as above if else if)

  return merged.next;
}


// EXAMPLE 1:
// (1 -> 2 -> 4),  (1 -> 3 -> 4)            => 1 -> 1 -> 2 -> 3 -> 4 -> 4
let l1Node1 = new ListNode(1);
let l1Node2 = new ListNode(2);
let l1Node3 = new ListNode(4);
l1Node1.next = l1Node2;
l1Node2.next = l1Node3;
let l2Node1 = new ListNode(1);
let l2Node2 = new ListNode(3);
let l2Node3 = new ListNode(4);
l2Node1.next = l2Node2;
l2Node2.next = l2Node3;
let headNodeSum = mergeTwoLists(l1Node1, l2Node1);
console.log(stringify(headNodeSum), stringify(headNodeSum) == '1 -> 1 -> 2 -> 3 -> 4 -> 4');        
//=> '1 -> 1 -> 2 -> 3 -> 4 -> 4'   True


// EXAMPLE 2:
// (0 -> 0 -> 4),  (1 -> 3 -> 4)            => 0 -> 0 -> 1 -> 3 -> 4 -> 4
// l1Node1 = new ListNode(0);
// l1Node2 = new ListNode(0);
// l1Node3 = new ListNode(4);
// l1Node1.next = l1Node2;
// l1Node2.next = l1Node3;
// l2Node1 = new ListNode(1);
// l2Node2 = new ListNode(3);
// l2Node3 = new ListNode(4);
// l2Node1.next = l2Node2;
// l2Node2.next = l2Node3;
// headNodeSum = mergeTwoLists(l1Node1, l2Node1);
// console.log(stringify(headNodeSum));    //=> '1 -> 1 -> 2 -> 3 -> 4 -> 4'

// console.log(stringify(l1Node1));
// console.log(stringify(l2Node1));



// Helper Function for testing:
// (ListNode 2)   =>  '2 -> 4 -> 3'
function stringify(node) {
  let string = '';

  while (node) {
    string += node.next === null ? node.val : node.val + ' -> ';
    node = node.next;
  }

  return string;
}