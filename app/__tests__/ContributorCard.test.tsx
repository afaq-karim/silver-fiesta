import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { ContributorCard } from "../components/ContributorCard";
import { Contributor } from "../types";

describe("ContributorCard", () => {
  const testContributor: Contributor = {
    login: "testuser",
    avatar_url: "https://example.com/avatar.jpg",
    contributions: 10,
    html_url: "https://github.com/testuser",
  };

  it("renders contributor card correctly", () => {
    render(<ContributorCard contributor={testContributor} />);

    expect(screen.getByText(testContributor.login)).toBeInTheDocument();
    expect(
      screen.getByText(`Commits: ${testContributor.contributions}`)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(`Avatar of ${testContributor.login}`)
    ).toBeInTheDocument();
  });

  it("renders 'View Repositories' link with correct href", () => {
    render(<ContributorCard contributor={testContributor} />);

    expect(
      screen.getByRole("link", { name: /View Repositories/i })
    ).toHaveAttribute("href", `/user/${testContributor.login}/repos`);
  });

  it("renders 'Location' link with correct href", () => {
    render(<ContributorCard contributor={testContributor} />);

    expect(screen.getByRole("link", { name: /Location/i })).toHaveAttribute(
      "href",
      `/user/${testContributor.login}/location`
    );
  });
});
