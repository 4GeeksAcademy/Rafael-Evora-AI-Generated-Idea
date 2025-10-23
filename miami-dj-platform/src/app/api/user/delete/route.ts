import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { user_id } = await request.json();
    if (!user_id) return NextResponse.json({ error: "Missing user_id" }, { status: 400 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Supabase service role key or URL is missing");
      return NextResponse.json({ error: "Supabase service role key or URL is missing on the server." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    // Delete from Supabase Auth
    const { error } = await supabase.auth.admin.deleteUser(user_id);
    if (error) {
      console.error("Supabase deleteUser error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    // Delete from users table
    const { error: userTableError } = await supabase
      .from("users")
      .delete()
      .eq("id", user_id);
    if (userTableError) {
      console.error("Supabase users table delete error:", userTableError.message);
      // Not a hard failure, but log it
    }
    // Delete from user_addresses join table
    const { error: userAddrError } = await supabase
      .from("user_addresses")
      .delete()
      .eq("user_id", user_id);
    if (userAddrError) {
      console.error("Supabase user_addresses table delete error:", userAddrError.message);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API /api/user/delete error:", err);
    let msg = "";
    if (err && typeof err === "object" && "message" in err) {
      msg = (err as any).message;
    } else {
      msg = String(err);
    }
    return NextResponse.json({ error: "Server error: " + msg }, { status: 500 });
  }
}
