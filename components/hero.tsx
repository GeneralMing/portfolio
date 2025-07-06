"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Github, Linkedin, ExternalLink } from "lucide-react"
import { useConfig } from "@/hooks/use-config"
import { useMobile } from "@/hooks/use-mobile"

const Hero = () => {
  const { socialLinks } = useConfig()
  const [typedText, setTypedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const fullText = "WELCOME TO MY HOME"
  const isMobile = useMobile()

  useEffect(() => {
    // Typewriter effect
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1))
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [typedText, fullText])

  useEffect(() => {
    // Blinking cursor effect
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen pt-24 relative flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm font-mono text-primary px-2 py-1 rounded border border-primary inline-block">
                  SAY HELLO TO...
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="block">Advaith Krishna</span>
                <span className="text-primary">Vasisht</span>
              </h1>

              <h2 className="text-xl md:text-2xl text-muted-foreground font-mono mt-2 h-8">
                {typedText}
                <span
                  className={`inline-block w-2 h-5 bg-primary ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                ></span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg">
              Information Systems student and former Software Engineer with expertise in cloud technologies, big data,
              and DevOps. Passionate about building scalable solutions and exploring new technologies.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size={isMobile ? "sm" : "default"}>
                <Link href="/projects">
                  Explore Projects <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" asChild size={isMobile ? "sm" : "default"}>
                <Link href="/about">Learn More</Link>
              </Button>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <a
                  href="https://github.com/generalming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/advaith-k-v-aa291216a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.generalming.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Website"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 border-2 border-primary rounded-md grid-background"></div>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary rounded-md"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent rounded-md"></div>

              <div className="relative w-full h-full flex items-center justify-center p-6">
                <div className="terminal w-full h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">terminal</div>
                  </div>

                  <div className="flex-1 text-sm overflow-hidden font-mono">
                    <div className="text-muted-foreground">$ whoami</div>
                    <div className="text-primary mb-2">advaith</div>

                    <div className="text-muted-foreground">$ cat skills.txt</div>
                    <div className="text-accent mb-2">
                      <span className="inline-block mr-2 mb-1 px-1 py-0.5 text-xs rounded bg-accent/10">
                        JavaScript
                      </span>
                      <span className="inline-block mr-2 mb-1 px-1 py-0.5 text-xs rounded bg-accent/10">Python</span>
                      <span className="inline-block mr-2 mb-1 px-1 py-0.5 text-xs rounded bg-accent/10">Java</span>
                      <span className="inline-block mr-2 mb-1 px-1 py-0.5 text-xs rounded bg-accent/10">C++</span>
                      <span className="inline-block mr-2 mb-1 px-1 py-0.5 text-xs rounded bg-accent/10">Docker</span>
                      <span className="inline-block mr-2 mb-1 px-1 py-0.5 text-xs rounded bg-accent/10">AWS</span>
                      <span className="inline-block mr-2 mb-1 px-1 py-0.5 text-xs rounded bg-accent/10">GCP</span>
                      <span className="inline-block mr-2 mb-1 px-1 py-0.5 text-xs rounded bg-accent/10">Azure</span>
                    </div>

                    <div className="text-muted-foreground">$ ls projects/</div>
                    <div className="text-secondary mb-2">Rideshare.py TrafficMonitor.py WebApp.js</div>

                    <div className="text-muted-foreground">$ location</div>
                    <div className="text-primary mb-2">Boston, Massachusetts</div>

                    <div className="text-muted-foreground">$ status</div>
                    <div className="text-accent shimmer">Ready for new adventures</div>
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground flex">
                    <span className="mr-2">$</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
