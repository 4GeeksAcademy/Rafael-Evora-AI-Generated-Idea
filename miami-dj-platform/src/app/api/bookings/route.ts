
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  const email = searchParams.get("email");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  if (!user_id && !email) {
    return NextResponse.json({ error: "Missing user_id or email" }, { status: 400 });
  }
  let query = supabase.from("bookings").select("*");
  if (user_id) {
    query = query.eq("user_id", user_id);
  } else if (email) {
    query = query.eq("client_email", email);
  }
  const { data: bookings, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message, bookings: [] }, { status: 500 });
  }
  return NextResponse.json({ bookings });
}


export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Destructure and validate required fields
  const { user_id, address_id, address, event_name, date, notes, client_email, client_name, client_phone } = body;
  if (!event_name || !date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  // Prefer address_id if present, else use address string
  const bookingData = {
    user_id: user_id || null,
    address_id: address_id || null,
    address: address || null,
    event_name,
    date,
    notes: notes || "",
    client_email: client_email || null,
    client_name: client_name || null,
    client_phone: client_phone || null,
    status: "Pending"
  };
  const { data, error } = await supabase.from("bookings").insert([
    bookingData
  ]).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, booking: data?.[0] }, { status: 200 });
}
