"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("SYSTEM BOOT SEQUENCE")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.floor(Math.random() * 5) + 1
      })
    }, 100)

    const statusMessages = [
      "SYSTEM BOOT SEQUENCE",
      "INITIALIZING CORE SYSTEMS",
      "LOADING DATA ARCHIVES",
      "ESTABLISHING NETWORK CONNECTION",
      "VERIFYING SECURITY PROTOCOLS",
      "CALIBRATING VISUAL INTERFACE",
      "LOADING PERSONAL ARCHIVES",
      "RENDERING USER EXPERIENCE",
      "FINALIZING BOOT SEQUENCE",
    ]

    let messageIndex = 0
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % statusMessages.length
      setStatusText(statusMessages[messageIndex])

      if (progress >= 100) {
        clearInterval(messageInterval)
        setStatusText("SYSTEM READY")
      }
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
    }
  }, [progress])

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal max-w-3xl w-full mx-4 px-6 py-8 rounded">
        <div className="scan-line"></div>

        <h1 className="text-2xl md:text-4xl font-bold text-primary mb-4 pixel-font retro-glow">MING OS v3.2</h1>

        <div className="space-y-4">
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <span className="text-muted-foreground">STATUS:</span>
            <span className="text-secondary">{statusText}</span>

            <span className="text-muted-foreground">USER:</span>
            <span className="text-accent">ADVAITH_KRISHNA_VASISHT</span>

            <span className="text-muted-foreground">SYSTEM:</span>
            <span className="text-primary">PORTFOLIO_INTERFACE</span>

            <span className="text-muted-foreground">LOCATION:</span>
            <span className="text-secondary">BOSTON_SECTOR_MA</span>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm">LOADING</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-sm h-2 overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < Math.ceil(progress / 20) ? "bg-accent animate-pulse" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 text-xs md:text-sm font-mono">
            <p className="text-muted-foreground">
              &gt; Loading personal data files...
              <span className={progress > 30 ? "text-green-400" : "text-red-400"}>
                {progress > 30 ? " COMPLETE" : " IN PROGRESS"}
              </span>
            </p>
            <p className="text-muted-foreground">
              &gt; Initializing portfolio interface...
              <span className={progress > 60 ? "text-green-400" : "text-red-400"}>
                {progress > 60 ? " COMPLETE" : " IN PROGRESS"}
              </span>
            </p>
            <p className="text-muted-foreground">
              &gt; Establishing connection to communication channels...
              <span className={progress > 80 ? "text-green-400" : "text-red-400"}>
                {progress > 80 ? " COMPLETE" : " IN PROGRESS"}
              </span>
            </p>
            <p className="text-muted-foreground">
              &gt; Setting up space cowboy UI...
              <span className={progress > 90 ? "text-green-400" : "text-red-400"}>
                {progress > 90 ? " COMPLETE" : " IN PROGRESS"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
