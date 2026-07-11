import type { Job } from "../../types/job";
import { JobCard } from "../JobCard/JobCard";
import styles from "./JobList.module.css";

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return <p className={styles.empty}>No jobs match your search.</p>;
  }

  return (
    <ul className={styles.grid}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </ul>
  );
}
