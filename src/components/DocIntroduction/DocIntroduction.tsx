import React from "react";
import DocContent from "../ui/DocContent";
import List from "../ui/List";
import CodeBlock from "../CodeBlock/CodeBlock";

export default function DocIntroduction() {
  const rateForgeReasons = [
    "Multiple rate limiting algorithms",
    "Pluggable storage backends",
    "TypeScript-first API",
    "Express-friendly middleware",
    "Custom key generation support",
    "Distributed deployment ready",
    "Extensible architecture",
    "Production-focused design",
  ];
  const supportedAlgos = [
    "Fixed Window",
    "Sliding Window Log",
    "Sliding Window Counter",
    "Token Bucket",
    "Leaky Bucket",
    "GCRA",
  ];

  const supportedStores = [
    "Memory Store",
    "Redis Store",
    "MongoDB Store",
    "PostgreSQL Store",
  ];

  const tabs = [
    {
    title: "npm",
    language: "bash",
    code: "npm install rate-forge",
  },
  {
    title: "pnpm",
    language: "bash",
    code: "pnpm add rate-forge",
  },
  {
    title: "yarn",
    language: "bash",
    code: "yarn add rate-forge",
  },
  {
    title: "bun",
    language: "bash",
    code: "bun add rate-forge",
  },
  ]
  return (
    <div className="flex flex-col">
      <DocContent
        title={"Overview"}
        includeHashTag={true}
        titleClassName="text-5xl"
      >
        <div className="flex flex-col justify-center gap-5 px-8">
          <p className="text-xl font-extrabold">
            Production-ready rate limiting for modern Node.js applications.
          </p>

          <div className="flex flex-col gap-3 font-bold">
            <p>
              Rate Forge is a production-ready rate limiting library for Node.js
              applications that provides multiple rate limiting algorithms,
              pluggable storage backends, and a flexible API for controlling
              request traffic. It is designed to help developers protect APIs,
              authentication endpoints, payment services, and other critical
              routes from abuse, brute-force attacks, and excessive traffic.
            </p>

            <p>
              Unlike traditional rate limiters that support only a single
              strategy, Rate Forge allows you to choose the algorithm that best
              fits your application. Whether you need a simple fixed window
              limiter, a smooth token bucket implementation, or a distributed
              sliding window solution, Rate Forge provides a consistent and
              easy-to-use interface across all algorithms.
            </p>

            <p>
              The library is built with TypeScript, designed for production
              environments, and supports both in-memory and distributed storage
              backends. With a modular architecture, you can easily switch
              algorithms, change storage providers, or create custom
              implementations without changing the rest of your application.
            </p>
            <div className="my-5">
              <DocContent title="Why Rate Forge?">
                <List listArray={rateForgeReasons} />
              </DocContent>
            </div>
            <p>
              Rate Forge aims to provide a reliable and scalable foundation for
              rate limiting while remaining simple enough to integrate into any
              Node.js application with minimal configuration.
            </p>

            <div className="my-5">
              <DocContent title="Supported Algorithms">
                <List listArray={supportedAlgos} />
              </DocContent>
            </div>
            <div className="my-5">
              <DocContent title="Supported Stores">
                <List listArray={supportedStores} />
              </DocContent>
            </div>
          </div>
        </div>
      </DocContent>
      <DocContent
        title="Installation"
        includeHashTag={true}
        titleClassName="text-5xl mt-5"
      >
        <div className="flex flex-col justify-center px-8 gap-5">
          <p className="font-bold">
            Install Rate Forge using your preferred package manager.
          </p>
          <CodeBlock fileName="Terminal" code="npm install rate-forge" language="bash" tabs={tabs} ></CodeBlock>
        </div>
      </DocContent>
    </div>
  );
}
