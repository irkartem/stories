9.) Write a function that gives the number of possible ways one can combine quarters, dimes, and nickels to form n cents (0 is a possibility).


def count_change(n):
  if n == 0:
    return 1

  if n < 5:
    return 0
  elif n < 10:
    return count_change(n - 5)
  elif n < 25:
    return count_change(n-5) + count_change(n - 10)
  else:
    return count_change(n - 25) + count_change(n - 10) + count_change(n - 5)


