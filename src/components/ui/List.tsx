import React from "react";

export default function List({ listArray }: { listArray: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-5 px-5">
      {listArray.map((content, index) => {
        return (
          <li className="list-disc font-bold" key={index}>
            {content}
          </li>
        );
      })}
    </ul>
  );
}
