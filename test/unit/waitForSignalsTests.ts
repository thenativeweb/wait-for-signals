import { assert } from 'assertthat';
import { waitForSignals } from '../../lib/waitForSignals';

suite('wait for signals', (): void => {
  test('resolves immediately if the number of signals is zero.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 0 });

    await collector.finish;
  });

  test('resolves after set number of signals has been sent.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 3 });
    let counter = 0;

    const done = new Promise(async (resolve): Promise<void> => {
      await collector.finish;

      // The counter here must match the expected number of signals.
      assert.that(counter).is.equalTo(3);

      resolve();
    });

    counter += 1;
    await collector.sendSignal();

    counter += 1;
    await collector.sendSignal();

    counter += 1;
    await collector.sendSignal();

    await done;
  });

  test('rejects if fail is called.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 1 });

    await collector.fail(new Error('Foo'));

    await assert.that(async (): Promise<void> => await collector.finish).is.throwingAsync('Foo');
  });

  test('calling fail after the collector has finished does not do anything.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 1 });

    await collector.sendSignal();
    await collector.fail();

    await assert.that(async (): Promise<void> => await collector.finish).is.not.throwingAsync();
  });
});
