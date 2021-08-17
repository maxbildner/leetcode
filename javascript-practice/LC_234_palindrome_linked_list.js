// LC 234 Palindrome Linked List
// EASY
// https://leetcode.com/problems/palindrome-linked-list/
//
// Given the head of a singly linked list, determine if it is a palindrome.
// Example 1:
// Input: 1 -> 2
// Output: false
//
// Example 2:
// Input: 1 -> 2 -> 2 -> 1
// Output: true
//
// Constraints:
// - The number of nodes in the list is in the range [1, 105].
// - 0 <= Node.val <= 9
//
// Follow up:
// Could you do it in O(n) time and O(1) space ?
// 
// Leetcode Definition for singly - linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}


// TIME: 8/17/21   24min
// *****************************************************************************
// VERSION 1- ITERATIVE
// TIME COMPLEXITY:  O(N), N = length of list
// SPACE COMPLEXITY: O(1)

// 1 -> 0 -> 1     => true
var isPalindrome = function (head) {

};


// HELPER FUNCTION- gets tail of 1st half of list (ie midNode. if even, mid left)
function getMidNode(head) {

}


// HELPER FUNCTION
function reverseList(head) {

};


// Example 1:
// 1 -> 2
let n1 = new ListNode(1);
let n2 = new ListNode(2);
n1.next = n2;
console.log(isPalindrome(n1));    //=> false
// console.log(getMidNode(n1));   //=> 1

// Example 2:
// Input: 1 -> 2 -> 2 -> 1
n1 = new ListNode(1);
n2 = new ListNode(2);
let n3 = new ListNode(2);
let n4 = new ListNode(1);
n1.next = n2;
n2.next = n3;
n3.next = n4;
console.log(isPalindrome(n1));      //=> true
// console.log(getMidNode(n1));     //=> 2   (1st one so 2.next -> 2)

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
console.log(isPalindrome(n1));      //=> true
// console.log(getMidNode(n1));     //=> 3

// Example 4:
// Input: 1 -> 0 -> 1
n1 = new ListNode(1);
n2 = new ListNode(0);
n3 = new ListNode(1);
n1.next = n2;
n2.next = n3;
console.log(isPalindrome(n1));      //=> true
// console.log(getMidNode(n1));     //=> 0

// Example 5:
// Input: 1
n1 = new ListNode(1);
console.log(isPalindrome(n1));      //=> true
// console.log(getMidNode(n1));     //=> 1


// Example 6:
// Input: 1
console.log(isPalindrome(null));    //=> false





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