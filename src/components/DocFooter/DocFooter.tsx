"use client";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DocFooter() {
  const links = {
    Introduction: "/docs/introduction",
    Algorithms: "/docs/algorithms",
    Stores: "/docs/stores",
    Configuration: "/docs/configuration",
    Guides: "/docs/guides",
    "API Reference": "/docs/api-reference",
    Examples: "/docs/examples",
    Advanced: "/docs/advanced",
    FAQs: "/docs/faqs",
  };

  const pathname = usePathname();
  console.log("Pathname: ", pathname);

  return (
    <div className="my-8 flex items-center px-8">
      {[...Array(Object.keys(links).length)].map((_, index) => {
        console.log(
          "Link: ",
          links[Object.keys(links)[index] as keyof typeof links],
        );
        const link = links[Object.keys(links)[index] as keyof typeof links]
        if (pathname != link)
            return;
        const prevLink = links[Object.keys(links)[index-1] as keyof typeof links];
        const nextLink = links[Object.keys(links)[index+1] as keyof typeof links];
        return (
          <div
            key={index}
            className="flex w-full items-center justify-between px-5"
          >
            {index > 0 ? (
              <Link href={prevLink} className="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 font-bold text-neutral-200 transition-all duration-200 hover:bg-neutral-800">
                <ChevronLeft />
                <span>{Object.keys(links)[index - 1]}</span>
              </Link>
            ) : (
              <div></div>
            )}
            {index < Object.keys(links).length - 1 ? (
              <Link href={nextLink} className="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-300 px-4 py-2 font-bold text-neutral-900 transition-all duration-200 hover:bg-neutral-50">
                <span>{Object.keys(links)[index + 1]}</span>
                <ChevronRight />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
