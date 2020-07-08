// LC 02 Add Two Numbers
// MEDIUM
// https://leetcode.com/problems/add-two-numbers/
// INPUT:  2 Nodes, representing heads of two different singly linked lists
// OUTPUT: Node, representing head of singly linked list
// 
// You are given two non - empty linked lists representing two non - negative 
// integers.The digits are stored in reverse order and each of their nodes 
// contain a single digit.Add the two numbers and return it as a linked list.
// You may assume the two numbers do not contain any leading zero, except the 
// number 0 itself.
// 
// EXAMPLE:
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807
//
// Definition of Node:
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}


// *****************************************************************************
// SOLUTION V1- 
// TIME COMPLEXITY:   O( Max(m, n) ),   m = List 1 length,   n = list 2 length 
// SPACE COMPLEXITY:  O( Max(m, n) )
// (ListNode 1, ListNode 2)       =>  ListNode
// (2 -> 4 -> 3,  5 -> 6 -> 4)    =>  7 -> 0 -> 8
function addTwoNumbers(l1, l2) {
  let List = new ListNode(0);                                                   // 1) create new List Node (doesn't matter what this val is bec. we're returning this nodes next node)
  let currentNode = List;                                                       // 2) create temp var to track currentNode, initizlie to new List we just made
  let sum = 0;                                                                  // 3) create vars to track sum and carry
  let carry = 0;

  // loop through both lists 1 node at a time
  while (l1 || l2 || sum > 0) {                                                 // 4) keep looping while l1 or l2 exist (i.e. not null) or sum > 0
    if (l1) {                                                                   // 5) if l1 exists (not null), update sum and l1 pointer
      sum = sum + l1.val;
      l1 = l1.next;
    }
    
    if (l2) {                                                                   // 6) if l2 exists (not null), update sum and l2 pointer
      sum = sum + l2.val;
      l2 = l2.next;
    }

    if (sum >= 10) {                                                            // 7) if sum >= 10, we have to carry (carry will always = 1)
      carry = 1;                                                        
      sum = sum - 10;                                                           // 8) remove 10 from sum (because of carry)
    }

    currentNode.next = new ListNode(sum);                                       // 9) update currentNode to point to a new List Node with sum as val
    currentNode = currentNode.next;                                             // 10) reassign currentNode to be the new node we just created
    sum = carry;                                                                // 11) reassign sum to carry (so we can "rememmber" the carry value in the next loop)
    carry = 0;                                                                  // 12) reset carry to 0
  }

  return List.next;                                                             // 13) we return .next because the first node is Node(0) in 0 -> 7 -> 0 -> 8
}


// EXAMPLE 1:   
// (2 -> 4 -> 3) + (5 -> 6 -> 4)    
let l1Node1 = new ListNode(2);
let l1Node2 = new ListNode(4);
let l1Node3 = new ListNode(3);
l1Node1.next = l1Node2;
l1Node2.next = l1Node3;

let l2Node1 = new ListNode(5);
let l2Node2 = new ListNode(6);
let l2Node3 = new ListNode(4);
l2Node1.next = l2Node2;
l2Node2.next = l2Node3;

let sum = addTwoNumbers(l1Node1, l2Node1);
console.log(stringify(sum));                  //=> '7 -> 0 -> 8'


// Helper Function for testing:
// (ListNode 2)   =>  '2 -> 4 -> 3'
function stringify(node) {
  let string = '';

  while (node) {
    string += node.next === null ? node.val : node.val + ' -> ' ;
    node = node.next;
  }

  return string;
}
// console.log(stringify(l1Node1));