# wait-for-signals

wait-for-signals waits for a number of signals before resolving a promise.

## Status

| Category         | Status                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/wait-for-signals)](https://www.npmjs.com/package/wait-for-signals)       |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/wait-for-signals)                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/wait-for-signals)                                      |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/wait-for-signals/workflows/Release/badge.svg?branch=master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/wait-for-signals)                                |

## Installation

```shell
$ npm install wait-for-signals
```

## Quick Start

First you need to add a reference to wait-for-signals to your application:

```javascript
const { waitForSignals } = require('wait-for-signals');
```

If you use TypeScript, use the following code instead:

```typescript
import { waitForSignals } from 'wait-for-signals';
```

Then, to wait for a number of signals, call the `waitForSignals` function and hand over the desired number of signals to wait for:

```javascript
const collector = waitForSignals({ count: 3 });
```

To notify the collector of a signal, use its `signal` function:

```javascript
await collector.signal();
```

Finally, to wait until all signals have occured, wait for the collector's `promise` property to resolve:

```javascript
await collector.promise;
```

E.g., if you want to wait for three requests being sent to your API and then do something, you may use the following code:

```javascript
const collector = waitForSignals({ count: 3 });

app.get('/', async (req, res) => {
  await collector.signal();

  res.status(200).end();
});

collector.promise.then(() => {
  // ...
});
```

All subsequent API calls will increase a counter within the `collector`, but apart from that nothing will happen.

### Getting the counter value

To get the current counter value use the `getCount` function:

```javascript
const collector = waitForSignals({ count: 3 });

console.log({ count: collector.getCount() });
// => 0

await collector.signal();

console.log({ count: collector.getCount() });
// => 1
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
