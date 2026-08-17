import React from "react";
import DocContent from "../ui/DocContent";
import { configurations } from "../../../utils/docConfiguration";
import DocInfoTemplate from "../ui/DocInfoTemplate";

export default function DocConfiguration() {
  return (
    <div className="flex flex-col font-bold">
      <DocContent
        title="Configuration Overview"
        titleClassName="text-5xl"
        includeHashTag={true}
      >
        <div className="flex flex-col justify-center gap-3 px-8">
          <p>
            Rate Forge provides a flexible configuration system that allows you
            to customize how rate limiting is applied to your application. You
            can select the rate limiting algorithm and storage backend, define
            request limits, configure the identification key used for each
            client, control response headers, and customize the response
            returned when a request exceeds the configured limit.
          </p>
          <p>
            Rate Forge is designed to keep these configuration options
            independent from the underlying rate limiting algorithms and storage
            implementations, allowing you to adapt the limiter to different
            application requirements without changing the core architecture.
          </p>
        </div>
      </DocContent>
      <div className="mt-8 flex flex-col justify-center gap-8">
        {configurations.map((configuration, index) => {
          return <DocInfoTemplate key={index} data={configuration} />;
        })}
      </div>
    </div>
  );
}
