import React from "react";

export default function List({
  listArray,
  listClassName,
  listItemClassName,
}: {
  listArray: string[];
  listClassName?: string;
  listItemClassName?: string;
}) {
  return (
    <ul
      className={`${listClassName ? listClassName : "grid grid-cols-2 gap-5"} px-5`}
    >
      {listArray.map((content, index) => {
        return (
          <li
            className={`${listItemClassName ? listItemClassName : "list-disc"} font-bold`}
            key={index}
          >
            {content}
          </li>
        );
      })}
    </ul>
  );
}
