import React from "react";
import DocContent from "../ui/DocContent";
import List from "../ui/List";
import Table from "../ui/Table";
import { algorithms } from "../../../utils/docAlgorithms";
import DocInfoTemplate from "../ui/DocInfoTemplate";

export default function DocAlgos() {
  const algorithmsOverview = [
    `Fixed Window — Simple and efficient request limiting based on fixed time intervals.`,
    `Sliding Window Log — Precise request tracking using individual request timestamps.`,
    `Sliding Window Counter — A memory-efficient approximation of the sliding window approach.`,
    `Token Bucket — Allows controlled bursts while maintaining a long-term request rate.`,
    `Leaky Bucket — Processes requests at a controlled and consistent rate.`,
    `GCRA — Provides precise rate control using a theoretical arrival-time model.`,
  ];
  const algoComparisonTable = {
    tableHeaders: [
      "Algorithm",
      "Burst Support",
      "Precision",
      "Memory Support",
      "Best For",
    ],
    tableBody: [
      ["Fixed Window", "Limited", "Low", "Low", "Simple APIs"],
      ["Sliding Window Log", "Yes", "High", "High", "Precise limiting"],
      [
        "Sliding Window Counter",
        "Limited",
        "Medium",
        "Low",
        "Memory-efficient limiting",
      ],
      ["Token Bucket", "Yes", "High", "Low", "APIs requiring bursts"],
      ["Leaky Bucket", "Limited", "High", "Low", "Smooth traffic flow"],
      ["GCRA", "Controlled", "High", "Low", "Precise traffic shaping"],
    ],
  };

  return (
    <div className="flex flex-col font-bold">
      <DocContent
        title="Algorithms Overview"
        includeHashTag={true}
        titleClassName="text-5xl"
      >
        <div className="flex flex-col gap-4 px-8">
          <p>
            Rate Forge provides multiple rate limiting algorithms, each designed
            for different traffic patterns and application requirements.
          </p>
          <p>
            The algorithms differ in how they track requests, handle bursts,
            distribute traffic over time, and use storage. Choosing the right
            algorithm depends on the level of precision, burst tolerance, memory
            usage, and traffic behavior your application requires.
          </p>
          <p>Rate Forge currently supports six algorithms:</p>
          <List
            listArray={algorithmsOverview}
            listClassName="grid grid-cols-1 gap-5"
          />
        </div>
        <Table
          tableHeaders={algoComparisonTable.tableHeaders}
          tableBody={algoComparisonTable.tableBody}
        />
      </DocContent>
      <div className="flex flex-col justify-center gap-8 mt-8">

      {algorithms.map((algorithm, index) => {
        return <DocInfoTemplate key={index} data={algorithm} />;
      })}
      </div>
    </div>
  );
}
