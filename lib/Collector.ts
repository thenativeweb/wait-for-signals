export interface Collector {
  signal: () => Promise<void>;
  fail: (reason?: Error | unknown) => Promise<void>;
  promise: Promise<void>;
  getCount: () => number;
}
