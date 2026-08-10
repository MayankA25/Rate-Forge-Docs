import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";
import { docsSidebar } from "../../../utils/Sidebar";
import DocsHeader from "@/components/DocsHeader/DocsHeader";
import DocFooter from "@/components/DocFooter/DocFooter";

export default async function DocLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-full">
      <div className="flex w-[95%] m-auto">
        <div className="flex h-screen scrollbar-thin w-[20%] items-center border-r border-neutral-800 py-5 min-h-screen overflow-y-scroll">
          <Sidebar items={docsSidebar} displayBlock={true} isChildren={false} />
        </div>

        <div className="relative w-[80%] h-screen overflow-y-scroll scrollbar-thin">
            <DocsHeader />
            <div className="p-5">
            { children }
            </div>
            <DocFooter/>
        </div>
      </div>
    </div>
  );
}
