import { NextResponse } from "next/server";

// Waitlist submissions. If WAITLIST_WEBHOOK_URL is set (e.g., an n8n webhook on the VPS),
// forward the lead there; otherwise log it. Keeps us integration-ready without a DB in v1.
export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Record<string, unknown>;

    if (!data?.name || !data?.contact) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    const lead = {
      ...data,
      source: "eec-web",
      submittedAt: new Date().toISOString(),
    };

    const webhook = process.env.WAITLIST_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } else {
      console.log("[waitlist] new lead:", lead);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
