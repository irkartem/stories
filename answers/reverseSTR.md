Write a function to reverse a string

We have a string. 

What is the length of string?

Is string can handle in memory? 

def reverse(s):
    ns = ''
    for i in range(len(s),0,-1):
        ns += s[i]
    retunr ns

O(n) one run per string 

def inplaceReverse(s):
    lst = s.split('') #not shure
    # second way = [s[x] for x in range(len(s))]
    s =0 
    e = len(lst)
    while s<e:
        lst[s],lst[e] = lst[e],lst[s]
        s += 1
        e -= 1

