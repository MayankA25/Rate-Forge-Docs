import React from "react";
import DocContent from "../ui/DocContent";
import List from "../ui/List";
import CodeBlock from "../CodeBlock/CodeBlock";
import Badge from "../ui/Badge";
import Mermaid from "../Mermaid/Mermaid";

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
  ];

  const quickStartCodes = [
    {
      title: "1. Import Rate Forge",
      code: 'import { FixedWindow, MemoryStore } from "rate-forge";',
      langauge: "ts",
      fileName: "rateLimiter.ts",
    },
    {
      title: "2. Create a Store",
      content: [
        "The store is responsible for keeping track of rate limit data.",
        `For local development or single-instance applications, you can use the built-in ${(<Badge text="MemoryStore" />)}.`,
      ],
      code: "const store = new MemoryStore();",
      langauge: "ts",
      fileName: "rateLimiter.ts",
    },
    {
      title: "3. Create a Rate Limiter",
      content: [
        `Create a ${(<Badge text="FixedWindow" />)} limiter and provide the store along with your rate limit configuration.`,
      ],
      code: `export const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,
      langauge: "ts",
      fileName: "rateLimiter.ts",
    },
    {
      title: "4. Create a Customer Middleware",
      content: [
        `Rate Forge provides the rate-limiting engine; how you integrate that engine into your request pipeline is up to you.`,
      ],
      code: `const customMiddleware = async (req, res, next) => {
  const key = req.ip;

  const result = await limiter.isRequestAllowed(key);

  if (!result.allowed) {
    return res.status(429).json({
      message: "Too many requests",
      retryAfter: result.retryAfter,
    });
  }

  next();
};`,
      langauge: "ts",
      fileName: "middleware.ts",
    },
    {
      title: "5. Add the Limiter to Express",
      content: [
        "Use the limiter as middleware before the routes you want to protect.",
      ],
      code: `import express from "express";
import customMiddleware from "./middlewares/customMiddleware.ts";

const app = express();

app.use(customMiddleware());

app.get("/", (req, res) => {
  res.json({
    message: "Request allowed",
  });
});

app.listen(5000);`,
      langauge: "ts",
      fileName: "index.ts",
    },
  ];
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
        <div className="flex flex-col justify-center gap-5 px-8">
          <p className="font-bold">
            Install Rate Forge using your preferred package manager.
          </p>
          <CodeBlock
            fileName="Terminal"
            code="npm install rate-forge"
            language="bash"
            tabs={tabs}
          ></CodeBlock>
        </div>

        <div className="flex flex-col gap-5 px-8">
          <DocContent title="Import Rate Forge" includeHashTag={false}>
            <p className="font-bold">
              Once installed, you can import the required rate limiting
              algorithm and store from <Badge text="rate-forge" />
            </p>
            <CodeBlock
              fileName="app.ts"
              language="ts"
              code={`import { RateLimiter } from "rate-forge"`}
              tabs={[]}
            />
          </DocContent>

          <DocContent title="Requirements" includeHashTag={false}>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="px-4 py-3 font-semibold">Requirement</th>
                  <th className="px-4 py-3 font-semibold">Support</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-neutral-800">
                  <td className="px-4 py-3">Node.js</td>
                  <td className="px-4 py-3">Required</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="px-4 py-3">TypeScript</td>
                  <td className="px-4 py-3">Fully Supported</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="px-4 py-3">JavaScript</td>
                  <td className="px-4 py-3">Fully Supported</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="px-4 py-3">npm</td>
                  <td className="px-4 py-3">Supported</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="px-4 py-3">pnpm</td>
                  <td className="px-4 py-3">Supported</td>
                </tr>

                <tr className="border-b border-neutral-800">
                  <td className="px-4 py-3">Yarn</td>
                  <td className="px-4 py-3">Supported</td>
                </tr>

                <tr>
                  <td className="px-4 py-3">Bun</td>
                  <td className="px-4 py-3">Supported</td>
                </tr>
              </tbody>
            </table>
          </DocContent>
        </div>
      </DocContent>
      <DocContent
        title="Quick Start"
        includeHashTag={true}
        titleClassName="text-5xl mt-5"
      >
        <div className="flex flex-col justify-center gap-4 px-8 font-bold">
          <p>
            Rate Forge provides a simple middleware-based API for adding rate
            limiting to your Node.js application.
          </p>
          <p>
            The following example uses the Fixed Window algorithm with the
            Memory Store.
          </p>

          <div className="flex flex-col justify-center gap-3">
            {quickStartCodes.map((quickStartCode, index) => {
              return (
                <DocContent
                  key={index}
                  title={quickStartCode.title}
                  includeHashTag={false}
                >
                  {quickStartCode.content &&
                    quickStartCode.content?.length > 0 && (
                      <div className="flex flex-col justify-center gap-4">
                        {quickStartCode.content &&
                          quickStartCode.content.map((content, index) => {
                            return (
                              <p key={index} className="font-bold">
                                {content}
                              </p>
                            );
                          })}
                      </div>
                    )}

                  <CodeBlock
                    code={quickStartCode.code}
                    language={quickStartCode.langauge}
                    tabs={[]}
                    fileName={quickStartCode?.fileName}
                  />
                </DocContent>
              );
            })}
          </div>
        </div>
      </DocContent>
      <DocContent
        title="Core Concepts"
        includeHashTag={true}
        titleClassName="text-5xl mt-5"
      >
        <div className="flex flex-col justify-center gap-5 px-8 font-bold">
          <div className="flex flex-col justify-center gap-3">
            <p>
              Rate Forge is built around a modular architecture where
              algorithms, stores, keys, and rate-limit results work together to
              control request traffic.
            </p>
            <p>
              Understanding these concepts will make it easier to configure Rate
              Forge and choose the right algorithm and storage backend for your
              application.
            </p>
          </div>

          <DocContent title="Rate Limiter">
            <div className="flex flex-col justify-center gap-2">
              <p>
                A rate limiter controls how many requests a client can make
                within a defined period of time.
              </p>
              <p>For example, a limiter configured with:</p>
            </div>

            <CodeBlock
              language="ts"
              code={`{
  limit: 100,
  window: 60_000
}`}
              tabs={[]}
            />
            <div className="flex flex-col justify-center gap-2">
              <p>
                allows a client to make up to 100 requests within 60 seconds.
              </p>
              <p>
                Once the client exceeds the configured limit, the limiter can
                prevent the request from continuing.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-lg">
                A rate limiter in Rate Forge is composed of two primary parts:
              </p>
              <List
                listArray={["Store", "Algorithm"]}
                listClassName="grid grid-cols-1 gap-2"
                listItemClassName="list-decimal"
              />
              <p>
                The <span className="font-extrabold">algorithm</span> determines
                how the limit is calculated, while the{" "}
                <span className="font-extrabold">store</span> keeps the data
                required by that algorithm.
              </p>
            </div>
          </DocContent>
          <DocContent title="Algorithms">
            <div className="flex flex-col gap-2">
              <p>
                An algorithm defines how Rate Forge tracks and evaluates
                requests.
              </p>
              <p>
                Different algorithms provide different trade-offs between
                simplicity, accuracy, memory usage, and traffic behavior.
              </p>

              <div className="my-5">
                <DocContent
                  title="Supported Algorithms"
                  titleClassName="text-2xl"
                >
                  <List listArray={supportedAlgos} />
                </DocContent>
              </div>
              <p>
                For example, a Fixed Window divides time into fixed intervals,
                while Token Bucket allows controlled bursts of traffic.
              </p>
              <p>
                You can choose the algorithm based on the behavior your
                application requires.
              </p>
            </div>
          </DocContent>
          <DocContent title="Stores">
            <div className="flex flex-col gap-2">
              <p>
                A store is responsible for persisting the state required by a
                rate-limiting algorithm.
              </p>
              <p>
                Rate Forge separates storage from the algorithm, allowing you to
                change where rate-limit data is stored without changing the
                algorithm itself.
              </p>

              <div className="my-5">
                <DocContent
                  title="Supported Algorithms"
                  titleClassName="text-2xl"
                >
                  <List listArray={supportedStores} />
                </DocContent>
              </div>
              <p>
                For example, a Fixed Window divides time into fixed intervals,
                while Token Bucket allows controlled bursts of traffic.
              </p>
              <p>
                You can choose the algorithm based on the behavior your
                application requires.
              </p>
              <DocContent title="Memory Store" titleClassName="text-2xl mt-3">
                <p>Useful for:</p>
                <List
                  listArray={[
                    "Local development",
                    "Testing",
                    "Single-instance applications",
                  ]}
                  listClassName="grid grid-cols-1 gap-2"
                />
              </DocContent>
              <DocContent
                title="Distributed Store"
                titleClassName="text-2xl mt-3"
              >
                <p>
                  Stores such as Redis, MongoDB, and PostgreSQL can be used when
                  rate-limit state needs to be shared across multiple
                  application instances.
                </p>
              </DocContent>
            </div>
          </DocContent>
          <DocContent title="Keys" titleClassName="text-3xl mt-5">
            <div className="flex flex-col justify-center gap-3">
              <p>
                Rate Forge needs a way to determine who or what should be rate
                limited.
              </p>
              <p>This is done using a unique key.</p>

              <CodeBlock
                language="bash"
                code="IP address
    →
192.168.1.10"
                tabs={[]}
              />
              <CodeBlock
                language="bash"
                code="User ID
    →
user_123"
                tabs={[]}
              />
              <CodeBlock
                language="bash"
                code="API Key
    →
api_key_abc123"
                tabs={[]}
              />

              <p>
                The key determines which rate-limit bucket or state belongs to a
                particular client.
              </p>
              <p>
                Rate Forge also allows you to provide a custom key generator
                when the default identifier does not fit your application.
              </p>
            </div>
          </DocContent>

          <DocContent title="Results">
            <div className="flex flex-col justify-center gap-3">
              <p>
                After evaluating a request, Rate Forge returns a result
                describing the current rate-limit state.
              </p>
              <p>A result contains information such as:</p>

              <CodeBlock
                language="ts"
                code="{
  allowed: true,
  remaining: 99,
  retryAfter: 0,
  limit: 100
}"
                tabs={[]}
              />

              <DocContent title={<Badge text="allowed" className="text-lg" />}>
                <p>Indicates whether the request is allowed to continue.</p>
                <CodeBlock language="ts" code="{ allowed: true }" tabs={[]} />
                <p>means the request can proceed.</p>
                <CodeBlock language="ts" code="{ allowed: false }" tabs={[]} />
                <p>means the rate limit has been exceeded.</p>
              </DocContent>
              <DocContent
                title={<Badge text="remaining" className="text-lg" />}
              >
                <p>
                  The number of requests remaining for the current rate limit.
                </p>
              </DocContent>
              <DocContent
                title={<Badge text="retryAfter" className="text-lg" />}
              >
                <p>
                  Indicates how long the client should wait before retrying.
                </p>
                <p>
                  When the request is allowed, this value is <Badge text="0" />
                </p>
              </DocContent>
              <DocContent title={<Badge text="limit" className="text-lg" />}>
                <p>
                  The maximum number of requests allowed by the configured
                  limiter.
                </p>
              </DocContent>
            </div>
          </DocContent>
          <DocContent title="Middleware">
            <div className="flex flex-col justify-center gap-2">
              <p>
                Rate Forge does not require you to use a specific middleware
                implementation.
              </p>
              <p>
                You can use the built-in middleware when supported by your
                application, or create your own middleware around the rate
                limiter result.
              </p>
              <p>The general flow is:</p>
              <div className="flex items-center justify-center">
                <Mermaid
                  chart={`
    flowchart TD
      A[&emsp;&emsp;Request&emsp;&emsp;] --> B[&emsp;&emsp;Your Middleware&emsp;&emsp;]
      B --> C[&emsp;&emsp;Generate Key&emsp;&emsp;]
      C --> D[&emsp;&emsp;Rate Limiter&emsp;&emsp;]

      D --> E[&emsp;&emsp;Algorithm&emsp;&emsp;]
      D --> F[&emsp;&emsp;Store&emsp;&emsp;]

      E --> G[&emsp;&emsp;Rate Limit Result&emsp;&emsp;]
      F --> G

      G --> H[&emsp;&emsp;Allowed&emsp;&emsp;]
      G --> I[&emsp;&emsp;Blocked&emsp;&emsp;]

      H --> J[&emsp;&emsp;next&emsp;&emsp;]
      I --> K[&emsp;&emsp;429&emsp;&emsp;]
    `}
                />
              </div>
            </div>
          </DocContent>
        </div>
      </DocContent>
    </div>
  );
}
