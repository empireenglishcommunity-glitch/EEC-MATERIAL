import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { findUserById, type User } from "./store";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "dev-insecure-secret-change-in-prod",
);
const COOKIE = "eec_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 10);
}
export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

// Call only from Route Handlers / Server Actions (they can set cookies).
export async function createSession(userId: string): Promise<void> {
  const token = await new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET);
  const c = await cookies();
  c.set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}

// Safe to call in Server Components (read-only cookie access).
export async function getCurrentUser(): Promise<User | null> {
  const c = await cookies();
  const token = c.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const uid = payload.uid as string | undefined;
    return uid ? await findUserById(uid) : null;
  } catch {
    return null;
  }
}
