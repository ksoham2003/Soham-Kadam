"use client";

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Full Stack Developer with a strong foundation in
              building responsive and scalable web applications. I enjoy
              creating seamless digital experiences that combine clean design
              with solid engineering.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently, I'm focusing on mastering modern frameworks like
              React.js and Next.js while exploring backend technologies to build
              complete, efficient solutions. I believe in writing clean,
              maintainable code and collaborating across teams to deliver
              high-quality, user-centric products.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4 text-accent">
                Key Highlights
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Top 10 ranker in WEBNATIC OF TECHUMEN'23
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  2nd Rank in MLSA 'From Code to Cloud'
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Mentor in Coding Club (2022-2024)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Placement Coordinator at T&P Cell, DYPCET
                </li>
              </ul>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl glow-primary">
              <div className="text-4xl font-bold gradient-text mb-2">1+</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="glass p-6 rounded-xl glow-accent">
              <div className="text-4xl font-bold gradient-text mb-2">5+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="glass p-6 rounded-xl glow-primary">
              <div className="text-4xl font-bold gradient-text mb-2">100%</div>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
            <div className="glass p-6 rounded-xl glow-accent">
              <div className="text-4xl font-bold gradient-text mb-2">15+</div>
              <p className="text-muted-foreground">Technologies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
