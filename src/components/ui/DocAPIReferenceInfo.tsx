import React from "react";
import DocContent from "./DocContent";
import CodeBlock from "../CodeBlock/CodeBlock";
import List from "./List";
import Table from "./Table";

interface DocAPIReferenceInfoType {
  titleName: string;
  contentBeforeCodes?: string[];
  codes?: {
    language: string;
    text: string;
  }[];
  contentAfterCodes?: string[];
  list?: {
    intro: string[];
    content: string[]
  },
  table?:{
    tableHeaders: string[];
    tableBody: string[][];
  },
  notes?: string[]
}

export default function DocAPIReferenceInfo({
  data
}: {data: DocAPIReferenceInfoType}) {
  const { titleName, contentBeforeCodes, codes, contentAfterCodes, list, table, notes } = data;
  return (
    <DocContent title={titleName}>
      <div className="flex flex-col justify-center">
        {contentBeforeCodes && <div className="flex flex-col justify-center">
          {contentBeforeCodes?.map((content, index) => {
            return <p key={index}>{content}</p>;
          })}
        </div>}
        {codes && <div className="flex flex-col justify-center my-4">
          { codes?.map((code, index)=>{
            return (
              <CodeBlock key={index} language={code.language} code={code.text} tabs={[]} fileName={titleName} />
            )
          }) }
        </div>}
        {contentAfterCodes && <div className="flex flex-col justify-center">
          {contentAfterCodes?.map((content, index) => {
            return <p key={index}>{content}</p>;
          })}
        </div>}
        {list && <div className="flex flex-col justify-center">
          <div className="flex flex-col justify-center">
            { list?.intro.map((con, index)=>{
              return (
                <p key={index} >{ con }</p>
              )
            }) }
            <List listArray={list ? list.content : []} />
          </div>
          {  }
        </div>}
        {table && <div className="flex flex-col justify-center">
          <Table tableHeaders={table?.tableHeaders} tableBody={table?.tableBody} />
        </div>}
        {notes && <div className="flex flex-col justify-center">
          <List listArray={notes} listClassName="grid grid-cols-1 gap-2" />
        </div>}
      </div>
    </DocContent>
  );
}
