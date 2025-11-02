"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import FullStackShowcase from "@/components/full-stack-showcase"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { useTheme } from "next-themes"

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  twinkleSpeed: number
  depth: number
  color?: string
  vx?: number
  vy?: number
}

interface NorthernLightLayer {
  x: number
  y: number
  width: number
  height: number
  speed: number
  phase: number
  colors: string[]
  waveIntensity: number
  depth: number
  movementSpeed: number
}

// Color schemes based on background
const colorSchemes = {
  light: {
    primary: "oklch(0.5 0.2 262)", // Deeper purple for better contrast
    primaryForeground: "oklch(1 0 0)",
    secondary: "oklch(0.4 0.15 200)", // Enhanced blue
    secondaryForeground: "oklch(1 0 0)",
    accent: "oklch(0.55 0.22 280)", // Brighter accent
    accentForeground: "oklch(1 0 0)",
    background: "oklch(0.98 0 0)", // Lighter background
    foreground: "oklch(0.15 0 0)", // Darker text for contrast
    muted: "oklch(0.95 0 0)",
    mutedForeground: "oklch(0.45 0 0)",
    border: "oklch(0.9 0 0)",
    card: "oklch(1 0 0)",
    cardForeground: "oklch(0.15 0 0)",
  },
  dark: {
    primary: "oklch(0.6 0.2 262)",
    primaryForeground: "oklch(0.95 0 0)",
    secondary: "oklch(0.5 0.15 200)",
    secondaryForeground: "oklch(0.95 0 0)",
    accent: "oklch(0.65 0.22 280)",
    accentForeground: "oklch(0.95 0 0)",
    background: "oklch(0.08 0 0)",
    foreground: "oklch(0.95 0 0)",
    muted: "oklch(0.25 0 0)",
    mutedForeground: "oklch(0.65 0 0)",
    border: "oklch(0.18 0 0)",
    card: "oklch(0.12 0 0)",
    cardForeground: "oklch(0.95 0 0)",
  }
}

