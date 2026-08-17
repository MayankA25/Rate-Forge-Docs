export const rateLimiterAPI = [
  {
    titleName: "Overview",

    contentBeforeCodes: [
      "The Rate Limiter is the core component of Rate Forge responsible for evaluating whether a request should be allowed or rejected.",
      "A rate limiter combines a rate limiting algorithm with a storage backend. The algorithm determines how requests are evaluated, while the store maintains the state required by the algorithm.",
      "Rate Forge keeps request identification separate from the limiter itself. The application provides a unique identifier when evaluating a request, allowing the same limiter to support user-based, IP-based, API-key-based, session-based, and other application-specific rate limiting strategies.",
    ],
  },

  {
    titleName: "Creating a Rate Limiter",

    contentBeforeCodes: [
      "Create a rate limiter by instantiating one of the supported algorithms and providing the configuration required by that algorithm.",
    ],

    codes: [
      {
        language: "ts",
        text: `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,
      },
    ],

    contentAfterCodes: [
      "The selected algorithm determines which configuration options are required. Once configured, the limiter can be used to evaluate requests.",
    ],
  },

  {
    titleName: "isRequestAllowed()",

    contentBeforeCodes: [
      "The isRequestAllowed() method evaluates whether a request should be allowed for a specific unique identifier.",
      "The identifier is supplied by the application and should uniquely represent the client or entity being rate limited.",
    ],

    codes: [
      {
        language: "ts",
        text: `const result = await limiter.isRequestAllowed(
  req.userId
);`,
      },
    ],

    contentAfterCodes: [
      "The identifier can represent a user ID, IP address, API key, session ID, client ID, or any other value that uniquely identifies the entity being rate limited.",
    ],
  },

  {
    titleName: "RateLimitResult",

    contentBeforeCodes: [
      "The isRequestAllowed() method returns a RateLimitResult containing information about the result of the rate limit evaluation.",
    ],

    codes: [
      {
        language: "ts",
        text: `const result = await limiter.isRequestAllowed(
  identifier
);

console.log(result);`,
      },
    ],

    table: {
      tableHeaders: ["Property", "Type", "Description"],

      tableBody: [
        ["allowed", "boolean", "Indicates whether the request is allowed."],
        [
          "remaining",
          "number",
          "Number of requests remaining under the current limit.",
        ],
        [
          "retryAfter",
          "number",
          "Amount of time before a rejected request can be retried.",
        ],
        [
          "limit",
          "number",
          "Maximum number of requests configured for the limiter.",
        ],
      ],
    },
  },

  {
    titleName: "Handling the Result",

    contentBeforeCodes: [
      "The returned result can be used to determine whether request processing should continue or whether the request should be rejected.",
    ],

    codes: [
      {
        language: "ts",
        text: `const result = await limiter.isRequestAllowed(
  req.userId
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many requests",
    retryAfter: result.retryAfter,
  });
}

next();`,
      },
    ],

    contentAfterCodes: [
      "When allowed is true, the application can continue processing the request. When allowed is false, the application should reject the request and return an appropriate rate-limit response.",
    ],
  },

  {
    titleName: "Notes",

    notes: [
      "The identifier determines which requests share the same rate limiting state.",
      "Requests using the same identifier are evaluated against the same rate limit.",
      "Different identifiers maintain independent rate limiting state.",
      "The algorithm and store determine how the rate limiting state is evaluated and persisted.",
    ],
  },
];

export const algorithmsAPI = [
  {
    titleName: "Overview",

    contentBeforeCodes: [
      "The Algorithms API provides the rate limiting strategies available in Rate Forge. Each algorithm implements a different approach for controlling request traffic.",
      "All supported algorithms follow the same request evaluation model, allowing the application to interact with them through a consistent API.",
      "The configuration options vary between algorithms because each strategy maintains and evaluates rate limiting state differently.",
    ],
  },

  {
    titleName: "Supported Algorithms",

    contentBeforeCodes: [
      "Rate Forge currently provides six rate limiting algorithms. Each algorithm is designed for a different traffic pattern and rate limiting requirement.",
    ],

    list: {
      intro: ["The available algorithms are:"],

      content: [
        "Fixed Window — Divides time into fixed intervals and limits requests within each interval.",
        "Sliding Window Log — Tracks individual request timestamps within a sliding time window.",
        "Sliding Window Counter — Uses counters from adjacent windows to provide an efficient approximation of a sliding window.",
        "Token Bucket — Maintains a bucket of tokens that are replenished over time and consumes tokens as requests are processed.",
        "Leaky Bucket — Processes requests at a controlled rate to smooth incoming traffic.",
        "GCRA — Uses theoretical arrival time to control the frequency of requests.",
      ],
    },
  },

  {
    titleName: "Algorithm Configuration",

    contentBeforeCodes: [
      "Each algorithm is instantiated with the configuration required by its rate limiting strategy.",
      "A storage backend is provided to maintain the state required by the algorithm.",
    ],

    codes: [
      {
        language: "ts",
        text: `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,
      },
    ],

    table: {
      tableHeaders: ["Algorithm", "Configuration"],

      tableBody: [
        ["FixedWindow", "store, limit, window"],
        ["SlidingWindowLog", "store, limit, window"],
        ["SlidingWindowCounter", "store, limit, window"],
        ["TokenBucket", "store, capacity, refillRate"],
        ["LeakyBucket", "store, capacity, leakRate"],
        ["GCRA", "store and algorithm-specific configuration"],
      ],
    },
  },

  {
    titleName: "Request Evaluation",

    contentBeforeCodes: [
      "After an algorithm has been configured, requests can be evaluated by passing a unique identifier to the isRequestAllowed() method.",
    ],

    codes: [
      {
        language: "ts",
        text: `const result = await limiter.isRequestAllowed(
  identifier
);

if (result.allowed) {
  // Continue processing the request
}`,
      },
    ],

    contentAfterCodes: [
      "The returned RateLimitResult provides the information required by the application to determine how the request should be handled.",
    ],
  },

  {
    titleName: "Changing Algorithms",

    contentBeforeCodes: [
      "Rate Forge keeps the request evaluation interface consistent across algorithms. This allows an application to change its rate limiting strategy without changing the way requests are evaluated.",
    ],

    codes: [
      {
        language: "ts",
        text: `const limiter = new TokenBucket({
  store,
  capacity: 100,
  refillRate: 10,
});

const result = await limiter.isRequestAllowed(
  identifier
);`,
      },
    ],

    contentAfterCodes: [
      "Only the algorithm configuration needs to change when switching strategies. The application can continue using isRequestAllowed() to evaluate requests.",
    ],
  },

  {
    titleName: "Notes",

    notes: [
      "Every algorithm requires a compatible storage backend.",
      "Configuration options depend on the selected algorithm.",
      "All algorithms return the common RateLimitResult when evaluating requests.",
      "Refer to the Algorithms documentation for detailed explanations of each algorithm's behavior.",
    ],
  },
];

