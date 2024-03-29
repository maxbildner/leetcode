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
//		Leetcode Solution- more complicated while loop, but no if statement at end
// TIME COMPLEXITY:   O( Max(m, n) ),   m = List 1 length,   n = list 2 length 
// SPACE COMPLEXITY:  O( Max(m, n) )
// (ListNode 1, ListNode 2)       =>  ListNode
// (2 -> 4 -> 3,  5 -> 6 -> 4)    =>  7 -> 0 -> 8
function addTwoNumbersV1(l1, l2) {
  let result = new ListNode(-1);                // 1) create new Node (doesn't matter what val is bec. we're returning this nodes next node, -1 to indicate -1 indexing)
  let prev = result;                            // 2) create temp var to track previousNode, initialize to new Node we just made
  let sum = 0;                                  // 3) create vars to track sum and carry
  let carry = 0;

  // loop through both lists 1 node at a time
  while (l1 || l2 || sum > 0) {                 // 4) keep looping while l1 or l2 exist (i.e. not null) or sum > 0. We need sum > 0 incase we're only given 2 single digit numbers (l1, l2) = (5, 5)
    if (l1) {                                   // 5) if l1 exists (not null), update sum and l1 pointer
      sum = sum + l1.val;                       //    "sum" is really the carry from the previous loop
      l1 = l1.next;
    }
    
    if (l2) {                                   // 6) if l2 exists (not null), update sum and l2 pointer
      sum = sum + l2.val;
      l2 = l2.next;
    }

    if (sum >= 10) {                            // 7) if sum >= 10, we have to carry (carry will always = 1)
      carry = 1;                                //    update carry to 1                  
      sum = sum - 10;                           //    remove 10 from sum (to get ones digit)
    }

    let node = new ListNode(sum);               // 8) create new node with val as sum
    prev.next = node;                           // 9) update prevNode to point next to new node we just made
    prev = node;                                // 10) reassign prevNode to be the new node we just made
    sum = carry;                                // 11) reassign sum to carry (so we can "rememmber" the carry value in the next loop)
    carry = 0;                                  // 12) reset carry to 0
  }

  return result.next;                           // 13) return .next bec. the first node is Node(-1) in  -1 -> 7 -> 0 -> 8
}



// *****************************************************************************
// SOLUTION V2- BASIC MATH (like how you would solve w/ pen/paper with "carry")
//		My Solution- less complicated while loop, but if statement at end needed for edge case if input is single digit ex. 5, 5
// TIME COMPLEXITY:   O( Max(m, n) ),   m = List 1 length,   n = list 2 length 
// SPACE COMPLEXITY:  O( Max(m, n) )
// (ListNode 1, ListNode 2)       =>  ListNode
// (2 -> 4 -> 3,  5 -> 6 -> 4)    =>  7 -> 0 -> 8
function addTwoNumbersV2(l1, l2) {
	let result = new ListNode(-1);                // 1) create new Node (doesn't matter what val is bec. we're returning this nodes next node, -1 to indicate -1 indexing)
  let prev = result;                            // 2) create temp var to track previousNode, initialize to new Node we just made
  let sum = 0;                                  // 3) create vars to track sum and carry
  let carry = 0;

  // loop through lists 1 node at a time until we reach both ends
  while (l1 || l2) {                 						// 4) keep looping while l1 or l2 exist (i.e. not null)
    if (l1) {                                   // 5) if l1 exists (not null), update sum and l1 pointer
      sum = sum + l1.val;                       //    "sum" is really the carry from the previous loop
      l1 = l1.next;
    }
    
    if (l2) {                                   // 6) if l2 exists (not null), update sum and l2 pointer
      sum = sum + l2.val;
      l2 = l2.next;
    }

    if (sum >= 10) {                            // 7) if sum >= 10, we have to carry (carry will always = 1)
      carry = 1;                                //    update carry to 1                  
      sum = sum - 10;                           //    remove 10 from sum (to get ones digit)
    }

    let node = new ListNode(sum);               // 8) create new node with val as sum
    prev.next = node;                           // 9) update prevNode to point next to new node we just made
    prev = node;                                // 10) reassign prevNode to be the new node we just made
    sum = carry;                                // 11) reassign sum to carry (so we can "rememmber" the carry value in the next loop)
    carry = 0;                                  // 12) reset carry to 0
  }

	if (sum > 0) {																// 13) edge case if input ex. 5, 5. We need sum > 0 incase we're only given 2 single digit numbers (l1, l2) = (5, 5)
		prev.next = new ListNode(sum);
	}

  return result.next;                           // 14) return .next bec. the first node is Node(-1) in  -1 -> 7 -> 0 -> 8
}


