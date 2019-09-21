[2, 7, 1, 0, 6], 8   => [ [1, 2], [0, 4] ]
def two_sum(arr, target)
  # 2D array to return
  pairs = []

  # create hash to store complementary nums to each num in array that add up to target
  complements = {}

  # loop through each num in array
  arr.each_with_index do |num, i|
    # calculate complement = target - num
    complement = target - num

    # populate hash's k/v with num/current index
    complements[num] = i

    # check if complement is a key in hash, bec that means we have 2 nums that add to up target
    if complements[complement]

      # push indicies as an array to outside array (to return later)
      pairs << [complements[complement], i]
    end
  end

  # return pairs 2D array outside loop
  pairs
end

p two_sum([2, 7, 1, 0, 6], 8)