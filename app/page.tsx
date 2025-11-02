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
}

function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only run in dark mode after component has mounted
    if (!mounted || theme !== 'dark') return

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
      const starCount = Math.floor((canvas.width * canvas.height) / 8000)

      for (let i = 0; i < starCount; i++) {
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

    generateStars()

    const animate = () => {
      // Only animate in dark mode
      if (theme !== 'dark') return

      ctx.fillStyle = "oklch(0.08 0 0)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const offsetX = (mouseRef.current.x - centerX) * 0.3
      const offsetY = (mouseRef.current.y - centerY) * 0.3

      starsRef.current.forEach((star) => {
        star.opacity += (Math.random() - 0.5) * star.twinkleSpeed
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))

        const starX = star.x + offsetX * star.depth
        const starY = star.y + offsetY * star.depth

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

      animationRef.current = requestAnimationFrame(animate)
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

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme, mounted])

  // Don't render until we know the theme on client side
  // But always render the canvas element to avoid hydration mismatch
  // We'll just not animate it in light mode
  if (!mounted) {
    return (
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-0"
        style={{ 
          background: "transparent",
          mixBlendMode: "screen"
        }} 
      />
    )
  }

  // After mount, only show in dark mode
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${
        theme === 'dark' ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        background: "transparent",
        mixBlendMode: "screen"
      }} 
    />
  )
}

// Custom hook for scroll animations
function useScrollAnimation() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Only run on client side
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

    // Observe all sections
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

// Theme-aware gradient background component
function ThemeAwareBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a neutral background during SSR to avoid hydration mismatch
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 -z-10">
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float ${
        theme === 'dark' ? 'bg-primary/10' : 'bg-primary/5'
      }`} />
      <div
        className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float ${
          theme === 'dark' ? 'bg-accent/10' : 'bg-accent/5'
        }`}
        style={{ animationDelay: "1s" }}
      />
      {/* Additional gradient for light mode */}
      {theme === 'light' && (
        <>
          <div 
            className="absolute top-1/3 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "0.5s" }}
          />
          <div 
            className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          />
        </>
      )}
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

  // Check if section is visible for animations - only on client side
  const isSectionVisible = (sectionId: string) => mounted && visibleSections.has(sectionId)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Stars Background - Always rendered but only visible in dark mode */}
      <StarsBackground />
      
      {/* Theme-aware gradient effects */}
      <ThemeAwareBackground />

      {/* Navigation - This component already handles its own hydration */}
      <Navigation activeSection={activeSection} setActiveSection={scrollToSection} />
      
      {/* Hero Section - Always visible */}
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