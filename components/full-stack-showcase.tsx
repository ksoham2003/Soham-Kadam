"use client"

import { Code, Server, Zap } from "lucide-react"

export default function FullStackShowcase() {
  const frontendSkills = [
    "React.js & Next.js",
    "TypeScript & JavaScript",
    "Tailwind CSS & Material-UI",
    "State Management (Redux, Context API)",
    "Responsive Design",
    "Performance Optimization",
  ]

  const backendSkills = [
    "Node.js & Express.js",
    "PostgreSQL & Database Design",
    "RESTful APIs & GraphQL",
    "Authentication & Authorization",
    "Real-time Data Processing",
    "API Integration",
  ]

  const devOpsSkills = [
    "Git & GitHub",
    "Docker & Containerization",
    "CI/CD Pipelines",
    "Deployment & Hosting",
    "Performance Monitoring",
    "Security Best Practices",
  ]

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-slide-in-up text-center">
          Full-Stack Capabilities
        </h2>
        <p
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Complete end-to-end development expertise spanning frontend, backend, and DevOps
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Frontend */}
          <div
            className="glass rounded-xl p-8 hover:glow-primary transition-all duration-300 hover:scale-105 animate-scale-in"
            style={{ animationDelay: "0s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/20">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Frontend</h3>
            </div>
            <ul className="space-y-3">
              {frontendSkills.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-slide-in-left"
                  style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Backend */}
          <div
            className="glass rounded-xl p-8 hover:glow-accent transition-all duration-300 hover:scale-105 animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-accent/20">
                <Server className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-accent">Backend</h3>
            </div>
            <ul className="space-y-3">
              {backendSkills.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-slide-in-left"
                  style={{ animationDelay: `${0.2 + i * 0.05}s` }}
                >
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* DevOps */}
          <div
            className="glass rounded-xl p-8 hover:glow-primary transition-all duration-300 hover:scale-105 animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/20">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">DevOps & Tools</h3>
            </div>
            <ul className="space-y-3">
              {devOpsSkills.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-slide-in-left"
                  style={{ animationDelay: `${0.3 + i * 0.05}s` }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
