// Ex1.
		// for person at i = 0
		// children are located at positions: 2i + 1, and 2i + 2 
		// ancestors = { 1, 2, 3, 4, 5, 6 }
		// idx   		 0  1  2  3  4  5
		// children at positions:  
		// 2i + 1, and 2i + 2
		// 2(0) + 1, and 2(0) + 2
		// 1, and 2
		// ancestors[1] = 2,		ancestors[2] = 3
		// 2 and 3 are therefore siblings of i (0)