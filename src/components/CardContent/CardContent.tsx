import React from "react";
import Badge from "../ui/Badge";
import AlgoCard from "../ui/AlgoCard";
import HyperLink from "../ui/HyperLink";

export default function CardContent({
  title,
  content,
  timeComplexity,
  bestForContent,
  memory,
  persistent,
  distributed,
}: {
  title: string;
  content: string;
  timeComplexity: string;
  bestForContent: string[];
  memory?: string;
  persistent?: boolean;
  distributed?: boolean;
}) {
  return (
    <AlgoCard>
      <div className="flex flex-col justify-center gap-3">
        <div className="flex flex-col justify-center">
          <HyperLink text={title} link="" />
          {(persistent || distributed ) && <div className="flex items-center gap-3 mb-2 mt-1.5">
            { persistent && <Badge text="Persistent" /> }
            { distributed && <Badge text="Distributed" /> }
          </div>}
        </div>

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
          {memory && <div className="flex items-center gap-2">
            <span className="font-bold">Memory: </span>
            <span className="font-bold">{memory}</span>
          </div>}
        </div>
      </div>
    </AlgoCard>
  );
}
