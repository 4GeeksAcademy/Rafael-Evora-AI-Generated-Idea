import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  if (!user_id) {
    console.error("API /user/profile: Missing user_id param");
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }
  console.log("API /user/profile: user_id param", user_id); // DEBUG

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("API /user/profile: Missing Supabase env vars", { supabaseUrl, supabaseKey });
    return NextResponse.json({ error: "Supabase environment variables not set" }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch user profile
  let user, error;
  try {
    const result = await supabase
      .from("users")
      .select("id, email, name, surname")
      .eq("id", user_id)
      .single();
    user = result.data;
    error = result.error;
  } catch (err) {
    console.error("API /user/profile: Exception during user fetch", err);
    return NextResponse.json({ error: "Exception during user fetch", details: String(err) }, { status: 500 });
  }
  if (error) {
    // Handle user not found gracefully (robust for string or object error)
    const errMsg = typeof error === 'string' ? error : (error.message || '');
    if (
      errMsg.includes('0 rows') ||
      errMsg.includes('no rows') ||
      errMsg.includes('Cannot coerce the result to a single JSON object')
    ) {
      console.warn(`API /user/profile: User not found for user_id: ${user_id}`)
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.error("API /user/profile: Supabase error", error, "user_id:", user_id);
    return NextResponse.json({ error: errMsg, details: error }, { status: 500 });
  }

  // Fetch addresses (if addresses table exists)
  let addresses: any[] = [];
  try {
    const { data: addressesData, error: addressesError } = await supabase
      .from("user_addresses")
      .select("address:addresses(id, label, address, zip_code, state)")
      .eq("user_id", user_id);
    if (addressesError) {
      console.error("API /user/profile: Error fetching addresses", addressesError);
    }
    addresses = (addressesData || []).map((row: any) => row.address);
  } catch (e) {
    console.error("API /user/profile: Exception during address fetch", e);
  }

  return NextResponse.json({ user, addresses })
}
