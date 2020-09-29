// LC 543 Diameter of Binary Tree
// EASY
// https://leetcode.com/problems/diameter-of-binary-tree/
//
// Given a binary tree, you need to compute the length of the diameter of the 
// tree. The diameter of a binary tree is the length of the longest path between 
// any two nodes in a tree. This path may or may not pass through the root.
//
// Example:
// Given a binary tree
//      1
//     / \
//    2   3
//   / \
//  4   5
// 
// Return 3, which is the length of the path[4, 2, 1, 3] or[5, 2, 1, 3].
// Note: The length of path between two nodes is represented by the number of 
// edges between them.
// 
// Definition of TreeNode:
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}



// *****************************************************************************
// VERSION 1- DFS
// TIME COMPLEXITY:  O(N)     N = Number of nodes in tree
// SPACE COMPLEXITY: O(N)     Recursive stack

var diameterOfBinaryTree = function (root) {
  let diameter = 0;
  dfs(root);          // => 3
  return diameter;    // => 3    

  // since we don't know if the path will go through the root or not we will have to get the max between(path that visits the root, or the path that doesn't go through the root.)
  function dfs(node) {
    if (!node) return 0;
    // 1: Node{ val:1, left:Node, right:Node }   false
    // 2: Node{ val:2, left:Node, right:Node }   false
    // 3: Node{ val:4, left:null, right:null }   false
    // 4: null                                   true
    // 5: null                                   true
    // 6: Node{ val:5, left:null, right:null })  false
    // 7: null                                   true
    // 8: null                                   true
    // 9: Node{ val:3, left:null, right:null })  false
    // 10: null  true
    // 11: null  true

    const left = dfs(node.left);
    // 1: left = dfs({val:2, left:Node, right:Node})    => 2
    // 2: left = dfs({val:4, left:null, right:null})    => 1
    // 3: left = dfs(null)  => 0
    // 6: left = dfs(null)  => 0
    // 9: left = dfs(null)  => 0

    const right = dfs(node.right);
    // 3: right = dfs(null)  => 0
    // 2: right = dfs({val:5, left:null, right:null})   => 1
    // 6: right = dfs(null)  => 0
    // 1: right = dfs({val:3, left:null, right:null})  => 1
    // 9: right = dfs(null)  => 0

    // update diameter at every node, if the path doesn't go through the root we just get the max of them
    diameter = Math.max(diameter, left + right);
    // 3: diameter = max(0, 0 + 0)  => 0
    // 6: diameter = max(0, 1 + 0)  => 1
    // 2: diameter = max(1, 1 + 1)  => 2
    // 9: diameter = max(2, 0 + 0)  => 2
    // 1: diameter = max(2, 2 + 1)  => 3

    // update the largest number of edge so far, the path goes through the root so we add 1(for the root)
    return 1 + Math.max(left, right);
    // 3: return 1 + max(0, 0)      => 1
    // 6: return 1 + max(0, 0)      => 1
    // 2: return 1 + max(1, 1)      => 2
    // 9: return 1 + max(0, 0)      => 1
    // 1: return 1 + max(2, 1)      => 3
  }
};



// EXAMPLE 1:
//      1
//     / \
//    2   3
//   / \
//  4   5
let n1 = new TreeNode(1);
let n2 = new TreeNode(2);
let n3 = new TreeNode(3);
let n4 = new TreeNode(4);
let n5 = new TreeNode(5);
n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;
console.log(diameterOfBinaryTree(n1));    //=> 3