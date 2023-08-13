import SearchBar from "@/components/SearchBar";
import { ReactNode } from "react";

export default function Home({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center w-screen">
      <div className="w-[90%] text-cyan-800 max-w-[720px] p-3">
        <SearchBar />
        <div className="flex mt-5 justify-center h-[400px]">{children}</div>
      </div>
    </div>
  );
}
