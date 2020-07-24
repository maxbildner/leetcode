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
// var canFinish = function (numCourses, prerequisites) {
//   if (prerequisites.length === 0) return true;

//   let graph = buildGraph(prerequisites);                                        // 1) build graph with adjaceny list. keys = course numbers, values = array of prerequisite course numbers
//   // graph = { '0': [ '1' ], '1': [] }

//   let totalCourses = Object.keys(graph).length;
//   let completed = new Set();                                                    // 2) set to hold courses able to be completed

//   let eligibleCourseExists = true;                                              // 3) bool flag to break out of loop/check for cycles

//   while (eligibleCourseExists) {                                                // 4) wrap looping of keys in graph in loop (like bubble sort with boolean flag)
//     eligibleCourseExists = false;

//     for (let course in graph) {                                                 // 5) loop through keys in graph
  
//       let everyPreMet = graph[course].every(pre => completed.has(pre));         // 6) check if every prereq for course has been completed
  
//       if (!completed.has(course) && everyPreMet) {                              // 7) if course has NOT been completed AND everyPrereq met, take course
//         completed.add(course);
//         eligibleCourseExists = true;
//       }
//     }
//   }

//   return completed.size === totalCourses;                                       // 8) check if number of courses able to be completed == totalCourses requried to take
// };


// // HELPER
// // ([ [0, 1] ])  =>  { '0': [ '1' ], '1': [] }
// function buildGraph(pairs) {
//   let graph = {};                                                               // keys = course number,  values = array of prereq course numbers

//   pairs.forEach((pair) => {                                                     // 1) loop through pairs 2D array
//     let course = String(pair[0]);
//     let prereq = String(pair[1]);

//     if (graph[course] !== undefined) {                                          // 2) if course already in graph, push prereq to prereqs array in graph
//       graph[course].push(prereq);

//     } else {                                                                    // 3) if course not in graph, make it one with val of array with prereq inside
//       graph[course] = [ prereq ];
//     }

//     if (graph[prereq] === undefined) {                                          // 4) if prereq doesnt have its own prereq, put it in graph w/ empty []
//       graph[prereq] = [];
//     }
//   });

//   return graph;
// }
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
  if (prerequisitesEdges.length === 0) return true;                             // edge case if there are no prerequisiteEdges                          

  // 1) convert directed edges to graph w/ adjaceny list where:  keys = course num,  values = array of prereq courses needed
  let prerequisites = buildGraph(prerequisitesEdges);
  // prerequisites = { '0': [ '1' ], '1': [] }
  
  // 2) var to track courses completed
  let completed = new Set();

  let totalCourses = Object.keys(prerequisites).length;

  let traversedAllNodes = false;

  // 3) need to traverse graph. continuously traverse it until we hit all nodes
  while (!traversedAllNodes) {
    
    traversedAllNodes = true;

    // 4) loop through keys (courses) in prereqs graph
    for (let course in prerequisites) {
      let prereqs = prerequisites[course];

      // 5) check if all preq courses have been completed for current course
      let prereqsCompleted = prereqs.every((prereq) => completed.has(prereq));

      // 6) if all prereqs completed AND we havent taken the course, we can take course
      if (prereqsCompleted && !completed.has(course)) {     
        completed.add(course);

        // 7) if we dont toggle flag, we won't run inner loop again
        traversedAllNodes = false;
      } 
    }
  }
  // completed = { '1', '0' }
  

  // check if courses completed == numCourses requried
  return completed.size === totalCourses;
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


console.log(canFinish(3, [[1, 0]]));              //=> true  ?! how
console.log(canFinish(2, [[0, 1]]));              //=> true
console.log(canFinish(2, [[1, 0]]));              //=> true
console.log(canFinish(1, []));                    //=> true
console.log(canFinish(2, [[1, 0], [0, 1]]));      //=> false




