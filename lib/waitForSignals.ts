interface Collector {
  sendSignal: () => Promise<void>;
  fail: (reason?: Error) => Promise<void>;
  finish: Promise<void>;
}

const waitForSignals = function ({ signals }: {
  signals: number;
}): Collector {
  let collectorReject: undefined | ((reason?: any) => void),
      collectorResolve: undefined | (() => void),
      counter = 0;

  // We do not want to make this function async, so that the IIFE is executed
  // directly and not on the event loop. This will call the promise callback
  // immediately and the `collectorResolve` function will be set afterwards.
  /* eslint-disable @typescript-eslint/promise-function-async */
  const finish = (function (): Promise<void> {
    return new Promise((resolve, reject): void => {
      collectorReject = reject;
      collectorResolve = resolve;
    });
  })();
  /* eslint-enable @typescript-eslint/promise-function-async */

  const sendSignal = async function (): Promise<void> {
    counter += 1;

    if (counter === signals) {
      if (collectorResolve === undefined) {
        throw new Error('Invalid operation. The collector resolve function was undefined but should not have been.');
      }
      collectorResolve();
    }
  };

  const fail = async function (reason?: Error): Promise<void> {
    if (collectorReject === undefined) {
      throw new Error('Invalid operation. The collector reject function was undefined but should not have been.');
    }
    collectorReject(reason);
  };

  if (signals === 0) {
    if (collectorResolve === undefined) {
      throw new Error('Invalid operation. The collector resolve function was undefined but should not have been.');
    }
    collectorResolve();
  }

  return {
    sendSignal,
    fail,
    finish
  };
};

export {
  waitForSignals
};
