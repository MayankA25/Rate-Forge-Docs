import React from "react";
import Badge from "../ui/Badge";
import AlgoCard from "../ui/AlgoCard";

export default function AlgoContent({
  title,
  content,
  timeComplexity,
  bestForContent,
}: {
  title: string;
  content: string;
  timeComplexity: string;
  bestForContent: string[];
}) {
  return (
    <AlgoCard>
      <div className="flex flex-col justify-center gap-3">
        <h1 className="cursor-default text-2xl font-bold text-neutral-400 transition-all duration-200 hover:text-neutral-200">
          {title}
        </h1>

        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <p className="font-bold">{content}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Time Complexity: </span>
            <span className="font-bold">{timeComplexity}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold">Best For: </span>
            {bestForContent.map((bestFor, index) => {
              return <Badge key={index} text={bestFor} />;
            })}
          </div>
        </div>
      </div>
    </AlgoCard>
  );
}
