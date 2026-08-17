export const advancedData = [
  {
    titleName: "Choosing an Algorithm",

    contentBeforeCodes: [
      "There is no universally best rate limiting algorithm. The appropriate algorithm depends on your application's traffic pattern, whether bursts should be allowed, and how precisely requests need to be controlled.",
    ],

    list: {
      intro: ["Consider the following when selecting an algorithm:"],

      content: [
        "Fixed Window — Best suited for simple request limiting where low overhead and straightforward configuration are the primary requirements.",
        "Sliding Window Log — Best suited for applications that require precise tracking of requests within a rolling time period.",
        "Sliding Window Counter — Best suited when you need a balance between sliding-window accuracy and memory efficiency.",
        "Token Bucket — Best suited for applications that need to support controlled bursts while maintaining a long-term request rate.",
        "Leaky Bucket — Best suited when incoming traffic should be processed at a controlled and predictable rate.",
        "GCRA — Best suited when precise rate control and efficient state management are important.",
      ],
    },

    table: {
      tableHeaders: ["Requirement", "Recommended Algorithm"],

      tableBody: [
        ["Simple request limiting", "Fixed Window"],
        ["Precise rolling-window tracking", "Sliding Window Log"],
        ["Efficient sliding-window approximation", "Sliding Window Counter"],
        ["Controlled bursts", "Token Bucket"],
        ["Smooth traffic flow", "Leaky Bucket"],
        ["Precise and efficient rate control", "GCRA"],
      ],
    },

    notes: [
      "The recommended algorithm depends on your application's traffic pattern and requirements. There is no single algorithm that is optimal for every use case.",
    ],
  },

  {
    titleName: "Choosing a Store",

    contentBeforeCodes: [
      "The storage backend determines where Rate Forge maintains the state required by the selected algorithm.",
      "The appropriate store primarily depends on your deployment architecture and whether rate limiting state needs to be shared between application instances.",
    ],

    list: {
      intro: ["Consider the following when selecting a store:"],

      content: [
        "Memory Store — Suitable for single-process applications where rate limiting state does not need to be shared between instances.",
        "Redis Store — Suitable for distributed applications where multiple application instances need access to shared rate limiting state.",
        "MongoDB Store — Suitable when MongoDB is already part of your application's infrastructure and you want a database-backed store.",
        "PostgreSQL Store — Suitable when PostgreSQL is already part of your application's infrastructure and you want a database-backed store.",
      ],
    },

    table: {
      tableHeaders: ["Deployment", "Recommended Store"],

      tableBody: [
        ["Local development", "Memory Store"],
        ["Single server", "Memory Store"],
        ["Horizontally scaled application", "Redis Store"],
        ["Existing MongoDB infrastructure", "MongoDB Store"],
        ["Existing PostgreSQL infrastructure", "PostgreSQL Store"],
        ["Distributed high-throughput system", "Redis Store"],
      ],
    },

    notes: [
      "Do not introduce a distributed store unless your application actually requires shared rate limiting state.",
      "For a single-process application, Memory Store is generally the simplest option.",
    ],
  },

  {
    titleName: "How Rate Forge Works",

    contentBeforeCodes: [
      "Rate Forge separates the rate limiting algorithm from the storage backend. The algorithm determines whether a request should be allowed, while the store manages the state required by that algorithm.",
      "The application provides a unique identifier through isRequestAllowed(). Rate Forge then evaluates the request using the selected algorithm and configured store.",
    ],

    flowchart: `
flowchart TD
    A[&emsp;&emsp;Application&emsp;&emsp;] --> B[&emsp;&emsp;Unique Identifier&emsp;&emsp;]
    B --> C[&emsp;&emsp;Rate Limiting Algorithm&emsp;&emsp;]
    C --> D[&emsp;&emsp;Storage Backend&emsp;&emsp;]
    D --> E[&emsp;&emsp;Rate Limit Result&emsp;&emsp;]
    E --> F{&emsp;&emsp;Allowed?&emsp;&emsp;}
    F -->|&emsp;&emsp;Yes&emsp;&emsp;| G[&emsp;&emsp;Continue Request&emsp;&emsp;]
    F -->|&emsp;&emsp;No&emsp;&emsp;| H[&emsp;&emsp;Reject Request&emsp;&emsp;]
`,

    list: {
      intro: ["The request evaluation can be summarized as:"],

      content: [
        "Receive a request.",
        "Determine the unique identifier.",
        "Pass the identifier to isRequestAllowed().",
        "Evaluate the request using the selected algorithm.",
        "Read or update the required state through the configured store.",
        "Return the rate limit result.",
        "Allow or reject the request based on the result.",
      ],
    },

    notes: [
      "The separation between algorithms and stores allows the storage implementation to be changed without redesigning the application's rate limiting logic.",
    ],
  },

  {
    titleName: "Performance",

    contentBeforeCodes: [
      "Rate limiting introduces additional processing into the request path. The actual overhead depends on the selected algorithm, storage backend, request volume, and deployment architecture.",
      "Performance should therefore be evaluated under realistic traffic rather than through isolated measurements alone.",
    ],

    list: {
      intro: ["Consider the following when evaluating Rate Forge performance:"],

      content: [
        "Memory Store provides very low access overhead because state is maintained inside the application process.",
        "Redis introduces network communication but allows rate limiting state to be shared across application instances.",
        "MongoDB and PostgreSQL introduce database operations and should be evaluated according to the expected request volume.",
        "Algorithms that maintain more detailed request state can require more processing or storage.",
        "Storage latency can become an important factor when rate limiting is applied to high-volume endpoints.",
        "Distributed applications should prioritize consistent shared state over small reductions in local processing overhead.",
      ],
    },

    notes: [
      "Choose the simplest algorithm and storage backend that satisfy your application's requirements.",
      "Benchmark the complete request path, including the storage backend, when evaluating production performance.",
      "Avoid optimizing rate limiting before identifying an actual performance bottleneck.",
    ],
  },

  {
    titleName: "Concurrency & Locking",

    contentBeforeCodes: [
      "Rate limiting is a stateful operation. Multiple requests for the same identifier can arrive concurrently and attempt to read and update the same rate limiting state.",
      "Without proper concurrency control, multiple requests may observe the same state before either request updates it. This can result in more requests being allowed than intended.",
    ],

    flowchart: `
flowchart TD
    A[&emsp;&emsp;Request A&emsp;&emsp;] --> B[&emsp;&emsp;Acquire Lock&emsp;&emsp;]
    C[&emsp;&emsp;Request B&emsp;&emsp;] --> D[Wait for Lock&emsp;&emsp;]

    B --> E[&emsp;&emsp;Read Shared State&emsp;&emsp;]
    E --> F[&emsp;&emsp;Update Shared State&emsp;&emsp;]
    F --> G[&emsp;&emsp;Release Lock&emsp;&emsp;]

    G --> D
    D --> H[&emsp;&emsp;Acquire Lock&emsp;&emsp;]
    H --> I[&emsp;&emsp;Read Updated State&emsp;&emsp;]
    I --> J[&emsp;&emsp;Update Shared State&emsp;&emsp;]
    J --> K[&emsp;&emsp;Release Lock&emsp;&emsp;]
`,

    contentAfterCodes: [
      "For example, if only one request is remaining within a limit, two concurrent requests may both read the same remaining capacity before either request performs its update.",
      "Concurrency control coordinates competing operations so that shared rate limiting state is updated consistently.",
    ],

    list: {
      intro: ["Concurrency becomes particularly important when:"],

      content: [
        "Multiple requests use the same identifier simultaneously.",
        "The application receives a high volume of concurrent traffic.",
        "Multiple application instances share the same storage backend.",
        "Several workers access the same rate limiting state.",
      ],
    },

    notes: [
      "Application-level memory locks cannot provide distributed synchronization because each application instance has its own memory.",
      "Distributed deployments require concurrency control at the shared storage layer.",
      "Correct concurrency handling is especially important when multiple instances update the same rate limiting state simultaneously.",
    ],
  },
];
