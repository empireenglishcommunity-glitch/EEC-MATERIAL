import { NextResponse } from "next/server";
import { getUsers, saveUsers, findUserByEmail, type User } from "@/lib/store";
import { hashPassword } from "@/lib/auth";
import { isStageId } from "@/lib/lessons";

// Derived from the shipped stage manifest rather than a second hardcoded list,
// so a new stage cannot become grantable in the UI but unrecognised here.
function cleanStages(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const stages = [...new Set(value.map(String).filter(isStageId))];
  return stages.length ? stages : undefined;
}

// Founder-only: create a learner account after payment.
// Protect with the ADMIN_TOKEN env var, sent as the `x-admin-token` header.
export async function POST(req: Request) {
  const token = req.headers.get("x-admin-token");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const { email, password, name, level, role, availableStages } = (await req.json()) as {
      email?: string; password?: string; name?: string; level?: string; role?: string; availableStages?: unknown;
    };
    if (!email || !password || !name) {
      return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
    }
    if (await findUserByEmail(String(email))) {
      return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });
    }
    const stages = cleanStages(availableStages);
    const users = await getUsers();
    const user: User = {
      id: crypto.randomUUID(),
      email: String(email),
      name: String(name),
      passwordHash: await hashPassword(String(password)),
      level: String(level || "A1 — Foundations"),
      createdAt: new Date().toISOString(),
      // Only ever "teacher" when asked for explicitly — it unlocks the
      // Teacher's Edition and its answer keys.
      ...(role === "teacher" ? { role: "teacher" as const } : {}),
      // Explicit stage entitlement (placement path). Stage 0 is always open, so
      // this only matters for higher stages.
      ...(stages ? { availableStages: stages } : {}),
    };
    users.push(user);
    await saveUsers(users);
    return NextResponse.json({
      ok: true,
      user: {
        id: user.id, email: user.email, name: user.name, level: user.level,
        role: user.role ?? "student", availableStages: user.availableStages ?? [],
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// Founder-only: update an existing learner's stage entitlement / role / level.
// Body: { email, availableStages?: string[], role?: "student"|"teacher", level?: string }
// This is how a placement grant opens a higher stage without full completion.
export async function PATCH(req: Request) {
  const token = req.headers.get("x-admin-token");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const { email, availableStages, role, level } = (await req.json()) as {
      email?: string; availableStages?: unknown; role?: string; level?: string;
    };
    if (!email) {
      return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
    }
    const users = await getUsers();
    const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
    if (!user) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }
    if (availableStages !== undefined) {
      const stages = cleanStages(availableStages);
      if (stages) user.availableStages = stages;
      else delete user.availableStages;
    }
    if (role === "teacher") user.role = "teacher";
    else if (role === "student") delete user.role;
    if (typeof level === "string" && level) user.level = level;
    await saveUsers(users);
    return NextResponse.json({
      ok: true,
      user: {
        id: user.id, email: user.email, name: user.name, level: user.level,
        role: user.role ?? "student", availableStages: user.availableStages ?? [],
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
