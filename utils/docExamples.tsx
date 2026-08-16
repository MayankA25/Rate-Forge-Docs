export const examples = [
  {
    title: "Express",

    data: [
      {
        titleName: "Overview",

        contentBeforeCodes: [
          "Rate Forge can be integrated into an Express application by creating a rate limiter and evaluating requests before they reach a protected route.",
          "The application provides a unique identifier to isRequestAllowed(). This identifier can be a user ID, IP address, API key, or any other value that uniquely represents the client being rate limited."
        ]
      },

      {
        titleName: "Create the Rate Limiter",

        contentBeforeCodes: [
          "Create a rate limiter using the algorithm and store appropriate for your application."
        ],

        codes: [
          {
            language: "ts",
            text: `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`
          }
        ],

        contentAfterCodes: [
          "This configuration allows each identifier to make up to 100 requests within a 60-second window."
        ]
      },

      {
        titleName: "Create the Middleware",

        contentBeforeCodes: [
          "Use the rate limiter inside an Express middleware to evaluate requests before passing them to the next middleware or route handler."
        ],

        codes: [
          {
            language: "ts",
            text: `const rateLimitMiddleware = async (req, res, next) => {
  const result = await limiter.isRequestAllowed(
    req.userId
  );

  if (!result.allowed) {
    return res.status(429).json({
      message: "Too many requests",
      retryAfter: result.retryAfter,
    });
  }

  next();
};`
          }
        ],

        contentAfterCodes: [
          "The middleware evaluates the request before allowing it to continue through the Express request pipeline."
        ]
      },

      {
        titleName: "Protect a Route",

        contentBeforeCodes: [
          "Apply the middleware to any route that should be protected."
        ],

        codes: [
          {
            language: "ts",
            text: `app.get(
  "/api/profile",
  rateLimitMiddleware,
  (req, res) => {
    res.json({
      message: "Profile data",
    });
  }
);`
          }
        ],

        contentAfterCodes: [
          "If the request is within the configured limit, next() is called and the request continues normally.",
          "If the limit has been exceeded, the middleware returns a 429 Too Many Requests response."
        ]
      },

      {
        titleName: "Choosing an Identifier",

        contentBeforeCodes: [
          "The identifier determines which requests share the same rate limit."
        ],

        table: {
          tableHeaders: [
            "Use Case",
            "Identifier"
          ],

          tableBody: [
            ["Authenticated users", "User ID"],
            ["Public API", "IP Address"],
            ["API consumers", "API Key"],
            ["Application clients", "Client ID"],
            ["Custom requirements", "Application-specific identifier"]
          ]
        }
      }
    ]
  },

  {
    title: "Redis",

    data: [
      {
        titleName: "Overview",

        contentBeforeCodes: [
          "Redis can be used as the storage backend when rate limiting state needs to be shared between multiple application instances.",
          "This makes Redis particularly useful for horizontally scaled and distributed applications where an in-memory store would maintain separate rate limits for each instance."
        ]
      },

      {
        titleName: "Create the Redis Store",

        contentBeforeCodes: [
          "Create a Redis connection and provide it to the Rate Forge Redis store."
        ],

        codes: [
          {
            language: "ts",
            text: `const redis = new Redis(
  process.env.REDIS_URL
);

const store = new RedisStore(redis);`
          }
        ]
      },

      {
        titleName: "Configure the Rate Limiter",

        contentBeforeCodes: [
          "Use the Redis store with any supported rate limiting algorithm."
        ],

        codes: [
          {
            language: "ts",
            text: `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`
          }
        ],

        contentAfterCodes: [
          "The algorithm remains independent from Redis. Changing the storage backend does not require changing the rate limiting strategy."
        ]
      },

      {
        titleName: "Evaluate Requests",

        contentBeforeCodes: [
          "Pass the unique identifier to isRequestAllowed(). The rate limiting state is maintained in Redis."
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

next();`
          }
        ],

        contentAfterCodes: [
          "Because the state is stored in Redis, different application instances can evaluate requests against the same rate limiting state."
        ]
      },

      {
        titleName: "When to Use Redis",

        list: {
          intro: [
            "Redis is a strong choice when:"
          ],

          content: [
            "Your application is horizontally scaled.",
            "Multiple server instances need to share rate limits.",
            "You need a centralized rate limiting store.",
            "Rate limiting state should not depend on application memory."
          ]
        }
      }
    ]
  },

  {
    title: "MongoDB",

    data: [
      {
        titleName: "Overview",

        contentBeforeCodes: [
          "Rate Forge can use MongoDB as a storage backend when MongoDB is already part of your application's infrastructure.",
          "The MongoDB store maintains rate limiting state while keeping the rate limiting algorithm independent from the underlying database."
        ]
      },

      {
        titleName: "Configure the Store",

        contentBeforeCodes: [
          "Initialize the MongoDB store using the configuration required by your application."
        ],

        codes: [
          {
            language: "ts",
            text: `const store = new MongoDBStore({
  // MongoDB configuration
});`
          }
        ],

        contentAfterCodes: [
          "Use the actual configuration supported by the MongoDB store in your installed Rate Forge version."
        ]
      },

      {
        titleName: "Configure the Rate Limiter",

        contentBeforeCodes: [
          "Pass the MongoDB store to the desired rate limiting algorithm."
        ],

        codes: [
          {
            language: "ts",
            text: `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`
          }
        ]
      },

      {
        titleName: "Evaluate Requests",

        contentBeforeCodes: [
          "Pass the unique identifier to the limiter when evaluating a request."
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

next();`
          }
        ],

        contentAfterCodes: [
          "The algorithm interacts with MongoDB through the store abstraction rather than directly accessing the database."
        ]
      },

      {
        titleName: "When to Use MongoDB",

        list: {
          intro: [
            "MongoDB can be a convenient choice when:"
          ],

          content: [
            "Your application already uses MongoDB.",
            "You want to keep rate limiting state within your existing infrastructure.",
            "You prefer a database-backed store over application memory."
          ]
        }
      }
    ]
  },

  {
    title: "PostgreSQL",

    data: [
      {
        titleName: "Overview",

        contentBeforeCodes: [
          "Rate Forge can use PostgreSQL as a storage backend for applications that already rely on PostgreSQL.",
          "The PostgreSQL store maintains rate limiting state while allowing the selected algorithm to remain independent from the storage implementation."
        ]
      },

      {
        titleName: "Configure the Store",

        contentBeforeCodes: [
          "Initialize the PostgreSQL store using the configuration required by your application."
        ],

        codes: [
          {
            language: "ts",
            text: `const store = new PostgreSQLStore({
  // PostgreSQL configuration
});`
          }
        ],

        contentAfterCodes: [
          "Use the actual configuration supported by the PostgreSQL store in your installed Rate Forge version."
        ]
      },

      {
        titleName: "Configure the Rate Limiter",

        contentBeforeCodes: [
          "Pass the PostgreSQL store to the desired rate limiting algorithm."
        ],

        codes: [
          {
            language: "ts",
            text: `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`
          }
        ]
      },

      {
        titleName: "Evaluate Requests",

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

next();`
          }
        ],

        contentAfterCodes: [
          "The algorithm interacts with PostgreSQL through the store abstraction rather than directly accessing the database."
        ]
      },

      {
        titleName: "When to Use PostgreSQL",

        list: {
          intro: [
            "PostgreSQL is useful when:"
          ],

          content: [
            "PostgreSQL is already part of your application infrastructure.",
            "You want database-backed rate limiting.",
            "You want to avoid introducing another dedicated storage service."
          ]
        }
      }
    ]
  },

  {
    title: "Multiple Limiters",

    data: [
      {
        titleName: "Overview",

        contentBeforeCodes: [
          "A real application rarely needs the same rate limiting policy for every endpoint.",
          "Authentication endpoints, public APIs, expensive operations, and general application routes can have different traffic patterns and security requirements.",
          "Rate Forge allows you to create multiple independent limiters and apply them wherever they are needed."
        ]
      },

      {
        titleName: "Create Multiple Limiters",

        contentBeforeCodes: [
          "Create independent limiters for different types of application traffic."
        ],

        codes: [
          {
            language: "ts",
            text: `const loginLimiter = new FixedWindow({
  store,
  limit: 5,
  window: 60_000,
});

const apiLimiter = new TokenBucket({
  store,
  capacity: 100,
  refillRate: 10,
});`
          }
        ]
      },

      {
        titleName: "Protect Authentication Routes",

        contentBeforeCodes: [
          "Authentication endpoints can use a strict rate limit to reduce brute-force attempts."
        ],

        codes: [
          {
            language: "ts",
            text: `const result = await loginLimiter.isRequestAllowed(
  req.ip
);

if (!result.allowed) {
  return res.status(429).json({
    message: "Too many login attempts",
    retryAfter: result.retryAfter,
  });
}

next();`
          }
        ],

        contentAfterCodes: [
          "Using the IP address as the identifier allows authentication attempts from the same client to share the rate limit."
        ]
      },

      {
        titleName: "Protect API Routes",

        contentBeforeCodes: [
          "General API routes can use a separate limiter with a higher request allowance."
        ],

        codes: [
          {
            language: "ts",
            text: `const result = await apiLimiter.isRequestAllowed(
  req.userId
);

if (!result.allowed) {
  return res.status(429).json({
    message: "API rate limit exceeded",
    retryAfter: result.retryAfter,
  });
}

next();`
          }
        ],

        contentAfterCodes: [
          "Using the user ID as the identifier gives each authenticated user an independent API rate limit."
        ]
      },

      {
        titleName: "Different Limiting Policies",

        contentBeforeCodes: [
          "Different resources can use different algorithms, identifiers, and limits depending on their requirements."
        ],

        table: {
          tableHeaders: [
            "Resource",
            "Algorithm",
            "Identifier",
            "Example Limit"
          ],

          tableBody: [
            [
              "Authentication",
              "Fixed Window",
              "IP Address",
              "5 requests/minute"
            ],
            [
              "General API",
              "Token Bucket",
              "User ID",
              "100 requests"
            ],
            [
              "Public API",
              "Sliding Window",
              "IP Address",
              "60 requests/minute"
            ],
            [
              "Expensive Operations",
              "GCRA",
              "User ID",
              "Custom limit"
            ]
          ]
        }
      },

      {
        titleName: "Why Use Multiple Limiters?",

        list: {
          intro: [
            "Multiple limiters allow you to:"
          ],

          content: [
            "Apply stricter limits to sensitive endpoints.",
            "Give normal API traffic higher limits.",
            "Use different algorithms for different workloads.",
            "Use different identifiers for different resources.",
            "Keep rate limiting policies independent from one another."
          ]
        }
      }
    ]
  }
];