What is the difference between a process and a thread?

A thread is a lightweight process. Each process has a separate stack, text, data and heap. Threads have their own stack, but share text, data and heap with the process. Text is the actual program itself, data is the input to the program and heap is the memory which stores files, locks, sockets

What is a zombie process?

A zombie process is a one which has completed execution, however it’s entry is still in the process table to allow the parent to read the child’s exit status. The reason the process is a zombie is because it is “dead” but not yet “reaped” by it’s parent.

Describe ways of process inter-communication

POSIX mmap, message queues, semaphores, and Shared memory
Anonymous pipes and named pipes
Unix domain sockets
RPC


How to daemonize a process

The fork() call is used to create a separate process.
The setsid() call is used to detach the process from the parent (normally a shell).
The file mask should be reset.
The current directory should be changed to something benign.
The standard files (stdin,stdout and stderr) need to be reopened.


Describe how processes executes in a Unix shell

Let’s take the example of /bin/ls. When run ‘ls’ the shell searches in it’s path for an executable named ‘ls, when it finds it, the shell will forks off a copy of itself using the fork system call. If the fork succeeds, then in the child process the shell will run ‘exec /bin/ls’ which will replace the copy of the child shell wit itself. Any parameters that that are passed to ‘ls’ are done so by exec.

What are Unix Signals?

Signals are an inter process communication method. The default signal in Linux is SIG-TERM. SIG-KILL cannot be ignored and causes an application to be forcefully killed. Use the ‘kill’ command to send signals to a process. Another popular signal is the ‘HUP’ signal which is used to ‘reset’ or ‘hang up’ applications.


Name a few TCP connections states

1) LISTEN – Server is listening on a port, such as HTTP
2) SYNC-SENT – Sent a SYN request, waiting for a response
3) SYN-RECEIVED – (Server) Waiting for an ACK, occurs after sending an ACK from the server
4) ESTABLISHED – 3 way TCP handshake has completed

Difference between TCP/UDP

Reliable/Unreliable
Ordered/Unordered
Heavyweight/Lightweight
Streaming
Header size

What is the difference between character device and block device?

Block devices are generally buffered and are read/written to in fixed sizes, for instance hard drives, cd-roms. Characters devices read/writes are one character at a time, such as from a keyboard or a tty, and are not buffered.


Common Http response codes

200 OK The request has succeeded
500 Internal Server Error (Server Error)
403 Forbidden
301 Permanent Redirect
302 Temporary Redirect


What is a http cookie

Http cookie is a small piece of data that a server sends to a browser, which a browser usually stores in it’s cookie cache. Cookie can be used to maintain session information since HTTP is stateless, and also for user preferences at a given site. Cookies can also be used to store encrypted password. Browsers send cookies back to the server when they make a connection’

Http methods

Http methods are ways of communicating between server and client. Common examples are http get and http put which is used by http forms for data exchange. Other methods include, post, head, and connect.

Http headers

Http header fields are common components of HTTP requests and responses. Headers are colon separated name-value pairs in clear text. Some common headers are: Cache-control which specifies where to cache or not the contents of a page, Accept, which can be text/plain, Content-length which specifies the size of the content, Host, which is the domain name of the server.

What is the difference between MyISAM and InnoDB?

MyISAM:
1. Supports table level locking
2. Is Faster than InnoDB
3. Does not support foreign keys
4. Stores table, data and index in different files
5. Does not support transactions (no commit with rollback)
6. Useful for more selects with fewer updates
InnoDB:
1. Support row level locking
2. Is slower than MyISAM
3. Supports foreign keys
4. Stores table and index in table space
5. Supports transactions




Define the boot process of a Linux system

Once you power a system on, the first thing that happens is the BIOS loads and performs POST or a power on self test, to ensure that the components needed for a boot are ok. For instance if the CPU is defective, the system will give an error that POST has failed. (BIOS stands for Basic Input/Output system)
After POST the BIOS looks at the MBR or master book record and executes the boot loader. In case of a Linux system that might be GRUB or Grand Unified BootLoader. GRUB’s job is to give you the choice of loading a Linux kernel or other OS that you may be running
Once you ask GRUB to load a kernel, usually an initial ramdisk kernel is loaded, which is a small kernel that understands filesystem. This will in turn mount the filesystem and will start the Linux kernel from the filesystem
The kernel will then start init, which is the very first process, usually having PID 1. Init will look at /etc/inittab and will switch to the default run-level which on Linux servers tends to be 3.
There are different run level scripts in /etc/rc.d/rc[0-6].d/ which are then executed based on the runlevel the system needs to be in.
And that’s about it!


