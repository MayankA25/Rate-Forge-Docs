import React from "react";
import Introduction from "../Introduction/Introduction";
import IntroCode from "../IntroCode/IntroCode";
import Algorithms from "../Algorithms/Algorithms";
import Stores from "../Stores/Stores";
import Features from "../Features/Features";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <Introduction />
      <IntroCode />
      <Features />
      <Algorithms />
      <Stores />
    </div>
  );
}
