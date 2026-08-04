import React from "react";
import Badge from "./Badge";

export default function AlgoCard({
 children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="justfiy-center flex flex-col rounded-lg bg-neutral-900 p-5">
     {children}
    </div>
  );
}
