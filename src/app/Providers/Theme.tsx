"use client";

import Header from "@/components/Header/Header";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {/* <Header/> */}
      {children}
    </ThemeProvider>
  );
}
