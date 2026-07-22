import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/store";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as { email?: string; password?: string };
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
    }
    const user = await findUserByEmail(String(email));
    if (!user || !(await verifyPassword(String(password), user.passwordHash))) {
      return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
    }
    await createSession(user.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
