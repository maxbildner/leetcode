// LC 01 Two Sum
// EASY
// Given an array of integers, return indices of the two numbers such that they 
// add up to a specific target. You may assume that each input would have 
// exactly one solution, and you may not use the same element twice.
// https://leetcode.com/problems/two-sum/
// Ex1.
// Input:  nums = [2, 7, 11, 15], target = 9,
// Output: [0, 1]  Because nums[0] + nums[1] = 2 + 7 = 9


// SOLUTION1- Hash Table
// Time Complexity:  O(n), where n = input array length
// Space Complexity: O(n) 
// Solution Description: 
//  0  1  2  3  4
// [ 2, 7, 11, 15 ], 9   => [ 0, 1 ]

import java.util.Arrays;      // for testing (Arrays.toString())
import java.util.HashMap;     // import HashMap class
import java.util.ArrayList;   // for version2

class LC_1_TwoSum {

  public static int[] twoSum(int[] nums, int target) {

    // create array to return (fixed size since only 1 answer)
    int[] result = new int[2];

    // create hash table, keys/values are Integers
    HashMap<Integer, Integer> hashTable = new HashMap<Integer, Integer>();

    // loop through numbers
    for (int i = 0; i < nums.length; i++) {

      int num = nums[i];
      
      // calculate complementary number
      int complement = target - num;                                     

      // if hash table contains complement
      if (hashTable.get(complement) != null) {
        
        // populate result array with indices
        result[1] = i;
        result[0] = hashTable.get(complement);
        return result;
      } 
      
      // hash table doesnt contain complement, so update hash table
      hashTable.put(num, i);
      
    }
    
    return result;
  }


  // DOESNT WORK
  // // assumes there could be multiple pairs of answers
  // public static ArrayList twoSumV2(int[] nums, int target) {

  //   // create dynamic size array to return
  //   ArrayList<ArrayList<Integer>> results = new ArrayList<ArrayList<Integer>>();

  //   // create hash table, keys/values are Integers
  //   HashMap<Integer, Integer> hashTable = new HashMap<Integer, Integer>();

  //   // loop through numbers
  //   for (int i = 0; i < nums.length; i++) {

  //     int num = nums[i];
      
  //     // calculate complementary number
  //     int complement = target - num;                                     

  //     // hash table doesnt contain complement, so update hash table
  //     hashTable.put(num, i);

  //     // if hash table contains complement
  //     if (hashTable.get(complement) != null) {
  //       // System.out.println(i);
        
  //       ArrayList<Integer> pair = new ArrayList<Integer>();

  //       // populate pair array with indices
  //       pair.set(1, i);
  //       pair.set(0, hashTable.get(complement));
        
  //       // add pair to results
  //       results.add(pair);
  //     }       
  //   }
    
  //   return results;
  // }


  // larger element must appear after smaller
  // [ 2, 3, 10, 6, 4, 8, 1 ]   => 8 (diff between 10 - 2)
  public static int maxDifference(int[] nums) {

    // assume there are at least 2 integers in the array

    // var to track currentMaxDiff
    int maxDiff = nums[1] - nums[0];
    //  maxDiff = 3 - 2 = 1

    // loop through nums
    for (int i = 0; i < nums.length; i++) {

      // loop again through nums
      for (int j = i + 1; j < nums.length; j++) {

        if (nums[j] - nums[i] > maxDiff) {

          maxDiff = nums[j] - nums[i];
        }
      }
    }
    
    return maxDiff;
  }


  // Main- Entry Point (for testing)
  public static void main(String[] args) {

    // TWO SUM PROBLEM
    int[] nums = { 2, 7, 11, 15 };
    int target = 9;
    // System.out.println(Arrays.toString(twoSum(nums, target)));          //=> [ 0, 1]

    int[] nums2 = { 2, 7, 1, 8 };
    // System.out.println(ArrayList.toString(twoSumV2(nums2, target)));    //=> [ [0, 1], [2, 3] ]


    // MAX DIFFERENCE PROBLEM
    int[] nums3 = { 2, 3, 10, 6, 4, 8, 1 };
    int[] nums4 = { 7, 9, 5, 6, 3, 2 };
    // System.out.println(maxDifference(nums3));       //=> 8    (10 - 2)
    // System.out.println(maxDifference(nums4));       //=> 2    (7 - 9)


  }
}