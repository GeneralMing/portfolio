"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/navbar"
import StarfieldAnimation from "@/components/starfield-animation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { FileText, Cpu, Database, Cloud, Shield, Code } from "lucide-react"
import { useConfig } from "@/hooks/use-config"

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const yPos = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const [activeSection, setActiveSection] = useState("summary")
  const { resume } = useConfig()

  const sections = [
    { id: "summary", label: "Summary" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ]

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => {
        return {
          id: section.id,
          element: document.getElementById(section.id),
        }
      })

      for (const section of sectionElements) {
        if (!section.element) continue

        const rect = section.element.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <main className="relative min-h-screen bg-background">
      <StarfieldAnimation />
      <Navbar />

      <motion.section style={{ opacity, y: yPos }} className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-primary">About</span> Me
            </h1>
            <p className="text-lg text-muted-foreground">
              Software Engineer specializing in cloud technologies, big data, and DevOps.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="relative pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:sticky lg:top-24 lg:self-start h-fit">
              <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full border-2 border-primary grid place-items-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <span className="text-2xl font-bold text-center">AKV</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-center mb-4">Advaith Krishna Vasisht</h2>

                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>Boston, MA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <a href="mailto:vasisht.a@northeastern.edu" className="text-primary hover:underline">
                        vasisht.a@northeastern.edu
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>(857)-313-4365</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "outline"}
                        onClick={() => handleSectionClick(section.id)}
                        className="w-full justify-start"
                      >
                        {section.label}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-muted">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/documents/resume.pdf" target="_blank">
                        <FileText className="mr-2 h-4 w-4" /> Download Resume
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <section id="summary" className="terminal">
                <div className="scan-line"></div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-primary mr-2 opacity-75">&gt;</span> Summary
                </h2>
                <div className="space-y-4">
                  <p>
                    Information Systems student at Northeastern University and former Software Engineer at Intel
                    Corporation with expertise in cloud technologies, big data, and DevOps. Passionate about building
                    scalable solutions and exploring new technologies.
                  </p>
                  <p>
                    Skilled in Java, Python, C++, JavaScript, and various cloud platforms including AWS, GCP, and Azure.
                    Experience in designing and implementing high-performance data processing systems and ETL pipelines.
                  </p>
                </div>
              </section>

              <section id="education" className="terminal">
                <div className="scan-line"></div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-primary mr-2 opacity-75">&gt;</span> Education
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-accent">Northeastern University</h3>
                      <span className="text-muted-foreground">May 2025</span>
                    </div>
                    <p className="text-sm">Master of Science in Information Systems</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Courses: Cloud Computing, Data Science Engineering Methods, Web Design, Advanced Data Structures
                      and Algorithms
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-secondary">PES University</h3>
                      <span className="text-muted-foreground">May 2021</span>
                    </div>
                    <p className="text-sm">Bachelor of Technology in Computer Science Engineering</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Courses: Big Data Analytics, Cloud Computing, Data Science and Machine Learning, Web Development,
                      Cybersecurity
                    </p>
                  </div>
                </div>
              </section>

              <section id="experience" className="terminal">
                <div className="scan-line"></div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-primary mr-2 opacity-75">&gt;</span> Experience
                </h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-accent">Intel Corporation</h3>
                      <span className="text-muted-foreground">Jan 2021 - Aug 2023</span>
                    </div>
                    <p className="text-sm mb-2">Software Development Engineer</p>
                    <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                      <li>
                        Designed a high-performance scheduler for an ETL pipeline using Hadoop and Hive, improving data
                        processing efficiency by 30%
                      </li>
                      <li>
                        Developed scalable data extractors leveraging Spark MapReduce and Python, reducing ingestion
                        time by 50% for high-volume datasets
                      </li>
                      <li>
                        Created advanced data cleaning algorithms with Hive and Spark ML, enhancing data quality and
                        reducing processing time significantly
                      </li>
                      <li>
                        Built transformation scripts using machine learning algorithms and Spark ML to generate
                        actionable insights for client decision-making
                      </li>
                      <li>
                        Deployed interactive dashboards using Grafana, Metabase, and Streamlit, boosting real-time
                        operational efficiency
                      </li>
                      <li>
                        Implemented robust failsafe mechanisms with Zookeeper for disaster recovery, achieving 99.9%
                        system uptime
                      </li>
                      <li>Streamlined deployment processes with CI/CD pipelines and automated testing protocols</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-secondary">Tapchief</h3>
                      <span className="text-muted-foreground">Jun 2018 - Aug 2018</span>
                    </div>
                    <p className="text-sm mb-2">Software Intern</p>
                    <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                      <li>
                        Implemented and configured Nginx as a reverse proxy, achieving an increase in site loading speed
                        and bolstering security through SSL certificate integration
                      </li>
                      <li>
                        Executed the migration of legacy blog databases onto a new internal platform, preserving data
                        integrity and enhancing content management efficiency
                      </li>
                      <li>
                        Rebranded and optimized the blog under a new subdomain, driving a 30% increase in organic
                        traffic and elevating SEO rankings
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="skills" className="terminal">
                <div className="scan-line"></div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-primary mr-2 opacity-75">&gt;</span> Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <Code className="w-4 h-4 mr-2 text-accent" />
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Java", "Python", "C++", "JavaScript", "HTML", "CSS"].map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md text-xs bg-accent/10 text-accent">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <Database className="w-4 h-4 mr-2 text-secondary" />
                      Databases
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["PostgreSQL", "MongoDB", "Redis", "Hive"].map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md text-xs bg-secondary/10 text-secondary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <Cloud className="w-4 h-4 mr-2 text-primary" />
                      Cloud Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["AWS", "Google Cloud Platform", "Microsoft Azure", "Docker", "Kubernetes", "Terraform"].map(
                        (skill) => (
                          <span key={skill} className="px-2 py-1 rounded-md text-xs bg-primary/10 text-primary">
                            {skill}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <Cpu className="w-4 h-4 mr-2 text-accent" />
                      Big Data
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Apache Hadoop", "Spark", "Hive", "Airflow", "Beam"].map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md text-xs bg-accent/10 text-accent">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <Shield className="w-4 h-4 mr-2 text-secondary" />
                      DevOps
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["CI/CD Pipelines", "GitHub Actions", "Jenkins", "Terraform"].map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md text-xs bg-secondary/10 text-secondary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section id="projects" className="terminal">
                <div className="scan-line"></div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-primary mr-2 opacity-75">&gt;</span> Projects
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">Rideshare</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      A cab-sharing application utilizing microservices architecture with Python, Flask, Docker, and
                      AWS.
                    </p>
                    <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                      <li>Engineered microservices architecture, improving scalability and reliability</li>
                      <li>
                        Designed and deployed REST APIs for user account management, enabling seamless CRUD operations
                      </li>
                      <li>Implemented RabbitMQ for messaging queues and Zookeeper for performance monitoring</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary mb-2">Traffic Monitoring System</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      A real-time traffic management solution that coordinates traffic lights based on vehicular
                      density.
                    </p>
                    <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                      <li>Reduced congestion by up to 30% at key junctions</li>
                      <li>Utilized image recognition to estimate vehicle density and detect violations</li>
                      <li>Implemented the YOLOv3 algorithm to achieve 95% accuracy in vehicle detection</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">WebApp</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      A web application with user database, CRUD operations, and email-based authentication.
                    </p>
                    <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                      <li>Deployed on Google Cloud Platform with CloudSQL for database operations</li>
                      <li>Implemented GitHub Actions for CI/CD and integrated Pub/Sub for messaging</li>
                      <li>Configured load balancing, VPC subnetworks, and firewalls to enhance security</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
