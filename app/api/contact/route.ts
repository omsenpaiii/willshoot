import { NextResponse } from "next/server";

const NOTIFICATION_EMAIL = "contact@willshoot.au";
const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendNotificationEmail({
  name,
  businessName,
  phone,
  email,
  service,
  budget,
  message
}: {
  name: string;
  businessName?: string;
  phone?: string;
  email: string;
  service: string;
  budget?: string;
  message: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL || "WillShoot Leads <onboarding@resend.dev>";
  const submittedAt = new Date().toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Melbourne"
  });

  const fields = [
    ["Full Name", name],
    ["Business Name", businessName || "N/A"],
    ["Phone", phone || "N/A"],
    ["Email", email],
    ["Service", service],
    ["Budget", budget || "Not specified"],
    ["Submitted At", submittedAt]
  ];

  const text = [
    "New WillShoot website enquiry",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;background:#f6f4f2;padding:24px;color:#1e1c1d;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #eaeaea;border-radius:24px;padding:32px;">
        <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#e52427;">
          New Website Enquiry
        </p>
        <h1 style="margin:0 0 24px;font-size:28px;line-height:1.1;color:#1e1c1d;">
          A new lead just came in for WillShoot.
        </h1>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tbody>
            ${fields
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f1f1f1;font-size:13px;font-weight:700;color:#6b6b6b;width:160px;">
                      ${escapeHtml(label)}
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #f1f1f1;font-size:14px;color:#1e1c1d;">
                      ${escapeHtml(value)}
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
        <div style="background:#faf7f7;border:1px solid #f0d2d2;border-radius:18px;padding:20px;">
          <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#e52427;">
            Message
          </p>
          <p style="margin:0;font-size:15px;line-height:1.7;color:#1e1c1d;white-space:pre-wrap;">
            ${escapeHtml(message)}
          </p>
        </div>
      </div>
    </div>
  `;

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [NOTIFICATION_EMAIL],
      reply_to: email,
      subject: `New WillShoot enquiry from ${name}`,
      text,
      html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${response.status} ${errorText}`);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, businessName, phone, email, service, budget, message } = data;

    // Server-side validation
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, Service, Message)." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Log the lead data inside the terminal environment (useful for testing & logging leads)
    console.log("==========================================");
    console.log("NEW LEAD INCOMING FROM WILLSHOOT WEBSITE:");
    console.log(`Date: ${new Date().toISOString()}`);
    console.log(`Name: ${name}`);
    console.log(`Business Name: ${businessName || "N/A"}`);
    console.log(`Phone: ${phone || "N/A"}`);
    console.log(`Email: ${email}`);
    console.log(`Service: ${service}`);
    console.log(`Budget Range: ${budget || "Not Specified"}`);
    console.log(`Message: ${message}`);
    console.log("==========================================");

    await sendNotificationEmail({
      name,
      businessName,
      phone,
      email,
      service,
      budget,
      message
    });

    return NextResponse.json({
      success: true,
      message: "Thank you. We've received your request and will get back to you shortly."
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
