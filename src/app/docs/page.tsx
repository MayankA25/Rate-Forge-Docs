"use client";
import { redirect } from "next/navigation";
import React from "react";

export default function Doc() {
  redirect("/docs/introduction");

  return (
    <div>
      <h1>Go To Introduction Tab</h1>
    </div>
  );
}
