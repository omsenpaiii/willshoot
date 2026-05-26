import { NextResponse } from "next/server";

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

    // In a production app, you would integrate Resend, Sendgrid, or database storage here.

    return NextResponse.json({
      success: true,
      message: "Thank you. We've received your request and will get back to you shortly."
    });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
