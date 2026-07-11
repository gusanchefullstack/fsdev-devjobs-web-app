import type { Job } from "../../types/job";
import { toPublicPath } from "../../utils/paths";
import styles from "./JobDetail.module.css";

interface JobDetailProps {
  job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <>
      <section className={styles.companyCard}>
        <span
          className={styles.logo}
          style={{ backgroundColor: job.logoBackground }}
        >
          <img src={toPublicPath(job.logo)} alt="" aria-hidden="true" />
        </span>
        <div className={styles.companyInfo}>
          <h2 className={styles.companyName}>{job.company}</h2>
          <a
            href={job.website}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.companyWebsite}
          >
            {job.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <a
          href={job.website}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.companySiteButton}
          aria-label={`Visit ${job.company}'s company site`}
        >
          Company Site
        </a>
      </section>

      <article className={styles.mainCard}>
        <div className={styles.jobHeading}>
          <div>
            <p className={styles.meta}>
              {job.postedAt} <span aria-hidden="true">&bull;</span>{" "}
              {job.contract}
            </p>
            <h1 className={styles.position}>{job.position}</h1>
            <p className={styles.location}>{job.location}</p>
          </div>
          <a
            href={job.apply}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.applyButton}
            aria-label={`Apply for ${job.position} at ${job.company}`}
          >
            Apply Now
          </a>
        </div>

        <p className={styles.description}>{job.description}</p>

        <h3 className={styles.sectionHeading}>Requirements</h3>
        <p className={styles.sectionContent}>{job.requirements.content}</p>
        <ul className={styles.bulletList}>
          {job.requirements.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.sectionHeading}>What You Will Do</h3>
        <p className={styles.sectionContent}>{job.role.content}</p>
        <ol className={styles.numberedList}>
          {job.role.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </article>

      <footer className={styles.footerBar}>
        <div>
          <p className={styles.footerPosition}>{job.position}</p>
          <p className={styles.footerCompany}>{job.company}</p>
        </div>
        <a
          href={job.apply}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.applyButton}
          aria-label={`Apply for ${job.position} at ${job.company}`}
        >
          Apply Now
        </a>
      </footer>
    </>
  );
}
