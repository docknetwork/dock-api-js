// Jobs are background tasks that run asynchronously on the server to complete blockchain transactions
const http = require('../utils/http-utils');

async function getJob(id) {
  const result = await http.get(`jobs/${id}`);
  return result.data;
}

async function waitForJobCompletion(jobId) {
  let job = {};
  while (job.status !== 'finalized' && job.status !== 'error') {
    job = await getJob(jobId);

    // sleep a bit
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`Job Response: ${JSON.stringify(job)}`);
}

module.exports = {
  getJob,
  waitForJobCompletion,
};
