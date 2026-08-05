import React from "react";

export default function DocIntroduction() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex items-center">
          <h1 className="cursor-default text-3xl font-extrabold text-neutral-200">
            <span className="text-neutral-400 transition-all duration-200 hover:text-neutral-200">
              #
            </span>{" "}
            <span>Overview</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center px-8">
            <p className="font-bold text-xl">Production-ready rate limiting for modern Node.js applications.</p>
        </div>
      </div>
    </div>
  );
}
