import { Collector } from './Collector';

const waitForSignals = function ({ count }: {
  count: number;
}): Collector {
  let collectorReject: undefined | ((reason?: any) => void),
      collectorResolve: undefined | (() => void),
      counter = 0;

  const promise: Promise<void> = new Promise((resolve, reject): void => {
    collectorReject = reject;
    collectorResolve = resolve;
  });

  const signal = async function (): Promise<void> {
    counter += 1;

    if (counter !== count) {
      return;
    }

    if (collectorResolve === undefined) {
      throw new Error('Invalid operation. The collector resolve function was undefined but should not have been.');
    }
    collectorResolve();
  };

  const fail = async function (reason?: Error | unknown): Promise<void> {
    if (collectorReject === undefined) {
      throw new Error('Invalid operation. The collector reject function was undefined but should not have been.');
    }
    collectorReject(reason);
  };

  const getCount = function (): number {
    return counter;
  };

  if (count === 0) {
    if (collectorResolve === undefined) {
      throw new Error('Invalid operation. The collector resolve function was undefined but should not have been.');
    }
    collectorResolve();
  }

  return {
    signal,
    fail,
    promise,
    getCount
  };
};

export { waitForSignals };
