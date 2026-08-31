import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { getCurrentUser } from "@/lib/auth";
import { isTeacher } from "@/lib/store";

/**
 * Serves the coursebook PDFs from `web/private/`, which Next never exposes as
 * static assets. Public `public/` hosting once made the Teacher's Edition (with
 * its answer keys) and the paid Student's Edition world-readable; this endpoint
 * is the gate.
 *
 *   /api/coursebook/student        → Stage 0 student  (legacy alias)
 *   /api/coursebook/teacher        → Stage 0 teacher  (legacy alias)
 *   /api/coursebook/{stage}/student
 *   /api/coursebook/{stage}/teacher
 *
 * A single catch-all segment is used because Next.js forbids two differently
 * named dynamic slugs at the same route level.
 *
 * `web/private/` is NOT copied into the standalone output by default; the
 * Dockerfile copies it explicitly. If a deploy 404s here, check that first.
 */

const FILES: Record<string, Record<string, string>> = {
  s0: { student: "eec-stage0-student.pdf", teacher: "eec-stage0-teacher.pdf" },
  s1: { student: "eec-stage1-student.pdf", teacher: "eec-stage1-teacher.pdf" },
  s2: { student: "eec-stage2-student.pdf", teacher: "eec-stage2-teacher.pdf" },
};

function resolve(seg: string[]): { stage: string; edition: string } | null {
  const [a, b] = seg.length === 1 ? ["s0", seg[0]] : seg;
  if (seg.length > 2 || !a || !b) return null;
  if (!FILES[a] || !FILES[a][b]) return null;
  return { stage: a, edition: b };
}

export async function GET(req: Request, ctx: { params: Promise<{ seg: string[] }> }) {
  const { seg } = await ctx.params;
  const target = resolve(seg ?? []);
  if (!target) {
    return new Response("Not found", { status: 404 });
  }

  const user = await getCurrentUser();

  if (target.edition === "teacher") {
    const token = req.headers.get("x-admin-token");
    const viaToken = !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN;
    if (!viaToken && !isTeacher(user)) {
      // 404 rather than 403: a learner poking at the URL learns nothing about
      // whether a teacher edition exists.
      return new Response("Not found", { status: 404 });
    }
  } else if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const filename = FILES[target.stage][target.edition];
  const file = join(process.cwd(), "private", "coursebook", filename);
  try {
    await stat(file);
  } catch {
    return new Response("Coursebook not built", { status: 503 });
  }

  const pdf = await readFile(file);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      // Personalised by role, so never let a shared cache hold it.
      "Cache-Control": "private, no-store",
    },
  });
}
