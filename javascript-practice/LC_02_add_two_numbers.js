// LC 02 Add Two Numbers
// MEDIUM
// https://leetcode.com/problems/add-two-numbers/
// INPUT:  2 Nodes, representing heads of two different singly linked lists
// OUTPUT: Node, representing head of singly linked list
// 
// You are given two non - empty linked lists representing two non - negative 
// integers.The digits are stored in reverse order and each of their nodes 
// contain a single digit. Add the two numbers and return it as a linked list.
// You may assume the two numbers do not contain any leading zero, except the 
// number 0 itself.
// 
// EXAMPLE:
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807
//
// NOTE*
// - Input numbers may be different lengths!
// 
// Definition of Node:
class ListNode {
  constructor(val, next) {
    this.val = val;
    this.next = next === undefined ? null : next;
  }
}
  
  
// TIME: 8/31/21			31min
// *****************************************************************************
// SOLUTION V1- BASIC MATH (like how you would solve w/ pen/paper with "carry")
// TIME COMPLEXITY:   O( Max(m, n) ),   m = List 1 length,   n = list 2 length 
// SPACE COMPLEXITY:  O( Max(m, n) )
// (ListNode 1, ListNode 2)       =>  ListNode
// (2 -> 4 -> 3,  5 -> 6 -> 4)    =>  7 -> 0 -> 8
function addTwoNumbers(l1, l2) {
	
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


// EXAMPLE 2:   
// (5) + (5)                                  //=> 0 -> 1
l1Node1 = new ListNode(5);
l2Node1 = new ListNode(5);
sum = addTwoNumbers(l1Node1, l2Node1);
console.log(stringify(sum));                  //=> '0 -> 1'


// EXAMPLE 3:   
// (3 -> 4) + (9)                             //=> 2 -> 5
l1Node1 = new ListNode(3);
l1Node2 = new ListNode(4);
l2Node1 = new ListNode(9);
l1Node1.next = l1Node2;
sum = addTwoNumbers(l1Node1, l2Node1);
console.log(stringify(sum));                  //=> '2 -> 5'


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