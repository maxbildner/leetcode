// LC 207 Course Schedule
// MEDIUM
// https://leetcode.com/problems/course-schedule/
// INPUTS: Number, Array
// OUTPUT: Boolean
// 
// There are a total of numCourses courses you have to take, labeled from 0 to 
// numCourses-1. Some courses may have prerequisites, for example to take course 
// 0 you have to first take course 1, which is expressed as a pair: [0, 1]
// Given the total number of courses and a list of prerequisite pairs, is it 
// possible for you to finish all courses ?
// 
// EXAMPLE 1:
// Input:  numCourses = 2, prerequisites = [ [1, 0] ]
// Output: true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.
//
// EXAMPLE 2:
// Input:  numCourses = 2, prerequisites = [[1, 0], [0, 1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you 
// should also have finished course 1. So it is impossible.
//
// Constraints:
// - The input prerequisites is a graph represented by a list of edges, not 
//   adjacency matrices. Read more about how a graph is represented. 
// - You may assume that there are no duplicate edges in the input prerequisites
// - 1 <= numCourses <= 10 ^ 5


// *****************************************************************************
// SOLUTION V1- AA SOLUTION TOPOLOGICAL SORT/GRAPH. Doesn't use numCourses input
// TIME COMPLEXITY:   O(E + V),   E = Number of courses, V = number of dependencies
//    takes us E time to build graph, then like a DFS takes E + V to traverse
//    E + E + V  ->   2E + V    -> E + V
// SPACE COMPLEXITY:  O(E + V)

// (2, [[0, 1]])     =>    true
var canFinish = function (numCourses, prerequisitesEdges) {
  if (prerequisitesEdges.length === 0) return true;                             // edge case if there are no prerequisiteEdges                          

  let prerequisites = buildGraph(prerequisitesEdges);                           // 1) convert directed edges to graph w/ adjaceny list where:  keys = course num,  values = array of prereq courses needed
  // prerequisites = { '0': [ '1' ], '1': [] }
  
  let completed = new Set();                                                    // 2) var to track courses completed
  let totalCourses = Object.keys(prerequisites).length;
  let traversedAllNodes = false;

  while (!traversedAllNodes) {                                                  // 3) need to traverse graph. continuously traverse it until we hit all nodes  
    traversedAllNodes = true;

    for (let course in prerequisites) {                                         // 4) loop through keys (courses) in prereqs graph
      let prereqs = prerequisites[course];
      let prereqsCompleted = prereqs.every((prereq) => completed.has(prereq));  // 5) check if all preq courses have been completed for current course

      if (prereqsCompleted && !completed.has(course)) {                         // 6) if all prereqs completed AND we havent taken the course, we can take course
        completed.add(course);
        traversedAllNodes = false;                                              // 7) if we dont toggle flag, we won't run inner loop again
      } 
    }
  }
  // completed = { '1', '0' }
  
  return completed.size === totalCourses;                                       // check if courses completed == numCourses requried
};


// HELPER
// ([ [0, 1] ])  =>  { '0': [ '1' ], '1': [] }
// TIME COMPLEXITY:   O(N),   N = array pairs length (num of directed edges in graph)
// SPACE COMPLEXITY: 
function buildGraph(pairs) {
  let graph = {};

  for (let i = 0; i < pairs.length; i++) {                                      // loop through 2D array pairs
    let pair = pairs[i];
    let course = String(pair[0]);
    let prereq = String(pair[1]);
    // i = 0:   pair = [ 0, 1 ]   course = 0    prereq = 1

    if (course in graph) {                                                      // if course in graph (ie. course is a key in graph)
      graph[course].push(prereq);

    } else {                                                                    // course not in graph 
      graph[course] = [ prereq ];
      // i = 0:   graph = { 0: [ 1 ] }
    }

    if (!(prereq in graph)) graph[prereq] = [];                                 // if prereq doesn't have its own prereq, put it in graph
  }

  return graph;
}
// console.log(buildGraph([[0, 1]]));                  //=> { '0': [ '1' ], '1': [] }
// console.log(buildGraph([[1, 0]]));                  //=> { '0': [], '1': ['0'] }
// console.log(buildGraph([[1, 0], [0, 1]]));          //=> { '0': [ '1' ], '1': [ '0' ] }


// console.log(canFinish(3, [[1, 0]]));              //=> true  ?! how
// console.log(canFinish(2, [[0, 1]]));              //=> true
// console.log(canFinish(2, [[1, 0]]));              //=> true
// console.log(canFinish(1, []));                    //=> true
// console.log(canFinish(2, [[1, 0], [0, 1]]));      //=> false





// *****************************************************************************
// SOLUTION V1- AA SOLUTION TOPOLOGICAL SORT/GRAPH. Doesn't use numCourses input
// TIME COMPLEXITY:   O(E + V),   E = Number of courses, V = number of dependencies
//    takes us E time to build graph, then like a DFS takes E + V to traverse
//    E + E + V  ->   2E + V    -> E + V
// SPACE COMPLEXITY:  O(E + V)

// (2, [[0, 1]])     =>    true
var canFinish = function (numCourses, prerequisitesEdges) {

};


// HELPER
// ([ [0, 1] ])  =>  { '0': [ '1' ], '1': [] }
// TIME COMPLEXITY:   O(N),   N = array pairs length (num of directed edges in graph)
// SPACE COMPLEXITY: 
function buildGraph(edges) {
}
// console.log(buildGraph([[0, 1]]));                  //=> { '0': [ '1' ], '1': [] }
// console.log(buildGraph([[1, 0]]));                  //=> { '0': [], '1': ['0'] }
// console.log(buildGraph([[1, 0], [0, 1]]));          //=> { '0': [ '1' ], '1': [ '0' ] }
// console.log(buildGraph([]));                        //=> { }


// console.log(canFinish(3, [[1, 0]]));              //=> true  ?! how
// console.log(canFinish(2, [[0, 1]]));              //=> true
// console.log(canFinish(2, [[1, 0]]));              //=> true
// console.log(canFinish(1, []));                    //=> true
// console.log(canFinish(2, [[1, 0], [0, 1]]));      //=> false




