"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle scroll for dynamic island effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  // Don't render navigation until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-auto">
        <div className="glass rounded-full px-6 py-3 border border-white/20 shadow-2xl backdrop-blur-2xl transition-all duration-500">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold gradient-text">
              SK
            </Link>
            <div className="hidden md:flex gap-6 items-center">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {section.label}
                </div>
              ))}
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Dynamic Island Navigation */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-auto transition-all duration-500 ${
        isScrolled ? "scale-95" : "scale-100"
      }`}>
        <div className={`glass rounded-full border border-white/20 shadow-2xl backdrop-blur-2xl transition-all duration-500 ${
          isOpen 
            ? "px-8 py-6 rounded-2xl min-w-64" 
            : isScrolled 
              ? "px-6 py-3" 
              : "px-8 py-4"
        }`}>
          
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between gap-6">
            {/* Logo - Clean and simple */}
            <Link 
              href="/" 
              className="text-lg font-bold gradient-text flex-shrink-0 hover:scale-110 transition-transform duration-300"
            >
              SK
            </Link>

            {/* Navigation Items - Desktop with Enhanced Animations */}
            <div className="hidden md:flex items-center gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  onMouseEnter={() => setHoveredCell(section.id)}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 overflow-hidden group ${
                    activeSection === section.id 
                      ? "bg-primary/20 text-primary shadow-inner" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  suppressHydrationWarning
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 transition-all duration-500 ${
                    activeSection === section.id 
                      ? "scale-100 opacity-100" 
                      : hoveredCell === section.id
                        ? "scale-105 opacity-100"
                        : "scale-0 opacity-0"
                  }`} />
                  
                  {/* Pulse ripple effect */}
                  <div className={`absolute inset-0 rounded-full bg-white/20 animate-ping duration-1000 ${
                    hoveredCell === section.id ? "scale-150 opacity-0" : "scale-0 opacity-0"
                  }`} />
                  
                  {/* Text with animation */}
                  <div className="relative z-10">
                    <span className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:font-semibold">
                      {section.label}
                    </span>
                  </div>

                  {/* Active indicator dot with bounce */}
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full transition-all duration-300 ${
                    activeSection === section.id ? "scale-100 opacity-100 animate-bounce-subtle" : "scale-0 opacity-0"
                  }`} />

                  {/* Hover border animation */}
                  <div className={`absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-primary to-accent bg-clip-padding transition-all duration-500 ${
                    hoveredCell === section.id ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}>
                    <div className="absolute inset-0 rounded-full bg-background -m-0.5" />
                  </div>

                  {/* Shine effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                    hoveredCell === section.id ? "translate-x-full" : "-translate-x-full"
                  }`} />
                </button>
              ))}
            </div>

            {/* Right Side - Theme Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <ModeToggle />
              </div>

              {/* Mobile Menu Button with Animation */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setHoveredCell("menu")}
                onMouseLeave={() => setHoveredCell(null)}
                className="md:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                suppressHydrationWarning
              >
                {/* Menu button background animation */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 transition-all duration-500 ${
                  hoveredCell === "menu" ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`} />
                
                {/* Animated hamburger icon */}
                <div className="relative w-5 h-5">
                  <span className={`absolute top-1/2 left-1/2 w-4 h-0.5 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                  }`} />
                  <span className={`absolute top-1/2 left-1/2 w-4 h-0.5 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`} />
                  <span className={`absolute top-1/2 left-1/2 w-4 h-0.5 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                  }`} />
                </div>

                {/* Menu button pulse effect */}
                <div className={`absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse duration-2000 ${
                  hoveredCell === "menu" ? "scale-125 opacity-100" : "scale-100 opacity-0"
                }`} />
              </button>
            </div>
          </div>

{/* Mobile Navigation with Enhanced Animations */}
{isOpen && (
  <div className="md:hidden mt-4 space-y-2">
    <div className="flex flex-col items-center space-y-2">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => {
            setActiveSection(section.id)
            setIsOpen(false)
          }}
          className={`block w-full text-center px-4 py-3 rounded-xl transition-all duration-500 overflow-hidden group relative animate-slide-in-left ${
            activeSection === section.id
              ? "bg-primary/20 text-primary shadow-inner"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          }`}
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
          suppressHydrationWarning
        >
          {/* Mobile item background animation */}
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 transition-all duration-500 ${
            activeSection === section.id 
              ? "scale-100 opacity-100" 
              : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          }`} />
          
          {/* Content container */}
          <div className="relative z-10">
            <span className="font-medium transition-all duration-300 group-hover:translate-x-2 group-hover:font-semibold">
              {section.label}
            </span>
          </div>

          {/* Mobile active indicator with animation */}
          <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full transition-all duration-300 ${
            activeSection === section.id ? "scale-100 opacity-100 animate-pulse-subtle" : "scale-0 opacity-0"
          }`} />

          {/* Mobile slide-in underline */}
          <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full ${
            activeSection === section.id ? "w-full" : ""
          }`} />
        </button>
      ))}
      
      {/* Mobile theme toggle section - Simple Version */}
<div className="pt-2 animate-slide-in-left w-full" style={{ animationDelay: "500ms" }}>
  <div className="flex justify-center px-4 py-2">
    <div className="text-center">
      <ModeToggle />
    </div>
  </div>
</div>
    </div>
  </div>
)}
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}