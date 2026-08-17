export const stores = [
  {
    title: "Memory Store",
    slug: "memory",
    shortDescription:
      "Fast in-memory storage for development and single-instance applications.",

    description:
      "The Memory Store keeps all rate limit data inside your application's memory, making it the fastest storage option with zero external dependencies. It's perfect for local development, testing, and small deployments running on a single server. Since the data lives only in memory, it is lost whenever the application restarts and cannot be shared across multiple instances.",

    bestFor: ["Development", "Testing", "Single-server deployments"],

    complexity: {
      time: "O(1)",
      memory: "O(n)",
    },

    distributed: false,
    persistent: false,
  },

  {
    title: "Redis Store",
    slug: "redis",
    shortDescription:
      "Distributed storage built for scalable, production-ready applications.",

    description:
      "The Redis Store stores rate limit data in Redis, allowing multiple application instances to share the same state. It supports automatic expiration, atomic operations, and excellent performance, making it the recommended choice for production APIs, microservices, and horizontally scaled deployments.",

    bestFor: ["Production APIs", "Microservices", "Distributed systems"],

    complexity: {
      time: "O(1)",
      memory: "O(n)",
    },

    distributed: true,
    persistent: false,
  },

  {
    title: "MongoDB Store",
    slug: "mongodb",
    shortDescription:
      "Persistent MongoDB-backed storage for applications already using MongoDB.",

    description:
      "The MongoDB Store persists rate limit information inside a MongoDB database. It integrates naturally with MERN applications and can leverage TTL indexes to automatically remove expired records. This is a convenient choice when MongoDB is already part of your infrastructure and you want persistent rate limiting without introducing another service.",

    bestFor: [
      "MERN applications",
      "Persistent storage",
      "Moderate traffic APIs",
    ],

    complexity: {
      time: "O(log n)",
      memory: "Database managed",
    },

    distributed: true,
    persistent: true,
  },

  {
    title: "PostgreSQL Store",
    slug: "postgresql",
    shortDescription:
      "Reliable SQL-backed storage with transactional consistency.",

    description:
      "The PostgreSQL Store keeps rate limit data in a PostgreSQL database, making it ideal for applications already relying on PostgreSQL. It provides durable storage, strong consistency, and seamless integration with existing SQL infrastructure, eliminating the need for an additional caching layer in many use cases.",

    bestFor: [
      "Enterprise applications",
      "PostgreSQL projects",
      "Persistent rate limiting",
    ],

    complexity: {
      time: "O(log n)",
      memory: "Database managed",
    },

    distributed: true,
    persistent: true,
  },
];
