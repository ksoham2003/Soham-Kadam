"use client"

import { Code2, Database, Zap } from "lucide-react"

const skillCategories = [
  {
    category: "Frontend",
    icon: Code2,
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Material-UI"],
  },
  {
    category: "Backend",
    icon: Database,
    skills: ["Node.js", "Express.js", "PostgreSQL", "Python", "RESTful APIs", "GraphQL"],
  },
  {
    category: "Languages",
    icon: Zap,
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Java", "C", "C++"],
  },
  {
    category: "State Management",
    skills: ["Redux Toolkit", "Context API", "GraphQL"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git/GitHub", "npm", "Yarn", "Webpack", "Vite", "Babel", "Docker"],
  },
  {
    category: "Other Skills",
    skills: ["Responsive Design", "Cross-Browser Debugging", "Agile/Scrum", "Performance Optimization"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text animate-slide-in-up">Skills & Expertise</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="glass rounded-xl p-6 hover:glow-accent transition-all duration-300 hover:scale-105 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {Icon && (
                  <div className="mb-4 inline-block p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-accent mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-primary/20 text-primary border border-primary/30 text-sm font-medium hover:bg-primary/30 transition-colors animate-slide-in-up"
                      style={{ animationDelay: `${index * 0.1 + i * 0.05}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
