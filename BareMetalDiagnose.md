It is 2017 year, but people who prefer dedicated servers still live :). I am working at hosting company and we need to make diagnosis for servers before providing to customer.
Will talk about diagnose bare metal servers.

Server became free status or we got the new servers. Automate system boots server via PXE with linux kernel and run diagnostics script. What does the script try to determine:
##CPU
* Check cpu overheating status
* Check cpu is stable
For CPU stress we use mprime-bin programm, and runing it for 30 minutes.
>mprime -t
Just kill process after 30 min. Every minute check CPU temp, from ipmi sensors. Our valid temp is less than 60C.
And also you need to check /proc/kmsg and mprime results.txt file for some complex CPU Error.

##RAM
* Some cells can be broken
Need to check every RAM cell, does it work property. Classical Memtet+ tool does not suitable, becouse work separately and did not provide result.
But test memory at operation system level, does not check all RAM cells. It is weakness of our purpose. We choised metested utility. Usage:

` memtested _RAM_SIZE_ 5`

and if want RAM size detect and use size - 1M amount. 

```
memtester `cat /proc/meminfo |grep MemFree | awk '{print $2-1024}'`k 5
```

Check programm output status, must be 0 if the memory is working properly.

##Storage
### Lookup for installed disks by bash:
```
 hdlist() {
  HDLIST=$(ls /dev/sd?)
  HDLIST="${HDLIST} $(ls /dev/cciss/c0d? 2>/dev/null)"
  REAL_HDLIST=""
  for disk in ${HDLIST}; do
    if head -c0 ${disk} 2>/dev/null; then
      REAL_HDLIST="${REAL_HDLIST} ${disk}"
    fi
  done
  echo "${REAL_HDLIST}"
}
```

### HDD
* Check smart values
* Check speed for disk 

### SSD
* Check smart value for 'Media_Wearout_Indicator'
 Allowed values less what 10. Media_Wearout it is percentage of disk lifetime. For new disk it will be 100. 
* Check smart values for 'Reallocated_Sector_Ct'
 
##Net
