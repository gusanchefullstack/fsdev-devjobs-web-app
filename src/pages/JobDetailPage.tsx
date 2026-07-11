import { Link, Navigate, useParams } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { JobDetail } from "../components/JobDetail/JobDetail";
import { PageContainer } from "../components/Layout/PageContainer";
import { useJobs } from "../hooks/useJobs";
import styles from "./JobDetailPage.module.css";

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { jobs, isLoading, error } = useJobs();

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <PageContainer>
            <p>Loading job…</p>
          </PageContainer>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main>
          <PageContainer>
            <p role="alert">{error}</p>
          </PageContainer>
        </main>
      </>
    );
  }

  const job = jobs.find((candidate) => candidate.id === Number(id));

  if (!job) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <main>
        <PageContainer>
          <Link to="/" className={styles.backLink}>
            &larr; Back to jobs
          </Link>
          <JobDetail job={job} />
        </PageContainer>
      </main>
    </>
  );
}
