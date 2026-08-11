import React from "react";
import DocContent from "../ui/DocContent";
import Table from "../ui/Table";
import DocAlgoInfo from "../ui/DocAlgoInfo";
import { stores } from "../../../utils/docStores";

export default function DocStores() {
  const avaiableStoresTable = {
    tableHeaders: ["Store", "Persistence", "Distributed", "Best For"],
    tableBody: [
      [
        "Memory Store",
        "No",
        "No",
        "Development and single-instance applications",
      ],
      ["Redis Store", "Yes", "Yes", "Distributed applications"],
      ["MongoDB Store", "Yes", "Yes", "MongoDB-based applications"],
      ["PostgreSQL Store", "Yes", "Yes", "PostgreSQL-based applications"],
    ],
  };
  return (
    <div className="flex flex-col justify-center font-bold">
      <DocContent
        title="Stores Overview"
        includeHashTag={true}
        titleClassName="text-5xl"
      >
        <div className="flex flex-col gap-3 px-8">
          <p>
            Rate Forge separates rate limiting logic from data storage through a
            pluggable store architecture. Algorithms determine how requests are
            evaluated, while stores determine where the state required by those
            algorithms is persisted.
          </p>
          <p>
            This separation allows the same rate limiting algorithm to work with
            different storage backends depending on the application&apos;s
            architecture and deployment requirements.
          </p>
          <p>
            Rate Forge supports in-memory storage for development and
            single-instance applications, while distributed stores such as Redis
            are suitable for applications running across multiple instances.
          </p>
          <DocContent title="Available Stores" titleClassName="mt-5 text-3xl">
            <Table
              tableHeaders={avaiableStoresTable.tableHeaders}
              tableBody={avaiableStoresTable.tableBody}
            />
          </DocContent>
        </div>
      </DocContent>

      <div className="mt-8 flex flex-col justify-center gap-8">
        {stores.map((store, index) => {
          return <DocAlgoInfo key={index} data={store} />;
        })}
      </div>
    </div>
  );
}
