import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

// You can use a service like Resend, SendGrid, or Nodemailer for sending emails
// This example uses Resend (https://resend.com/) for simplicity
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TARGET_EMAIL = "rafael_evora@yahoo.com.mx";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    // Store in Supabase
    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
    });
    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }
    // Send email
    try {
      const emailRes = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: TARGET_EMAIL,
        subject: "New Contact Form Submission",
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
      });
      if (emailRes.error) {
        console.error("Resend email error:", emailRes.error);
        return NextResponse.json({ error: emailRes.error }, { status: 500 });
      }
    } catch (emailErr: any) {
      console.error("Resend email exception:", emailErr);
      return NextResponse.json({ error: emailErr.message || "Email send failed" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
