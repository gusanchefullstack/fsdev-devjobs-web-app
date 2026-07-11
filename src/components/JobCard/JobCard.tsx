import { Link } from "react-router-dom";
import type { Job } from "../../types/job";
import { toPublicPath } from "../../utils/paths";
import styles from "./JobCard.module.css";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <li className={styles.item}>
      <Link
        to={`/jobs/${job.id}`}
        className={styles.card}
        aria-label={`View details for ${job.position} at ${job.company}`}
      >
        <span
          className={styles.logo}
          style={{ backgroundColor: job.logoBackground }}
        >
          <img src={toPublicPath(job.logo)} alt="" aria-hidden="true" />
        </span>
        <span className={styles.meta}>
          {job.postedAt} <span aria-hidden="true">&bull;</span> {job.contract}
        </span>
        <h2 className={styles.position}>{job.position}</h2>
        <span className={styles.company}>{job.company}</span>
        <span className={styles.location}>{job.location}</span>
      </Link>
    </li>
  );
}
