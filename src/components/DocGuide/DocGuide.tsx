import React from "react";
import DocContent from "../ui/DocContent";
import List from "../ui/List";
import DocInfoTemplate from "../ui/DocInfoTemplate";
import { guides } from "../../../utils/guides";

export default function DocGuide() {
  const guideIntroList = [
    "IP-Based Limiting — Limit requests based on the client's IP address.",
    "User-Based Limiting — Apply independent limits to authenticated users.",
    "Route-Specific Limits — Apply different limits to different API endpoints.",
    "Dynamic Limits — Adjust limits based on users, plans, roles, or other runtime conditions.",
    "Distributed Deployments — Share rate limiting state across multiple application instances.",
  ];
  return (
    <div className="flex flex-col justify-center font-bold">
      <DocContent title="Guide" titleClassName="text-5xl">
        <div className="flex flex-col justify-center gap-3">
          <p>
            Rate Forge provides flexible rate limiting primitives that can be
            adapted to different application requirements and deployment
            environments. However, choosing an algorithm and configuring a store
            is only part of implementing effective rate limiting.
          </p>
          <p>
            The Guides section demonstrates how to apply Rate Forge to common
            real-world scenarios. Each guide focuses on a specific use case and
            provides practical examples, recommended configurations, and
            implementation patterns that you can adapt to your application.
          </p>
          <p>
            Whether you need to limit requests by IP address, authenticated
            user, API route, subscription plan, or across multiple application
            instances, these guides provide a starting point for implementing
            the appropriate rate limiting strategy with Rate Forge.
          </p>
          <p>
            These examples are intended as practical patterns rather than rigid
            implementations. Choose the approach that best matches your
            application&apos;s authentication model, traffic patterns,
            infrastructure, and security requirements.
          </p>

          <div className="my-5 flex flex-col justify-center">
            <DocContent title="Available Guides">
              <List
                listArray={guideIntroList}
                listClassName="grid grid-cols-1 gap-2"
              />
            </DocContent>
          </div>
        </div>
      </DocContent>
      <div className="mt-8 flex flex-col justify-center gap-8">
        {guides.map((guide, index) => {
          return <DocInfoTemplate key={index} data={guide} />;
        })}
      </div>
    </div>
  );
}
