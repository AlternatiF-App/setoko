export interface UserProps {
  login: string
  avatar_url: string
  repos_url: string
}

export interface RepoProps {
  name: string
  description: string
  stargazers_count: number
}