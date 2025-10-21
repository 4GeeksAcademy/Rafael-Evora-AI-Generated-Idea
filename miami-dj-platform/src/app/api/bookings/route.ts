export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  if (!user_id) {
    return NextResponse.json({ bookings: [] });
  }
  // Find user by id to get email
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("email")
    .eq("id", user_id)
    .single();
  if (userError || !user) {
    return NextResponse.json({ bookings: [] });
  }
  // Find bookings by email
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("email", user.email);
  if (error) {
    return NextResponse.json({ bookings: [] });
  }
  return NextResponse.json({ bookings });
}
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.from("bookings").insert([body]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, booking: data }, { status: 200 });
}
