"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RepoRow } from "../../../components/RepoRow";
import { Repo } from "../../../types";
import { fetchRepos } from "../../../services/githubService";

const UserReposPage = () => {
  const pathname = usePathname();
  const login = pathname.split("/")[2];
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isLoading = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (login && !isLoading.current) {
      isLoading.current = true;
      const getRepos = async () => {
        const newRepos = await fetchRepos(login, page);
        if (typeof newRepos === "string") {
          setError(newRepos);
          isLoading.current = false;
          return;
        }
        setRepos((prev) => [...prev, ...newRepos]);
        if (newRepos.length < 25) {
          setHasMore(false);
        }
        isLoading.current = false;
      };
      getRepos();
    }
  }, [login, page]);

  if (error) {
    return <div className="text-center my-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center my-4 text-gray-900">
        Repositories of {login}
      </h2>
      <InfiniteScroll
        dataLength={repos.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={
          <div className="text-center my-4 text-gray-900">Loading...</div>
        }
        endMessage={
          <div className="text-center my-4 text-gray-900">
            You have seen all repositories
          </div>
        }
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
      >
        {repos.map((repo) => (
          <RepoRow key={repo.id} repo={repo} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default UserReposPage;
