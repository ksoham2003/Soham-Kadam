import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Send email to yourself
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // You can verify your domain later
      to: ['ksoham2003@gmail.com'], // Your email
      subject: `New message from ${name} - Portfolio`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #667eea; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Portfolio Message</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span> ${name}
                </div>
                <div class="field">
                  <span class="label">Email:</span> ${email}
                </div>
                <div class="field">
                  <span class="label">Message:</span><br>
                  ${message.replace(/\n/g, '<br>')}
                </div>
                <div class="field">
                  <span class="label">Timestamp:</span> ${new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      )
    }

    console.log("Email sent successfully:", data)

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you within 24 hours.",
    })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    )
  }
}