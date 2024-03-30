"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchUserProfile } from "../../../services/githubService";

const UserLocationPage = () => {
  const pathname = usePathname();
  const login = pathname.split("/")[2];
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof login === "string") {
      setLoading(true);
      setError(null);
      fetchUserProfile(login)
        .then((profile) => {
          setLocation(profile.location);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user location:", error);
          setError("Error fetching user location");
          setLoading(false);
        });
    }
  }, [login]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return (
      <div className="text-center my-4 text-gray-900">
        User location is not available or user does not exist.
      </div>
    );
  }

  // provide an API key to the Google Maps Embed API to display the map
  return (
    <div>
      <h1 className="text-xl font-bold text-center my-4 text-gray-900">
        Location: {location}
      </h1>
      <iframe
        width="600"
        height="450"
        loading="lazy"
        allowFullScreen
        className="rounded-lg px-4 py-2 border border-gray-200"
        title="User Location Map"
        src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
          location
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      ></iframe>
    </div>
  );
};

export default UserLocationPage;
