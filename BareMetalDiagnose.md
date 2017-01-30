It is 2017 year, but people who prefer dedicated servers still live :). I am working at hosting company and we need to make diagnosis for servers before providing to customer.
Will talk about diagnose bare metal servers.

Server became free status or we got the new servers. Automate system boots server via PXE with linux kernel and run diagnostics script. What does the script try to determine:
##CPU
* Check cpu overheating status
* Check cpu is stable
For CPU stress we use mprime-bin programm, and runing it for 30 minutes.
``` 
/usr/bin/timeout 30m /opt/mprime -t 
/bin/grep -i error /root/result.txt
```
Just kill process after 30 min. Every minute check CPU temp, from ipmi sensors. Our valid temp is less than 60C.
And also you need to check /proc/kmsg and mprime results.txt file for some complex CPU Error.

##RAM
* Some cells can be broken
Need to check every RAM cell, does it work property. Classical Memtet+ tool does not suitable, becouse work separately and did not provide result.
But test memory at operation system level, does not check all RAM cells. It is weakness of our purpose. We choised metested utility. Usage:

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
* Fully clear the hdd from previouse customer
``
* Check smart values
 **Reallocated Sectors Count** must be less than 100
* Check speed for disk 
 Speed valuate at 3 differnt place of disk. At place with offset 4Gb from start, at the middle and 4Gb from the end of disk. For each offset we run this function:
```
                sysctl -w vm.drop_caches=3 > /dev/null
                zcav -c 1 -s ${SKIP_COUNT} -r ${OFFSET} -l /tmp/zcav1.log -f ${DISK}
                if [ $? -ne 0 ]; then
                        echo err
                        exit
                fi
                SPEED=$(cat /tmp/zcav1.log | awk '! /^#/ {speed+=$2; count+=1}END{print int(speed/count)}') 
```

### SSD
* Check smart values
 **Media_Wearout_Indicator** it is percentage of disk lifetime. For new disk it will be 100. Allowed all values > 10;
 **Reallocated_Sector_Ct** allowed values < 100
### Raid status
```
detect_raid_type() {
  RAIDSTR=$(lspci | grep -i raid)
  if echo ${RAIDSTR} | grep -iq adaptec; then
    # THis is adaptec
    echo "adaptec"
  elif echo ${RAIDSTR} | grep -iqE 'lsi|megaraid'; then
    # THis is LSI
    echo "lsi"
  elif echo ${RAIDSTR} | grep -iq '3ware'; then
    # THis is 3ware
    echo "3ware"
  elif echo ${RAIDSTR} | grep -iqE 'Hewlett-Packard.*Smart'; then
    # THis is HP Smart Array
    echo "HP-SmartArray"
  elif dmesg | grep -q cciss/ ; then
    echo cciss
  else
    echo "unknown"
  fi
}
raid_status_adaptec() {
  RSTATUS=$(arcconf getconfig 1 ld | awk -F: '/Status of logical device/ {print $2}')
  if ! echo "${RSTATUS}" | grep -q 'Optimal' ;then
    echo "${RSTATUS}"
    return 1
  fi
}

raid_status_3ware() {
  echo "We have not support 3ware yet"
  return 0
}

raid_status_lsi() {
  RSTATUS=$(megacli -LDInfo -Lall -aALL |awk -F: '$1 ~ /State/ {print $2}')
  if ! echo "${RSTATUS}" | grep -q 'Optimal' ;then
    echo "${RSTATUS}"
    return 1
  fi
}

raid_status_unknown() {
  echo "Unknown RAID"
  return 0
}

raid_status_cciss() {
  RSTATUS=$(cciss_vol_status /dev/cciss/c*d0)
  if ! echo ${RSTATUS} | grep -q "OK" ; then
    echo "${RSTATUS}"
    return 1
  fi
}
```
##Net
*Check network downloads speed only it must be >300mbit 
`curl -k --progress-bar -w "%{speed_download}"  -o /dev/null "($CGI_MGR_URLv4)/speedtest_cgi?id=($AUTH_ID)&func=server.speedtest"`

## Our stats
