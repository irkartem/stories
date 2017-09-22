Right now all IT specialists are thinking about cloud and scalable architecture. But 'bare metal cloud' is cheapest way for middlei-size and big companies. I have strong expierence operating ~3000 servers for our own in our datacenter. Half of servers we rent to customer and others  we use as VPS compute nodes for customer.

Of course all operation with servers are automated. For track changes in  our cabinets, PDUs, chassis, switches, spares and servers we use DCImgr software. 
#### Find the servers
Our hardware vendor configures machines to PXE boot from the network before they arrive at our data center. Machines are racked, connected to our network, and powered on. From there, our DCImgr with internal DHCP/PXE server start  the diagnosys image. Which detect hardware type and check what server is fine. 

#### Check configuration and stabolity of server

#### Install OS
We rent our server to customers. They use different operating system. Short statistics for our datacenter: 

#### Problems that we met 

A lot of spare types
