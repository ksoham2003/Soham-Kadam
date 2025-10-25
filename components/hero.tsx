"use client"

import { ArrowRight } from "lucide-react"

interface HeroProps {
  onViewWork: () => void
  onGetInTouch: () => void
}

export default function Hero({ onViewWork, onGetInTouch }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Main Heading */}
        <div className="space-y-4 animate-slide-in-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="gradient-text">Full-Stack Developer</span>
            <br />
            <span className="text-foreground">Building Complete Digital Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Result-oriented Full-Stack Developer with ~1 year of experience crafting responsive, scalable, and
            user-friendly web applications using React.js, Next.js, Node.js, and modern UI frameworks.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <button
            onClick={onViewWork}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
          >
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onGetInTouch}
            className="px-8 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get In Touch
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-12 animate-bounce">
          <svg className="w-6 h-6 mx-auto text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
