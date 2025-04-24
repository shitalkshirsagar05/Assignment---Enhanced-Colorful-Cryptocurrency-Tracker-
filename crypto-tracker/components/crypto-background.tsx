"use client"

import { useEffect, useRef } from "react"

export default function CryptoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Crypto symbols
    const symbols = ["₿", "Ξ", "Ł", "Ð", "₮", "◎", "₳", "Ꜩ", "$"]

    // Particles array
    const particles: {
      x: number
      y: number
      size: number
      speed: number
      symbol: string
      color: string
      opacity: number
    }[] = []

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))

      for (let i = 0; i < particleCount; i++) {
        const colors = [
          "rgba(247, 147, 26, 0.5)", // Bitcoin orange
          "rgba(98, 126, 234, 0.5)", // Ethereum blue
          "rgba(0, 163, 255, 0.5)", // Ripple blue
          "rgba(22, 82, 240, 0.5)", // Coinbase blue
          "rgba(0, 209, 112, 0.5)", // Tether green
          "rgba(220, 38, 38, 0.5)", // Red
          "rgba(16, 185, 129, 0.5)", // Green
        ]

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 20 + 10,
          speed: Math.random() * 0.5 + 0.1,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    createParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Move particle
        particle.y += particle.speed

        // Reset particle if it goes off screen
        if (particle.y > canvas.height) {
          particle.y = -particle.size
          particle.x = Math.random() * canvas.width
        }

        // Draw particle
        ctx.font = `${particle.size}px Arial`
        ctx.fillStyle = particle.color
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(particle.symbol, particle.x, particle.y)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20" />
}
