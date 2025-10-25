import { NextResponse } from "next/server"

const skillCategories = [
  {
    id: 1,
    category: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Java", "C", "C++"],
  },
  {
    id: 2,
    category: "Frameworks & Libraries",
    skills: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Material-UI"],
  },
  {
    id: 3,
    category: "State Management",
    skills: ["Redux Toolkit", "Context API", "GraphQL"],
  },
  {
    id: 4,
    category: "API & Integration",
    skills: ["RESTful APIs", "JSON", "Axios", "Google Gemini API"],
  },
  {
    id: 5,
    category: "Tools & DevOps",
    skills: ["Git/GitHub", "npm", "Yarn", "Webpack", "Vite", "Babel", "Docker"],
  },
  {
    id: 6,
    category: "Other Skills",
    skills: ["Responsive Design", "Cross-Browser Debugging", "Agile/Scrum", "Performance Optimization"],
  },
]

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: skillCategories,
        total: skillCategories.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Skills API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
