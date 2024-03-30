// types/index.ts
export interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
  location?: string;
}

export interface Repo {
  id: number;
  name: string;
  fork: boolean;
  stargazers_count: number;
  updated_at: string;
  owner: {
    login: string;
  };
}
