import { useState, type FormEvent } from "react";
import type { JobFilters } from "../../types/job";
import styles from "./SearchFilters.module.css";

interface SearchFiltersProps {
  onSearch: (filters: JobFilters) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [isPanelOpen, setPanelOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch({ title, location, fullTimeOnly });
  }

  return (
    <form className={styles.bar} onSubmit={handleSubmit} role="search">
      <div className={styles.titleField}>
        <img
          src="/assets/desktop/icon-search.svg"
          alt=""
          aria-hidden="true"
          className={styles.icon}
        />
        <label className={styles.visuallyHidden} htmlFor="job-title-filter">
          Filter by title, companies, expertise
        </label>
        <input
          id="job-title-filter"
          type="text"
          placeholder="Filter by title, companies, expertise…"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={styles.input}
        />
      </div>

      <button
        type="button"
        className={styles.filterToggle}
        aria-expanded={isPanelOpen}
        aria-controls="filter-panel"
        aria-label="Show location and contract filters"
        onClick={() => setPanelOpen((open) => !open)}
      >
        <img src="/assets/mobile/icon-filter.svg" alt="" aria-hidden="true" />
      </button>

      <button
        type="submit"
        className={styles.searchButtonMobile}
        aria-label="Search jobs"
      >
        <img src="/assets/desktop/icon-search.svg" alt="" aria-hidden="true" />
      </button>

      <div
        id="filter-panel"
        className={styles.panel}
        data-open={isPanelOpen}
      >
        <div className={styles.locationField}>
          <img
            src="/assets/desktop/icon-location.svg"
            alt=""
            aria-hidden="true"
            className={styles.icon}
          />
          <label className={styles.visuallyHidden} htmlFor="job-location-filter">
            Filter by location
          </label>
          <input
            id="job-location-filter"
            type="text"
            placeholder="Filter by location…"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.checkboxField}>
          <input
            id="full-time-only"
            type="checkbox"
            checked={fullTimeOnly}
            onChange={(event) => setFullTimeOnly(event.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="full-time-only" className={styles.checkboxLabel}>
            Full Time Only
          </label>
        </div>

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
    </form>
  );
}
