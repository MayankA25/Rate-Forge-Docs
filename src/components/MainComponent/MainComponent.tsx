import React from "react";

export default function MainComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto w-[80%]">{children}</div>;
}
