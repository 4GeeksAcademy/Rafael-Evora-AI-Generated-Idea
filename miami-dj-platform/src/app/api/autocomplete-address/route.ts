import { NextRequest, NextResponse } from "next/server";

// Uses Google Places Autocomplete API
// Requires GOOGLE_MAPS_API_KEY in environment

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("input");
  if (!query) {
    return NextResponse.json({ predictions: [] }, { status: 400 });
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ predictions: [], error: "API key not set" }, { status: 500 });
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=address&key=${apiKey}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return NextResponse.json({ predictions: data.predictions || [] });
}
