"use client"

import { useEffect, useRef } from "react"

interface SparklineChartProps {
  data: number[]
  color: string
  height?: number
  width?: number
  glowColor?: string
}

export default function SparklineChart({ data, color, height = 50, width = 120, glowColor }: SparklineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Find min and max values for scaling
    const minValue = Math.min(...data)
    const maxValue = Math.max(...data)
    const range = maxValue - minValue

    // Draw the sparkline with glow effect
    if (glowColor) {
      ctx.shadowColor = glowColor
      ctx.shadowBlur = 8
    }

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 2

    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width
      // Flip the y-coordinate since canvas 0,0 is top-left
      const y = height - ((value - minValue) / range) * (height * 0.8) - height * 0.1

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Add gradient fill under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    const colorWithOpacity = color.replace(")", ", 0.2)")
    gradient.addColorStop(0, colorWithOpacity)
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
  }, [data, color, height, width, glowColor])

  return <canvas ref={canvasRef} className="inline-block" style={{ width, height }} />
}
