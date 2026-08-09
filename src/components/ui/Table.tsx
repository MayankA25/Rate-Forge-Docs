import React from "react";

export default function Table({
  tableHeaders,
  tableBody,
}: {
  tableHeaders: string[];
  tableBody: string[][];
}) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-neutral-700">
          {tableHeaders.map((header, index) => {
            return (
              <th key={index} className="px-4 py-3 font-semibold">
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableBody.map((tb, index1) => {
          return (
            <tr key={index1} className="border-b border-neutral-800">
              {tb.map((text, index2) => {
                return (
                  <td key={index2} className="px-4 py-3">
                    {text}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
