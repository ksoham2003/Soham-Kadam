"use client"

import { Calendar } from "lucide-react"

const experiences = [
  {
    role: "Frontend Developer",
    company: "tCognition",
    period: "Mar 2025 – Present",
    description:
      "Working on an in-house AI-powered recruiting platform aimed at streamlining the hiring process. Developed scalable and responsive UI using React.js and Next.js with SSR/SSG for performance and SEO.",
    achievements: [
      "Built reusable component libraries and integrated RESTful APIs",
      "Improved user experience through intuitive layouts and real-time interactivity",
      "Collaborated with cross-functional teams to align UI functionality with backend logic",
    ],
    technologies: ["React.js", "TypeScript", "Next.js", "Node.js", "Express.js", "Git", "Redux"],
  },
  {
    role: "Software Engineer",
    company: "Zanvar Group",
    period: "Aug 2024 – Feb 2025",
    description:
      "Built real-time data dashboards and integrated backend APIs for consumption tracking. Improved UX design, increasing user engagement by 35%.",
    achievements: [
      "Developed real-time data dashboards using React.js and PostgreSQL",
      "Integrated backend APIs with Node.js for consumption tracking",
      "Increased user engagement by 35% through UX improvements",
    ],
    technologies: ["Python", "React.js", "PostgreSQL", "Node.js"],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text">Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="glass rounded-xl p-8 hover:glow-primary transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-accent font-semibold">{exp.company}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-accent mb-3">Key Achievements</h4>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
