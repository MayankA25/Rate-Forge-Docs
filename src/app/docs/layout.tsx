import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";
import { docsSidebar } from "../../../utils/Sidebar";
import DocsHeader from "@/components/DocsHeader/DocsHeader";
import DocFooter from "@/components/DocFooter/DocFooter";

export default async function DocLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="m-auto flex w-[95%]">
        <div className="flex h-screen min-h-screen w-[20%] scrollbar-thin items-center overflow-y-scroll border-r border-neutral-800 py-5">
          <Sidebar items={docsSidebar} displayBlock={true} isChildren={false} />
        </div>

        <div className="relative h-screen w-[80%] scrollbar-thin overflow-y-scroll">
          <DocsHeader />
          <div className="p-5">{children}</div>
          <DocFooter />
        </div>
      </div>
    </div>
  );
}
