const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  const shared = new Uint8Array(new SharedArrayBuffer(1));
  shared.set([1]);
  worker.on('message', (message) => {
    console.log(message, shared);
  });
  worker.postMessage(shared);
} else {
  parentPort.once('message', (message) => {
    parentPort.postMessage('Check now: before');
    setTimeout(() => {
      message.set([2]);
      parentPort.postMessage('Check now: after');
    }, 100);
  });
}