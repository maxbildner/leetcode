// LC 206 Reverse Linked List
// EASY
// Reverse a singly linked list
// https://leetcode.com/problems/reverse-linked-list/
// Input:  1 -> 2 -> 3 -> 4 -> 5 -> NULL			takes in HEAD NODE
// Output: 5 -> 4 -> 3 -> 2 -> 1 -> NULL			returns HEAD NODE

// Definition for singly linked list
function ListNode(val) {
	this.val = val;
	this.next = null;
}


// TIME: 9/9/21		5min
// SOLUTION V1- OPTIMAL LC SOLUTION, iterative, mutates list/in place, less temp variables
// TIME COMPLEXITY: O(n),   n = list length
// SPACE CPMLEXITY: O(1)
// a -> b -> c -> d             d -> c -> b -> a
// (a) => (d)

var reverseList = function (head) {

};
// NOTE* make A "point to" C == make B's next property equal to C (i.e. a.next = c)


// EXAMPLE 1
let a = new ListNode('a');
let b = new ListNode('b');
let c = new ListNode('c');
a.next = b;
b.next = c;
console.log(printList(reverseList(a)));		// 'c -> b -> a'
console.log(a)

function printList(n) {
	let str = '';
	while (n) {

		if (n.next) {
			str += n.val + ' -> ';
		} else {
			str += n.val;
		}

		n = n.next;
	}

	return str;
}
// console.log(printList(a));		// 'a -> b -> c'




