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
      
      {/* About Section */}
      <section id="about" ref={aboutRef}>
        <About />
      </section>
      
      {/* Projects Section */}
      <section id="projects" ref={projectsRef}>
        <Projects />
      </section>
      
      {/* Experience Section */}
      <section id="experience" ref={experienceRef}>
        <Experience />
      </section>
      
      {/* Skills Section */}
      <section id="skills" ref={skillsRef}>
        <Skills />
      </section>
      
      {/* Full Stack Showcase Section */}
      <section id="fullstack" ref={fullStackRef}>
        <FullStackShowcase />
      </section>
      
      {/* Contact Section */}
      <section id="contact" ref={contactRef}>
        <Contact />
      </section>
      
      <Footer />
    </div>
  )
}