Given two strings, check whether the first string is a substring of the second string. What is the runtime of your algorithm?

I have the couple of strings, and should check is a first substring of second. 

Should clarify what is mena 'is substring', does position of chars is improtant?


Whole first string can be substring of second if first length of string is less than second. 

Let me use String A and string B 

def checkSubstr(s1, s2)
   for i in range(len(s2)-len(s1)+1):
      cntn = True
      si = 0
      while cntn == True:
         if s2[i+si] == s1[si]:
             si += 1
             if si > len(s1):
                 return True
         else:
             cntn = False
      

I have two variables m and n. It's length of s1 ans s2. 

we will iteract (n-m)*(n)

