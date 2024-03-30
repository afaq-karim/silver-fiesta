import axios from "axios";
import { Contributor, Repo } from "../types";

export const fetchContributors = async (
  page: number
): Promise<Contributor[] | string> => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/angular/angular/contributors?page=${page}&per_page=25`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    }
    return "An unexpected error occurred";
  }
};

export const fetchRepos = async (
  login: string,
  page: number
): Promise<Repo[] | string> => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${login}/repos?page=${page}&per_page=25&sort=updated`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    }
    return "An unexpected error occurred";
  }
};

export const fetchUserProfile = async (login: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${login}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};
