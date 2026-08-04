import { Database, FileCode2, Layers, PlugZap, ShieldCheck, SlidersHorizontal } from "lucide-react";

export const features = [
  {
    title: "Multiple Algorithms",
    shortDescription: "Choose the right algorithm for your workload.",
    description:
      "Rate Forge includes multiple rate limiting algorithms such as Fixed Window, Sliding Window Log, Sliding Window Counter, Token Bucket, Leaky Bucket, and GCRA, allowing you to balance accuracy, fairness, and performance based on your application's needs.",
    icon: <Layers className="size-9"/>,
  },
  {
    title: "Multiple Stores",
    shortDescription: "Store rate limit data wherever you need.",
    description:
      "Use the built-in Memory Store for local development or integrate with Redis, MongoDB, and PostgreSQL for distributed or persistent rate limiting in production environments.",
    icon: <Database className="size-9"/>,
  },
  {
    title: "TypeScript First",
    shortDescription: "Designed with complete type safety.",
    description:
      "Built from the ground up in TypeScript with rich typings, IntelliSense support, and a developer-friendly API that improves productivity and reduces runtime errors.",
    icon: <FileCode2 className="size-9"/>,
  },
  {
    title: "Production Ready",
    shortDescription: "Built for high-traffic applications.",
    description:
      "Supports distributed deployments, concurrent requests, automatic expiration, and reliable storage integrations, making it suitable for production-grade APIs.",
    icon: <ShieldCheck className="size-9"/>,
  },
  {
    title: "Highly Configurable",
    shortDescription: "Customize every aspect of rate limiting.",
    description:
      "Configure limits, intervals, stores, key generators, custom responses, headers, and algorithm-specific options to fit your application's exact requirements.",
    icon: <SlidersHorizontal className="size-9"/>,
  },
  {
    title: "Easy Integration",
    shortDescription: "Get started with just a few lines of code.",
    description:
      "Integrates seamlessly with Express using simple middleware, allowing you to protect routes without complex setup or additional boilerplate.",
    icon: <PlugZap className="size-9"/>,
  },
];