import { assert } from 'assertthat';
import { waitForSignals } from '../../lib/waitForSignals';

suite('waitForSignals', (): void => {
  test('resolves immediately if the number of signals is zero.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 0 });

    await collector.promise;
  });

  test('resolves after set number of signals has been sent.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 3 });
    let counter = 0;

    const done = new Promise<void>(async (resolve): Promise<void> => {
      await collector.promise;

      // The counter here must match the expected number of signals.
      assert.that(counter).is.equalTo(3);

      resolve();
    });

    counter += 1;
    await collector.signal();

    counter += 1;
    await collector.signal();

    counter += 1;
    await collector.signal();

    await done;
  });

  test('rejects if fail is called.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 1 });

    await collector.fail(new Error('Foo'));

    await assert.that(async (): Promise<void> => await collector.promise).is.throwingAsync('Foo');
  });

  test('calling fail after the collector has finished does not do anything.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 1 });

    await collector.signal();
    await collector.fail();

    await assert.that(async (): Promise<void> => await collector.promise).is.not.throwingAsync();
  });

  test('getCount returns the current count of received signals.', async (): Promise<void> => {
    const collector = waitForSignals({ count: 2 });

    assert.that(collector.getCount()).is.equalTo(0);

    await collector.signal();

    assert.that(collector.getCount()).is.equalTo(1);

    await collector.signal();

    assert.that(collector.getCount()).is.equalTo(2);

    await collector.signal();

    assert.that(collector.getCount()).is.equalTo(3);
  });
});
