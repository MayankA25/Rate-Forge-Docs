import React from "react";
import { stores } from "../../../utils/stores";
import CardContent from "../CardContent/CardContent";

export default function Stores() {
  return (
    <div className="flex flex-col justify-center pb-10">
      <div className="flex flex-col justify-center gap-5">
        <h1 className="text-3xl font-bold">Stores</h1>

        <div className="grid grid-cols-2 gap-3">
          {stores.map((store, index) => {
            return (
              <CardContent
                key={index}
                title={store.title}
                content={store.shortDescription}
                timeComplexity={store.complexity.time}
                bestForContent={store.bestFor}
                memory={store.complexity.memory}
                persistent={store.persistent}
                distributed={store.distributed}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
