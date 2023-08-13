import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../types/User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      async queryFn(username, api, extraOptions, fetchWithBQ) {
        if (!username) return;
        const userQuery = await fetchWithBQ(`users/${username}`);
        if (userQuery.error) return {error: userQuery.error};
        const followersQuery = await fetchWithBQ(`users/${username}/followers`);
        const followingQuery = await fetchWithBQ(`users/${username}/following`);

        const followerUsers = followersQuery.data as Array<User>;
        const followingUsers = followingQuery.data as Array<User>;

        return { data: { ...(userQuery.data as User), followerUsers, followingUsers } };
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
