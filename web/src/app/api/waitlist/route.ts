import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

// Waitlist submissions. Two sinks (both best-effort, non-blocking on failure):
//   1) Append to a JSONL file on a mounted volume (survives restarts) — always on.
//   2) Forward to WAITLIST_WEBHOOK_URL (e.g., an n8n webhook) if configured.
export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Record<string, unknown>;

    if (!data?.name || !data?.contact) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    const lead = { ...data, source: "eec-web", submittedAt: new Date().toISOString() };

    // 1) Persist to file (mounted volume → survives container rebuilds)
    const file = process.env.LEADS_FILE || "/data/leads.jsonl";
    try {
      await mkdir(dirname(file), { recursive: true });
      await appendFile(file, JSON.stringify(lead) + "\n");
    } catch (e) {
      console.log("[waitlist] file write failed:", e);
    }

    // 2) Forward to webhook if configured (optional)
    const webhook = process.env.WAITLIST_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (e) {
        console.log("[waitlist] webhook failed:", e);
      }
    }

    console.log("[waitlist] lead:", data.name, data.contact);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