export const storesAPI = [
  {
    titleName: "Overview",

    contentBeforeCodes: [
      "The Stores API defines the storage layer used by Rate Forge algorithms to maintain rate limiting state.",
      "Rate Forge separates storage from algorithm logic through a common Store interface. This allows algorithms to work with different storage technologies without changing their core implementation.",
      "Rate Forge provides built-in stores for memory, Redis, MongoDB, and PostgreSQL, while the Store interface also allows developers to create custom storage implementations.",
    ],
  },

  {
    titleName: "Store Interface",

    contentBeforeCodes: [
      "All Rate Forge stores follow the Store interface. The interface defines the operations required by algorithms to retrieve, store, and remove rate limiting state.",
    ],

    codes: [
      {
        language: "ts",
        text: `interface Store {
  get<T>(
    key: string
  ): Promise<T | null>;

  set<T>(
    key: string,
    value: T,
    ttl?: number
  ): Promise<void>;

  delete(
    key: string
  ): Promise<void>;
}`,
      },
    ],
  },

  {
    titleName: "get()",

    contentBeforeCodes: [
      "The get() method retrieves a value associated with a specific key from the storage backend.",
    ],

    codes: [
      {
        language: "ts",
        text: `const value = await store.get<MyData>(
  "rate-limit:user-123"
);`,
      },
    ],

    contentAfterCodes: [
      "If the specified key does not exist or the stored value is no longer valid, the method returns null.",
    ],

    table: {
      tableHeaders: ["Parameter", "Type", "Description"],

      tableBody: [
        ["key", "string", "Unique key used to identify the stored value."],
      ],
    },
  },

  {
    titleName: "set()",

    contentBeforeCodes: [
      "The set() method stores a value under a specified key and can optionally assign a time-to-live to the stored value.",
    ],

    codes: [
      {
        language: "ts",
        text: `await store.set(
  "rate-limit:user-123",
  data,
  60_000
);`,
      },
    ],

    table: {
      tableHeaders: ["Parameter", "Type", "Description"],

      tableBody: [
        ["key", "string", "Unique key used to identify the stored value."],
        ["value", "T", "Value that should be stored."],
        [
          "ttl",
          "number | undefined",
          "Optional time-to-live for the stored value.",
        ],
      ],
    },
  },

  {
    titleName: "delete()",

    contentBeforeCodes: [
      "The delete() method removes the value associated with a specified key from the storage backend.",
    ],

    codes: [
      {
        language: "ts",
        text: `await store.delete(
  "rate-limit:user-123"
);`,
      },
    ],

    table: {
      tableHeaders: ["Parameter", "Type", "Description"],

      tableBody: [
        ["key", "string", "Key of the value that should be removed."],
      ],
    },
  },

  {
    titleName: "Built-in Stores",

    contentBeforeCodes: [
      "Rate Forge provides several built-in storage implementations for different deployment requirements.",
    ],

    table: {
      tableHeaders: ["Store", "Description"],

      tableBody: [
        ["MemoryStore", "Stores rate limiting state in application memory."],
        [
          "RedisStore",
          "Uses Redis for shared rate limiting state and distributed deployments.",
        ],
        ["MongoDBStore", "Uses MongoDB to store rate limiting state."],
        ["PostgreSQLStore", "Uses PostgreSQL to store rate limiting state."],
      ],
    },
  },

  {
    titleName: "Custom Stores",

    contentBeforeCodes: [
      "Rate Forge allows developers to implement custom storage backends when the built-in stores do not meet their application's requirements.",
      "A custom store must implement the Store interface and provide implementations for get(), set(), and delete().",
    ],

    codes: [
      {
        language: "ts",
        text: `class CustomStore implements Store {
  async get<T>(
    key: string
  ): Promise<T | null> {
    // Retrieve value
  }

  async set<T>(
    key: string,
    value: T,
    ttl?: number
  ): Promise<void> {
    // Store value
  }

  async delete(
    key: string
  ): Promise<void> {
    // Delete value
  }
}`,
      },
    ],
  },

  {
    titleName: "Notes",

    notes: [
      "All custom stores must implement the Store interface.",
      "MemoryStore is intended for local or single-instance applications where shared state is not required.",
      "RedisStore is suitable for distributed deployments where multiple application instances need access to shared rate limiting state.",
      "MongoDBStore and PostgreSQLStore can be used when the application already relies on these databases for persistent storage.",
    ],
  },
];

