"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarItem {
  title: string;
  slug: string;
  items?: SidebarItem[];
}

export default function SideBarItem({
  item,
  isChildren,
}: {
  item: SidebarItem;
  isChildren?: boolean;
}) {
  const [block, setBlock] = useState(false);

  const handleClick = () => {
    setBlock(true);
  };

  const pathname = usePathname();

  const extractedTitle = pathname.split("/")[pathname.split("/").length - 1].split("%20").join(" ");

  console.log(extractedTitle);

  return (
    <li className={`my-3`}>
      <div
        className={`flex cursor-pointer items-center justify-center rounded-lg hover:bg-neutral-900 ${extractedTitle.toLowerCase() == item.title.toLowerCase() ? "bg-neutral-900" : ""}`}
      >
        <Link
          href={!isChildren ? `/docs/${item.title.toLowerCase()}` : ""}
          onClick={item.items && handleClick}
          className={`flex w-70 items-center px-3 py-2.5`}
        >
          <span className="text-md font-semibold">{item.title}</span>
        </Link>
        {item.items &&
          (block ? (
            <span className="hover:bg-neutral-800 rounded-full p-1 transition-all duration-200" onClick={()=>{
                setBlock(false)
            }}>
              <ChevronDown />
            </span>
          ) : (
            <span className="hover:bg-neutral-800 rounded-full p-1 transition-all duration-200" onClick={()=>{
                setBlock(true);
            }}>
              <ChevronRight />
            </span>
          ))}
      </div>
      {item.items && (
        <Sidebar items={item.items} displayBlock={block} isChildren={true} />
      )}
    </li>
  );
}
