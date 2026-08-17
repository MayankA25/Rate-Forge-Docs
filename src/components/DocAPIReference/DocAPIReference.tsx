import React from "react";
import DocContent from "../ui/DocContent";
import List from "../ui/List";
import { algorithmsAPI, middlewareAPI, rateLimiterAPI, storesAPI, typesAPI } from "../../../utils/docAPIReference";
import DocsInfoTemplate2 from "../ui/DocsInfoTemplate2";

export default function DocAPIReference() {

  const apiReferenceList = [
    "Rate Limiter — Core request evaluation API.",
    "Algorithms API — Configuration and APIs for supported rate limiting algorithms.",
    "Stores API — Storage interfaces and built-in storage implementations.",
    "Middleware — Request middleware integration.",
    "Types — Public TypeScript interfaces and types."
  ]

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
            <div className="flex flex-col justify-center gap-3 my-5">
              <p>The API Reference is divided into the following sections:</p>
              <List listArray={apiReferenceList} listClassName="grid grid-cols-1 gap-2" />
            </div>
          </div>
        </DocContent>
        <DocContent title="Rate Limiter API" titleClassName="text-5xl" includeHashTag={true}>
          { rateLimiterAPI.map((content, index)=>{
            return (
              <DocsInfoTemplate2 key={index} data={content} />
            )
          }) }
        </DocContent>
        <DocContent title="Algorithms API" titleClassName="text-5xl" includeHashTag={true}>
          { algorithmsAPI.map((content, index)=>{
            return (
              <DocsInfoTemplate2 key={index} data={content} />
            )
          }) }
        </DocContent>
        <DocContent title="Stores API" titleClassName="text-5xl" includeHashTag={true}>
          { storesAPI.map((content, index)=>{
            return (
              <DocsInfoTemplate2 key={index} data={content} />
            )
          }) }
        </DocContent>
        <DocContent title="Middleware" titleClassName="text-5xl" includeHashTag={true}>
          { middlewareAPI.map((content, index)=>{
            return (
              <DocsInfoTemplate2 key={index} data={content} />
            )
          }) }
        </DocContent>
        <DocContent title="Types" titleClassName="text-5xl" includeHashTag={true}>
          { typesAPI.map((content, index)=>{
            return (
              <DocsInfoTemplate2 key={index} data={content} />
            )
          }) }
        </DocContent>
      </DocContent>
    </div>
  );
}