export const middlewareAPI = [
  {
    titleName: "Overview",

    contentBeforeCodes: [
      "Rate Forge can be integrated into an application's request-processing pipeline by evaluating requests before they reach protected route handlers.",
      "The application is responsible for obtaining the appropriate unique identifier and passing it to the configured rate limiter through isRequestAllowed().",
      "This approach keeps Rate Forge independent of a specific framework or identifier strategy while allowing it to be integrated into different Node.js request-processing architectures.",
    ],
  },

  {
    titleName: "Basic Integration",

    contentBeforeCodes: [
      "Create a rate limiter and evaluate the incoming request before passing control to the next middleware or route handler.",
    ],

    codes: [
      {
        language: "ts",
        text: `const result = await limiter.isRequestAllowed(
  req.userId
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many requests",
    retryAfter: result.retryAfter,
  });
}

next();`,
      },
    ],

    contentAfterCodes: [
      "If the request is allowed, the middleware can continue processing the request. If the request exceeds the configured limit, the middleware can terminate the request and return an appropriate response.",
    ],
  },

  {
    titleName: "Unique Identifier",

    contentBeforeCodes: [
      "The unique identifier determines which requests share the same rate limiting state. The application can choose the identifier based on the type of traffic it wants to control.",
    ],

    list: {
      intro: ["Common identifier strategies include:"],

      content: [
        "User ID — Limits requests independently for each authenticated user.",
        "IP Address — Limits requests based on the originating client address.",
        "API Key — Limits requests based on an application's API key.",
        "Session ID — Limits requests associated with a particular session.",
        "Client ID — Limits requests for a specific application or client.",
        "Custom Identifier — Uses any application-specific value that uniquely identifies the entity being limited.",
      ],
    },
  },

  {
    titleName: "User-Based Limiting",

    contentBeforeCodes: [
      "For authenticated applications, the user's ID can be passed directly to isRequestAllowed(). This creates an independent rate limit for each user.",
    ],

    codes: [
      {
        language: "ts",
        text: `const result = await limiter.isRequestAllowed(
  req.userId
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many requests",
  });
}

next();`,
      },
    ],
  },

  {
    titleName: "IP-Based Limiting",

    contentBeforeCodes: [
      "For endpoints that do not require authentication, the client's IP address can be used as the unique identifier.",
    ],

    codes: [
      {
        language: "ts",
        text: `const result = await limiter.isRequestAllowed(
  req.ip
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many requests",
  });
}

next();`,
      },
    ],
  },

  {
    titleName: "Handling Rate-Limited Requests",

    contentBeforeCodes: [
      "When the rate limiter returns allowed as false, the application should stop further request processing and return an appropriate HTTP response.",
    ],

    codes: [
      {
        language: "ts",
        text: `const result = await limiter.isRequestAllowed(
  identifier
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many requests",
    retryAfter: result.retryAfter,
  });
}

next();`,
      },
    ],

    contentAfterCodes: [
      "The retryAfter value can be used to communicate when the client should attempt the request again.",
    ],
  },

  {
    titleName: "Rate Limit Headers",

    contentBeforeCodes: [
      "The RateLimitResult can also be used to expose rate limiting information through HTTP response headers.",
    ],

    codes: [
      {
        language: "ts",
        text: `res.setHeader(
  "X-RateLimit-Limit",
  result.limit
);

res.setHeader(
  "X-RateLimit-Remaining",
  result.remaining
);

res.setHeader(
  "Retry-After",
  result.retryAfter
);`,
      },
    ],

    table: {
      tableHeaders: ["Header", "Value", "Description"],

      tableBody: [
        [
          "X-RateLimit-Limit",
          "result.limit",
          "Maximum number of requests allowed.",
        ],
        [
          "X-RateLimit-Remaining",
          "result.remaining",
          "Number of requests remaining.",
        ],
        [
          "Retry-After",
          "result.retryAfter",
          "Time before a rejected request can be retried.",
        ],
      ],
    },
  },

  {
    titleName: "Notes",

    notes: [
      "The middleware or request handler should perform rate limit evaluation before the protected route is executed.",
      "The unique identifier should be stable and appropriate for the type of traffic being limited.",
      "Requests that exceed the configured limit should normally receive an HTTP 429 Too Many Requests response.",
      "The application controls how the RateLimitResult is converted into an HTTP response.",
    ],
  },
];

