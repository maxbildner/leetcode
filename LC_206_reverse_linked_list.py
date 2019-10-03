# LC 206 Reverse Linked List
# EASY
# Reverse a singly linked list
# https://leetcode.com/problems/reverse-linked-list/
# Input:  1 -> 2 -> 3 -> 4 -> 5 -> NULL
# Output: 5 -> 4 -> 3 -> 2 -> 1 -> NULL

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

# MUTEATES INPUT HEAD NODE
class Solution:
  def reverseList(self, head: ListNode) -> ListNode:
    # make var to track previous node, initialize to None (will return)
    previous = None

    # traverse linked list (note* head is current node)
    while head is not None:
      # set next var set to next node
      next = head.next

      # make next node point to previous
      head.next = previous

      # set previous node to head (current)
      previous = head

      # set head (current) to next
      head = next

    return previous

