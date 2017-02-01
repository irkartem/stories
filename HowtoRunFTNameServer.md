Tasks: you have ~10000 master dns servers. Need to organize one slave server for them. It will be hoster NS server. 

#named (120 000 domains)

First decision was use default named. But it has some problem:
* server must have huge count of RAM
* too slow start
* domain data situated at file

Pros:
* domain data situated at file

Was very unstable solution. Named does not work with big count of domains 

#nsd (120 000 domains)

NSD uses zone information compiled via 'zonec' into a binary database file (nsd.db) which allows fast startup of the NSD name-service daemon, and allows syntax-structural errors in Zone-Files to be flagged at compile-time. After named it was very fast and very cool working. 

Cons:
- Domains structure stores at binary db, and can't be edited by simple.
- Problem with transfer domains from master. Sometimes it's doesn't work. 

#PowerDNS (170 000 domains) 
This our current solution. Domains data stored at mysql database, can be edited by sql. pdns_server process rsize 350m. We have mysql replication for hight avaibility and backup. 

But... PowerDNS slaves not updating all slave domains from masters. Pdns has timeout for queue runtime. After that it will start queue from begin. And if you have huge count of domains update will be failed for mos of them.

We wrote smal daemon, it work like dns refresher. 

- Get domains with overdue "Refresh" time. 
- Check the SOA serial at master, if the same touch the domain timestamp.
- If serial chenged, get new data for domain `dig @master-ns.com domain.com -t AXFR`
- Write new data to mysql. 

All work fine. And we can manage update process, do it faster or slowly. We don't need to wait dns daemon. 