export const typesAPI = [
  {
    titleName: "Overview",

    contentBeforeCodes: [
      "Rate Forge exposes a small set of TypeScript types that define the contracts between rate limiting algorithms, storage backends, and the application using the library.",
      "These types provide consistent interfaces across the library and make it possible to create custom algorithms, stores, and integrations while maintaining type safety.",
    ],
  },

  {
    titleName: "RateLimitResult",

    contentBeforeCodes: [
      "RateLimitResult represents the result of a rate limit evaluation. It is returned by isRequestAllowed() after an identifier has been evaluated by the configured algorithm.",
    ],

    codes: [
      {
        language: "ts",
        text: `interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
  limit: number;
}`,
      },
    ],

    table: {
      tableHeaders: ["Property", "Type", "Description"],

      tableBody: [
        [
          "allowed",
          "boolean",
          "Indicates whether the request is allowed to proceed.",
        ],
        [
          "remaining",
          "number",
          "Number of requests remaining under the current rate limit.",
        ],
        [
          "retryAfter",
          "number",
          "Amount of time the client should wait before retrying a rejected request.",
        ],
        [
          "limit",
          "number",
          "Maximum number of requests allowed by the configured rate limiter.",
        ],
      ],
    },
  },

  {
    titleName: "Store",

    contentBeforeCodes: [
      "Store defines the contract that every storage backend must implement. Rate limiting algorithms use this interface to store and retrieve the state required for request evaluation.",
      "The interface allows Rate Forge to work with different storage technologies without coupling algorithms to a specific database or storage system.",
    ],

    codes: [
      {
        language: "ts",
        text: `interface Store {
  get<T>(
    key: string
  ): Promise<T | null>;

  set<T>(
    key: string,
    value: T,
    ttl?: number
  ): Promise<void>;

  delete(
    key: string
  ): Promise<void>;
}`,
      },
    ],

    table: {
      tableHeaders: ["Method", "Description"],

      tableBody: [
        ["get()", "Retrieves a value associated with a key."],
        ["set()", "Stores a value under a key with an optional TTL."],
        ["delete()", "Removes a value associated with a key."],
      ],
    },
  },

  {
    titleName: "Algorithm",

    contentBeforeCodes: [
      "Algorithm defines the contract used by Rate Forge rate limiting strategies.",
      "Custom algorithms can implement this contract to integrate their own rate limiting logic with the rest of the Rate Forge architecture.",
    ],

    codes: [
      {
        language: "ts",
        text: `interface Algorithm {
  isRequestAllowed(
    identifier: string
  ): Promise<RateLimitResult>;
}`,
      },
    ],

    table: {
      tableHeaders: ["Method", "Parameter", "Description"],

      tableBody: [
        [
          "isRequestAllowed()",
          "identifier",
          "Evaluates whether the request associated with the identifier should be allowed.",
        ],
      ],
    },
  },

  {
    titleName: "Identifier",

    contentBeforeCodes: [
      "An identifier is the unique value used to determine which requests share the same rate limiting state.",
      "Rate Forge does not enforce a specific identifier source. The application decides which value should represent the client or resource being rate limited.",
    ],

    table: {
      tableHeaders: ["Identifier", "Typical Use"],

      tableBody: [
        ["User ID", "Per-user rate limiting."],
        ["IP Address", "Rate limiting unauthenticated clients."],
        ["API Key", "Rate limiting API consumers."],
        ["Session ID", "Rate limiting individual sessions."],
        ["Client ID", "Rate limiting applications or clients."],
        ["Custom Value", "Application-specific rate limiting requirements."],
      ],
    },
  },

  {
    titleName: "Generic Store Values",

    contentBeforeCodes: [
      "The Store interface uses TypeScript generics for stored values. This allows each algorithm or custom store implementation to specify the expected type of data being stored.",
    ],

    codes: [
      {
        language: "ts",
        text: `const value = await store.get<MyData>(
  "rate-limit:user-123"
);`,
      },
    ],

    contentAfterCodes: [
      "Using generics allows TypeScript to provide type checking when retrieving stored values instead of treating every stored value as an untyped object.",
    ],
  },

  {
    titleName: "Notes",

    notes: [
      "RateLimitResult is the primary type returned after evaluating a request.",
      "Store defines the contract required by storage implementations.",
      "Algorithm defines the contract used by rate limiting strategies.",
      "Identifiers are supplied by the application and should uniquely represent the entity being rate limited.",
      "The exposed types can be used when creating custom stores, algorithms, or application integrations.",
    ],
  },
];
