export const configurations = [
  {
    name: "Options",

    overview: [
      "Rate Forge provides configuration options that allow you to control how the rate limiter behaves.",
      "These options define the limits, time windows, storage backend, and other parameters required by the selected rate limiting algorithm."
    ],

    workingContent: [
      "Configuration options are provided when creating a rate limiter instance.",
      "The selected algorithm uses these options to determine how requests should be evaluated and how rate limiting state should be maintained.",
      "Different algorithms may require different configuration values depending on how they calculate and enforce request limits."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Configuration Options&emsp;&emsp;] --> B[&emsp;&emsp;Create Rate Limiter&emsp;&emsp;]
    B --> C[&emsp;&emsp;Select Algorithm&emsp;&emsp;]
    C --> D[&emsp;&emsp;Select Store&emsp;&emsp;]
    D --> E[&emsp;&emsp;Apply Configuration&emsp;&emsp;]
    E --> F[&emsp;&emsp;Rate Limiter Ready&emsp;&emsp;]
`,

    workingList: [
      "Select the rate limiting algorithm.",
      "Provide the storage backend used by the algorithm.",
      "Configure the request limit.",
      "Configure the required time or rate parameters.",
      "Create the rate limiter using the provided configuration.",
      "Use the configured limiter to evaluate incoming requests."
    ],

    configurationCode: `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        [
          "store",
          "Storage backend used to maintain rate limiting state."
        ],
        [
          "limit",
          "Maximum number of requests allowed according to the selected algorithm."
        ],
        [
          "window",
          "Time window used by algorithms that operate over a defined time period."
        ]
      ]
    },

    advantages: [
      "Allows rate limiting behavior to be customized.",
      "Keeps configuration separate from the application logic.",
      "Works with different algorithms and storage backends.",
      "Makes the limiter reusable across different routes and services."
    ],

    limitations: [
      "Available options depend on the selected algorithm.",
      "Incorrect configuration can result in overly restrictive or ineffective rate limiting."
    ]
  },

  {
    name: "Unique Identifier",

    overview: [
      "The unique identifier determines which client or entity a rate limit is applied to.",
      "Rate Forge does not make assumptions about how a client should be identified. Instead, the identifier is explicitly provided by the application when calling the rate limiting method."
    ],

    workingContent: [
      "When a request reaches the application, the application determines the appropriate identifier for that request.",
      "The identifier is then passed to isRequestAllowed().",
      "Rate Forge uses this identifier as the key for retrieving and updating the corresponding rate limiting state in the configured store.",
      "Different identifiers are treated as independent clients and therefore maintain separate rate limiting state."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Application&emsp;&emsp;]
    B --> C[&emsp;&emsp;Get Unique Identifier&emsp;&emsp;]
    C --> D["&emsp;&emsp;isRequestAllowed(identifier)&emsp;&emsp;"]
    D --> E[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    E --> F[&emsp;&emsp;Algorithm&emsp;&emsp;]
    F --> G[&emsp;&emsp;Store&emsp;&emsp;]
    G --> H[&emsp;&emsp;Rate Limit Result&emsp;&emsp;]
`,

    workingList: [
      "Receive the incoming request.",
      "Determine which entity should be rate limited.",
      "Extract or generate the appropriate unique identifier.",
      "Pass the identifier to isRequestAllowed().",
      "Rate Forge uses the identifier to locate the corresponding rate limiting state.",
      "The selected algorithm evaluates the request.",
      "The updated state is stored using the configured storage backend."
    ],

    configurationCode: `const result = await limiter.isRequestAllowed(
  req.userId
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many requests"
  });
}

