import React from "react";

export default function AlgoCard({
  children,
  hover,
}: {
  children: React.ReactNode;
  border?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={`justfiy-center flex flex-col rounded-lg border border-neutral-700 bg-neutral-900 p-5 ${hover && "transition-all duration-200 hover:scale-101 hover:cursor-default"}`}
    >
      {children}
    </div>
  );
}
