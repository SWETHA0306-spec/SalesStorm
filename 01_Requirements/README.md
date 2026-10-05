# 01. Requirements & System Constraints

## Functional Requirements (FR)
- **FR1 (Inventory Discovery & Check)**: Customers must view real-time available inventory counts prior to initiating checkout[cite: 1, 5].
- **FR2 (Atomic Inventory Reservation)**: The system must temporarily reserve stock for 10 minutes upon purchase attempt without double-allocation[cite: 4, 5, 10].
- **FR3 (Idempotent Payment Processing)**: Integrate external payment gateways with idempotent transaction handling to prevent duplicate charges[cite: 4, 6, 8, 10].
- **FR4 (Order Lifecycle Management)**: Maintain deterministic order state transitions (`CREATED` -> `PAYMENT_PENDING` -> `CONFIRMED` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED`)[cite: 10].
- **FR5 (Automated Expiry & Restock)**: Unpaid or expired reservations must automatically release stock back to the available pool after 10 minutes[cite: 4, 5, 10].

## Non-Functional Requirements (NFR)
- **NFR1 (High Concurrency & Throughput)**: Support 10,000 concurrent purchase attempts for 100 available stock units during peak flash sales[cite: 1, 10].
- **NFR2 (Zero Overselling Guarantee)**: Under no condition shall total successful sales exceed available inventory[cite: 1, 4, 10].
- **NFR3 (Latency SLA)**: Sub-50ms p99 latency for inventory reservation endpoints[cite: 4, 7].
- **NFR4 (Fault Tolerance & Resilience)**: Gracefully handle downstream service outages (e.g., 30s Order Service unavailability) via asynchronous messaging[cite: 4, 8, 10].