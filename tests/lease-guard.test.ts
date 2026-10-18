
import { assertEquals } from "jsr:@std/assert";

type Job = {
  id: string;
  leaseToken: string;
  status: "running" | "paused" | "completed";
};

function pauseJob(
  job: Job,
  jobId: string,
  leaseToken: string,
): Job {
  if (
    job.id !== jobId ||
    job.leaseToken !== leaseToken ||
    job.status !== "running"
  ) {
    return job;
  }

  return { ...job, status: "paused" };
}

Deno.test("matching lease can pause a running job", () => {
  const job: Job = {
    id: "job-1",
    leaseToken: "token-1",
    status: "running",
  };

  assertEquals(
    pauseJob(job, "job-1", "token-1").status,
    "paused",
  );
});

Deno.test("stale lease cannot pause a job", () => {
  const job: Job = {
    id: "job-1",
    leaseToken: "token-new",
    status: "running",
  };

  assertEquals(
    pauseJob(job, "job-1", "token-old").status,
    "running",
  );
});

Deno.test("completed job stays completed", () => {
  const job: Job = {
    id: "job-1",
    leaseToken: "token-1",
    status: "completed",
  };

  assertEquals(
    pauseJob(job, "job-1", "token-1").status,
    "completed",
  );
});

Deno.test("different job ID cannot be paused", () => {
  const job: Job = {
    id: "job-1",
    leaseToken: "token-1",
    status: "running",
  };

  assertEquals(
    pauseJob(job, "job-other", "token-1").status,
    "running",
  );
});
    