// *****************************************************************************
// SOLUTION V3- BASIC MATH (like how you would solve w/ pen/paper with "carry")
//		Leetcode Java Solution- less complicated while loop, but if statement at end needed for edge case if input is single digit ex. 5, 5
//		More intuitive carrying logic
// TIME COMPLEXITY:   O( Max(m, n) ),   m = List 1 length,   n = list 2 length 
// SPACE COMPLEXITY:  O( Max(m, n) )
// (ListNode 1, ListNode 2)       =>  ListNode
// (2 -> 4 -> 3,  5 -> 6 -> 4)    =>  7 -> 0 -> 8
function addTwoNumbers(l1, l2) {
	let result = new ListNode(-1);                // 1) create new Node (doesn't matter what val is bec. we're returning this nodes next node, -1 to indicate -1 indexing)
  let prev = result;                            // 2) create temp var to track previousNode, initialize to new Node we just made
  let sum = 0;                                  // 3) create vars to track sum and carry
  let carry = 0;

  // loop through lists 1 node at a time until we reach both ends
  while (l1 || l2) {                 						// 4) keep looping while l1 or l2 exist (i.e. not null)
		let x = l1 ? l1.val : 0;										// 5) temp vars for l1 and l2 vals if they exist
		let y = l2 ? l2.val : 0;

		sum = carry + x + y;												// 6) sum = carry (from prev loop) + x + y

		carry = sum >= 10 ? 1 : 0;									// 7) if sum >= 10, we have to carry! reset carry otherwise

		let ones = sum % 10;												// 8) grab ones digit from sum

		let node = new ListNode(ones);              // 8) create new node with val as ones digit
		prev.next = node;                           // 9) update prevNode to point next to new node we just made
		prev = node;																// 10) update prevNode as new node we just made

		if (l1) l1 = l1.next;												// 11) if l1 and l2 exist, update them to their next node
		if (l2) l2 = l2.next;
  }

	if (carry > 0) {															// 12) edge case if last two numbers sum >= 10 (ex. 5 + 5, or 23 + 99)
		prev.next = new ListNode(carry);
	}

  return result.next;                           // 13) return .next bec. the first node is Node(-1) in  -1 -> 7 -> 0 -> 8
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
console.log(stringify(sum) === '7 -> 0 -> 8' ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');

// EXAMPLE 2:   
// (5) + (5)                                  //=> 0 -> 1
l1Node1 = new ListNode(5);
l2Node1 = new ListNode(5);
sum = addTwoNumbers(l1Node1, l2Node1);
console.log(stringify(sum));                  //=> '0 -> 1'
console.log(stringify(sum) === '0 -> 1' ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');


// EXAMPLE 3:   
// (3 -> 4) + (9)                             //=> 2 -> 5
l1Node1 = new ListNode(3);
l1Node2 = new ListNode(4);
l2Node1 = new ListNode(9);
l1Node1.next = l1Node2;
sum = addTwoNumbers(l1Node1, l2Node1);
console.log(stringify(sum));                  //=> '2 -> 5'
console.log(stringify(sum) === '2 -> 5' ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');


// EXAMPLE 4:   
// (3 -> 2) + (9 -> 9)                        //=> 1 -> 2 -> 2
l1Node1 = new ListNode(3);
l1Node2 = new ListNode(2);
l2Node1 = new ListNode(9);
l2Node2 = new ListNode(9);
l1Node1.next = l1Node2;
l2Node1.next = l2Node2;
sum = addTwoNumbers(l1Node1, l2Node1);
console.log(stringify(sum));                  //=> '2 -> 2 -> 1'
console.log(stringify(sum) === '2 -> 2 -> 1' ? 'PASS' : 'FAIL');
console.log('--------------');
console.log(' ');


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