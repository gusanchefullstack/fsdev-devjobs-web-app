import { useMemo } from "react";
import type { Job, JobFilters } from "../types/job";

export function useFilteredJobs(jobs: Job[], filters: JobFilters): Job[] {
  return useMemo(() => {
    const title = filters.title.trim().toLowerCase();
    const location = filters.location.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesTitle =
        title === "" ||
        job.position.toLowerCase().includes(title) ||
        job.company.toLowerCase().includes(title);
      const matchesLocation =
        location === "" || job.location.toLowerCase().includes(location);
      const matchesContract =
        !filters.fullTimeOnly || job.contract === "Full Time";

      return matchesTitle && matchesLocation && matchesContract;
    });
  }, [jobs, filters]);
}
