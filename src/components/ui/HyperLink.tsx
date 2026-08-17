import Link from "next/link";
import React from "react";

export default function HyperLink({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="cursor-default text-2xl font-bold text-neutral-400 transition-all duration-200 hover:cursor-pointer hover:text-neutral-200 hover:underline"
    >
      {text}
    </Link>
  );
}
