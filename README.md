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

### Waiting for something

Maybe you want to wait for three requests to your api and then do something:

```javascript
const collector = waitForSignals({ signals: 3 });

app.get('/', async (req, res) => {
  await collector.sendSignal();

  res.status(200).end();
});

collector.finish.then(() => {
  // Now the collector has received three signals.
});
```

All subsequent API calls will increase a counter within the `collector`, but
apart from that nothing will happen.

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
