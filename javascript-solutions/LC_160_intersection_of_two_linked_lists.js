// LC 160 Intersection of Two Linked Lists
// EASY
// https://leetcode.com/problems/intersection-of-two-linked-lists/
// Given two head nodes, write a function linkedListIntersection that 
// returns the node at which the intersection of two singly linked lists 
// begins, or null if there is no such intersection.
// ---------- 
// Example 1:
// ----------
// Should return node D as the node of intersection.
// 
//  A → B → C
//           ↘
//             D → E → F
//           ↗
//      X → Y
//
// ---------- 
// Example 2:
// ----------
// Should return null as there is no point of intersection.
// 
//    A → B → C → D
//
//    X → Y → Z
// 
// Leetcode Definition for singly - linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}


// *****************************************************************************
// VERSION 1- HASH TABLE/SET, Easy to understand, but uses more memory than V2
// TIME COMPLEXITY: O(M + N)        M = list1 length,  N = list2 length
// SPACE COMPLEXITY: O(M) or O(N)   depending on which list you use to store the hash/set
function linkedListIntersection(head1, head2) {
  let list1Nodes = new Set();

  while (head1) {                                                               // 1) loop through list1 and store nodes in hash table/set
    list1Nodes.add(head1);
    head1 = head1.next;
  }

  while (head2) {                                                               // 2) loop through list2 and see if any nodes are in list1Nodes
    if (list1Nodes.has(head2)) return head2;
    head2 = head2.next;
  }

  return null;                                                                  // 3) return null if we reach this point, no intersection
}




// *****************************************************************************
// VERSION 2- 2 POINTERS BEST SOLUTION
// LC 160 Intersection of Two Linked Lists
// TIME COMPLEXITY: O(M + N)        M = list1 length,  N = list2 length
// SPACE COMPLEXITY: O(1)   
function linkedListIntersection(head1, head2) {
  if (!head1 || !head2) return null;                                            // 1) return null if either list is empty

  let pNode1 = head1;                                                           // 2) initialize 2 pointers to both heads
  let pNode2 = head2;

  while (pNode1 != pNode2) {                                                    // 3) keep looping as long as node pointers are different. loop through both lists one node at a time
    pNode1 = pNode1 == null ? head2 : pNode1.next;                              // 4) update each node to the next node, unless node reaches end of its list- then update it to the head of opposite list
    pNode2 = pNode2 == null ? head1 : pNode2.next;
  }

  return pNode1;                                                                // 5) return either pointer (they will be the same or null)
}