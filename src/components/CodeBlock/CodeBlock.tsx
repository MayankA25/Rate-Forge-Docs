import { highlightCode } from "@/lib/shiki";
import React from "react";
import CodeTabs from "../CodeTabs/CodeTabs";
import CodeHeader from "../ui/CodeHeader";

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
  fileName?: string;
  tabs: Tab[];
}) {
  const highlightedTabs = await Promise.all(
    tabs.map(async (tab) => {
      return {
        ...tab,
        html: await highlightCode(tab.code, tab.language),
      };
    }),
  );

  const html = tabs.length > 0 ? null : await highlightCode(code, language);

  // console.log("Html: ", html)

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {tabs.length > 0 && (
        <CodeTabs tabs={highlightedTabs} headerText={fileName || "Terminal"} />
      )}
      {fileName && tabs.length == 0 && (
        <CodeHeader headerText={fileName} code={code} />
      )}
      <div
        className="[&_.shiki]:p-7"
        dangerouslySetInnerHTML={{ __html: html! }}
      ></div>
    </div>
  );
}
