"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ContributorCard } from "./components/ContributorCard";
import { Contributor } from "./types";
import { fetchContributors } from "./services/githubService";

const IndexPage = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isLoading = useRef<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getContributors = async () => {
      if (isLoading.current) return;
      isLoading.current = true;
      const newContributors = await fetchContributors(page);
      if (typeof newContributors === "string") {
        setError(newContributors);
        return;
      }
      setContributors((prev) => [...prev, ...newContributors]);
      if (newContributors.length < 25) {
        setHasMore(false);
      }
      isLoading.current = false;
    };

    getContributors();
  }, [page]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center my-8 text-gray-950">
        Top Contributors
      </h2>
      <InfiniteScroll
        dataLength={contributors.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<h4 className="text-center my-4 text-gray-900">Loading...</h4>}
        endMessage={
          <p className="text-center my-4 text-gray-900">
            You have seen all contributors
          </p>
        }
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
      >
        {contributors.map((contributor, index) => (
          <ContributorCard
            key={contributor.login + index}
            contributor={contributor}
          />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default IndexPage;
