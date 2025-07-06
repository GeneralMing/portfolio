"use client"

import { useEffect, useState } from "react"
import StarfieldAnimation from "@/components/starfield-animation"
import LoadingScreen from "@/components/loading-screen"
import ErrorFallback from "@/components/error-fallback"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Simulate loading delay - this would be real data fetching in production
    const timeout = setTimeout(() => {
      // 10% chance of showing the error state for demo purposes
      if (Math.random() < 0.1) {
        setError(true)
      } else {
        setLoading(false)
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  if (error) {
    return <ErrorFallback onRetry={() => window.location.reload()} />
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <StarfieldAnimation />

      <AnimatePresence>
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Navbar />
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
