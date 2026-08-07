import { highlightCode } from "@/lib/shiki";
import React from "react";
import CopyIcon from "../ui/CopyIcon";
import CodeTabs from "../ui/CodeTabs";

interface Tab {
  title: string;
  language: string;
  code: string;
}

export default async function CodeBlock({
  code,
  language,
  fileName,
  tabs,
}: {
  code: string;
  language: string;
  fileName: string;
  tabs?: Tab[];
}) {
  const html = await highlightCode(code, language);

  // console.log("Html: ", html)

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {tabs && <CodeTabs tabs={tabs} />}
      {fileName && (
        <div className="relative flex items-center border-b border-neutral-700 bg-neutral-900 px-4 py-2">
          <span className="font-bold text-neutral-200">{fileName}</span>
          <span className="absolute right-4">
        <CopyIcon text={code} />
      </span>
        </div>
      )}
      <div
        className="[&_.shiki]:p-7"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      
    </div>
  );
}
