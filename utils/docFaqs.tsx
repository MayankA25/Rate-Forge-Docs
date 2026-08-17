export const faqs = [
  {
    question: "Which algorithm should I use?",
    answer:
      "Start with Fixed Window when you need simple and predictable request limiting. Consider Token Bucket when controlled bursts are important, Sliding Window algorithms when rolling-window behavior matters, or GCRA when precise and efficient rate control is required.",
  },

  {
    question: "Which store should I use?",
    answer:
      "Use Memory Store for single-process applications and Redis Store when rate limiting state must be shared across multiple application instances. MongoDB and PostgreSQL are useful when those databases are already central to your infrastructure.",
  },

  {
    question: "Can I use Rate Forge with Express?",
    answer:
      "Yes. Create a limiter and call isRequestAllowed() inside your Express middleware before allowing the request to continue.",
  },

  {
    question: "Does Rate Forge require Express?",
    answer:
      "No. The core rate limiting logic is independent of Express and can be integrated into your own middleware or request-processing architecture.",
  },

  {
    question: "Can I use multiple rate limiters?",
    answer:
      "Yes. You can create independent limiters for authentication, APIs, expensive operations, or other resources.",
  },

  {
    question: "What should I use as the unique identifier?",
    answer:
      "Use an identifier representing the entity whose traffic you want to limit, such as a user ID, IP address, API key, or client ID.",
  },

  {
    question: "Can I use Rate Forge in a distributed application?",
    answer:
      "Yes. Use a shared storage backend such as Redis when multiple application instances need to enforce the same rate limit.",
  },

  {
    question: "What happens when a request is blocked?",
    answer:
      "isRequestAllowed() returns a result indicating that the request is not allowed. Your middleware can use that result to return a 429 Too Many Requests response.",
  },

  {
    question: "Can I create my own middleware?",
    answer:
      "Yes. Rate Forge does not require a specific middleware implementation. You can build your own middleware around isRequestAllowed().",
  },

  {
    question: "Can I switch stores without changing the algorithm?",
    answer:
      "Yes. The algorithm and storage layers are separated, allowing a compatible storage implementation to be changed independently.",
  },

  {
    question: "Can I switch algorithms?",
    answer:
      "Yes. You can select another supported algorithm and provide the configuration required by that algorithm.",
  },

  {
    question: "Should I use Redis for a small application?",
    answer:
      "Not necessarily. Redis introduces another infrastructure dependency. For a single-process application, Memory Store may be the more appropriate choice.",
  },
];
