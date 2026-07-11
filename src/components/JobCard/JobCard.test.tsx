import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { JobCard } from "./JobCard";
import type { Job } from "../../types/job";

const job: Job = {
  id: 42,
  company: "Scoot",
  logo: "./assets/logos/scoot.svg",
  logoBackground: "hsl(36, 87%, 49%)",
  position: "Senior Software Engineer",
  postedAt: "5h ago",
  contract: "Full Time",
  location: "United Kingdom",
  website: "https://example.com/scoot",
  apply: "https://example.com/scoot/apply",
  description: "desc",
  requirements: { content: "req", items: [] },
  role: { content: "role", items: [] },
};

function renderJobCard() {
  return render(
    <MemoryRouter>
      <ul>
        <JobCard job={job} />
      </ul>
    </MemoryRouter>,
  );
}

describe("JobCard", () => {
  it("renders the job's position, company, and location", () => {
    renderJobCard();
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Scoot")).toBeInTheDocument();
    expect(screen.getByText("United Kingdom")).toBeInTheDocument();
  });

  it("links to the job detail route with an accessible name", () => {
    renderJobCard();
    const link = screen.getByRole("link", {
      name: "View details for Senior Software Engineer at Scoot",
    });
    expect(link).toHaveAttribute("href", "/jobs/42");
  });
});
