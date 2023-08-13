import { useGetUserQuery } from "@/services/userApi";
import { HiLocationMarker, HiOfficeBuilding } from "react-icons/hi";
import { AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";
import Link from "next/link";
import HomeLayout from "@/pages";
import { useRouter } from "next/router";

const UserComponent = () => {
  const router = useRouter();
  const { data: user, status, error } = useGetUserQuery(router.query.userId as string);

  if (status === "pending")
    return (
      <HomeLayout>
        <p>Loading...</p>
      </HomeLayout>
    );

  const joinedAt = new Date(user?.created_at as Date);

  const content =
    error || !user ? (
      <p className="text-center">{error?.data?.message}</p>
    ) : (
      <div className="w-full bg-white gap-6 flex flex-col md:flex-row md:items-start items-center rounded-md shadow-md h-full p-10">
        <img className="h-20 w-20 rounded-full" src={user.avatar_url} />
        <div className="w-full flex gap-4 h-full flex-col justify-between">
          <div className="flex items-center justify-between md:items-center w-full">
            <div className="w-fit">
              <p className="font-bold text-2xl">{user.name ?? "Unnamed user"}</p>
              <Link target="_blank" href={user.html_url} className="text-blue-600">
                @{user.login}
              </Link>
            </div>
            <span className="text-neutral-500">
              Joined at {joinedAt.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric" })}
            </span>
          </div>
          <p>{user.bio ?? "This profile has no bio."}</p>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between bg-blue-50 rounded-md px-8 py-4">
              <div>
                <p>Repos</p>
                <p className="text-2xl font-bold">{user.public_repos}</p>
              </div>
              <div>
                <p>Followers</p>
                <div className="flex items-center gap-1">
                  {user.followerUsers?.slice(0, 3).map((u) => (
                    <Link target="_blank" href={u.html_url}>
                      <img className="w-7 h-7 rounded-full" src={u.avatar_url} />
                    </Link>
                  ))}
                  {user.followers - 3 > 0 && <span className="text-xl font-bold">+{user.followers - 3}</span>}
                </div>
              </div>
              <div>
                <p>Following</p>
                <div className="flex items-center gap-1">
                  {user.followingUsers?.slice(0, 3).map((u) => (
                    <Link target="_blank" href={u.html_url}>
                      <img className="w-7 h-7 rounded-full" src={u.avatar_url} />
                    </Link>
                  ))}
                  {user.following - 3 > 0 && <span className="text-xl font-bold">+{user.followers - 3}</span>}
                </div>
              </div>
            </div>
            <div className="grid gap-y-2 grid-cols-2">
              <div className={`flex gap-1 items-center ${!user.location && "text-neutral-500"}`}>
                <HiLocationMarker className="h-7 w-7" />
                <span className="max-w-[180px] text-ellipsis overflow-hidden">{user.location ?? "Not available"}</span>
              </div>
              <div className={`flex gap-1 items-center ${!user.twitter_username && "text-neutral-500"}`}>
                <AiOutlineTwitter className="h-7 w-7" />
                <span>{user.twitter_username ?? "Not available"}</span>
              </div>
              <div className={`flex gap-1 items-center ${!user.blog && "text-neutral-500"}`}>
                <AiOutlineLink className="h-7 w-7" />
                {user.blog ? (
                  <Link className="max-w-[180px] text-ellipsis overflow-hidden" target="_blank" href={user.blog}>
                    {user.blog}
                  </Link>
                ) : (
                  <span>Not available</span>
                )}
              </div>
              <div className={`flex gap-1 items-center ${!user.company && "text-neutral-500"}`}>
                <HiOfficeBuilding className="h-7 w-7" />
                <span>{user.company ?? "Not available"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <HomeLayout>
      <div className="w-full">{content}</div>
    </HomeLayout>
  );
};

export default UserComponent;
