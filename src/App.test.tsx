import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import type { Job } from "./types/job";

const jobs: Job[] = [
  {
    id: 1,
    company: "Scoot",
    logo: "./assets/logos/scoot.svg",
    logoBackground: "hsl(36, 87%, 49%)",
    position: "Senior Software Engineer",
    postedAt: "5h ago",
    contract: "Full Time",
    location: "United Kingdom",
    website: "https://example.com/scoot",
    apply: "https://example.com/scoot/apply",
    description: "Job description",
    requirements: { content: "req content", items: ["req 1"] },
    role: { content: "role content", items: ["role 1"] },
  },
];

function renderApp(initialEntries: string[]) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("App routing", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => jobs,
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("navigates from the job list to the matching job detail page", async () => {
    const user = userEvent.setup();
    renderApp(["/"]);

    const link = await screen.findByRole("link", {
      name: "View details for Senior Software Engineer at Scoot",
    });
    await user.click(link);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Senior Software Engineer",
      }),
    ).toBeInTheDocument();
  });

  it("renders the job matching the :id route param directly", async () => {
    renderApp(["/jobs/1"]);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Senior Software Engineer",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Scoot").length).toBeGreaterThan(0);
  });
});
