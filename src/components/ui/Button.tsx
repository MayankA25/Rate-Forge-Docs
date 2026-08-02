import React from "react";

export default function Button({
  children,
  className,
  hoverClass
}: {
  children: React.ReactNode;
  className?: string;
  hoverClass?: string
}) {
  return (
    <button
      className={`cursor-pointer rounded-lg ${className ? className : "bg-neutral-200 text-neutral-900"} px-6 py-2 font-bold transition-all duration-200 ${hoverClass ? hoverClass : "hover:bg-neutral-800 hover:text-neutral-200"}`}
    >
      {children}
    </button>
  );
}
