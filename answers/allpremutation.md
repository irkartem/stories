
permute array
    if array is of size 2
       return first and second element as new array
       return second and first element as new array
    else
        for each element in array
            new subarray = array with excluded element
            return element + permute subarray


