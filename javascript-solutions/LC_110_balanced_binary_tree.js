// LC 110 Maximum Depth of Binary Tree
// EASY
// https://leetcode.com/problems/balanced-binary-tree/
//
// Given a binary tree, determine if it is height-balanced.
// For this problem, a height - balanced binary tree is defined as:
// a binary tree in which the left and right subtrees of every node differ in 
// height by no more than 1.
//
// Example 1:
// Given binary tree [3, 9, 20, null, null, 15, 7],
// 			 3
// 			/ \
// 		 9  20
// 			 /  \
// 		  15   7
// Return true
//
// Example 2:
// Given binary tree [1,2,2,3,3,null,null,4,4]
//          1
//         / \
//        2   2
//       / \
//      3   3
//     / \
//    4   4
// Return false
//
// Definition of TreeNode:
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}



// *****************************************************************************
// VERSION 1 
// TIME COMPLEXITY:  O(),			
// SPACE COMPLEXITY: O()		

function isBalanced(root) {
  if (!root) return true;                                                       // if no root, tree is balanced

  let heightDiff = Math.abs(treeHeight(root.left) - treeHeight(root.right));    // get height diff btwn left subtree - height right subtree

  return (heightDiff <= 1) && isBalanced(root.left) && isBalanced(root.right);  // recursively check if left subtree and right subtree are balanced
}

// HELPER
// (node) => Number
function treeHeight(node) {
  if (!node) return 0;                                                          // base case- if there's no node, height is 0 (empty root is still a tree!)
  return Math.max(treeHeight(node.left), treeHeight(node.right)) + 1;           // max of left and right subtrees. + 1 for current node
}
















// PRACTICE
// TIME: 16M
// *****************************************************************************
// TIME COMPLEXITY:  O(),			
// SPACE COMPLEXITY: O()	

// treeNode  =>  boolean
function isBalanced(root) {
 
}


// HELPER
// (node) => Number
function treeHeight(node) {
 
}


// EXAMPLE 1:
// 			 3
// 			/ \
// 		 9  20
// 			 /  \
// 		  15   7
//
let three1 = new TreeNode(3);
let nine = new TreeNode(9);
let twenty = new TreeNode(20);
let fifteen = new TreeNode(15);
let seven1 = new TreeNode(7);
three1.left = nine;
three1.right = twenty;
twenty.right = seven1;
twenty.left = fifteen;
// console.log(treeHeight(three1));           //=> 2
console.log(isBalanced(three1));              //=> true


// EXAMPLE 2:
//          1
//         / \
//        2   3
//       / \
//      4   5
//     / \
//    6   7
let one = new TreeNode(1);
let two = new TreeNode(2);
let three = new TreeNode(3);
let four = new TreeNode(4);
let five = new TreeNode(5);
let six = new TreeNode(6);
let seven = new TreeNode(7);
one.left = two;
one.right = three;
two.left = four;
two.right = five;
four.left = six;
four.right = seven;
// console.log(treeHeight(one));             //=> 3
console.log(isBalanced(one));                //=> false


// EXAMPLE 3:
console.log(isBalanced());                    //=> true

// EXAMPLE 4:
//          1
//         / \
//        2   3
//       /     \
//      4       5
//     / 
//    6   
one = new TreeNode(1);
two = new TreeNode(2);
three = new TreeNode(3);
four = new TreeNode(4);
five = new TreeNode(5);
six = new TreeNode(6);
one.left = two;
one.right = three;
two.left = four;
three.right = five;
four.left = six;
console.log(isBalanced(one));                 //=> false


// EXAMPLE 5:
//          1
//         / \
//        2   3
//       /     \
//      4       5
//     / \
//    6   7
one = new TreeNode(1);
two = new TreeNode(2);
three = new TreeNode(3);
four = new TreeNode(4);
five = new TreeNode(5);
six = new TreeNode(6);
one.left = two;
one.right = three;
two.left = four;
three.right = five;
four.left = six;
four.right = seven;
console.log(isBalanced(one));                 //=> false