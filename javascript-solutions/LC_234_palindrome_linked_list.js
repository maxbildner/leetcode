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
// VERSION 1- ITERATIVE, get length of list, get midIdx, grab head of 2nd half of linked list
// 						grab tail of 1st half of linked list, reverse 2nd half of linked list (use helper function in place)
// TIME COMPLEXITY:  O(N), N = length of list
// SPACE COMPLEXITY: O(1)

// 1 -> 0 -> 1     => true
var isPalindrome = function (head) {
  if (!head) return true;

  let length = 0;																	// 1) get length of linked list O(N) Time, N = length of list
  let currentNode = head;
  while (currentNode) {
    currentNode = currentNode.next;
    length++;
  }
  if (length === 1) return true;                  // edge case- exit if list only has 1 node
  
  let midIdx = Math.floor(length/2);							// grab mid index of list
  
  let l2Head = head;															// grab head of 2nd half of linked list
  let l1Tail = null;															// grab end node of list 1 (point to null to sever connection of 1st half of list)
  for (let i = 0; i < midIdx; i++) {              // 2) loop to midpoint of linked list (grab midIdx)
    l1Tail = l2Head;
    l2Head = l2Head.next;
  }
  
  l2Head = reverseList(l2Head);										// 3) reverse second half of linked list in place (use helper function)
  
  l1Tail.next = null;                             // 4) sever connection of 1st half of list (l1Tail)
  
  let l1Head = head;															
  
  while (l1Head && l2Head) {                      // 5) loop through both linked lists and compare each node value
    if (l1Head.val !== l2Head.val) return false;  // exit if node vals arent equal
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