import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Destructure all possible fields
  const {
    name,
    event_name,
    event_date,
    start_time,
    end_time,
    overnight,
    entertainment_section,
    technical_preferences,
    status,
    email,
    created_at,
    user_id,
    address_id,
    notes,
    address,
    state,
    zip
  } = body;

  if (!event_name || !event_date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase.from("booking_request").insert([
    {
      name,
      event_name,
      event_date,
      start_time,
      end_time,
      overnight,
      entertainment_section,
      technical_preferences,
      status: status || "Pending",
      email,
      created_at,
      user_id,
      address_id,
      notes,
      address,
      state,
      zip
    }
  ]).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, booking: data?.[0] }, { status: 200 });
}
