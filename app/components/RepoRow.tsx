import React from "react";
import { Repo } from "../types";
import { format } from "date-fns";

interface RepoRowProps {
  repo: Repo;
}

export const RepoRow = ({ repo }: RepoRowProps) => {
  const lastUpdatedFormatted = format(new Date(repo.updated_at), "PPP");

  return (
    <div className="p-4 my-2 border border-gray-200 rounded-lg bg-gray-800 text-white shadow hover:shadow-md transition-shadow duration-300 ease-in-out">
      <h4 className="text-lg font-semibold capitalize">{repo.name}</h4>
      <div className="text-sm">
        <p>Forked: {repo.fork ? "Yes" : "No"}</p>
        <p>Stars: {repo.stargazers_count}</p>
        <p>Last Updated: {lastUpdatedFormatted}</p>
      </div>
    </div>
  );
};
