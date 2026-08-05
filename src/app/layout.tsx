import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Theme from "./Providers/Theme";
import { Toaster } from "react-hot-toast";
import MainComponent from "@/components/MainComponent/MainComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rate Forge Docs | Production-Ready Rate Limiter for Node.js",
  description:
    "Official documentation for Rate Forge, a production-ready TypeScript rate limiting library for Node.js. Learn how to use multiple rate limiting algorithms, pluggable storage backends, and framework integrations.",
  applicationName: "Rate Forge",
  keywords: [
    "rate limiter",
    "Node.js",
    "TypeScript",
    "Express",
    "Fastify",
    "Next.js",
    "Redis",
    "PostgreSQL",
    "MongoDB",
    "API security",
    "Rate Forge",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#e5e5e5",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#171717",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col">
        <Theme>
          {children}
          <Toaster />
        </Theme>
      </body>
    </html>
  );
}
