export interface User {
  name: string,
  followers: number,
  following: number,
  blog: string,
  login: string,
  avatar_url: string,
  html_url: string,
  bio: string,
  twitter_username: string | null,
  public_repos: number,
  location: string,
  company?: string,
  followerUsers?: Array<User>,
  created_at: Date,
  followingUsers?: Array<User>
}
