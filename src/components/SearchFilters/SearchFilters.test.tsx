import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchFilters } from "./SearchFilters";

describe("SearchFilters", () => {
  it("calls onSearch with the entered title, location and full-time flag", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchFilters onSearch={onSearch} />);

    await user.type(
      screen.getByLabelText("Filter by title, companies, expertise"),
      "Engineer",
    );
    await user.type(
      screen.getByLabelText("Filter by location"),
      "Germany",
    );
    await user.click(screen.getByLabelText("Full Time Only"));
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(onSearch).toHaveBeenCalledWith({
      title: "Engineer",
      location: "Germany",
      fullTimeOnly: true,
    });
  });
});
