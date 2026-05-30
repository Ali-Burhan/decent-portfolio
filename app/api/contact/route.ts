import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

/** Resend only allows sending from verified domains (not @gmail.com, etc.). */
const PUBLIC_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
]);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractEmailAddress(from: string): string | null {
  const bracketed = from.match(/<([^>]+)>/);
  const raw = (bracketed?.[1] ?? from).trim();
  return raw.includes("@") ? raw : null;
}

function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (!configured) return RESEND_DEFAULT_FROM;

  const email = extractEmailAddress(configured);
  const domain = email?.split("@")[1]?.toLowerCase();

  if (!domain || PUBLIC_EMAIL_DOMAINS.has(domain)) {
    console.warn(
      `RESEND_FROM_EMAIL "${configured}" is not allowed. Using ${RESEND_DEFAULT_FROM}. ` +
        "Verify your own domain at https://resend.com/domains to use a custom From address."
    );
    return RESEND_DEFAULT_FROM;
  }

  return configured;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.error(
      "Contact form: RESEND_API_KEY is not set. Add it to .env.local (see .env.example)."
    );
    return NextResponse.json(
      {
        error: "Email service is not configured",
        code: "MISSING_RESEND_API_KEY",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeSubject = subject ? escapeHtml(String(subject)) : "";
    const safeMessage = escapeHtml(String(message));

    const emailSubject = safeSubject
      ? `[Portfolio Contact] ${safeSubject}`
      : "[Portfolio Contact] New Message";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #667eea; margin-bottom: 5px; }
            .value {
              background: white;
              padding: 12px;
              border-radius: 6px;
              border-left: 3px solid #667eea;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 6px;
              border-left: 3px solid #667eea;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">New Portfolio Contact</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From:</div>
              <div class="value">${safeName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">
                <a href="mailto:${safeEmail}" style="color: #667eea; text-decoration: none;">
                  ${safeEmail}
                </a>
              </div>
            </div>
            ${
              safeSubject
                ? `
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${safeSubject}</div>
            </div>`
                : ""
            }
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${safeMessage}</div>
            </div>
            <div class="footer">
              Sent from your portfolio contact form at ${new Date().toLocaleString()}
            </div>
          </div>
        </body>
      </html>
    `;

    const fromAddress = resolveFromAddress();

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [process.env.CONTACT_EMAIL || "aliburhan.dev.ai@gmail.com"],
      subject: emailSubject,
      html: emailHtml,
      replyTo: String(email),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
