// LC 206 Reverse Linked List
// EASY
// Reverse a singly linked list
// https://leetcode.com/problems/reverse-linked-list/
// Input:  1 -> 2 -> 3 -> 4 -> 5 -> NULL
// Output: 5 -> 4 -> 3 -> 2 -> 1 -> NULL

// Definition for singly linked list
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// SOLUTION V1- Iterative- O(n) Time, O(1) Space, where n = list length
// Non Mutative of input head?
// Takes in head list node, returns new head where subsequent nodes are reversed from original
const reverseList = function(head) {
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





// // VERSION2- Iterative O(n) Time, O(1) Space?- MUTATES HEAD?-
// var reverseList = function (head) {
//     let prev = null;

//     while (head !== null) {

//         // Capture next node
//         let next = head.next;
//         // 1:   next = 1.next = 2
//         // 2:   next = 2.next = 3
//         // 3:   next = 3.next = null

//         // Re assign Next node to Previous node
//         head.next = prev;
//         // 1:   1.next -> null
//         // 2:   2.next -> 1
//         // 3:   3.next -> 2

//         // Re assign Previous node to Head
//         prev = head;
//         // 1:   prev = 1
//         // 2:   prev = 2
//         // 3:   prev = 3

//         // Re assign Head to Next
//         head = next;
//         // 1:   head = 2
//         // 2:   head = 3
//         // 3:   head = null
//     }

//     return prev;
// };