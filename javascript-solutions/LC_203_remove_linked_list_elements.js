// LC 203 Remove Linked List Elements
// EASY
// https://leetcode.com/problems/remove-linked-list-elements/
//
// Remove all elements from a linked list of integers that have value val.
// Example:
// Input: 1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6, val = 6
// Output: 1 -> 2 -> 3 -> 4 -> 5
// 
// Leetcode Definition for singly - linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}


// *****************************************************************************
// TIME: 20M
// VERSION 1- 
// TIME COMPLEXITY:  O(N), N = length of list
// SPACE COMPLEXITY: O(1)

//  1 -> 2 -> 6 -> 3 -> 4 -> 6        =>      '1 -> 2 -> 3 -> 4'
var removeElements = function (head, val) {
  let currentNode = head;
  let prevNode = null;

  while (currentNode) {    

    // if currentNode is head and matches
    if (!prevNode && currentNode.val === val) {
      head = currentNode.next;
      
      // if currentNode not head and matches
    } else if (currentNode.val === val) {
      prevNode.next = currentNode.next;
    }

    if (currentNode.val !== val) prevNode = currentNode;
    currentNode = currentNode.next;
  }

  return head;
};



// ***************************************************************************** 
// TIME COMPLEXITY:  O(N), N = length of list
// SPACE COMPLEXITY: O(1)

//  1 -> 2 -> 6 -> 3 -> 4 -> 6        =>      '1 -> 2 -> 3 -> 4'
var removeElements = function (head, val) {

};


// EXAMPLE 1:             1 -> 2 -> 6 -> 3 -> 4 -> 6
// let n1 = new ListNode(1);
// let n2 = new ListNode(2);
// let n3 = new ListNode(6);
// let n4 = new ListNode(3);
// let n5 = new ListNode(4);
// let n6 = new ListNode(6);
// n1.next = n2;
// n2.next = n3;
// n3.next = n4;
// n4.next = n5;
// n5.next = n6;
// console.log(stringify(removeElements(n1, 6)));    //=> '1 -> 2 -> 3 -> 4'



// // EXAMPLE 2:             6 -> 2 -> 6 -> 3 -> 4 -> 6
// n1 = new ListNode(6);
// n2 = new ListNode(2);
// n3 = new ListNode(6);
// n4 = new ListNode(3);
// n5 = new ListNode(4);
// n6 = new ListNode(6);
// n1.next = n2;
// n2.next = n3;
// n3.next = n4;
// n4.next = n5;
// n5.next = n6;
// console.log(stringify(removeElements(n1, 6)));    //=> '2 -> 3 -> 4'


// EXAMPLE 3:             1 -> 1
n1 = new ListNode(1);
n2 = new ListNode(1);
n1.next = n2;
console.log(stringify(removeElements(n1, 1)));    //=> 'null'



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