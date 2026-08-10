export const algorithms = [
  {
    algorithmName: "Fixed Window",

    algorithmOverview: [
      "Fixed Window divides time into fixed intervals and allows a predefined number of requests within each interval. Once the current window expires, the counter resets and a new window begins.",
      "It is one of the simplest rate limiting algorithms and is suitable when you need straightforward and low-overhead request limiting."
    ],

    workingContent: [
      "For example, with a limit of 100 requests per 60 seconds, the algorithm creates fixed 60-second windows.",
      "Within each window, the client's request count is retrieved from the store. If the count is below the configured limit, the request is allowed and the counter is incremented.",
      "Once the limit is reached, subsequent requests are rejected until the current window expires. When the window expires, the counter is reset for the next window."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Identify Client&emsp;&emsp;]
    B --> C[&emsp;&emsp;Get Current Window&emsp;&emsp;]
    C --> D[&emsp;&emsp;Get Request Count&emsp;&emsp;]

    D --> E{&emsp;&emsp;Count < Limit?&emsp;&emsp;}

    E -->|&emsp;&emsp;Yes&emsp;&emsp;| F[&emsp;&emsp;Allow Request&emsp;&emsp;]
    F --> G[&emsp;&emsp;Increment Counter&emsp;&emsp;]

    E -->|&emsp;&emsp;No&emsp;&emsp;| H[&emsp;&emsp;Reject Request&emsp;&emsp;]

    G --> I[&emsp;&emsp;Window Expires&emsp;&emsp;]
    I --> J[&emsp;&emsp;Reset Counter&emsp;&emsp;]
`,

    workingList: [
      "Identify the client using the configured rate limit key.",
      "Determine the current fixed time window.",
      "Retrieve the request count for the client from the store.",
      "Allow the request if the current count is below the configured limit.",
      "Increment the request counter after allowing the request.",
      "Reject the request when the configured limit has been reached.",
      "Reset the counter when the current window expires."
    ],

    configurationCode: `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        ["store", "Storage backend used to store the request count."],
        ["limit", "Maximum number of requests allowed within the window."],
        ["window", "Duration of the fixed window in milliseconds."]
      ]
    },

    advantages: [
      "Simple to understand and implement.",
      "Low memory overhead.",
      "Fast request evaluation.",
      "Easy to configure.",
      "Suitable for straightforward API rate limiting."
    ],

    limitations: [
      "Can suffer from the boundary problem.",
      "Traffic can spike near the boundary between consecutive windows.",
      "Does not provide precise control over how requests are distributed within a window."
    ]
  },

  {
    algorithmName: "Sliding Window Log",

    algorithmOverview: [
      "Sliding Window Log tracks the timestamp of individual requests and evaluates them against a continuously moving time window.",
      "Unlike Fixed Window, the window is not tied to fixed clock intervals. This provides more precise control over request rates."
    ],

    workingContent: [
      "For a limit of 100 requests per 60 seconds, the algorithm considers requests that occurred within the previous 60 seconds.",
      "Each request timestamp is stored and timestamps that fall outside the current sliding window are removed before the request count is evaluated.",
      "If the number of remaining requests is below the configured limit, the request is allowed and its timestamp is added to the log."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Identify Client&emsp;&emsp;]
    B --> C[Get Request Timestamps]

    C --> D[Remove Expired Timestamps]
    D --> E[&emsp;&emsp;Count Remaining Requests&emsp;&emsp;]

    E --> F{&emsp;&emsp;Count < Limit?&emsp;&emsp;}

    F -->|&emsp;&emsp;Yes&emsp;&emsp;| G[&emsp;&emsp;Allow Request&emsp;&emsp;]
    G --> H[&emsp;&emsp;Add Current Timestamp&emsp;&emsp;]

    F -->|&emsp;&emsp;No&emsp;&emsp;| I[&emsp;&emsp;Reject Request&emsp;&emsp;]

    H --> J[&emsp;&emsp;Store Updated Timestamps&emsp;&emsp;]
`,

    workingList: [
      "Identify the client using the configured rate limit key.",
      "Retrieve the stored request timestamps.",
      "Remove timestamps that fall outside the current sliding window.",
      "Count the remaining request timestamps.",
      "Allow the request if the count is below the configured limit.",
      "Add the current request timestamp after allowing the request.",
      "Reject the request when the configured limit has been reached."
    ],

    configurationCode: `const limiter = new SlidingWindowLog({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        ["store", "Storage backend used to store request timestamps."],
        ["limit", "Maximum number of requests allowed within the sliding window."],
        ["window", "Duration of the sliding window in milliseconds."]
      ]
    },

    advantages: [
      "Provides high accuracy.",
      "Eliminates the Fixed Window boundary problem.",
      "Provides precise control over request frequency.",
      "Naturally adapts to continuously changing traffic."
    ],

    limitations: [
      "Requires storing individual request timestamps.",
      "Uses more memory than counter-based algorithms.",
      "Storage operations can become more expensive with high request volumes."
    ]
  },

  {
    algorithmName: "Sliding Window Counter",

    algorithmOverview: [
      "Sliding Window Counter provides an approximation of the Sliding Window Log algorithm while using significantly less storage.",
      "Instead of storing every request timestamp, it uses request counts from the current and previous windows to estimate the number of requests within the current sliding window."
    ],

    workingContent: [
      "The algorithm maintains counters for the current and previous windows.",
      "The previous window count is weighted according to how much of that window overlaps with the current sliding window.",
      "The weighted previous count is combined with the current window count to estimate the number of requests within the sliding window.",
      "The estimated count is then compared against the configured limit."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Identify Client&emsp;&emsp;]
    B --> C[&emsp;&emsp;Get Previous Window Count&emsp;&emsp;]
    C --> D[&emsp;&emsp;Get Current Window Count&emsp;&emsp;]

    D --> E[&emsp;&emsp;Calculate Window Progress&emsp;&emsp;]
    E --> F[&emsp;&emsp;Calculate Weighted Count&emsp;&emsp;]

    F --> G{&emsp;&emsp;Count < Limit?&emsp;&emsp;}

    G -->|&emsp;&emsp;Yes&emsp;&emsp;| H[&emsp;&emsp;Allow Request&emsp;&emsp;]
    H --> I[&emsp;&emsp;Increment Current Window&emsp;&emsp;]

    G -->|&emsp;&emsp;No&emsp;&emsp;| J[&emsp;&emsp;Reject Request&emsp;&emsp;]

    I --> K[&emsp;&emsp;Store Updated Count&emsp;&emsp;]
`,

    workingList: [
      "Identify the client using the configured rate limit key.",
      "Retrieve the request count from the previous window.",
      "Retrieve the request count from the current window.",
      "Determine the current position within the window.",
      "Calculate the weighted request count using the previous and current windows.",
      "Allow the request if the estimated count is below the configured limit.",
      "Increment the current window counter after allowing the request.",
      "Reject the request when the estimated count reaches the configured limit."
    ],

    configurationCode: `const limiter = new SlidingWindowCounter({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        ["store", "Storage backend used to store window counters."],
        ["limit", "Maximum number of requests allowed within the sliding window."],
        ["window", "Duration of the sliding window in milliseconds."]
      ]
    },

    advantages: [
      "Uses less memory than Sliding Window Log.",
      "Provides better traffic control than Fixed Window.",
      "Does not require storing every request timestamp.",
      "Suitable for applications handling high request volumes."
    ],

    limitations: [
      "Provides an approximation rather than exact request tracking.",
      "Slightly more complex than Fixed Window.",
      "The estimated count can differ from the exact Sliding Window Log count."
    ]
  },

  {
    algorithmName: "Token Bucket",

    algorithmOverview: [
      "Token Bucket controls request rates using a bucket containing tokens.",
      "Tokens are continuously added to the bucket at a configured refill rate. Each allowed request consumes a token, allowing the algorithm to support controlled bursts while maintaining a long-term request rate."
    ],

    workingContent: [
      "The bucket has a maximum capacity that determines how many tokens can be stored.",
      "Tokens are replenished according to the configured refill rate based on the time elapsed since the previous request.",
      "When a request arrives, the algorithm calculates the available tokens.",
      "If at least one token is available, the request is allowed and one token is consumed. If no token is available, the request is rejected."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Get Bucket State&emsp;&emsp;]
    B --> C[&emsp;&emsp;Calculate Token Refill&emsp;&emsp;]
    C --> D[&emsp;&emsp;Add Available Tokens&emsp;&emsp;]

    D --> E{&emsp;&emsp;Token Available?&emsp;&emsp;}

    E -->|&emsp;&emsp;Yes&emsp;&emsp;| F[&emsp;&emsp;Allow Request&emsp;&emsp;]
    F --> G[&emsp;&emsp;Consume Token&emsp;&emsp;]
    G --> H[&emsp;&emsp;Update Bucket State&emsp;&emsp;]

    E -->|&emsp;&emsp;No&emsp;&emsp;| I[&emsp;&emsp;Reject Request&emsp;&emsp;]
`,

    workingList: [
      "Identify the client using the configured rate limit key.",
      "Retrieve the current bucket state.",
      "Calculate how many tokens should have been refilled based on elapsed time.",
      "Add the refilled tokens without exceeding the bucket capacity.",
      "Check whether at least one token is available.",
      "Allow the request and consume one token when a token is available.",
      "Reject the request when the bucket does not contain a token."
    ],

    configurationCode: `const limiter = new TokenBucket({
  store,
  capacity: 100,
  refillRate: 10,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        ["store", "Storage backend used to store the bucket state."],
        ["capacity", "Maximum number of tokens the bucket can contain."],
        ["refillRate", "Rate at which tokens are added to the bucket."]
      ]
    },

    advantages: [
      "Supports controlled bursts.",
      "Provides smooth long-term rate control.",
      "Requires relatively little storage.",
      "Works well for APIs with variable traffic patterns."
    ],

    limitations: [
      "More complex than Fixed Window.",
      "Requires maintaining token state and refill timing.",
      "Large bursts may not be desirable for applications requiring strictly uniform traffic."
    ]
  },

  {
    algorithmName: "Leaky Bucket",

    algorithmOverview: [
      "Leaky Bucket controls traffic by processing requests at a controlled rate.",
      "Requests enter a bucket and are removed at a configured rate, smoothing incoming traffic and preventing sudden bursts from overwhelming downstream services."
    ],

    workingContent: [
      "The bucket has a maximum capacity that determines how many requests can be held.",
      "Incoming requests are added to the bucket while capacity is available.",
      "Requests are processed at the configured leak rate.",
      "When the bucket reaches its capacity, additional requests are rejected."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Get Bucket State&emsp;&emsp;]
    B --> C{&emsp;&emsp;Bucket Full?&emsp;&emsp;}

    C -->|&emsp;&emsp;No&emsp;&emsp;| D[&emsp;&emsp;Add Request to Bucket&emsp;&emsp;]
    D --> E[&emsp;&emsp;Process at Leak Rate&emsp;&emsp;]
    E --> F[&emsp;&emsp;Update Bucket State&emsp;&emsp;]

    C -->|&emsp;&emsp;Yes&emsp;&emsp;| G[&emsp;&emsp;Reject Request&emsp;&emsp;]
`,

    workingList: [
      "Identify the client using the configured rate limit key.",
      "Retrieve the current bucket state.",
      "Determine how much capacity has become available based on the configured leak rate.",
      "Check whether the bucket has available capacity.",
      "Add the request to the bucket when capacity is available.",
      "Process requests at the configured leak rate.",
      "Reject the request when the bucket reaches its capacity."
    ],

    configurationCode: `const limiter = new LeakyBucket({
  store,
  capacity: 100,
  leakRate: 10,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        ["store", "Storage backend used to store the bucket state."],
        ["capacity", "Maximum number of requests the bucket can hold."],
        ["leakRate", "Rate at which requests are processed from the bucket."]
      ]
    },

    advantages: [
      "Smooths incoming traffic.",
      "Prevents sudden bursts from reaching downstream services.",
      "Provides predictable traffic flow.",
      "Useful when consistent processing rates are important."
    ],

    limitations: [
      "Does not naturally accommodate large bursts.",
      "Requires careful configuration of bucket capacity and leak rate.",
      "Can reject requests when the bucket reaches its capacity."
    ]
  },

  {
    algorithmName: "GCRA",

    algorithmOverview: [
      "GCRA (Generic Cell Rate Algorithm) controls request timing using a Theoretical Arrival Time (TAT).",
      "Instead of maintaining a traditional request counter or storing individual request timestamps, GCRA determines whether a request arrives within the allowed timing tolerance.",
      "This provides precise rate control while requiring relatively little state."
    ],

    workingContent: [
      "The algorithm maintains a theoretical arrival time representing when the next request is expected to arrive.",
      "When a request arrives, its current arrival time is compared against the theoretical arrival time and the configured tolerance.",
      "If the request arrives within the allowed tolerance, it is accepted and the theoretical arrival time is updated.",
      "If the request arrives too early, it is rejected and the retry time can be calculated from the timing difference."
    ],

    workingFlowChart: `
flowchart TD
    A[&emsp;&emsp;Incoming Request&emsp;&emsp;] --> B[&emsp;&emsp;Identify Client&emsp;&emsp;]
    B --> C[&emsp;&emsp;Get Theoretical Arrival Time&emsp;&emsp;]

    C --> D[&emsp;&emsp;Calculate Expected Arrival&emsp;&emsp;]
    D --> E{&emsp;&emsp;Within Allowed Tolerance?&emsp;&emsp;}

    E -->|&emsp;&emsp;Yes&emsp;&emsp;| F[&emsp;&emsp;Allow Request&emsp;&emsp;]
    F --> G[&emsp;&emsp;Update Theoretical Arrival Time&emsp;&emsp;]

    E -->|&emsp;&emsp;No&emsp;&emsp;| H[&emsp;&emsp;Reject Request&emsp;&emsp;]
    H --> I[&emsp;&emsp;Calculate Retry After&emsp;&emsp;]
`,

    workingList: [
      "Identify the client using the configured rate limit key.",
      "Retrieve the client's theoretical arrival time from the store.",
      "Calculate the expected arrival time using the configured rate.",
      "Determine whether the request falls within the allowed timing tolerance.",
      "Allow the request when it satisfies the configured rate and tolerance.",
      "Update the theoretical arrival time after an allowed request.",
      "Reject requests that arrive earlier than the allowed tolerance.",
      "Calculate the retry time when a request is rejected."
    ],

    configurationCode: `const limiter = new GCRA({
  store,
  limit: 100,
  window: 60_000,
});`,

    configurationTable: {
      tableHeaders: ["Option", "Description"],
      tableBody: [
        ["store", "Storage backend used to store the theoretical arrival time."],
        ["limit", "Maximum request rate configured for the limiter."],
        ["window", "Time period used to calculate the configured request rate."]
      ]
    },

    advantages: [
      "Provides precise rate control.",
      "Requires relatively little state.",
      "Suitable for high-throughput systems.",
      "Can support controlled burst tolerance.",
      "Does not require storing individual request timestamps."
    ],

    limitations: [
      "More difficult to understand than simpler algorithms.",
      "Requires careful configuration of rate and burst behavior.",
      "The underlying timing model can make debugging less intuitive."
    ]
  }
];