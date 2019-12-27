export interface Collector {
  signal: () => Promise<void>;
  fail: (reason?: Error) => Promise<void>;
  promise: Promise<void>;
}
