"use client"

import type React from "react"

import { useState, useRef } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import FullStackShowcase from "@/components/full-stack-showcase"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const fullStackRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      projects: projectsRef,
      contact: contactRef,
      about: aboutRef,
      experience: experienceRef,
      skills: skillsRef,
      fullstack: fullStackRef,
    }

    const ref = refs[sectionId]
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background gradient effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Navigation activeSection={activeSection} setActiveSection={scrollToSection} />
      <Hero onViewWork={() => scrollToSection("projects")} onGetInTouch={() => scrollToSection("contact")} />
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={projectsRef}>
        <Projects />
      </div>
      <div ref={experienceRef}>
        <Experience />
      </div>
      <div ref={skillsRef}>
        <Skills />
      </div>
      <div ref={fullStackRef}>
        <FullStackShowcase />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer />
    </div>
  )
}
