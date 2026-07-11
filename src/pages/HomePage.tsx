import { useState } from "react";
import { Header } from "../components/Header/Header";
import { SearchFilters } from "../components/SearchFilters/SearchFilters";
import { JobList } from "../components/JobList/JobList";
import { PageContainer } from "../components/Layout/PageContainer";
import { useJobs } from "../hooks/useJobs";
import { useFilteredJobs } from "../hooks/useFilteredJobs";
import type { JobFilters } from "../types/job";

const initialFilters: JobFilters = {
  title: "",
  location: "",
  fullTimeOnly: false,
};

export function HomePage() {
  const { jobs, isLoading, error } = useJobs();
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const filteredJobs = useFilteredJobs(jobs, filters);

  return (
    <>
      <Header>
        <SearchFilters onSearch={setFilters} />
      </Header>
      <main>
        <h1 className="visually-hidden">Devjobs job listings</h1>
        <PageContainer>
          {isLoading && <p>Loading jobs…</p>}
          {error && <p role="alert">{error}</p>}
          {!isLoading && !error && <JobList jobs={filteredJobs} />}
        </PageContainer>
      </main>
    </>
  );
}
