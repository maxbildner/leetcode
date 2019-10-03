# LC 206 Reverse Linked List
# EASY
# Reverse a singly linked list
# https://leetcode.com/problems/reverse-linked-list/
# Input:  1 -> 2 -> 3 -> 4 -> 5 -> NULL
# Output: 5 -> 4 -> 3 -> 2 -> 1 -> NULL

# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val)
#         @val = val
#         @next = nil
#     end
# end

# SOLUTION V1- Iterative- O(n) Time, O(1) Space, where n = list length
# Non-mutative of input
# Takes in head list node, returns new head where subsequent nodes are reversed from original
# @param {ListNode} head
# @return {ListNode}
def reverse_list(head)
  # make copy of head (will be current node)
  currentNode = head

  # make var to hold previous node initialize to null (we will return this)
  previousNode = nil

  # traverse through linked list
  while currentNode != nil
    # make temp copy of next node
    temp = currentNode.next

    # make current node point to previous
    currentNode.next = previousNode

    # set previous to current
    previousNode = currentNode

    # set current to temp
    currentNode = temp
  end

  return previousNode
end