"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Contributor } from "../types";

interface ContributorCardProps {
  contributor: Contributor;
}

export const ContributorCard = ({ contributor }: ContributorCardProps) => {
  return (
    <div className="p-5 border border-gray-200 rounded-lg flex flex-col items-center gap-2.5 text-center bg-gray-800 text-white">
      <Image
        src={contributor.avatar_url}
        alt={`Avatar of ${contributor.login}`}
        width={100}
        height={100}
        className="rounded-full"
      />
      <h3 className="text-lg font-semibold">{contributor.login}</h3>
      <p>Commits: {contributor.contributions}</p>
      <div className="flex gap-2 flex-wrap justify-center">
        <Link href={`/user/${contributor.login}/repos`} legacyBehavior>
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out">
            View Repositories
          </a>
        </Link>
        <Link href={`/user/${contributor.login}/location`} legacyBehavior>
          <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1 transition-colors duration-200 ease-in-out">
            <span>🧭</span> Location
          </a>
        </Link>
      </div>
    </div>
  );
};
