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
// VERSION 1- 1HR
// TIME COMPLEXITY:  O(N), N = length of list
// SPACE COMPLEXITY: O(1)

// 1 -> 0 -> 1     => true
var isPalindrome = function (head) {
  if (!head) return true;

  // 1) get length of linked list
  let length = 0;
  let currentNode = head;
  while (currentNode) {
    currentNode = currentNode.next;
    length++;
  }
  if (length === 1) return true;
  
  // 2) loop to midpoint of linked list
  let midIdx = Math.floor(length/2);
  // midIdx = 1
  
  // 3) grab head of 2nd half of linked list
  let l2Head = head;
  // 4) grab end node of list 1
  let l1Tail = null;
  for (let i = 0; i < midIdx; i++) {
    l1Tail = l2Head;
    l2Head = l2Head.next;

    // i = 0:   l1Tail = 1      l2Head = 0
  }
  // console.log(l1Tail);
  // console.log(l2Head);
  // l1Tail = { val: 1, next: ListNode { val: 0, next: ListNode { val: 1, next: null } } }
  // l2Head = { val: 0, next: ListNode { val: 1, next: null } }
  
  // 5) reverse second half of linked list
  l2Head = reverseList(l2Head);
  // console.log(stringify(l2Head));   // 1 -> 0
  
  // l1Tail.next = l2Head; 
  l1Tail.next = null; 
  // console.log(stringify(head));  
  // 1      -> 1 -> 0
  
  // 6) loop through both linked lists and compare each node value
  let l1Head = head;
  // l1Head.val = 1     l2Head.val = 1

  while (l1Head && l2Head) {
    if (l1Head.val !== l2Head.val) return false;
    l1Head = l1Head.next;
    l2Head = l2Head.next;
  }

  return true;
};


// HELPER FUNCTION
var reverseList = function (head) {
  // 1) create vars to track current node (we're looping), and previous node
  let prev = null;
  let currentNode = head;

  // 2) loop through list node node at a time
  while (currentNode) {
    let next = currentNode.next;
    currentNode.next = prev;
    prev = currentNode
    currentNode = next;
  }
  return prev;
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