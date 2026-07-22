import { NextResponse } from "next/server";
import { getUsers, saveUsers, findUserByEmail, type User } from "@/lib/store";
import { hashPassword } from "@/lib/auth";

// Founder-only: create a learner account after payment.
// Protect with the ADMIN_TOKEN env var, sent as the `x-admin-token` header.
export async function POST(req: Request) {
  const token = req.headers.get("x-admin-token");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const { email, password, name, level } = (await req.json()) as {
      email?: string; password?: string; name?: string; level?: string;
    };
    if (!email || !password || !name) {
      return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
    }
    if (await findUserByEmail(String(email))) {
      return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });
    }
    const users = await getUsers();
    const user: User = {
      id: crypto.randomUUID(),
      email: String(email),
      name: String(name),
      passwordHash: await hashPassword(String(password)),
      level: String(level || "A1 — Foundations"),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await saveUsers(users);
    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name, level: user.level },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
