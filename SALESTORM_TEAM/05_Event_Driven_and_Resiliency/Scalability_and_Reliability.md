# Scalability & Reliability Strategy

## 1. High-Availability Targets
- **SLA:** 99.99% Availability during peak flash sales.
- **Throughput:** 50,000 req/sec peak handled via API Gateway Token Bucket rate limiting.

## 2. Resiliency Patterns
- **Circuit Breaker:** Applied on Payment Bridge to prevent cascade failure if gateway latency > 2s.
- **Bulkhead Pattern:** Isolated connection pools for Checkout vs Catalog browsing.
- **Dead Letter Queue (DLQ):** Exponential backoff retries (1s, 5s, 25s) before offloading failed async events to `orders-dlq`.
