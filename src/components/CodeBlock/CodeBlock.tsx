import { highlightCode } from "@/lib/shiki";
import React from "react";
import CopyIcon from "../ui/CopyIcon";

export default async function CodeBlock({
  code,
  language,
  fileName,
}: {
  code: string;
  language: string;
  fileName: string;
}) {
  const html = await highlightCode(code, language);

  // console.log("Html: ", html)

  return (
    <div className="w-full overflow-hidden rounded-lg relative ">
      {fileName && (
        <div className="flex items-center border-b border-neutral-700 bg-neutral-900 px-4 py-2">
          <span className="font-bold text-neutral-200">{fileName}</span>
        </div>
      )}
      <div
        className="[&_.shiki]:p-7"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <span className="absolute top-15 right-4">
        <CopyIcon text={code} />
      </span>
    </div>
  );
}
