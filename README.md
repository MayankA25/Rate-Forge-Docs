# Rate Forge Documentation

Official documentation website for **Rate Forge**, a flexible and extensible rate limiting library for Node.js applications.

The documentation provides everything required to understand, configure, integrate, and use Rate Forge in production applications.

---

## About Rate Forge

Rate Forge is a configurable rate limiting library designed to provide multiple rate limiting algorithms and storage backends through a consistent API.

It separates the **rate limiting algorithm** from the **storage layer**, allowing developers to choose the combination that best fits their application's requirements.

### Supported Algorithms

- Fixed Window
- Sliding Window Log
- Sliding Window Counter
- Token Bucket
- Leaky Bucket
- GCRA

### Supported Stores

- Memory Store
- Redis Store
- MongoDB Store
- PostgreSQL Store

---

## Documentation

The documentation is organized into the following sections:

### Getting Started

- Introduction
- Installation
- Quick Start
- Core Concepts

### Algorithms

Detailed documentation for each supported rate limiting algorithm:

- Fixed Window
- Sliding Window Log
- Sliding Window Counter
- Token Bucket
- Leaky Bucket
- GCRA

Each algorithm includes:

- Overview
- How it works
- Request processing flow
- Configuration
- Configuration options
- Advantages
- Limitations

### Stores

Documentation for the available storage backends:

- Memory Store
- Redis Store
- MongoDB Store
- PostgreSQL Store

Each store explains its configuration, usage, and appropriate deployment scenarios.

### Configuration

Learn how to configure Rate Forge according to your application's requirements.

- Options
- Unique Identifier
- Headers
- Custom Responses

### Guides

Practical guides for common rate limiting scenarios:

- IP-Based Limiting
- User-Based Limiting
- Route-Specific Limits
- Dynamic Limits
- Distributed Deployments

### API Reference

Detailed reference for the Rate Forge API:

- Rate Limiter
- Algorithms API
- Stores API
- Middleware
- Types

### Examples

Practical examples demonstrating how Rate Forge can be integrated into applications:

- Express
- Redis
- MongoDB
- PostgreSQL
- Multiple Limiters

### Advanced

Advanced concepts for production applications:

- Choosing an Algorithm
- Choosing a Store
- How Rate Forge Works
- Performance
- Concurrency & Locking
- FAQ

---

## Tech Stack

The documentation website is built using:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Shiki** — syntax highlighting
- **Mermaid** — flowcharts and diagrams

---

## Features

### Interactive Documentation

Documentation is organized into structured sections with reusable components for consistent presentation.

### Syntax Highlighting

Code examples are highlighted using Shiki with support for multiple programming languages.

### Package Manager Tabs

Installation and configuration examples can be presented for different package managers such as:

- npm
- yarn
- pnpm
- bun

### Mermaid Diagrams

Complex concepts such as request processing, algorithms, and concurrency can be represented using Mermaid flowcharts.

### Reusable Documentation Components

The documentation is built around reusable components for:

- Code blocks
- Tables
- Lists
- Flowcharts
- API references
- FAQ accordions
- Documentation sections

This keeps the documentation consistent while making new pages easier to maintain.

---

## Project Structure

```text
.
├── app/
│   ├── docs/
│   └── ...
│
├── components/
│   ├── CodeBlock/
│   ├── DocContent/
│   ├── Mermaid/
│   ├── Table/
│   ├── FAQAccordion/
│   └── ...
│
├── data/
│   ├── algorithms/
│   ├── stores/
│   ├── guides/
│   ├── api/
│   ├── examples/
│   └── advanced/
│
├── lib/
│   └── shiki.ts
│
├── public/
│   └── ...
│
├── package.json
└── README.md
```
