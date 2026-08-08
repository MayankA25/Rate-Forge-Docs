import React from "react";
import CopyIcon from "./CopyIcon";

export default function CodeHeader({ headerText, code }: { headerText: string, code: string }) {
  return (
    <div className="relative flex items-center border-b border-neutral-700 bg-neutral-900 px-4 py-2">
      <span className="font-bold text-neutral-200">{headerText}</span>
      <span className="absolute right-4">
        <CopyIcon text={code} />
      </span>
    </div>
  );
}
