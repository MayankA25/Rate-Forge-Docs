import React from "react";

export default function AlgoCard({
 children,
 border,
 hover
}: {
  children: React.ReactNode,
  border?: boolean,
  hover?: boolean
}) {
  return (
    <div className={`justfiy-center flex flex-col rounded-lg bg-neutral-900 p-5 border border-neutral-700 ${hover && "hover:scale-101 transition-all duration-200 hover:cursor-default"}`}>
     {children}
    </div>
  );
}
