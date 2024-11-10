import { cn } from "@gembuddy/ui/cn";
import "@gembuddy/ui/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Gembuddy",
  description: "You Lead. Buddy’s Got Your Back.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers headers={await headers()}>{children}</Providers>;
}
