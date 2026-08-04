import React from "react";
import AlgoCard from "../ui/AlgoCard";

export default function FeatureContent({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <AlgoCard border={true} hover={true}>
      <div className="flex items-center gap-5">
        <i>{ icon }</i>
        <div className="flex flex-col jusitfy-center gap-2">
            <h1 className="font-bold text-xl">{ title }</h1>
            <p>{description}</p>
        </div>
      </div>
    </AlgoCard>
  );
}
