"use client"

import type React from "react"

import { Mail, Phone, Linkedin, Github, Send } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text text-center animate-slide-in-up">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just
              want to say hello, feel free to reach out!
            </p>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href="mailto:ksoham2003@gmail.com"
                className="flex items-center gap-4 p-6 rounded-lg border border-primary/30 hover:bg-primary/10 transition-all duration-300 group hover:scale-105 hover:glow-primary"
              >
                <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">ksoham2003@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+917350814664"
                className="flex items-center gap-4 p-6 rounded-lg border border-accent/30 hover:bg-accent/10 transition-all duration-300 group hover:scale-105 hover:glow-accent"
              >
                <div className="p-3 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground">+91 7350814664</p>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/soham-kadam-00a746214/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-primary/30 hover:bg-primary/10 transition-all duration-300 group hover:scale-110 hover:glow-primary"
              >
                <Linkedin className="w-6 h-6 text-primary" />
              </a>
              <a
                href="https://github.com/ksoham2003"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-accent/30 hover:bg-accent/10 transition-all duration-300 group hover:scale-110 hover:glow-accent"
              >
                <Github className="w-6 h-6 text-accent" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-xl p-8 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
