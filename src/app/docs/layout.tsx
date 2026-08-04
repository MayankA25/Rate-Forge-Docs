import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";
import { docsSidebar } from "../../../utils/Sidebar";
import DocsHeader from "@/components/DocsHeader/DocsHeader";

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex w-[25%] items-center border-r border-neutral-800 py-10 min-h-screen">
          <Sidebar items={docsSidebar} displayBlock={true} />
        </div>

        <div className="relative w-full">
            <DocsHeader/>
            <div className="p-5">
            { children }
            </div>
        </div>
      </div>
    </div>
  );
}