next();`,

    configurationTable: {
      tableHeaders: ["Parameter", "Description"],
      tableBody: [
        [
          "identifier",
          "Unique value used to identify the client or entity being rate limited."
        ]
      ]
    },

    advantages: [
      "Framework-independent client identification.",
      "Developers have complete control over how clients are identified.",
      "Supports users, IP addresses, API keys, sessions, organizations, or other identifiers.",
      "Keeps Rate Forge independent from a specific request structure.",
      "Different identifiers automatically maintain independent rate limiting state."
    ],

    limitations: [
      "The application is responsible for providing a valid identifier.",
      "Changing the identifier between requests creates separate rate limiting states.",
      "A non-unique identifier can unintentionally group multiple clients under the same rate limit."
    ]
  },

  {
    name: "Headers",

    overview: [
      "Rate Forge can provide rate limiting information through HTTP response headers.",
      "These headers allow clients to understand their configured limit, remaining requests, and retry information without requiring a separate API endpoint."
    ],

    workingContent: [
      "After the rate limiting algorithm evaluates a request, Rate Forge produces a rate limit result.",
      "The middleware can use this result to attach rate limiting information to the HTTP response headers.",
      "When a request is rejected, retry information can be provided to help the client determine when another request can be attempted."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Rate &emsp;&emsp;]
    B --> C[&emsp;&emsp;Algorithm Evaluation&emsp;&emsp;]
    C --> D[&emsp;&emsp;Rate Limit Result&emsp;&emsp;]
    D --> E[&emsp;&emsp;Generate Headers&emsp;&emsp;]
    E --> F[&emsp;&emsp;HTTP Response&emsp;&emsp;]
`,

    workingList: [
      "Receive the incoming request.",
      "Evaluate the request using the configured algorithm.",
      "Generate the rate limit result.",
      "Determine the appropriate rate limiting information.",
      "Attach the configured headers to the HTTP response.",
      "Return the response to the client."
    ],

    configurationCode: `// Example response headers

RateLimit-Limit: 100
RateLimit-Remaining: 42
RateLimit-Reset: 30`,

    configurationTable: {
      tableHeaders: ["Header", "Description"],
      tableBody: [
        [
          "RateLimit-Limit",
          "Indicates the configured request limit."
        ],
        [
          "RateLimit-Remaining",
          "Indicates the number of requests remaining."
        ],
        [
          "RateLimit-Reset",
          "Indicates when the current rate limit period resets."
        ]
      ]
    },

    advantages: [
      "Provides clients with useful rate limiting information.",
      "Makes API rate limits easier to understand.",
      "Allows clients to adjust their request behavior.",
      "Works naturally with HTTP APIs."
    ],

    limitations: [
      "Clients should not rely on headers as the enforcement mechanism.",
      "Header behavior depends on how the limiter is integrated into the application.",
      "Exposing rate limit information may not be desirable for every application."
    ]
  },

  {
    name: "Custom Responses",

    overview: [
      "Rate Forge allows applications to customize the response returned when a request exceeds the configured rate limit.",
      "Custom responses make it possible to integrate rate limiting errors with an application's existing API response format."
    ],

    workingContent: [
      "When the rate limiting algorithm determines that a request should be rejected, Rate Forge produces a rate limit result indicating that the request is not allowed.",
      "The application can use this result to return its own HTTP status code, response body, error format, and retry information.",
      "This allows rate limiting responses to remain consistent with the rest of the application's API."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Rate Limiter&emsp;&emsp;]
    B --> C[&emsp;&emsp;Algorithm&emsp;&emsp;]
    C --> D{&emsp;&emsp;Request Allowed?&emsp;&emsp;}

    D -->|&emsp;&emsp;Yes&emsp;&emsp;| E[&emsp;&emsp;Continue Request&emsp;&emsp;]
    D -->|&emsp;&emsp;No&emsp;&emsp;| F[&emsp;&emsp;Custom Response&emsp;&emsp;]

    F --> G[&emsp;&emsp;HTTP 429 Response&emsp;&emsp;]
`,

    workingList: [
      "Receive the incoming request.",
      "Evaluate the request using the configured rate limiting algorithm.",
      "Check the allowed value returned by the rate limiter.",
      "Continue the request when it is allowed.",
      "Create the application's custom response when the request is rejected.",
      "Return the appropriate HTTP status and response body to the client."
    ],

    configurationCode: `const result = await limiter.isRequestAllowed(
  req.userId
);

if (!result.allowed) {
  return res.status(429).json({
    success: false,
    message: "Too many requests",
    retryAfter: result.retryAfter
  });
}

next();`,

    configurationTable: {
      tableHeaders: ["Property", "Description"],
      tableBody: [
        [
          "allowed",
          "Indicates whether the request is permitted."
        ],
        [
          "remaining",
          "Number of requests remaining for the current identifier."
        ],
        [
          "limit",
          "Configured request limit."
        ],
        [
          "retryAfter",
          "Time the client should wait before retrying when the request is rejected."
        ]
      ]
    },

    advantages: [
      "Allows complete control over the API response.",
      "Can be integrated with existing application error formats.",
      "Allows retry information to be communicated to clients.",
      "Keeps rate limiting behavior separate from response presentation."
    ],

    limitations: [
      "The application is responsible for constructing the final HTTP response.",
      "Different applications may implement different response formats.",
      "The middleware integration must correctly handle rejected requests."
    ]
  }
];