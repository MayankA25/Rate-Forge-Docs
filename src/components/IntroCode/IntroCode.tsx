import React from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import Badge from "../ui/Badge";

export default function IntroCode() {
  return (
    <div className="flex w-full items-center py-15">
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="flex items-center">
          <h1 className="text-4xl font-extrabold">Quick Example</h1>
        </div>
        <div className="my-4 flex flex-col justify-center px-4 gap-4">
          <h1 className="font-bold text-xl">1. Algorithm: <Badge text="FixedWindow"/>, Store: <Badge text="MemoryStore" /></h1>
          <div className="flex w-full flex-col justify-center">
            <CodeBlock
              language="ts"
              fileName="app.ts"
              code={`import express from "express";
import { RateLimiter, FixedWindow, MemoryStore } from "rate-forge";

const limiter = new RateLimiter({
    algorithm: new FixedWindow({
        limit: 50,
        window: 60 * 1000 // 1 minute window
    }),
    store: new MemoryStore()
});
const app = express();

app.use(express.json());

app.use((req, res, next)=>{
    limiter.isRequestAllowed(req.ip) // IP is the unique identifier.
});

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log("Listening on the PORT: ", PORT);
});
`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
