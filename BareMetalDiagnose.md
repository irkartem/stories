# Table of contents
1. [CPU check](#cpu)
2. [RAM check](#ram)
3. [Storage check](#storage)
    1. [Lookup disks list](#lookup-for-installed-disks-by-bash)
    2. [HDD](#hdd)
    3. [SSD](#ssd)
    3. [Raid](#raid-status)
4. [Network](#network)
5. [Statistics](#Statistics)


It is 2018 year, but people who prefer the dedicated servers still alive :). I am working  in hosting company and we make diagnosis for servers before providing to customer. 
Let's talk about diagnosis bare metal servers.

We have an unattended server,it can became free status or we got the new servers. 
Automatic system boots server via PXE with linux kernel and is starting diagnostics script. What does the script try to determine
##CPU
* Check cpu overheating status
* Check cpu is stable

For CPU stress we use mprime-bin programm, and runing it for 30 minutes.

``` 
/usr/bin/timeout 30m /opt/mprime -t 
/bin/grep -i error /root/result.txt
```

Every minute check CPU temp, from ipmi sensors. The allowed **cpu temp is less than 60C**.
Also you need to check /proc/kmsg and mprime results.txt file for some complex CPU Error.

##RAM
* Some RAM cells can be broken

Need to check every RAM cell. Classical Memtet+ tool does not suitable, because work on bare metal and did not provide result in free versions.
But test memory at operation system level, does not check all RAM cells. It is weakness of our purpose. We chose memtested tool. Usage:

```
memtester `cat /proc/meminfo |grep MemFree | awk '{print $2-1024}'`k 5
```

Check programm output status, must be 0 if the memory is working properly.

##Storage
### Lookup for installed disks by bash:

Find any devices at /dev/sd? and /dev/cciss/c0d?, and check every element whether it is disk.

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

```
  for DISK in $(hdlist)
  do
    echo "Clearing ${DISK}"
    parted -s ${DISK} mklabel gpt
    dd if=/dev/zero of=${DISK} bs=512 count=1
  done
  if [ "($FULL_HDD_CLEAR)" = "YES" ]; then
  echo "Clearing disks full (very slow)"
  wget -O /dev/null -q --no-check-certificate "${STATEURL}&info=slowhddclear"
  for DISK in $(hdlist)
  do
    echo "Clearing ${DISK}"
    dd if=/dev/zero of=${DISK} bs=1M
  done
  fi

```

* Check smart values

 **Reallocated Sectors Count** must be less than 100

* Check speed for disk 

 The speed valued at 3 different place of disk. At place with offset 4Gb from start, at the middle and 4Gb from the end of disk. For each offset we run this function

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
 - **Media_Wearout_Indicator** it is percentage of disk lifetime. For new disk it will be 100. Allowed all values > 10;
 - **Reallocated_Sector_Ct** allowed values < 100

### Raid status
Identify model raid and check the raid status. Must be optimal.

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

##Network

*Check network download speed -  must be >300mbit

`curl -k --progress-bar -w "%{speed_download}"  -o /dev/null "($CGI_MGR_URLv4)/speedtest_cgi?id=($AUTH_ID)&func=server.speedtest"`

##Statistics

The script checks 323 servers per month in average. 124 servers per month marked as broken. We do not sell server which does not pass the test. 
Datacenter engineers change disks, repair the fans. CPU and RAM we change under warranty usually. 

### HDD smart stats
I have 1800 smart reports from different HDD disks. There are 103 models.

|ATTRIBUTE_NAME |min | Expected value | max| Standard Deviation | Descr
|--- | --- | --- | --- | --- | --- | --- 
|Temperature_Celsius | 14 | 25.81 |40|  4.09 | 25C very good temp for disk
|Power_On_Hours | 407 | 24033 |59363|  12910 | the biggest value 6 years. hmm
|Reallocated_Sector_Ct | 0 | 92.3496 |10728| 496 | 100 it is good threshold
|Raw_Read_Error_Rate | 0 |32416965|4294967295| 126899820.1 | small values is not an option, if fail happens then it will be huge count of it
|SSD Power_On_Hours | 10 |23159  |918502| 134915| > 2 years for ssd not bad

Hdd with Raw_Read_Error_Rate attribute 

|ATTRIBUTE_NAME |min | Expected value | max| Standard Deviation | Descr
|--- | --- | --- | --- | --- | --- | --- 
|Power_On_Hours|0|25040|57178|12030|Broken hdd works 33 months +-16 months. Not intresting

Our script work in DCIManager panel for datacenter infrastructure. 

How did you check the bare-metal server? 

Artem Artemiev artemirk@gmail.com 
