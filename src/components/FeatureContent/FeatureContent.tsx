import React from "react";
import AlgoCard from "../ui/AlgoCard";

export default function FeatureContent({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <AlgoCard border={true} hover={true}>
      <div className="flex items-center gap-5">
        <i>{icon}</i>
        <div className="jusitfy-center flex flex-col gap-2">
          <h1 className="text-xl font-bold">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </AlgoCard>
  );
}
