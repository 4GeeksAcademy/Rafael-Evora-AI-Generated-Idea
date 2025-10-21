import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();
  const { user_id, name, surname, addresses } = body;
  if (!user_id) return NextResponse.json({ error: "Missing user_id" }, { status: 400 });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Update user profile
  const { error: userError } = await supabase
    .from("users")
    .update({ name, surname })
    .eq("id", user_id);
  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });

  // Update addresses (replace all for simplicity)
  if (Array.isArray(addresses)) {
    // Delete old addresses
    await supabase.from("addresses").delete().eq("user_id", user_id);
    // Insert new addresses
    for (const addr of addresses) {
      await supabase.from("addresses").insert({
        user_id,
        label: addr.label,
        address: addr.address,
      });
    }
  }

  return NextResponse.json({ success: true });
}
