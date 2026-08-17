import React from "react";
import DocContent from "./DocContent";
import CodeBlock from "../CodeBlock/CodeBlock";
import List from "./List";
import Table from "./Table";
import Mermaid from "../Mermaid/Mermaid";
import Accordion from "./Accordion";

interface DocAPIReferenceInfoType {
  titleName: string;
  contentBeforeCodes?: string[];
  codes?: {
    language: string;
    text: string;
  }[];
  contentAfterCodes?: string[];
  flowchart?: string;
  list?: {
    intro: string[];
    content: string[];
  };
  table?: {
    tableHeaders: string[];
    tableBody: string[][];
  };
  notes?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export default function DocsInfoTemplate2({
  data,
  titleClassName,
  includeHashTag,
}: {
  data: DocAPIReferenceInfoType;
  titleClassName?: string;
  includeHashTag?: boolean;
}) {
  const {
    titleName,
    contentBeforeCodes,
    codes,
    contentAfterCodes,
    flowchart,
    list,
    table,
    notes,
    faqs,
  } = data;
  return (
    <DocContent
      title={titleName}
      titleClassName={titleClassName}
      includeHashTag={includeHashTag}
    >
      <div className="flex flex-col justify-center gap-5">
        {contentBeforeCodes && (
          <div className="flex flex-col justify-center gap-2">
            {contentBeforeCodes?.map((content, index) => {
              return <p key={index}>{content}</p>;
            })}
          </div>
        )}
        {codes && (
          <div className="my-4 flex flex-col justify-center gap-3">
            {codes?.map((code, index) => {
              return (
                <CodeBlock
                  key={index}
                  language={code.language}
                  code={code.text}
                  tabs={[]}
                  fileName={titleName}
                />
              );
            })}
          </div>
        )}
        {contentAfterCodes && (
          <div className="flex flex-col justify-center gap-2">
            {contentAfterCodes?.map((content, index) => {
              return <p key={index}>{content}</p>;
            })}
          </div>
        )}
        {}
        {list && (
          <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center gap-2">
              {list?.intro.map((con, index) => {
                return <p key={index}>{con}</p>;
              })}
              <List
                listArray={list ? list.content : []}
                listClassName="grid grid-cols-1 gap-2"
              />
            </div>
          </div>
        )}
        {flowchart && <Mermaid chart={flowchart} />}
        {table && (
          <div className="flex flex-col justify-center">
            <Table
              tableHeaders={table?.tableHeaders}
              tableBody={table?.tableBody}
            />
          </div>
        )}
        {notes && (
          <div className="flex flex-col justify-center">
            <DocContent title="Notes">
              <List listArray={notes} listClassName="grid grid-cols-1 gap-2" />
            </DocContent>
          </div>
        )}
        {faqs && (
          <div className="flex flex-col justify-center">
            {faqs.map((faq, index) => {
              return (
                <Accordion
                  key={index}
                  data={[{ title: faq.question, content: faq.answer }]}
                />
              );
            })}
          </div>
        )}
      </div>
    </DocContent>
  );
}
