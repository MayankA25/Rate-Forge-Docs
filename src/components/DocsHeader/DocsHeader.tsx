"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function DocsHeader() {
  const pathname = usePathname();

  console.log("Pathname: ", pathname);

  const text = pathname.split("/")[pathname.split("/").length - 1];
  console.log("Text: ", text);

  const headerText = text
    .split("%20")
    .map((el) => {
      return `${el.at(0)?.toUpperCase()}${el.slice(1)}`;
    })
    .join(" ");

  return (
    <div className="sticky top-0 z-50 w-full bg-neutral-900 px-5 py-6">
      <h1 className="text-xl font-bold">{headerText}</h1>
    </div>
  );
}
