"use client";

import { ModalProvider } from "@/components/modal/provider";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "@/components/ui/sonner";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ModalProvider>
        {children}
        <Toaster closeButton />
      </ModalProvider>
    </NextThemesProvider>
  );
}
