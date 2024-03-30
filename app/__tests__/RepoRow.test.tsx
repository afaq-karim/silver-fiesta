import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { RepoRow } from "../components/RepoRow";
import { Repo } from "../types";

describe("RepoRow", () => {
  const testRepo: Repo = {
    id: 123, // Mocked ID
    owner: {
      login: "testowner",
    },
    name: "test-repo",
    fork: false,
    stargazers_count: 100,
    updated_at: new Date().toISOString(),
  };

  it("renders repo row correctly", () => {
    render(<RepoRow repo={testRepo} />);

    expect(screen.getByText(testRepo.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Forked: ${testRepo.fork ? "Yes" : "No"}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Stars: ${testRepo.stargazers_count}`)
    ).toBeInTheDocument();
    expect(screen.getByText(/^Last Updated:/)).toBeInTheDocument();
  });
});
