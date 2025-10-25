import { NextResponse } from "next/server"

const projects = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let filteredProjects = projects

    if (category && category !== "All") {
      filteredProjects = projects.filter((p) => p.category === category)
    }

    return NextResponse.json(
      {
        success: true,
        data: filteredProjects,
        total: filteredProjects.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Projects API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
