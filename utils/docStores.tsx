export const stores = [
  {
    name: "Memory Store",

    overview: [
      "Memory Store keeps rate limiting state directly in the memory of the Node.js process.",
      "It is the simplest storage backend available in Rate Forge and is suitable for development, testing, and applications running on a single instance.",
    ],

    workingContent: [
      "When a rate limiting algorithm needs to read or update request state, the Memory Store stores that state in an in-memory data structure.",
      "Each rate limit key is associated with its corresponding value and optional expiration time. When the stored value expires, it is removed from the store.",
      "Because the state exists only inside the current Node.js process, restarting the application clears all stored rate limiting data.",
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Rate Limiter&emsp;&emsp;] --> B[&emsp;&emsp;Memory Store&emsp;&emsp;]
    B --> C[&emsp;&emsp;Get Rate Limit State&emsp;&emsp;]
    C --> D{&emsp;&emsp;State Exists?&emsp;&emsp;}

    D -->|&emsp;&emsp;Yes&emsp;&emsp;| E[&emsp;&emsp;Return State&emsp;&emsp;]
    D -->|&emsp;&emsp;No&emsp;&emsp;| F[&emsp;&emsp;Create State&emsp;&emsp;]

    E --> G[&emsp;&emsp;Rate Limiting Algorithm&emsp;&emsp;]
    F --> G

    G --> H[&emsp;&emsp;Update Store&emsp;&emsp;]
`,

    workingList: [
      "Receive a request from the rate limiting algorithm.",
      "Use the rate limit key to locate the corresponding state.",
      "Retrieve the stored value from the in-memory store.",
      "Check whether the stored value has expired.",
      "Return the existing value when it is still valid.",
      "Create or update the value when required.",
      "Automatically remove expired entries from the store.",
    ],

    configurationCode: `const store = new MemoryStore();

const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        [
          "store",
          "Memory Store instance passed to the rate limiting algorithm.",
        ],
      ],
    },

    advantages: [
      "Very fast read and write operations.",
      "No external database or service is required.",
      "Simple to configure.",
      "Useful for development and testing.",
      "Suitable for single-instance applications.",
      "Minimal infrastructure requirements.",
    ],

    limitations: [
      "Rate limiting state is lost when the application restarts.",
      "State is not shared between multiple application instances.",
      "Not suitable for distributed deployments.",
      "Stored data consumes memory from the application process.",
    ],
  },

  {
    name: "Redis Store",

    overview: [
      "Redis Store allows Rate Forge to persist rate limiting state in Redis, making it suitable for distributed Node.js applications.",
      "Unlike the Memory Store, Redis provides shared storage that can be accessed by multiple application instances, allowing rate limiting state to remain consistent across a distributed deployment.",
    ],

    workingContent: [
      "When a rate limiting algorithm needs to read or update state, the Redis Store communicates with the configured Redis instance using the provided Redis client.",
      "Rate limiting values are stored using Redis keys and can optionally use TTL-based expiration so that temporary rate limiting state is automatically removed.",
      "Because multiple application instances can communicate with the same Redis instance, all instances can share the same rate limiting state.",
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Application Instance&emsp;&emsp;] --> B[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    B --> C[&emsp;&emsp;Redis Store&emsp;&emsp;]
    C --> D[(&emsp;&emsp;Redis&emsp;&emsp;)]

    D --> C
    C --> B

    B --> E{&emsp;&emsp;Request Allowed?&emsp;&emsp;}

    E -->|&emsp;&emsp;Yes&emsp;&emsp;| F[&emsp;&emsp;Continue Request&emsp;&emsp;]
    E -->|&emsp;&emsp;No&emsp;&emsp;| G[&emsp;&emsp;Reject Request&emsp;&emsp;]
`,

    workingList: [
      "Receive a request from the rate limiting algorithm.",
      "Use the rate limit key to locate the corresponding Redis key.",
      "Retrieve the current rate limiting state from Redis.",
      "Allow the algorithm to evaluate the request using the retrieved state.",
      "Update the rate limiting state in Redis after processing the request.",
      "Apply a TTL when the stored state has an expiration time.",
      "Automatically remove expired rate limiting state through Redis expiration.",
    ],

    configurationCode: `const redis = new Redis(process.env.REDIS_URL);

const store = new RedisStore(redis);

const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        ["redis", "Configured Redis client used by the Redis Store."],
        [
          "store",
          "Redis Store instance passed to the rate limiting algorithm.",
        ],
      ],
    },

    advantages: [
      "Suitable for distributed applications.",
      "Allows multiple application instances to share rate limiting state.",
      "Provides fast read and write operations.",
      "Supports TTL-based expiration.",
      "Suitable for high-throughput applications.",
      "Keeps rate limiting state independent of individual application instances.",
    ],

    limitations: [
      "Requires a running Redis instance.",
      "Introduces an external infrastructure dependency.",
      "Network communication adds latency compared with in-memory storage.",
      "Redis availability becomes important to the rate limiting system.",
      "Requires additional configuration and infrastructure.",
    ],
  },

  {
    name: "MongoDB Store",

    overview: [
      "MongoDB Store is designed to provide persistent rate limiting state using MongoDB.",
      "It is intended for applications that already use MongoDB as their primary data store and want to maintain rate limiting state within their existing database infrastructure.",
    ],

    workingContent: [
      "The MongoDB Store will persist rate limiting state in MongoDB instead of keeping it inside the application process.",
      "Rate limiting algorithms will use the store interface to retrieve and update state without needing to know how the data is persisted.",
      "This allows MongoDB to act as a persistent and shareable storage backend for applications running across multiple instances.",
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Application&emsp;&emsp;] --> B[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    B --> C[&emsp;&emsp;MongoDB Store&emsp;&emsp;]
    C --> D[(&emsp;&emsp;MongoDB&emsp;&emsp;)]

    D --> C
    C --> B
    B --> E[&emsp;&emsp;Rate Limit Result&emsp;&emsp;]
`,

    workingList: [
      "Receive rate limiting state requests from the algorithm.",
      "Use the configured rate limit key to identify the stored state.",
      "Retrieve the corresponding state from MongoDB.",
      "Allow the algorithm to evaluate and update the state.",
      "Persist the updated state back to MongoDB.",
      "Use database-level expiration or cleanup mechanisms for expired rate limiting data.",
    ],

    configurationCode: `const store = new MongoDBStore({
  client: mongoClient,
  collection: "rate_limits",
});

const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,
    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        [
          "store",
          "MongoDB Store instance used as the rate limiting storage backend.",
        ],
      ],
    },

    advantages: [
      "Persistent storage for rate limiting state.",
      "Suitable for applications already using MongoDB.",
      "Can be shared across multiple application instances.",
      "Integrates rate limiting state with existing MongoDB infrastructure.",
    ],

    limitations: [
      "Currently under development.",
      "Requires a MongoDB deployment.",
      "Database operations introduce more overhead than in-memory storage.",
      "Requires appropriate indexing and expiration strategies for high-volume applications.",
    ],
  },

  {
    name: "PostgreSQL Store",

    overview: [
      "PostgreSQL Store is designed to provide persistent rate limiting state using PostgreSQL.",
      "It is intended for applications that already rely on PostgreSQL and want to use their existing relational database infrastructure for rate limiting state.",
    ],

    workingContent: [
      "The PostgreSQL Store will persist rate limiting state in PostgreSQL instead of storing it inside the application process.",
      "Rate limiting algorithms will interact with PostgreSQL through the common store interface, keeping the storage implementation independent from the algorithm.",
      "This allows PostgreSQL to provide shared rate limiting state for applications running across multiple instances.",
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Application&emsp;&emsp;] --> B[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    B --> C[&emsp;&emsp;PostgreSQL Store&emsp;&emsp;]
    C --> D[(&emsp;&emsp;PostgreSQL&emsp;&emsp;)]

    D --> C
    C --> B
    B --> E[&emsp;&emsp;Rate Limit Result&emsp;&emsp;]
`,

    workingList: [
      "Receive rate limiting state requests from the algorithm.",
      "Use the configured rate limit key to identify the stored state.",
      "Retrieve the corresponding state from PostgreSQL.",
      "Allow the algorithm to evaluate and update the state.",
      "Persist the updated state back to PostgreSQL.",
      "Use appropriate database cleanup or expiration mechanisms for expired rate limiting state.",
    ],

    configurationCode: `const store = new PostgreSQLStore({
  client: postgresClient,
  table: "rate_limits",
});

const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        [
          "store",
          "PostgreSQL Store instance used as the rate limiting storage backend.",
        ],
      ],
    },

    advantages: [
      "Persistent storage for rate limiting state.",
      "Suitable for applications already using PostgreSQL.",
      "Can be shared across multiple application instances.",
      "Works with existing PostgreSQL infrastructure.",
    ],

    limitations: [
      "Currently under development.",
      "Requires a PostgreSQL deployment.",
      "Database operations introduce more overhead than in-memory storage.",
      "Requires appropriate indexing and cleanup strategies for high-volume applications.",
    ],
  },
];
