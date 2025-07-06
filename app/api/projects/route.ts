import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

// Path to our projects JSON file
const projectsFilePath = path.join(process.cwd(), "data/projects.json")

export async function GET() {
  try {
    // Check if the file exists
    try {
      await fs.access(projectsFilePath)
    } catch (error) {
      // Create default data and directory if it doesn't exist
      const dir = path.dirname(projectsFilePath)
      await fs.mkdir(dir, { recursive: true })

      // Default projects data
      const defaultProjects = [
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
      ]

      await fs.writeFile(projectsFilePath, JSON.stringify(defaultProjects, null, 2))
    }

    // Read the projects file
    const fileContents = await fs.readFile(projectsFilePath, "utf8")
    const projects = JSON.parse(fileContents)

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error reading projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const project = await request.json()

    // Validate required fields
    if (!project.id || !project.title || !project.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if the file exists, if not create it with an empty array
    try {
      await fs.access(projectsFilePath)
    } catch (error) {
      const dir = path.dirname(projectsFilePath)
      await fs.mkdir(dir, { recursive: true })
      await fs.writeFile(projectsFilePath, JSON.stringify([], null, 2))
    }

    // Read existing projects
    const fileContents = await fs.readFile(projectsFilePath, "utf8")
    const projects = JSON.parse(fileContents)

    // Check if project with same ID already exists
    const existingIndex = projects.findIndex((p: any) => p.id === project.id)

    if (existingIndex >= 0) {
      // Update existing project
      projects[existingIndex] = { ...projects[existingIndex], ...project }
    } else {
      // Add new project
      projects.push(project)
    }

    // Write updated projects back to file
    await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2))

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error saving project:", error)
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 })
  }
}
