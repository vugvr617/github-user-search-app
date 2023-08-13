import React, { useState,useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchBar = () => {
  const router = useRouter()
  const [username, setUsername] = useState(router.query.userId);

  useEffect(() => {
    setUsername(router.query.userId)
  }, [router.query.userId])

  return (
    <form className="flex rounded-md items-center w-full p-2 shadow-md h-16 bg-white">
      <label htmlFor="input">
        <MagnifyingGlassIcon className="h-10 text-blue-500 w-10" />
      </label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        id="input"
        className="outline-none rounded-md placeholder:text-neutral-500 w-full h-full p-2"
        placeholder="Enter GitHub username..."
      />
      <Link href={`/u/${username}`} className="h-full"><button className="px-8 h-full text-white rounded-md bg-blue-500">Search</button></Link>
    </form>
  );
};

export default SearchBar;
