import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../../context/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("toggles the theme and persists the choice to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const toggle = screen.getByRole("switch", { name: "Toggle dark mode" });
    const initiallyDark = toggle.getAttribute("aria-checked") === "true";

    await user.click(toggle);

    expect(toggle).toHaveAttribute(
      "aria-checked",
      String(!initiallyDark),
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      !initiallyDark ? "dark" : "light",
    );
    expect(localStorage.getItem("devjobs-theme")).toBe(
      !initiallyDark ? "dark" : "light",
    );
  });
});
