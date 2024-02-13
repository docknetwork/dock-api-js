import { apiGet } from "@/lib/actions/api-get";

export type Job = {
  status: 'finalized' | 'todo' | 'in_progress';
  id: string;
  result: {
    InBlock: string;
  },
};

interface JobResult {
  id: string;
  status: 'finalized' | 'todo' | 'in_progress';
  result: {
    encodedTx: string;
    finishQueryData: any[];
    length: number;
    userData: string;
  };
};

/**
 * Gets a job by ID.
 * @param id The ID of the job to get.
 * @returns The job data.
 */
export async function getJob(id: string): Promise<JobResult> {
  const result = await apiGet({
    relativeUrl: `jobs/${id}`, 
  });

  console.log("result in getJob:", result);
  return result;
}

/**
 * Waits for the given job to reach a finalized or error state.
 * Polls the job status every 2 seconds until it is no longer "processing".
 * Logs the final job response.
 * @param jobId The ID of the job to wait for.
 */
export async function waitForJobCompletion(jobId: string): Promise<void> {
  let job: JobResult = await getJob(jobId);

  if (!job) {
    throw new Error('Job is undefined'); 
  }

  while (job.status === "in_progress") {
    await new Promise(resolve => setTimeout(resolve, 2000));
    job = await getJob(jobId);
  }

  console.log(`Job Response: ${JSON.stringify(job)}`);
}
