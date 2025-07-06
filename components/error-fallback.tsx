"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Simple Donkey Kong style mini-game as fallback
const ErrorFallback = ({ onRetry }: { onRetry: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 600
    canvas.height = 400

    // Game variables
    let animationFrameId: number
    let gameOver = false

    // Player
    const player = {
      x: 50,
      y: canvas.height - 50,
      width: 20,
      height: 30,
      color: "#9b5de5",
      speed: 5,
      jumping: false,
      jumpHeight: 100,
      jumpCount: 0,
      maxJumpCount: 15,
      falling: false,
      velocityY: 0,
      gravity: 0.8,
      keys: {
        left: false,
        right: false,
        up: false,
      },
    }

    // Platforms
    const platforms = [
      { x: 0, y: canvas.height - 20, width: canvas.width, height: 20, color: "#f15bb5" },
      { x: 100, y: canvas.height - 120, width: 200, height: 20, color: "#f15bb5" },
      { x: 400, y: canvas.height - 220, width: 200, height: 20, color: "#f15bb5" },
      { x: 50, y: canvas.height - 320, width: 150, height: 20, color: "#f15bb5" },
    ]

    // Barrels
    let barrels: { x: number; y: number; width: number; height: number; speed: number }[] = []

    // Collectibles
    const coins: { x: number; y: number; width: number; height: number; collected: boolean }[] = [
      { x: 150, y: canvas.height - 150, width: 15, height: 15, collected: false },
      { x: 450, y: canvas.height - 250, width: 15, height: 15, collected: false },
      { x: 100, y: canvas.height - 350, width: 15, height: 15, collected: false },
    ]

    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") player.keys.left = true
      if (e.key === "ArrowRight") player.keys.right = true
      if (e.key === "ArrowUp" && !player.jumping && !player.falling) {
        player.jumping = true
        player.velocityY = -15
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") player.keys.left = false
      if (e.key === "ArrowRight") player.keys.right = false
      if (e.key === "ArrowUp") player.keys.up = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Spawn barrels periodically
    const spawnBarrel = () => {
      const randomX = Math.random() < 0.5 ? 0 : canvas.width
      const barrel = {
        x: randomX,
        y: 50,
        width: 20,
        height: 20,
        speed: randomX === 0 ? 2 : -2,
      }
      barrels.push(barrel)
    }

    let barrelTimer = 0
    const barrelSpawnInterval = 100

    // Check collisions
    const checkCollisions = () => {
      // Check if player is on a platform
      let onPlatform = false

      for (const platform of platforms) {
        // Check if player is above the platform and falling
        if (
          player.y + player.height <= platform.y &&
          player.y + player.height + player.velocityY >= platform.y &&
          player.x + player.width > platform.x &&
          player.x < platform.x + platform.width
        ) {
          player.y = platform.y - player.height
          player.velocityY = 0
          player.jumping = false
          player.falling = false
          onPlatform = true
        }
      }

      // If not on a platform and not jumping, start falling
      if (!onPlatform && !player.jumping) {
        player.falling = true
      }

      // Check if player collects coins
      for (const coin of coins) {
        if (
          !coin.collected &&
          player.x < coin.x + coin.width &&
          player.x + player.width > coin.x &&
          player.y < coin.y + coin.height &&
          player.y + player.height > coin.y
        ) {
          coin.collected = true
          setScore((prevScore) => prevScore + 100)
        }
      }

      // Check if player hits barrels
      for (const barrel of barrels) {
        if (
          player.x < barrel.x + barrel.width &&
          player.x + player.width > barrel.x &&
          player.y < barrel.y + barrel.height &&
          player.y + player.height > barrel.y
        ) {
          gameOver = true
        }
      }

      // Check if player falls off the bottom
      if (player.y > canvas.height) {
        gameOver = true
      }
    }

    // Game update function
    const update = () => {
      if (gameOver) {
        cancelAnimationFrame(animationFrameId)
        // Game over screen
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#f15bb5"
        ctx.font = "30px 'Press Start 2P', cursive"
        ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2 - 20)

        ctx.fillStyle = "#9b5de5"
        ctx.font = "16px 'Press Start 2P', cursive"
        ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 20)

        return
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid background
      ctx.strokeStyle = "rgba(75, 65, 100, 0.2)"
      ctx.lineWidth = 1

      // Draw horizontal grid lines
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw vertical grid lines
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Update barrel timer
      barrelTimer++
      if (barrelTimer >= barrelSpawnInterval) {
        spawnBarrel()
        barrelTimer = 0
      }

      // Player movement
      if (player.keys.left) {
        player.x -= player.speed
        if (player.x < 0) player.x = 0
      }
      if (player.keys.right) {
        player.x += player.speed
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width
      }

      // Apply gravity
      player.velocityY += player.gravity
      player.y += player.velocityY

      // Update barrels
      barrels = barrels.filter((barrel) => {
        barrel.x += barrel.speed
        return barrel.x + barrel.width > 0 && barrel.x < canvas.width
      })

      // Check for collisions
      checkCollisions()

      // Draw platforms
      platforms.forEach((platform) => {
        ctx.fillStyle = platform.color
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
      })

      // Draw player
      ctx.fillStyle = player.color
      ctx.fillRect(player.x, player.y, player.width, player.height)

      // Draw coins
      coins.forEach((coin) => {
        if (!coin.collected) {
          ctx.fillStyle = "#fee440"
          ctx.beginPath()
          ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw barrels
      barrels.forEach((barrel) => {
        ctx.fillStyle = "#ff0000"
        ctx.beginPath()
        ctx.arc(barrel.x + barrel.width / 2, barrel.y + barrel.height / 2, barrel.width / 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw score
      ctx.fillStyle = "#00f5d4"
      ctx.font = "16px 'Press Start 2P', cursive"
      ctx.fillText(`SCORE: ${score}`, 20, 30)

      // Continue the game loop
      animationFrameId = requestAnimationFrame(update)
    }

    // Start the game loop
    update()

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [gameStarted, score])

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal max-w-3xl w-full mx-4 px-6 py-8 rounded text-center">
        <div className="scan-line"></div>

        <h1 className="text-2xl md:text-4xl font-bold text-primary mb-4 pixel-font retro-glow">SYSTEM ERROR</h1>

        <div className="text-destructive text-xl mb-6 font-mono">&gt; CONNECTION INTERRUPTED</div>

        {gameStarted ? (
          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              className="border-2 border-primary rounded-md mb-4"
              width={600}
              height={400}
              tabIndex={0}
            />
            <p className="text-muted-foreground text-sm mb-4">Use arrow keys to move and jump</p>
            <Button onClick={onRetry} variant="outline" className="mt-4">
              RETRY CONNECTION
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mt-4 text-sm md:text-base font-mono text-red-400">
              <p>ERROR CODE: 0xB3B0P-404</p>
              <p className="mt-2">Unable to establish connection to main server.</p>
              <p>Initializing emergency entertainment protocol...</p>
            </div>

            <div className="w-full max-w-md mx-auto px-4 py-6 bg-muted/20 rounded-md">
              <h2 className="text-accent text-xl mb-4">EMERGENCY PROTOCOL ACTIVE</h2>
              <p className="text-muted-foreground mb-6">
                While we attempt to reconnect, would you like to play a mini-game?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setGameStarted(true)} variant="default">
                  START GAME
                </Button>
                <Button onClick={onRetry} variant="outline">
                  RETRY CONNECTION
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ErrorFallback
