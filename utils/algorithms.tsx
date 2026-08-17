export const algorithms = [
  {
    id: "fixed-window",
    title: "Fixed Window",
    shortDescription:
      "Simple and efficient request limiting within a fixed time interval.",
    description:
      "The Fixed Window algorithm divides time into fixed intervals and allows a predefined number of requests during each interval. Once the limit is reached, all subsequent requests are rejected until the next window begins. It's fast, lightweight, and ideal for applications where occasional traffic spikes at window boundaries are acceptable.",
    bestFor: [
      "REST APIs",
      "Internal services",
      "Simple rate limiting",
      "Low-overhead applications",
    ],
    advantages: [
      "Very easy to understand",
      "Minimal memory usage",
      "High performance",
      "Simple implementation",
    ],
    disadvantages: [
      "Can allow burst traffic at window boundaries",
      "Less accurate than sliding window algorithms",
    ],
    complexity: "O(1)",
    storage: "Counter + Window Expiry",
    icon: "Clock",
  },
  {
    id: "sliding-window-log",
    title: "Sliding Window Log",
    shortDescription:
      "Provides precise rate limiting by tracking every request timestamp.",
    description:
      "Sliding Window Log stores the timestamp of every request and removes entries that fall outside the configured window. Since each request is evaluated against actual request history, it provides highly accurate rate limiting at the cost of additional memory usage.",
    bestFor: [
      "Authentication endpoints",
      "Sensitive APIs",
      "Public APIs",
      "Precise traffic control",
    ],
    advantages: [
      "Highly accurate",
      "No burst issue at window boundaries",
      "Fair request distribution",
    ],
    disadvantages: [
      "Higher memory consumption",
      "Performance decreases with very high request volume",
    ],
    complexity: "O(n)",
    storage: "Request Timestamps",
    icon: "History",
  },
  {
    id: "sliding-window-counter",
    title: "Sliding Window Counter",
    shortDescription:
      "Balances accuracy and performance using weighted request counting.",
    description:
      "Sliding Window Counter combines the current and previous fixed windows using weighted calculations to approximate a true sliding window. It delivers near-accurate rate limiting while consuming significantly less memory than Sliding Window Log.",
    bestFor: [
      "Production APIs",
      "Microservices",
      "General-purpose rate limiting",
    ],
    advantages: [
      "Memory efficient",
      "More accurate than Fixed Window",
      "High performance",
    ],
    disadvantages: ["Slightly less accurate than Sliding Window Log"],
    complexity: "O(1)",
    storage: "Current & Previous Window Counters",
    icon: "BarChart3",
  },
  {
    id: "token-bucket",
    title: "Token Bucket",
    shortDescription:
      "Allows controlled bursts while maintaining a steady request rate.",
    description:
      "Token Bucket continuously refills tokens at a configured rate. Each incoming request consumes one token. Requests are accepted while tokens are available and rejected once the bucket is empty until more tokens are replenished.",
    bestFor: [
      "Public APIs",
      "File uploads",
      "Webhook endpoints",
      "Burst traffic handling",
    ],
    advantages: [
      "Supports burst traffic",
      "Smooth request flow",
      "Highly scalable",
    ],
    disadvantages: ["Requires token refill calculations"],
    complexity: "O(1)",
    storage: "Token Count + Last Refill Time",
    icon: "Droplets",
  },
  {
    id: "leaky-bucket",
    title: "Leaky Bucket",
    shortDescription:
      "Processes requests at a constant rate for smooth traffic flow.",
    description:
      "Leaky Bucket treats incoming requests as water entering a bucket with a small leak. Requests enter the bucket quickly but leave at a constant rate, smoothing sudden traffic spikes and preventing downstream overload.",
    bestFor: [
      "Queue systems",
      "Background jobs",
      "Traffic shaping",
      "Load balancing",
    ],
    advantages: [
      "Produces stable traffic",
      "Prevents sudden spikes",
      "Predictable throughput",
    ],
    disadvantages: [
      "Doesn't allow burst traffic",
      "May increase request latency",
    ],
    complexity: "O(1)",
    storage: "Bucket Level + Last Update Time",
    icon: "Bucket",
  },
  {
    id: "gcra",
    title: "GCRA",
    shortDescription:
      "Production-grade algorithm used by telecom systems and modern API gateways.",
    description:
      "The Generic Cell Rate Algorithm (GCRA) tracks the theoretical arrival time of requests instead of storing counters or timestamps. It provides extremely accurate rate limiting while remaining memory efficient, making it a popular choice for high-performance distributed systems.",
    bestFor: [
      "API gateways",
      "Cloud services",
      "Distributed systems",
      "Enterprise applications",
    ],
    advantages: [
      "Extremely accurate",
      "Memory efficient",
      "Supports burst tolerance",
      "Excellent for distributed environments",
    ],
    disadvantages: [
      "More complex to understand",
      "Requires careful configuration",
    ],
    complexity: "O(1)",
    storage: "Theoretical Arrival Time (TAT)",
    icon: "Cpu",
  },
];
