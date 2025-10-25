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

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
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
      <nav className="fixed top-0 w-full z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold gradient-text">
              SK
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              {/* Skeleton loading for navigation items */}
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
    <nav className="fixed top-0 w-full z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            SK
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
                suppressHydrationWarning
              >
                {section.label}
              </button>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              suppressHydrationWarning
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  setIsOpen(false)
                }}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                suppressHydrationWarning
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}