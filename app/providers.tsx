"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { ConfigProvider } from "@/hooks/use-config"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ConfigProvider>{children}</ConfigProvider>
    </ThemeProvider>
  )
}
