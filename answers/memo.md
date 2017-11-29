[ ] Clarify Requirements and Specs
    * goals should always be clear
    * clarify features and ways for scaling
[ ] Sketch Out High Level Design
    * Do not dive into details before outlining the big picture
    * Just draw
[ ]  Discuss individual components and how they interact in detail
    * Load Balancer (layers:DNS,L3/4,Apps; algorithms: round robin, weighted round robin, least loaded, least loaded with slow start, utilization limit, latency, cascade)
    * Reverse Proxy and Frontend (web tier)
        Limitation:requests per second (rps) and bandwidth
    * App Service Tier
        * Service Discovery
        * Micro Services
    * Data Tier
    * Back-of-the-envelope Calculation
        * cost is a function of CPU, RAM, storage, bandwidth

