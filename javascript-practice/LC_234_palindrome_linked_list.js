// LC 234 Palindrome Linked List
// EASY
// https://leetcode.com/problems/palindrome-linked-list/
//
// Given a singly linked list, determine if it is a palindrome.
// Example 1:
// Input: 1 -> 2
// Output: false
//
// Example 2:
// Input: 1 -> 2 -> 2 -> 1
// Output: true
//
// Follow up:
// Could you do it in O(n) time and O(1) space ?
//
// 
// Leetcode Definition for singly - linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}


// *****************************************************************************
// VERSION 1- ITERATIVE
// TIME COMPLEXITY:  O(N), N = length of list
// SPACE COMPLEXITY: O(1)

// 1 -> 0 -> 1     => true
var isPalindrome = function (head) {
	
};


// HELPER FUNCTION
var reverseList = function (head) {
  
};


// Example 1:
// 1 -> 2
let n1 = new ListNode(1);
let n2 = new ListNode(2);
n1.next = n2;
console.log(isPalindrome(n1));    //=> false

// Example 2:
// Input: 1 -> 2 -> 2 -> 1
n1 = new ListNode(1);
n2 = new ListNode(2);
let n3 = new ListNode(2);
let n4 = new ListNode(1);
n1.next = n2;
n2.next = n3;
n3.next = n4;
console.log(isPalindrome(n1));    //=> true

// Example 3:
// Input: 1 -> 2 -> 3 -> 2 -> 1
n1 = new ListNode(1);
n2 = new ListNode(2);
n3 = new ListNode(3);
n4 = new ListNode(2);
n5 = new ListNode(1);
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;
console.log(isPalindrome(n1));    //=> true


// Example 4:
// Input: 1 -> 0 -> 1
n1 = new ListNode(1);
n2 = new ListNode(0);
n3 = new ListNode(1);
n1.next = n2;
n2.next = n3;
console.log(isPalindrome(n1));    //=> true




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