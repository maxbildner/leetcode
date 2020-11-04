// LC 104 Maximum Depth of Binary Tree
// EASY
// https://leetcode.com/problems/maximum-depth-of-binary-tree/
//
// Given a binary tree, find its maximum depth.
// The maximum depth is the number of nodes along the longest path from the root 
// node down to the farthest leaf node.
// Note: A leaf is a node with no children.
//
// Example:
// Given binary tree [3, 9, 20, null, null, 15, 7],
// 			 3
// 			/ \
// 		 9  20
// 			 /  \
// 		  15   7
// Return its depth = 3
// 
// Leetcode Definition for a binary tree node:
// function TreeNode(val, left, right) {
// 		this.val = (val===undefined ? 0 : val)
// 		this.left = (left===undefined ? null : left)
// 		this.right = (right===undefined ? null : right)
// }
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}


// *****************************************************************************
// VERSION 1 RECURSION
// TIME COMPLEXITY:  O(N),			N = Number of nodes in tree
// SPACE COMPLEXITY: O(N)				worst case, tree unbalanced so recursion call would occur N times (each node only has a left child)

// (TreeNode) => Number
var maxDepth = function (treeNode) {
  if (!treeNode) return 0;                                                      // base case if there's no tree, depth is 0 
  return Math.max(maxDepth(treeNode.left), maxDepth(treeNode.right)) + 1;
};


// EXAMPLE 1:
// 			 3
// 			/ \
// 		 9  20
// 			 /  \
// 		  15   7
//
// let three = new TreeNode(3);
// let nine = new TreeNode(9);
// let twenty = new TreeNode(20);
// let fifteen = new TreeNode(15);
// let seven = new TreeNode(7);
// three.left = nine;
// three.right = twenty;
// twenty.right = seven;
// twenty.left = fifteen;
// console.log(maxDepth(nine));              //=> 1
// console.log(maxDepth(twenty));            //=> 2
// console.log(maxDepth(three));             //=> 3



// *****************************************************************************
// VERSION 2 ITERATIVE- mimic behavior of recursive call stack with array stack (and DFS?)
// TIME COMPLEXITY:  O(N),			N = Number of nodes in tree
// SPACE COMPLEXITY: O(N)				worst case, tree unbalanced so loop would occur N times (each node only has a left child)

// (TreeNode)   => Number
// (TreeNode3)  => 3
var maxDepth = function (treeNode) {
  let stack = [];
  if (treeNode) stack.push([1, treeNode]);                                      // if treeNode exists, push array of [ currentDepth, treeNode ] to stack
  // stack = [ [1, TreeNode3 ] ]

  let depth = 0;
  let i = 1;
  while (stack.length !== 0) {                                                  // while stack is not empty
    let [currentDepth, treeNode] = stack.pop();                                 // remove last item array from stack, and destructure it/assign to variables
    if (treeNode) {                                                             // if treeNode exists
      depth = Math.max(depth, currentDepth);                                    // update depth as the larger of depth and currentDepth
      stack.push([ currentDepth + 1, treeNode.left ]);                          // add next item to stack (left child node)
      stack.push([ currentDepth + 1, treeNode.right ]);                         // add next item to stack (right child node)
    }   
    i++;
  }

  return depth;
};


// EXAMPLE 1:
// 			 3
// 			/ \
// 		 9  20
// 			 /  \
// 		  15   7
//
// let three = new TreeNode(3);
// let nine = new TreeNode(9);
// let twenty = new TreeNode(20);
// let fifteen = new TreeNode(15);
// let seven = new TreeNode(7);
// three.left = nine;
// three.right = twenty;
// twenty.right = seven;
// twenty.left = fifteen;
// // console.log(maxDepth(nine));              //=> 1
// // console.log(maxDepth(twenty));            //=> 2
// console.log(maxDepth(three));             //=> 3




// *****************************************************************************
// VERSION 1 RECURSION PRACTICE
// TIME COMPLEXITY:  O(N),			N = Number of nodes in tree
// SPACE COMPLEXITY: O(N)				worst case, tree unbalanced so recursion call would occur N times (each node only has a left child)

// (TreeNode) => Number
var maxDepth = function (treeNode) {

};


// EXAMPLE 1:
// 			 3
// 			/ \
// 		 9  20
// 			 /  \
// 		  15   7
//
let three = new TreeNode(3);
let nine = new TreeNode(9);
let twenty = new TreeNode(20);
let fifteen = new TreeNode(15);
let seven = new TreeNode(7);
three.left = nine;
three.right = twenty;
twenty.right = seven;
twenty.left = fifteen;
console.log(maxDepth(nine));              //=> 1
console.log(maxDepth(twenty));            //=> 2
console.log(maxDepth(three));             //=> 3