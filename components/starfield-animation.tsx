"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

const StarfieldAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: { x: number; y: number; radius: number; velocity: number; color: string }[] = []
    const shootingStars: { x: number; y: number; length: number; velocity: number; opacity: number; color: string }[] =
      []

    const colors = ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"]

    // Create stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 1.5
      const velocity = 0.05 + Math.random() * 0.1
      const color = colors[Math.floor(Math.random() * colors.length)]

      stars.push({ x, y, radius, velocity, color })
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    // Create a shooting star occasionally
    const createShootingStar = () => {
      if (Math.random() < 0.1 && shootingStars.length < 5) {
        const y = (Math.random() * canvas.height) / 3
        const x = Math.random() * canvas.width
        const length = 50 + Math.random() * 70
        const velocity = 5 + Math.random() * 10
        const opacity = 0.8
        const color = colors[Math.floor(Math.random() * colors.length)]

        shootingStars.push({ x, y, length, velocity, opacity, color })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0B0E17")
      gradient.addColorStop(1, "#1F1B32")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines (subtle)
      ctx.strokeStyle = "rgba(75, 65, 100, 0.2)"
      ctx.lineWidth = 0.5

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw and update stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color + "80" // Add transparency
        ctx.fill()

        // Twinkle effect
        const twinkle = 0.5 + Math.sin(Date.now() * 0.001 * star.velocity) * 0.5
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * twinkle, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()

        // Move star slightly
        star.y += star.velocity

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      // Draw and update shooting stars
      shootingStars.forEach((star, index) => {
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - star.length, star.y + star.length)

        const gradient = ctx.createLinearGradient(star.x, star.y, star.x - star.length, star.y + star.length)
        gradient.addColorStop(0, star.color)
        gradient.addColorStop(1, "transparent")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Move shooting star
        star.x += star.velocity
        star.y += star.velocity
        star.opacity -= 0.01

        // Remove shooting star if it goes off screen or fades out
        if (star.x > canvas.width || star.y > canvas.height || star.opacity <= 0) {
          shootingStars.splice(index, 1)
        }
      })

      // Occasionally create a new shooting star
      createShootingStar()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
}

export default StarfieldAnimation
