import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function LiveBadge() {
  return (
    <div
      aria-label="Live data"
      style={{ backgroundColor: "green", width: "10px", height: "10px", borderRadius: "50%" }}
    />
  );
}

describe("LiveBadge", () => {
  it("renders a green indicator element", () => {
    render(<LiveBadge />);
    const badge = screen.getByLabelText("Live data");
    expect(badge).toBeTruthy();
    expect(badge.style.backgroundColor).toBe("green");
  });

  it('has accessible aria-label "Live data"', () => {
    render(<LiveBadge />);
    expect(screen.getByLabelText("Live data")).toBeTruthy();
  });

  it("does not throw when mounted with happy-dom", () => {
    expect(() => render(<LiveBadge />)).not.toThrow();
  });
});
