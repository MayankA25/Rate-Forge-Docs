import React from "react";
import DocContent from "./DocContent";
import Mermaid from "../Mermaid/Mermaid";
import List from "./List";
import CodeBlock from "../CodeBlock/CodeBlock";
import Table from "./Table";

interface Algorithm {
  algorithmName: string;
  algorithmOverview: string[];
  workingContent: string[];
  workingFlowChart: string;
  workingList: string[];
  configurationCode: string;
  configurationTable: {
    tableHeaders: string[];
    tableBody: string[][];
  };
  advantages: string[];
  limitations: string[];
}

export default function DocAlgoInfo({ algorithm }: { algorithm: Algorithm }) {
  const {
    algorithmName,
    algorithmOverview,
    workingContent,
    workingFlowChart,
    workingList,
    configurationCode,
    configurationTable,
    advantages,
    limitations,
  } = algorithm;
  return (
    <div className="flex flex-col">
      <DocContent
        title={algorithmName}
        titleClassName="text-5xl"
        includeHashTag={true}
      >
        <div className="flex flex-col gap-5 px-8">
          <DocContent title="Overview">
            <div className="flex flex-col justify-center gap-3">
              {algorithmOverview.map((content, index) => {
                return <p key={index}>{content}</p>;
              })}
            </div>
          </DocContent>
          <DocContent title="How it works?">
            <div className="flex flex-col justify-center gap-2">
              {workingContent.map((content, index) => {
                return <p key={index}>{content}</p>;
              })}
              <div className="flex items-center my-5">
                <Mermaid chart={workingFlowChart} />
              </div>
              <List listArray={workingList} />
            </div>
          </DocContent>
          <DocContent title="Configuration">
            <CodeBlock code={configurationCode} language="ts" tabs={[]} />

            <Table
              tableHeaders={configurationTable.tableHeaders}
              tableBody={configurationTable.tableBody}
            />
          </DocContent>
          <DocContent title="Advantages">
            <List listArray={advantages} />
          </DocContent>
          <DocContent title="Limitations">
            <List listArray={limitations} />
          </DocContent>
        </div>
      </DocContent>
    </div>
  );
}
