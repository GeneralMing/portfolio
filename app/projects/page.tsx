"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import StarfieldAnimation from "@/components/starfield-animation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
import { useConfig } from "@/hooks/use-config"

export default function ProjectsPage() {
  const { projects } = useConfig()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const allCategories = Array.from(new Set(projects.flatMap((project) => project.categories))).sort()

  const filteredProjects = activeCategory
    ? projects.filter((project) => project.categories.includes(activeCategory))
    : projects

  return (
    <main className="relative min-h-screen bg-background">
      <StarfieldAnimation />
      <Navbar />

      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-primary">Projects</span> & Works
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore my portfolio of projects spanning web development, cloud infrastructure, and data engineering.
            </p>
          </motion.div>

          <div className="flex justify-center flex-wrap gap-2 mb-12">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => setActiveCategory(null)}
              className="text-sm"
            >
              All Projects
            </Button>

            {allCategories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full bg-background/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors overflow-hidden group">
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 transition-colors rounded-lg pointer-events-none"></div>

                    {project.image && (
                      <div className="h-48 w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-5 list-disc">
                        {project.highlights.slice(0, 3).map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="flex justify-between gap-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                          </a>
                        </Button>
                      )}

                      {project.liveUrl && (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No projects found in this category</h3>
              <p className="text-muted-foreground mb-4">Try selecting a different category</p>
              <Button onClick={() => setActiveCategory(null)}>View All Projects</Button>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Want to see more of my work or collaborate on a project?</p>
            <Button asChild>
              <a href="/contact">
                Get in touch <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
