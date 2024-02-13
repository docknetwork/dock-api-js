import * as http from "../utils/http-utils";

interface Job {
  status: 'finalized' | 'error' | 'processing';
  id: string;
  result: {
    InBlock: string;
  },
}

/**
 * Gets a job by ID.
 * @param id The ID of the job to get.
 * @returns The job data.
 */
export async function getJob(id: string): Promise<Job> {
  const result = await http.get(`jobs/${id}`);
  return result.data;
}

/**
 * Waits for the given job to reach a finalized or error state.
 * Polls the job status every 2 seconds until it is no longer "processing".
 * Logs the final job response.
 * @param jobId The ID of the job to wait for.
 */
export async function waitForJobCompletion(jobId: string): Promise<void> {
  let job = await getJob(jobId);

  while (job.status === "processing") {
    await new Promise(resolve => setTimeout(resolve, 2000));
    job = await getJob(jobId);
  }

  console.log(`Job Response: ${JSON.stringify(job)}`);
}
