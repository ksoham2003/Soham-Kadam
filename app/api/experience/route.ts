import { NextResponse } from "next/server"

const experiences = [
  {
    id: 1,
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
    id: 2,
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

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: experiences,
        total: experiences.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Experience API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
