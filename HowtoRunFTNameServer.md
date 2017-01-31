Tasks: you have ~10000 slave dns servers. Need to organize master server for them. 

#named

First decision was use default named. But it has some problem:
* server must have huge count of RAM
* too slow start
* domain data situated at file

Pros:
* domain data situated at file

Was very unstable solution. Named does not work with big count of domains 

#nsd


#PowerDNS
