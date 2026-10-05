export enum CircuitState {
  CLOSED, // Normal operation
  OPEN,   // Fast-fail state (rejects requests)
  HALF_OPEN // Testing service recovery
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private nextAttemptTime: number = Date.now();

  constructor(
    private readonly failureThreshold: number = 5,
    private readonly recoveryTimeoutMs: number = 10000 // 10s cooldown
  ) {}

  async execute<T>(action: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() > this.nextAttemptTime) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        throw new Error("CIRCUIT_BREAKER_OPEN: Payment Gateway temporarily unavailable.");
      }
    }

    try {
      const result = await action();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.state = CircuitState.CLOSED;
  }

  private onFailure(): void {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = CircuitState.OPEN;
      this.nextAttemptTime = Date.now() + this.recoveryTimeoutMs;
      console.error(`Circuit Breaker OPENED until ${new Date(this.nextAttemptTime).toISOString()}`);
    }
  }
}