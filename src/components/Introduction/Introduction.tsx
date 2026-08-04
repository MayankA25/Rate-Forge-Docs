import React from "react";
import Button from "../ui/Button";
import { ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Introduction() {
  return (
    <div className="flex w-full flex-col py-15">
      <div className="m-auto flex flex-col justify-center gap-8">
        <div className="flex items-center justify-center">
          <h1 className="text-7xl font-extrabold">Rate Forge</h1>
        </div>
        <div className="flex items-center">
          <p className="text-center text-lg">
            Rate Forge is a production-ready, TypeScript-first rate limiting
            library for Node.js, designed to help you protect your APIs with
            confidence. Whether you&apos;re building a small application or a
            high-traffic distributed system, Rate Forge provides multiple
            industry-standard rate limiting algorithms, pluggable storage
            backends, and seamless integration with your favorite Node.js
            frameworks. From quick setup to advanced customization, everything
            is built with performance, flexibility, and developer experience in
            mind.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button>
            <span className="flex items-center gap-2">
              <span>How to use?</span>
              <i>
                <ChevronRight />
              </i>
            </span>
          </Button>
          <Button
            className="bg-neutral-800 text-neutral-200"
            hoverClass="hover:bg-neutral-900"
          >
            <span className="flex items-center gap-2.5">
              <i>
                <FaGithub className="size-5" />
              </i>
              <span>GitHub</span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
