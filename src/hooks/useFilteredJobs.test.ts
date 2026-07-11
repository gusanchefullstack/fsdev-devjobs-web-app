import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFilteredJobs } from "./useFilteredJobs";
import type { Job } from "../types/job";

function makeJob(overrides: Partial<Job>): Job {
  return {
    id: 1,
    company: "Acme",
    logo: "./assets/logos/acme.svg",
    logoBackground: "#000",
    position: "Frontend Developer",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "United Kingdom",
    website: "https://example.com",
    apply: "https://example.com/apply",
    description: "desc",
    requirements: { content: "req", items: [] },
    role: { content: "role", items: [] },
    ...overrides,
  };
}

describe("useFilteredJobs", () => {
  const jobs = [
    makeJob({ id: 1, position: "Frontend Developer", company: "Acme", location: "United Kingdom", contract: "Full Time" }),
    makeJob({ id: 2, position: "Backend Engineer", company: "Blogr", location: "United States", contract: "Part Time" }),
    makeJob({ id: 3, position: "Fullstack Developer", company: "Crowdfund", location: "New Zealand", contract: "Full Time" }),
  ];

  it("returns all jobs when filters are empty", () => {
    const { result } = renderHook(() =>
      useFilteredJobs(jobs, { title: "", location: "", fullTimeOnly: false }),
    );
    expect(result.current).toHaveLength(3);
  });

  it("filters by title matching position or company, case-insensitively", () => {
    const { result } = renderHook(() =>
      useFilteredJobs(jobs, { title: "frontend", location: "", fullTimeOnly: false }),
    );
    expect(result.current.map((job) => job.id)).toEqual([1]);
  });

  it("filters by location substring", () => {
    const { result } = renderHook(() =>
      useFilteredJobs(jobs, { title: "", location: "united", fullTimeOnly: false }),
    );
    expect(result.current.map((job) => job.id)).toEqual([1, 2]);
  });

  it("filters to full-time only jobs when requested", () => {
    const { result } = renderHook(() =>
      useFilteredJobs(jobs, { title: "", location: "", fullTimeOnly: true }),
    );
    expect(result.current.map((job) => job.id)).toEqual([1, 3]);
  });

  it("combines all filters with AND logic", () => {
    const { result } = renderHook(() =>
      useFilteredJobs(jobs, {
        title: "developer",
        location: "zealand",
        fullTimeOnly: true,
      }),
    );
    expect(result.current.map((job) => job.id)).toEqual([3]);
  });
});
