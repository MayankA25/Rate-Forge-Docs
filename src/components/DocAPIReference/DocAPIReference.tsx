import React from "react";
import DocContent from "../ui/DocContent";

export default function DocAPIReference() {
  return (
    <div className="flex flex-col justify-center font-bold">
      <DocContent
        title="API Reference"
        includeHashTag={true}
        titleClassName="text-5xl"
      >
        <DocContent title="Overview">
          <div className="flex flex-col justify-center gap-2">
            <p>
              The Rate Forge API Reference provides detailed documentation for
              the library&apos;s core classes, methods, middleware, and
              TypeScript types.
            </p>
            <p>
              This section is intended as a technical reference for developers
              who are integrating Rate Forge into an application or need
              detailed information about a specific API.
            </p>
            <p>
              Each page documents the available methods, parameters, return
              values, configuration options, and supported interfaces.
            </p>
          </div>
        </DocContent>
      </DocContent>
    </div>
  );
}
