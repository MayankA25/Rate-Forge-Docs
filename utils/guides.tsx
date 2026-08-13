export const guides = [
  {
    name: "IP-Based Limiting",

    overview: [
      "IP-based rate limiting restricts the number of requests that can be made from a specific IP address within a configured period.",
      "It is useful for protecting public endpoints, authentication routes, and other resources where requests need to be controlled before a user is authenticated."
    ],

    workingContent: [
      "The application extracts the client's IP address from the incoming request.",
      "The IP address is passed to isRequestAllowed() as the unique identifier.",
      "Rate Forge uses the identifier to retrieve the corresponding rate limiting state from the configured store.",
      "The selected algorithm evaluates whether the request should be allowed.",
      "If the request is within the configured limit, the request continues. Otherwise, the application returns a rate-limit response."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Get Client IP&emsp;&emsp;]
    B --> C["&emsp;&emsp;isRequestAllowed(ip)&emsp;&emsp;"]
    C --> D[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    D --> E[&emsp;&emsp;Algorithm&emsp;&emsp;]
    E --> F[&emsp;&emsp;Store&emsp;&emsp;]
    F --> G{&emsp;&emsp;Request Allowed?&emsp;&emsp;}

    G -->|&emsp;&emsp;Yes&emsp;&emsp;| H[&emsp;&emsp;Continue Request&emsp;&emsp;]
    G -->|&emsp;&emsp;No&emsp;&emsp;| I[&emsp;&emsp;Return 42&emsp;&emsp;]
`,

    workingList: [
      "Receive the incoming request.",
      "Extract the client's IP address.",
      "Pass the IP address to isRequestAllowed().",
      "Rate Forge retrieves the corresponding rate limiting state.",
      "The configured algorithm evaluates the request.",
      "Continue the request when it is allowed.",
      "Return a rate-limit response when the limit has been exceeded."
    ],

    configurationCode: `const result = await limiter.isRequestAllowed(
  req.ip
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many requests",
    retryAfter: result.retryAfter
  });
}

next();`,

    configurationTable: {
      tableHeaders: ["Value", "Description"],
      tableBody: [
        [
          "req.ip",
          "The client's IP address used as the unique identifier."
        ],
        [
          "allowed",
          "Determines whether the request can continue."
        ],
        [
          "retryAfter",
          "Indicates how long the client should wait before retrying."
        ]
      ]
    },

    notes: [
      "IP-based limiting is most useful when the client is not authenticated.",
      "Make sure your application correctly handles proxies when determining the client's IP address."
    ]
  },

  {
    name: "User-Based Limiting",

    overview: [
      "User-based rate limiting applies an independent rate limit to each authenticated user.",
      "The application's user identifier is passed directly to Rate Forge as the unique identifier."
    ],

    workingContent: [
      "The application authenticates the incoming request and obtains the user's unique identifier.",
      "The user identifier is passed to isRequestAllowed().",
      "Rate Forge retrieves the rate limiting state associated with that user.",
      "The configured algorithm evaluates the request and returns the rate limit result."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Authenticated Request&emsp;&emsp;] --> B[&emsp;&emsp;Get User ID&emsp;&emsp;]
    B --> C["&emsp;&emsp;isRequestAllowed(userId)&emsp;&emsp;"]
    C --> D[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    D --> E[&emsp;&emsp;Algorithm&emsp;&emsp;]
    E --> F[&emsp;&emsp;Store&emsp;&emsp;]
    F --> G{&emsp;&emsp;Request Allowed?&emsp;&emsp;}

    G -->|&emsp;&emsp;Yes&emsp;&emsp;| H[&emsp;&emsp;Continue Request&emsp;&emsp;]
    G -->|&emsp;&emsp;No&emsp;&emsp;| I[&emsp;&emsp;Return 429&emsp;&emsp;]
`,

    workingList: [
      "Authenticate the request.",
      "Retrieve the user's unique identifier.",
      "Pass the identifier to isRequestAllowed().",
      "Evaluate the request using the configured algorithm.",
      "Continue the request when allowed.",
      "Reject the request when the user's limit is exceeded."
    ],

    configurationCode: `const result = await limiter.isRequestAllowed(
  req.userId
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many requests",
    retryAfter: result.retryAfter
  });
}

next();`,

    configurationTable: {
      tableHeaders: ["Value", "Description"],
      tableBody: [
        [
          "req.userId",
          "Unique identifier of the authenticated user."
        ],
        [
          "allowed",
          "Indicates whether the request is allowed."
        ],
        [
          "retryAfter",
          "Indicates when the user can retry."
        ]
      ]
    },

    notes: [
      "Use a stable and unique identifier for each user.",
      "User-based limiting is generally more precise than IP-based limiting for authenticated APIs."
    ]
  },

  {
    name: "Route-Specific Limits",

    overview: [
      "Route-specific limiting allows different API endpoints to use different rate limiting configurations.",
      "This is useful when certain routes are more sensitive, expensive, or resource-intensive than others."
    ],

    workingContent: [
      "Create separate rate limiters for routes that require different limits.",
      "Each limiter can use its own algorithm, store, and configuration.",
      "Apply the appropriate limiter when handling the corresponding route."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B{&emsp;&emsp;Route&emsp;&emsp;}

    B -->|&emsp;&emsp;Authentication&emsp;&emsp;| C[&emsp;&emsp;Strict Limiter&emsp;&emsp;]
    B -->|&emsp;&emsp;API&emsp;&emsp;| D[&emsp;&emsp;Standard Limiter&emsp;&emsp;]
    B -->|&emsp;&emsp;Public Data&emsp;&emsp;| E[&emsp;&emsp;Higher Limit&emsp;&emsp;]

    C --> F[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    D --> F
    E --> F

    F --> G{&emsp;&emsp;Request Allowed?&emsp;&emsp;}

    G -->|&emsp;&emsp;Yes&emsp;&emsp;| H[&emsp;&emsp;Continue&emsp;&emsp;]
    G -->|&emsp;&emsp;No&emsp;&emsp;| I[&emsp;&emsp;Return 429&emsp;&emsp;]
`,

    workingList: [
      "Identify the requested route.",
      "Select the limiter configured for that route.",
      "Provide the appropriate unique identifier.",
      "Evaluate the request.",
      "Continue the request when allowed.",
      "Reject the request when the route-specific limit is exceeded."
    ],

    configurationCode: `const authLimiter = new FixedWindow({
  store,
  limit: 5,
  window: 60_000,
});

const apiLimiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Route", "Example Limit", "Identifier"],
      tableBody: [
        ["Authentication", "5 requests/minute", "IP address"],
        ["Authenticated API", "100 requests/minute", "User ID"],
        ["Public API", "200 requests/minute", "IP address"]
      ]
    },

    notes: [
      "Use stricter limits for sensitive endpoints such as login, password reset, and OTP verification.",
      "Different routes can use different algorithms when required."
    ]
  },

  {
    name: "Dynamic Limits",

    overview: [
      "Dynamic rate limiting allows applications to apply different limits based on runtime conditions.",
      "This is particularly useful for applications with different subscription plans, user roles, organizations, or access levels."
    ],

    workingContent: [
      "Determine the appropriate rate limit based on the current user's plan or application context.",
      "Create or select the limiter corresponding to the required limit.",
      "Pass the user's unique identifier to isRequestAllowed().",
      "Rate Forge evaluates the request using the selected configuration."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Identify User&emsp;&emsp;]
    B --> C[&emsp;&emsp;Determine Plan&emsp;&emsp;]

    C -->|&emsp;&emsp;Free&emsp;&emsp;| D[&emsp;&emsp;Low Limit&emsp;&emsp;]
    C -->|&emsp;&emsp;Pro&emsp;&emsp;| E[&emsp;&emsp;Medium Limit&emsp;&emsp;]
    C -->|&emsp;&emsp;Enterprise&emsp;&emsp;| F[&emsp;&emsp;High Limit&emsp;&emsp;]

    D --> G[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    E --> G
    F --> G

    G --> H{&emsp;&emsp;Request Allowed?&emsp;&emsp;}

    H -->|&emsp;&emsp;Yes&emsp;&emsp;| I[&emsp;&emsp;Continue&emsp;&emsp;]
    H -->|&emsp;&emsp;No&emsp;&emsp;| J[&emsp;&emsp;Return 429&emsp;&emsp;]
`,

    workingList: [
      "Identify the current user.",
      "Determine the user's plan or access level.",
      "Select the appropriate rate limit.",
      "Evaluate the request using the selected limiter.",
      "Continue the request when allowed.",
      "Reject the request when the applicable limit is exceeded."
    ],

    configurationCode: `const limits = {
  free: 20,
  pro: 100,
  enterprise: 500,
};

const limit = limits[req.user.plan];

const limiter = new FixedWindow({
  store,
  limit,
  window: 60_000,
});

const result = await limiter.isRequestAllowed(
  req.userId
);`,

    configurationTable: {
      tableHeaders: ["Plan", "Example Limit", "Identifier"],
      tableBody: [
        ["Free", "20 requests/minute", "User ID"],
        ["Pro", "100 requests/minute", "User ID"],
        ["Enterprise", "500 requests/minute", "User ID"]
      ]
    },

    notes: [
      "Dynamic limits are useful for SaaS applications with multiple subscription tiers.",
      "Keep the logic that determines the limit separate from the rate limiter itself."
    ]
  },

  {
    name: "Distributed Deployments",

    overview: [
      "Distributed rate limiting is required when an application runs across multiple server instances, containers, or services.",
      "A shared storage backend allows all application instances to access the same rate limiting state."
    ],

    workingContent: [
      "Multiple application instances receive requests through a load balancer.",
      "Each instance uses the same Rate Forge configuration and a shared storage backend.",
      "The shared store maintains the rate limiting state for all instances.",
      "This prevents each application instance from maintaining an independent rate limit."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Client&emsp;&emsp;] --> B[&emsp;&emsp;Load Balancer&emsp;&emsp;]

    B --> C[&emsp;&emsp;Instance 1&emsp;&emsp;]
    B --> D[&emsp;&emsp;Instance 2&emsp;&emsp;]
    B --> E[&emsp;&emsp;Instance 3&emsp;&emsp;]

    C --> F[&emsp;&emsp;Rate Forge&emsp;&emsp;]
    D --> G[&emsp;&emsp;Rate Forge&emsp;&emsp;]
    E --> H[&emsp;&emsp;Rate Forge&emsp;&emsp;]

    F --> I["&emsp;&emsp;(Shared Store)&emsp;&emsp;"]
    G --> I
    H --> I

    I --> J[&emsp;&emsp;Shared Rate Limit State&emsp;&emsp;]
`,

    workingList: [
      "Deploy multiple application instances.",
      "Configure Rate Forge on every instance.",
      "Use a shared storage backend such as Redis, MongoDB, or PostgreSQL.",
      "Use a consistent unique identifier across all instances.",
      "Allow each instance to read and update the shared rate limiting state."
    ],

    configurationCode: `const store = new RedisStore(redis);

const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});

const result = await limiter.isRequestAllowed(
  req.userId
);`,

    configurationTable: {
      tableHeaders: ["Component", "Purpose"],
      tableBody: [
        [
          "Application Instances",
          "Handle incoming requests across multiple servers or containers."
        ],
        [
          "Rate Forge",
          "Evaluates requests using the configured algorithm."
        ],
        [
          "Shared Store",
          "Maintains rate limiting state shared across instances."
        ],
        [
          "Unique Identifier",
          "Identifies the client consistently across instances."
        ]
      ]
    },

    notes: [
      "Use a distributed store when running multiple application instances.",
      "All instances must use a consistent identifier and shared rate limiting state."
    ]
  }
];