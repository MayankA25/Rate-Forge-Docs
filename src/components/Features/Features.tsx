import React from "react";
import { features } from "../../../utils/features";
import FeatureContent from "../FeatureContent/FeatureContent";

export default function Features() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center gap-3">
        <div className="flex items-center">
          <h1 className="text-4xl font-extrabold">Features</h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => {
            return (
              <FeatureContent
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