function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const northernLightsRef = useRef<NorthernLightLayer[]>([])
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef({ y: 0 })
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Apply dynamic color scheme
  useEffect(() => {
    if (!mounted || !theme) return

    const root = document.documentElement
    const scheme = colorSchemes[theme as keyof typeof colorSchemes] || colorSchemes.dark

    Object.entries(scheme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [theme, mounted])

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll position for parallax
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current.y = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const generateStars = () => {
      starsRef.current = []
      const starCount = theme === 'light' 
        ? Math.floor((canvas.width * canvas.height) / 4000)
        : Math.floor((canvas.width * canvas.height) / 8000)

      for (let i = 0; i < starCount; i++) {
        const isLightMode = theme === 'light'
        
        if (isLightMode) {
          // Northern lights theme - colors that complement the light background
          const colors = [
            'rgba(147, 51, 234, 1)',    // Purple from theme
            'rgba(99, 102, 241, 1)',    // Indigo from theme
            'rgba(139, 92, 246, 1)',    // Violet
            'rgba(168, 85, 247, 1)',    // Purple accent
            'rgba(79, 70, 229, 1)',     // Blue from theme
          ]
          const depth = Math.random() * 0.8 + 0.2
          starsRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height * 0.6),
            radius: Math.random() * 1.2 + 0.3,
            opacity: Math.random() * 0.8 + 0.4,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
            depth: depth,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 0.1 * depth,
            vy: (Math.random() - 0.5) * 0.05 * depth
          })
        } else {
          // Dark mode - bright stars for contrast
          starsRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
            depth: Math.random() * 0.8 + 0.2,
          })
        }
      }
    }

    const generateNorthernLights = () => {
      if (theme !== 'light') return
      
      northernLightsRef.current = []
      const layerCount = 6

      for (let i = 0; i < layerCount; i++) {
        const depth = 0.2 + (i / layerCount) * 0.8
        const layerHeight = 80 + Math.random() * 60 + (i * 15)
        const startY = canvas.height - layerHeight - (i * 10)
        
        // Colors that match the light theme palette
        northernLightsRef.current.push({
          x: Math.random() * canvas.width * 0.2,
          y: startY,
          width: canvas.width * (0.9 + Math.random() * 0.3),
          height: layerHeight,
          speed: 0.05 + Math.random() * 0.1,
          phase: Math.random() * Math.PI * 2,
          colors: [
            `rgba(147, 51, 234, ${0.3 + Math.random() * 0.4})`, // Primary purple
            `rgba(99, 102, 241, ${0.3 + Math.random() * 0.4})`, // Primary blue
            `rgba(168, 85, 247, ${0.2 + Math.random() * 0.3})`, // Accent purple
            `rgba(79, 70, 229, ${0.3 + Math.random() * 0.4})`,  // Secondary blue
            `rgba(139, 92, 246, ${0.2 + Math.random() * 0.3})`, // Violet
          ],
          waveIntensity: 20 + Math.random() * 30 + (i * 5),
          depth: depth,
          movementSpeed: 0.1 + Math.random() * 0.2
        })
      }
    }

    const drawNorthernLights = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const time = Date.now() * 0.001
      const scrollOffset = scrollRef.current.y * 0.1

      northernLightsRef.current.forEach((light, index) => {
        const parallaxX = mouseRef.current.x * 0.01 * light.depth
        const parallaxY = mouseRef.current.y * 0.01 * light.depth
        const scrollParallax = scrollOffset * light.depth
        
        const baseY = light.y + parallaxY + scrollParallax
        const waveY = baseY + Math.sin(time * light.speed + light.phase) * 15
        const waveHeight = light.height + Math.sin(time * light.speed * 1.3 + light.phase) * 10
        const horizontalMove = Math.sin(time * light.movementSpeed + light.phase) * 50 * light.depth

        const gradient = ctx.createLinearGradient(
          0, waveY,
          0, waveY + waveHeight
        )
        
        light.colors.forEach((color, colorIndex) => {
          const position = colorIndex / (light.colors.length - 1)
          const depthOpacity = light.depth < 0.5 ? 0.3 : 0.6
          const adjustedColor = color.replace(/[\d.]+\)$/, `${depthOpacity})`)
          gradient.addColorStop(position, adjustedColor)
        })

        ctx.fillStyle = gradient
        ctx.globalCompositeOperation = 'screen'
        
        ctx.beginPath()
        ctx.moveTo(0, waveY + waveHeight)
        
        const segments = 30
        for (let i = 0; i <= segments; i++) {
          const x = (width / segments) * i
          const segmentPhase = light.phase + (i / segments) * Math.PI * 3
          const baseWave = Math.sin(time * light.speed * 0.8 + segmentPhase) * light.waveIntensity
          const parallaxWave = baseWave * light.depth
          const mountainEffect = Math.sin((i / segments) * Math.PI * 2) * 15 * light.depth
          const y = waveY + parallaxWave + mountainEffect + horizontalMove * 0.1
          
          ctx.lineTo(x + parallaxX, y)
        }
        
        ctx.lineTo(width + parallaxX, waveY + waveHeight)
        ctx.lineTo(0, waveY + waveHeight)
        ctx.closePath()
        ctx.fill()
        
        if (light.depth > 0.5) {
          ctx.globalAlpha = 0.4
          ctx.beginPath()
          ctx.moveTo(0, waveY + waveHeight)
          
          for (let i = 0; i <= segments; i++) {
            const x = (width / segments) * i
            const segmentPhase = light.phase + (i / segments) * Math.PI * 2 + Math.PI * 0.7
            const baseWave = Math.sin(time * light.speed * 1.2 + segmentPhase) * (light.waveIntensity * 0.6)
            const parallaxWave = baseWave * light.depth
            const mountainEffect = Math.sin((i / segments) * Math.PI * 1.8) * 10 * light.depth
            const y = waveY + parallaxWave + mountainEffect + horizontalMove * 0.05
            
            ctx.lineTo(x + parallaxX * 0.7, y)
          }
          
          ctx.lineTo(width + parallaxX * 0.7, waveY + waveHeight)
          ctx.lineTo(0, waveY + waveHeight)
          ctx.closePath()
          ctx.fill()
        }
        
        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
      })
    }

    const createShootingStar = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const x = Math.random() * width
      const y = 0
      const length = Math.random() * 80 + 40
      const speed = Math.random() * 10 + 5
      const angle = Math.random() * Math.PI / 4 + Math.PI / 8
      
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
        
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.beginPath()
        ctx.arc(currentX, currentY, 1.5, 0, Math.PI * 2)
        ctx.fill()
        
        requestAnimationFrame(drawShootingStar)
      }
      
      drawShootingStar()
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateStars()
      generateNorthernLights()
    }

    const animate = () => {
      if (!mounted) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isLightMode = theme === 'light'
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y
      const scrollOffset = scrollRef.current.y * 0.05

      if (isLightMode) {
        // Light mode - use theme colors for stars
        starsRef.current.forEach((star) => {
          const starParallaxX = (mouseX - centerX) * 0.005 * star.depth
          const starParallaxY = (mouseY - centerY) * 0.005 * star.depth
          const starScrollParallax = scrollOffset * star.depth * 0.5

          if (star.vx && star.vy) {
            star.x += star.vx
            star.y += star.vy
            
            if (star.x < 0 || star.x > canvas.width) star.vx *= -1
            if (star.y < 0 || star.y > canvas.height * 0.6) star.vy *= -1
          }

          star.opacity += (Math.random() - 0.5) * star.twinkleSpeed
          star.opacity = Math.max(0.3, Math.min(1, star.opacity))

          const starX = star.x + starParallaxX
          const starY = star.y + starParallaxY + starScrollParallax

          const glowIntensity = star.opacity > 0.5 ? (star.opacity - 0.5) * 0.6 * star.depth : 0
        
          if (glowIntensity > 0) {
            const gradient = ctx.createRadialGradient(
              starX, starY, 0,
              starX, starY, star.radius * 4
            )
            const baseColor = star.color || 'rgba(147, 51, 234, 1)' // Default to primary color
            const glowColor = baseColor.replace('1)', `${glowIntensity * 0.8})`)
            gradient.addColorStop(0, baseColor.replace('1)', `${star.opacity})`))
            gradient.addColorStop(0.5, glowColor)
            gradient.addColorStop(1, 'transparent')
            
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(starX, starY, star.radius * 4, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.fillStyle = star.color || 'rgba(147, 51, 234, 1)'
          ctx.globalAlpha = star.opacity
          ctx.beginPath()
          ctx.arc(starX, starY, star.radius * star.depth, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1

          if (star.opacity > 0.8 && Math.random() > 0.95) {
            ctx.fillStyle = 'rgba(255, 255, 255, 1)'
            ctx.beginPath()
            ctx.arc(starX, starY, star.radius * 0.3, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        drawNorthernLights(ctx, canvas.width, canvas.height)

      } else {
        // Dark mode - maintain original style but with theme colors
        ctx.fillStyle = "oklch(0.08 0 0)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        starsRef.current.forEach((star) => {
          star.opacity += (Math.random() - 0.5) * star.twinkleSpeed
          star.opacity = Math.max(0.2, Math.min(1, star.opacity))

          const starX = star.x
          const starY = star.y

          const glowIntensity = star.opacity > 0.6 ? (star.opacity - 0.6) * 0.4 : 0
        
          if (glowIntensity > 0) {
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

          if (star.opacity > 0.8 && Math.random() > 0.7) {
            ctx.fillStyle = `rgba(255, 255, 255, ${(star.opacity - 0.8) * 2})`
            ctx.beginPath()
            ctx.arc(starX, starY, star.radius * 0.3, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        if (Math.random() > 0.995) {
          createShootingStar(ctx, canvas.width, canvas.height)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme, mounted])

  if (!mounted) {
    return (
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-0"
      />
    )
  }

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-all duration-500 ${
        theme === 'dark' ? 'opacity-100' : 'opacity-100'
      }`}
      style={{ 
        mixBlendMode: theme === 'dark' ? "screen" : "normal"
      }} 
    />
  )
}

// Update the ThemeAwareBackground to use dynamic colors
function ThemeAwareBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    )
  }

  const isLight = theme === 'light'

  return (
    <div className="fixed inset-0 -z-10">
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float ${
        isLight ? 'bg-primary/10' : 'bg-primary/10'
      }`} />
      <div
        className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float ${
          isLight ? 'bg-accent/10' : 'bg-accent/10'
        }`}
        style={{ animationDelay: "1s" }}
      />
      {isLight && (
        <>
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "0.3s" }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "0.7s" }}
          />
        </>
      )}
    </div>
  )
}

// Update the rest of the components to use the new color scheme
// ... (Navigation, Hero, About, Projects, Experience, Skills, FullStackShowcase, Contact, Footer remain the same)

// Custom hook for scroll animations
function useScrollAnimation() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (typeof window === 'undefined') return

    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(sectionId))
        } else {
          setVisibleSections(prev => {
            const newSet = new Set(prev)
            newSet.delete(sectionId)
            return newSet
          })
        }
      })
    }, options)

    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => {
      observerRef.current?.observe(section)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { visibleSections, mounted }
}

// Animation wrapper component
function AnimatedSection({ 
  children, 
  id, 
  isVisible 
}: { 
  children: React.ReactNode
  id: string
  isVisible: boolean
}) {
  return (
    <section 
      id={id}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-10 blur-sm'
      }`}
    >
      {children}
    </section>
  )
}

// Enhanced component with staggered animations
function AnimatedContent({ 
  children, 
  delay = 0,
  isVisible 
}: { 
  children: React.ReactNode
  delay?: number
  isVisible: boolean
}) {
  return (
    <div 
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const { theme } = useTheme()
  const { visibleSections, mounted } = useScrollAnimation()
  
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const fullStackRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
      about: aboutRef,
      projects: projectsRef,
      experience: experienceRef,
      skills: skillsRef,
      fullstack: fullStackRef,
      contact: contactRef,
    }

    const ref = refs[sectionId]
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const isSectionVisible = (sectionId: string) => mounted && visibleSections.has(sectionId)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden transition-colors duration-500">
      {/* Stars Background with dynamic colors */}
      <StarsBackground />
      
      {/* Theme-aware gradient effects */}
      <ThemeAwareBackground />

      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={scrollToSection} />
      
      {/* Hero Section */}
      <section id="hero">
        <Hero onViewWork={() => scrollToSection("projects")} onGetInTouch={() => scrollToSection("contact")} />
      </section>
      
      {/* About Section */}
      <AnimatedSection id="about" isVisible={isSectionVisible("about")}>
        <div ref={aboutRef}>
          <AnimatedContent isVisible={isSectionVisible("about")}>
            <About />
          </AnimatedContent>
        </div>
      </AnimatedSection>
      
      {/* Projects Section */}
      <AnimatedSection id="projects" isVisible={isSectionVisible("projects")}>
        <div ref={projectsRef}>
          <AnimatedContent isVisible={isSectionVisible("projects")}>
            <Projects />
          </AnimatedContent>
        </div>
      </AnimatedSection>
      
      {/* Experience Section */}
      <AnimatedSection id="experience" isVisible={isSectionVisible("experience")}>
        <div ref={experienceRef}>
          <AnimatedContent isVisible={isSectionVisible("experience")}>
            <Experience />
          </AnimatedContent>
        </div>
      </AnimatedSection>
      
      {/* Skills Section */}
      <AnimatedSection id="skills" isVisible={isSectionVisible("skills")}>
        <div ref={skillsRef}>
          <AnimatedContent isVisible={isSectionVisible("skills")}>
            <Skills />
          </AnimatedContent>
        </div>
      </AnimatedSection>
      
      {/* Full Stack Showcase Section */}
      <AnimatedSection id="fullstack" isVisible={isSectionVisible("fullstack")}>
        <div ref={fullStackRef}>
          <AnimatedContent isVisible={isSectionVisible("fullstack")}>
            <FullStackShowcase />
          </AnimatedContent>
        </div>
      </AnimatedSection>
      
      {/* Contact Section */}
      <AnimatedSection id="contact" isVisible={isSectionVisible("contact")}>
        <div ref={contactRef}>
          <AnimatedContent isVisible={isSectionVisible("contact")}>
            <Contact />
          </AnimatedContent>
        </div>
      </AnimatedSection>
      
      {/* Footer */}
      <AnimatedSection id="footer" isVisible={isSectionVisible("contact")}>
        <AnimatedContent isVisible={isSectionVisible("contact")} delay={200}>
          <Footer />
        </AnimatedContent>
      </AnimatedSection>
    </div>
  )
}