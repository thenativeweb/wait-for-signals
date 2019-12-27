export interface Collector {
  sendSignal: () => Promise<void>;
  fail: (reason?: Error) => Promise<void>;
  promise: Promise<void>;
}
