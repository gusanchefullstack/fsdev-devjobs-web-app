import { useEffect, useState } from "react";
import type { Job } from "../types/job";

interface UseJobsResult {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
}

export function useJobs(): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load jobs: ${response.status}`);
        }
        return response.json() as Promise<Job[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setJobs(data);
          setIsLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { jobs, isLoading, error };
}
