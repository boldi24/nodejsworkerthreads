const path = require('path');
const { Worker } = require('worker_threads');

let position = 1;
Array(1,2,3).forEach(index => {
  const worker = new Worker(path.join(__dirname, 'job.js'), {
    workerData: 100000000
  });
  worker.on('message', message => console.log(`Thread ${index} sent: ${message}`));
  worker.on('online', () => {
    console.log(`Thread ${index} is started`);
    worker.postMessage(position);
    position = position + 1;
  });
  worker.on('exit', () => console.log(`Thread ${index} has exited`));
  worker.on('error', (error) => console.log(`Thread ${index} has thrown`, error));
});
