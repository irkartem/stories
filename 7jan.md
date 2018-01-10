Intel platform turned the CPU into a pumpkin
The 7th of January we detected what the set of our servers became slow. CPU started to work on 800Mhz. Throttling in OS mode was ‘performance’.
The problem affects 28 servers, with S2600BPB chassis and Silver and Gold Intel processor. It was all our S2600BPB platform servers.
Idle servers also was affected, and became pumpkins.
Servers is situated in different datacenters, have different Linux distro and different virtualization.
External reason was not possible.
Reboot not helped, bios also work very slow.
At BMC we found this logs:
308 Sun Jan 7 05:31:29 2018 PS1 Status BMC Warning Power Supply Predictive Failure — Over-temperature warning, Status Byte: 0x40 — Asserted
312 Sun Jan 7 05:40:04 2018 PS2 Status BMC Warning Power Supply Predictive Failure — Over-temperature warning, Status Byte: 0x40 — Asserted
Every server has this log line at 5:31
d0 | 01/07/2018 | 05:31:30 | Power Supply #0x50 | Predictive failure | Asserted
b2 | 01/07/2018 | 05:31:29 | Power Supply #0x50 | Predictive failure | Asserted
a6 | 01/07/2018 | 05:31:29 | Power Supply #0x50 | Predictive failure | Asserted
79 | 01/07/2018 | 05:31:29 | Power Supply #0x50 | Predictive failure | Asserted
962 | 01/07/2018 | 05:31:30 | Power Supply #0x50 | Predictive failure | Asserted
7e | 01/07/2018 | 05:31:29 | Power Supply #0x50 | Predictive failure | Asserted
3d | 01/07/2018 | 05:31:29 | Power Supply #0x50 | Predictive failure | Asserted
3e | 01/07/2018 | 05:31:29 | Power Supply #0x50 | Predictive failure | Asserted
185 | 01/07/2018 | 05:31:30 | Power Supply #0x50 | Predictive failure | Asserted
4d | 01/07/2018 | 05:31:30 | Power Supply #0x50 | Predictive failure | Asserted
53 | 01/07/2018 | 05:31:29 | Power Supply #0x50 | Predictive failure | Asserted
a4 | 01/07/2018 | 05:31:30 | Power Supply #0x50 | Predictive failure | Asserted
ee | 01/07/2018 | 05:31:31 | Power Supply #0x50 | Predictive failure | Asserted
28 | 01/07/2018 | 05:31:31 | Power Supply #0x50 | Predictive failure | Asserted
38 | 01/07/2018 | 05:31:30 | Power Supply #0x50 | Predictive failure | Asserted
91 | 01/07/2018 | 05:31:30 | Power Supply #0x50 | Predictive failure | Asserted
3a | 01/07/2018 | 05:31:31 | Power Supply #0x50 | Predictive failure | Asserted
2c | 01/07/2018 | 05:31:30 | Power Supply #0x50 | Predictive failure | Asserted
Console had this lines:
Thermal sensor for every server was approx 40C. And temperature not changed in datacenter.
5:31 was a magic Russian christmass time :). Power supply decided that it has an overhead and enabled throttling lock for CPUs.
After all our efforts, we found solution. Unplug the power adapter for 5 min. And then servers started fine. And still work.
I reported Intel and sent all logs from BMC. Intel engineer promised me to help :)


Update: we set time for 6th of january for one of our servers. And it happened again. It’s just time position on 7th of January. Looks very intresting. I am waiting the Intel answer. And set time for this server +3 days. Will monitor it before another collapse.
