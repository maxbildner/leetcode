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

// SOLUTION V1- MY SOLUTION, iterative, mutates list/in place, more temp variables
// TIME COMPLEXITY: O(n),   n = list length
// SPACE CPMLEXITY: O(1)
// Takes in head list node, returns new head where subsequent nodes are reversed from original
const reverseListV1 = function(head) {
	// create var to track previousNode = null
	let previousNode = null;																		

	// create var to track currentNode = head
	let currentNode = head;

	// traverse linked list
	while (currentNode !== null) {
		// create temp var to capture next node
		let temp = currentNode.next;                // need this for reassigning currentNode later

		// set currentNode point to previousNode
		currentNode.next = previousNode;

		// set previousNode to currentNode
		previousNode = currentNode;

		// set currentNode to temp
		currentNode = temp;
	}

	// return previousNode
	return previousNode;
}





// SOLUTION V1- OPTIMAL LC SOLUTION, iterative, mutates list/in place, less temp variables
// TIME COMPLEXITY: O(n),   n = list length
// SPACE CPMLEXITY: O(1)
// a -> b -> c -> d             d -> c -> b -> a
// (a) => (d)
var reverseList = function (head) {
	let prev = null;								// 1) create var to track prev node, set to null

	while (head !== null) {					// 2) loop through list, head will be our current node (need to keep updating it)

		let next = head.next;					// 3) grab next node from head

		head.next = prev;							// 4) make head point to prev node

		prev = head;									// 5) update prev to head

		head = next;									// 6) update head to next
	}

	return prev;										// 7) return prev
};
// NOTE* make A "point to" C == make B's next property equal to C (i.e. a.next = c)





// EXAMPLE 1
let a = new ListNode('a');
let b = new ListNode('b');
let c = new ListNode('c');
a.next = b;
b.next = c;
console.log(printList(reverseList(a)));		// 'c -> b -> a'


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