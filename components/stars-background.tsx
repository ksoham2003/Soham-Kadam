"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  twinkleSpeed: number
  depth: number
}

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const generateStars = () => {
      starsRef.current = []
      const starCount = Math.floor((canvas.width * canvas.height) / 8000) // Increased star density

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5, // Slightly larger stars
          opacity: Math.random() * 0.8 + 0.2, // Higher base opacity
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          depth: Math.random() * 0.8 + 0.2,
        })
      }
    }

    generateStars()

    const animate = () => {
      // Clear with dark background that matches your dark theme
      ctx.fillStyle = "oklch(0.08 0 0)" // Using your dark theme background color
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const offsetX = (mouseRef.current.x - centerX) * 0.03 // Reduced parallax for subtlety
      const offsetY = (mouseRef.current.y - centerY) * 0.03

      // Draw and update stars
      starsRef.current.forEach((star) => {
        star.opacity += (Math.random() - 0.5) * star.twinkleSpeed
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))

        const starX = star.x + offsetX * star.depth
        const starY = star.y + offsetY * star.depth

        // Star glow with theme-accented colors
        const glowIntensity = star.opacity > 0.6 ? (star.opacity - 0.6) * 0.4 : 0
        
        if (glowIntensity > 0) {
          // Primary color glow (purple/blue from your theme)
          const gradient = ctx.createRadialGradient(
            starX, starY, 0,
            starX, starY, star.radius * 4
          )
          gradient.addColorStop(0, `rgba(99, 102, 241, ${glowIntensity * 0.3})`)
          gradient.addColorStop(0.5, `rgba(147, 51, 234, ${glowIntensity * 0.2})`)
          gradient.addColorStop(1, 'transparent')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(starX, starY, star.radius * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        // Main star with white core and subtle color tint
        const gradient = ctx.createRadialGradient(
          starX, starY, 0,
          starX, starY, star.radius
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(0.7, `rgba(199, 210, 254, ${star.opacity * 0.7})`)
        gradient.addColorStop(1, `rgba(147, 51, 234, ${star.opacity * 0.3})`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(starX, starY, star.radius, 0, Math.PI * 2)
        ctx.fill()

        // Bright stars get an additional sparkle effect
        if (star.opacity > 0.8 && Math.random() > 0.7) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(star.opacity - 0.8) * 2})`
          ctx.beginPath()
          ctx.arc(starX, starY, star.radius * 0.3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Add some shooting stars occasionally
      if (Math.random() > 0.995) {
        createShootingStar(ctx, canvas.width, canvas.height)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    const createShootingStar = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const x = Math.random() * width
      const y = 0
      const length = Math.random() * 80 + 40
      const speed = Math.random() * 10 + 5
      const angle = Math.random() * Math.PI / 4 + Math.PI / 8 // 22.5 to 67.5 degrees
      
      let progress = 0
      
      const drawShootingStar = () => {
        progress += speed
        
        const currentX = x + progress * Math.cos(angle)
        const currentY = y + progress * Math.sin(angle)
        
        if (currentX > width || currentY > height) return
        
        const trailGradient = ctx.createLinearGradient(
          currentX - length * Math.cos(angle),
          currentY - length * Math.sin(angle),
          currentX,
          currentY
        )
        
        trailGradient.addColorStop(0, 'transparent')
        trailGradient.addColorStop(0.3, 'rgba(147, 51, 234, 0.8)')
        trailGradient.addColorStop(0.7, 'rgba(99, 102, 241, 0.9)')
        trailGradient.addColorStop(1, 'rgba(255, 255, 255, 1)')
        
        ctx.strokeStyle = trailGradient
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(currentX - length * Math.cos(angle), currentY - length * Math.sin(angle))
        ctx.lineTo(currentX, currentY)
        ctx.stroke()
        
        // Star head
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.beginPath()
        ctx.arc(currentX, currentY, 1.5, 0, Math.PI * 2)
        ctx.fill()
        
        requestAnimationFrame(drawShootingStar)
      }
      
      drawShootingStar()
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: "transparent",
        mixBlendMode: "screen" // This makes the stars blend nicely with dark backgrounds
      }} 
    />
  )
}