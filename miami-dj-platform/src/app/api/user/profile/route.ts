import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  if (!user_id) return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  console.log("API /user/profile: user_id param", user_id); // DEBUG

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch user profile
  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, name, surname")
    .eq("id", user_id)
    .single();
  if (error) {
    console.error("API /user/profile: Supabase error", error, "user_id:", user_id); // DEBUG
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch addresses (if addresses table exists)
  let addresses: any[] = [];
  try {
    const { data: addr } = await supabase
      .from("addresses")
      .select("id, label, address")
      .eq("user_id", user_id);
    addresses = addr || [];
  } catch (e) {
    // Table may not exist yet
  }

  return NextResponse.json({ user, addresses });
}
