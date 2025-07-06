"use client"

import type React from "react"
import { createContext, useContext, type ReactNode } from "react"
import { Github, Linkedin, ExternalLink } from "lucide-react"

type SocialLink = {
  href: string
  label: string
  icon: React.ReactNode
}

type Project = {
  id: string
  title: string
  description: string
  image?: string
  categories: string[]
  highlights: string[]
  githubUrl?: string
  liveUrl?: string
}

type Config = {
  socialLinks: SocialLink[]
  projects: Project[]
  resume: {
    education: Array<{
      institution: string
      degree: string
      date: string
      courses: string[]
    }>
    experience: Array<{
      company: string
      position: string
      date: string
      responsibilities: string[]
    }>
    skills: Record<string, string[]>
  }
  contactInfo: {
    email: string
    phone: string
    location: string
    social: Record<string, string>
  }
}

const defaultConfig: Config = {
  socialLinks: [
    {
      href: "https://github.com/generalming",
      label: "GitHub",
      icon: <Github className="h-5 w-5" />,
    },
    {
      href: "https://www.linkedin.com/in/advaith-k-v-aa291216a",
      label: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      href: "https://www.generalming.me",
      label: "Website",
      icon: <ExternalLink className="h-5 w-5" />,
    },
  ],
  projects: [
    {
      id: "rideshare",
      title: "Rideshare",
      description: "A cab-sharing application utilizing microservices architecture",
      image: "/placeholder.svg?height=300&width=500",
      categories: ["Microservices", "Python", "Docker"],
      highlights: [
        "Engineered microservices architecture, improving scalability and reliability",
        "Designed and deployed REST APIs for user account management",
        "Implemented RabbitMQ for messaging queues and Zookeeper for monitoring",
      ],
      githubUrl: "https://github.com/generalming/rideshare",
    },
    {
      id: "traffic-monitor",
      title: "Traffic Monitoring System",
      description: "Real-time traffic management solution coordinating traffic lights based on vehicle density",
      image: "/placeholder.svg?height=300&width=500",
      categories: ["Computer Vision", "Python", "AI/ML"],
      highlights: [
        "Reduced congestion by up to 30% at key junctions",
        "Utilized image recognition to estimate vehicle density and detect violations",
        "Implemented YOLOv3 algorithm achieving 95% accuracy in detection",
      ],
      githubUrl: "https://github.com/generalming/traffic-monitor",
    },
    {
      id: "webapp",
      title: "WebApp",
      description: "A web application with user database, CRUD operations, and authentication",
      image: "/placeholder.svg?height=300&width=500",
      categories: ["Web Development", "Cloud", "DevOps"],
      highlights: [
        "Deployed on Google Cloud Platform with CloudSQL for database operations",
        "Implemented GitHub Actions for CI/CD and Pub/Sub for messaging",
        "Configured load balancing, VPC subnetworks, and firewalls for security",
      ],
      githubUrl: "https://github.com/generalming/webapp",
    },
    {
      id: "skillsync",
      title: "Skill Sync",
      description: "SkillSync helps professionals log, visualize, and showcase their skill development journey with interactive timelines, portfolio generation, and resume building tools.",
      image: "/placeholder.svg?height=300&width=500",
      categories: ["React.js", "Next.js", "Node.js", "PostgreSQL", "RESTful API", "OAuth with JWT", "Chart.js", "GCP", "CI/CD", "GitHub Actions", "Docker", "Web Development", "Cloud", "DevOps"],
      highlights: [
        "Full stack personal skill-tracking and portfolio platform using React, Next.js, Node.js, and PostgreSQL, enabling users to log, tag, and visualize professional growth",
        "RESTful APIs and integrated OAuth-based authentication with JWT, supporting secure role-based access and seamless resume/portfolio generation",
        "A modular resume builder with downloadable PDF exports and interactive skill timelines using Chart.js",
        "Implemented GitHub Actions for CI/CD and Pub/Sub for messaging",
        "Configured load balancing, VPC subnetworks, and firewalls for security",
      ],
      githubUrl: "https://github.com/generalming/skillsync",
      liveUrl: "https://skillsync.generalming.me"
    }
  ],
  resume: {
    education: [
      {
        institution: "Northeastern University",
        degree: "Master of Science in Information Systems",
        date: "May 2025",
        courses: [
          "Cloud Computing",
          "Data Science Engineering Methods",
          "Web Design",
          "Advanced Data Structures and Algorithms",
        ],
      },
      {
        institution: "PES University",
        degree: "Bachelor of Technology in Computer Science Engineering",
        date: "May 2021",
        courses: [
          "Big Data Analytics",
          "Cloud Computing",
          "Data Science and Machine Learning",
          "Web Development",
          "Cybersecurity",
        ],
      },
    ],
    experience: [
      {
        company: "Intel Corporation",
        position: "Software Development Engineer",
        date: "January 2021 to August 2023",
        responsibilities: [
          "Designed a high-performance scheduler for an ETL pipeline using Hadoop and Hive, improving data processing efficiency by 30%",
          "Developed scalable data extractors leveraging Spark MapReduce and Python, reducing ingestion time by 50% for high-volume datasets",
          "Created advanced data cleaning algorithms with Hive and Spark ML, enhancing data quality and reducing processing time significantly",
          "Built transformation scripts using machine learning algorithms and Spark ML to generate actionable insights for client decision-making",
          "Deployed interactive dashboards using Grafana, Metabase, and Streamlit, boosting real-time operational efficiency",
          "Implemented robust failsafe mechanisms with Zookeeper for disaster recovery, achieving 99.9% system uptime",
          "Streamlined deployment processes with CI/CD pipelines and automated testing protocols",
        ],
      },
      {
        company: "Tapchief",
        position: "Software Intern",
        date: "June 2018 to August 2018",
        responsibilities: [
          "Implemented and configured Nginx as a reverse proxy, achieving an increase in site loading speed and bolstering security through SSL certificate integration",
          "Executed the migration of legacy blog databases onto a new internal platform, preserving data integrity and enhancing content management efficiency",
          "Rebranded an  preserving data integrity and enhancing content management efficiency",
          "Rebranded and optimized the blog under a new subdomain, driving a 30% increase in organic traffic and elevating SEO rankings",
        ],
      },
    ],
    skills: {
      Languages: ["Java", "Python", "C++", "JavaScript", "HTML", "CSS"],
      "Backend Technologies": ["Docker", "Kubernetes", "PostgreSQL", "Redis"],
      "Cloud Technologies": ["Google Cloud Platform (GCP)", "Microsoft Azure", "Amazon Web Services (AWS)"],
      "Database Technologies": ["PostgreSQL", "MongoDB"],
      "Big Data Stack": ["Apache Hadoop", "Hive", "Spark", "Airflow", "Beam"],
      DevOps: ["CI/CD Pipelines", "GitHub Actions", "Terraform", "Jenkins"],
    },
  },
  contactInfo: {
    email: "vasisht.a@northeastern.edu",
    phone: "(857)-313-4365",
    location: "Boston, Massachusetts, United States",
    social: {
      github: "https://github.com/generalming",
      linkedin: "https://www.linkedin.com/in/advaith-k-v-aa291216a",
      website: "https://www.generalming.me",
    },
  },
}

const ConfigContext = createContext<Config>(defaultConfig)

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ConfigContext.Provider value={defaultConfig}>{children}</ConfigContext.Provider>
}

export const useConfig = () => useContext(ConfigContext)
