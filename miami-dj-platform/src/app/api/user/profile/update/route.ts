
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

  // If only user_id is provided, fetch and return profile and addresses
  if (!name && !surname && !addresses) {
    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id, email, name, surname")
      .eq("id", user_id)
      .single();
    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

    // Fetch addresses via join table
    const { data: addressesData, error: addressesError } = await supabase
      .from("user_addresses")
      .select("address:addresses(id, label, address, zip_code, state)")
      .eq("user_id", user_id);
    if (addressesError) return NextResponse.json({ error: addressesError.message }, { status: 500 });

    // Flatten the addresses array
    const addressesList = (addressesData || []).map((row: any) => row.address);
    return NextResponse.json({ profile, addresses: addressesList });
  }

  // Update user profile
  const { error: userError } = await supabase
    .from("users")
    .update({ name, surname })
    .eq("id", user_id);
  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });

  // Update addresses (replace all for simplicity)
  if (Array.isArray(addresses)) {
    // Remove all user-address links for this user
    const { error: delError } = await supabase.from("user_addresses").delete().eq("user_id", user_id);
    if (delError) console.error("Error deleting user_addresses links:", delError);

    for (const addr of addresses) {
      let addressId = addr.id;
      // If address has no id, create it
      if (!addressId) {
        const { data: newAddrArr, error: insertError } = await supabase
          .from("addresses")
          .insert({
            label: addr.label,
            address: addr.address,
            zip_code: addr.zip_code || null,
            state: addr.state || null,
          })
          .select("*");
        if (insertError || !newAddrArr || !newAddrArr[0]?.id) {
          console.error("Error inserting address:", insertError, newAddrArr);
          continue;
        }
        addressId = newAddrArr[0].id;
      } else {
        // Update address details if needed
        const { error: updateError } = await supabase.from("addresses").update({
          label: addr.label,
          address: addr.address,
          zip_code: addr.zip_code || null,
          state: addr.state || null,
        }).eq("id", addressId);
        if (updateError) console.error("Error updating address:", updateError);
      }
      // Link user and address in join table
      if (addressId) {
        const { error: linkError } = await supabase.from("user_addresses").insert({ user_id, address_id: addressId });
        if (linkError) console.error("Error linking user to address:", linkError);
      }
    }
    // Fetch updated addresses for user
    const { data: addressesData, error: addressesError } = await supabase
      .from("user_addresses")
      .select("address:addresses(id, label, address, zip_code, state)")
      .eq("user_id", user_id);
    if (addressesError) console.error("Error fetching addresses:", addressesError);
    const addressesList = (addressesData || []).map((row: any) => row.address);
    return NextResponse.json({ success: true, addresses: addressesList });
  }

  return NextResponse.json({ success: true });
}
