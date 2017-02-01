Tasks: you have ~10000 master dns servers(VDS). Need to organize one slave server for them. It will be hoster NS server. 

#named (120 000 domains)

First decision was to use default named. But it was some problems:
* server must have huge count of RAM
* too slow start
* domains data stored in files

Pros:
* domains data stored in files

Was very unstable solution. Named does not work with big count of domains. All domains files stored in the directory. Files very good for editing, but manage 120 000 files it's not a good idea. 

#nsd (120 000 domains)

NSD uses zone information compiled via 'zonec' into a binary database file (nsd.db) which allows fast startup of the NSD name-service daemon, and allows syntax-structural errors in Zone-Files to be flagged at compile-time. After named it was very fast and very cool working. 

Cons:
- Domains structure stores in binary db, and can't be edited by simple.
- Problem with transfer domains from master. Sometimes it's doesn't work. 

This problem "domain doesn't tranfer" was depressing. The problem is not on a permanent basis. We can't repeated it. Logs did not disclose the reason.

#PowerDNS (170 000 domains) 
This our current solution. Domains data stored in mysql database, can be edited by sql. pdns_server process rsize 350m. We have mysql replication for avaibility and backup. 

But... PowerDNS slaves not update all slave domains from masters. Pdns has timeout for queue runtime. After that it will begin queue from start. And if you have huge count of domains, update will be failed for most of them.

We wrote small daemon, it work like dns refresher. 

- Get domains with overdue "Refresh" time. 
- Check the SOA serial at master, if the same touch the domain timestamp.
- If serial chenged, get new data for domain `dig @master-ns.com domain.com -t AXFR`
- Write new data to mysql. 

All work fine. And we can manage update process, do it faster or slowly. We don't need to wait dns daemon. 
Also you need to configure some fault tolerance for NS server. Install one more server, make replication and some system for floating ips. 

Artem Artemiev artemirk@gmail.com 
