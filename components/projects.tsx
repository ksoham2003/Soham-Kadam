"use client"

import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    title: "AI Mock Interview Application",
    description:
      "An intelligent mock interview platform powered by Google Gemini API. Features real-time feedback, responsive UI, and seamless user interaction for interview preparation.",
    technologies: ["Next.js", "PostgreSQL", "Google Gemini API", "TypeScript"],
    image: "/ai-mock-interview-platform.jpg",
    category: "AI",
    links: {
      demo: "https://github.com/ksoham2003",
      github: "https://github.com/ksoham2003",
    },
  },
  {
    title: "Real-time Data Dashboard",
    description:
      "Built a comprehensive real-time data dashboard at Zanvar Group. Integrated backend APIs with Node.js for consumption tracking and improved UX design by 35%.",
    technologies: ["React.js", "PostgreSQL", "Node.js", "Python"],
    image: "/real-time-data-dashboard.jpg",
    category: "Backend",
    links: {
      demo: "https://github.com/ksoham2003",
      github: "https://github.com/ksoham2003",
    },
  },
  {
    title: "AI-Powered Recruiting Platform",
    description:
      "Developed scalable and responsive UI for an in-house recruiting platform. Implemented SSR/SSG for performance and SEO, built reusable component libraries.",
    technologies: ["React.js", "Next.js", "TypeScript", "Node.js", "Express.js"],
    image: "/recruiting-platform-interface.jpg",
    category: "Full-Stack",
    links: {
      demo: "https://github.com/ksoham2003",
      github: "https://github.com/ksoham2003",
    },
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with product catalog, shopping cart, and payment integration. Optimized for performance and user experience.",
    technologies: ["React.js", "Redux", "Tailwind CSS", "RESTful APIs"],
    image: "/ecommerce-shopping-platform.jpg",
    category: "Full-Stack",
    links: {
      demo: "https://github.com/ksoham2003",
      github: "https://github.com/ksoham2003",
    },
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, user authentication, and intuitive UI for team productivity.",
    technologies: ["Next.js", "Context API", "Firebase", "Material-UI"],
    image: "/task-management-app-interface.png",
    category: "Full-Stack",
    links: {
      demo: "https://github.com/ksoham2003",
      github: "https://github.com/ksoham2003",
    },
  },
  {
    title: "Weather Forecast App",
    description:
      "Interactive weather application with real-time data, location-based forecasts, and beautiful data visualization.",
    technologies: ["React.js", "Axios", "Chart.js", "CSS3"],
    image: "/weather-forecast-app.png",
    category: "Frontend",
    links: {
      demo: "https://github.com/ksoham2003",
      github: "https://github.com/ksoham2003",
    },
  },
]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = ["All", "Frontend", "Backend", "Full-Stack", "AI"]

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text animate-slide-in-up">Featured Projects</h2>

        <div className="flex flex-wrap gap-3 mb-12 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-105"
                  : "border border-accent/30 text-accent hover:border-accent hover:bg-accent/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="glass rounded-xl overflow-hidden group hover:glow-accent transition-all duration-300 hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-foreground flex-1">{project.title}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent whitespace-nowrap ml-2">
                    {project.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
