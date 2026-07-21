import { createServiceRoleClient } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { page_id, block_id, referrer } = await request.json();

    if (!page_id) {
      return Response.json({ error: "page_id is required" }, { status: 400 });
    }

    const db = createServiceRoleClient();
    const { error } = await db.from("click_events").insert({
      page_id,
      block_id: block_id ?? null,
      referrer: referrer ?? null,
    });

    if (error) throw error;

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Failed to record click event:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
