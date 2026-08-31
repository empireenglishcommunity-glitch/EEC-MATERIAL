import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { getCurrentUser } from "@/lib/auth";
import { isTeacher } from "@/lib/store";

/**
 * Serves the coursebook PDFs from `web/private/`, which Next never exposes as
 * static assets.
 *
 * They used to live in `web/public/coursebook/`. Anything in `public/` is world
 * readable at a guessable URL, and the portal login does not cover it — so the
 * **Teacher's Edition**, with its answer keys, timings and delivery notes, was
 * downloadable by anyone who tried the obvious path. The student edition was
 * equally open, which also means paid material was public.
 *
 *   /api/coursebook/student  → any signed-in learner
 *   /api/coursebook/teacher  → a user with role "teacher", or a caller
 *                              presenting the ADMIN_TOKEN (for scripts)
 *
 * `web/private/` is NOT copied into the standalone output by default; the
 * Dockerfile copies it explicitly. If a deploy 404s here, check that first.
 */

const FILES = {
  student: "eec-stage0-student.pdf",
  teacher: "eec-stage0-teacher.pdf",
} as const;

type Edition = keyof typeof FILES;

function isEdition(v: string): v is Edition {
  return v === "student" || v === "teacher";
}

export async function GET(req: Request, ctx: { params: Promise<{ edition: string }> }) {
  const { edition } = await ctx.params;
  if (!isEdition(edition)) {
    return new Response("Not found", { status: 404 });
  }

  const user = await getCurrentUser();

  if (edition === "teacher") {
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

  const file = join(process.cwd(), "private", "coursebook", FILES[edition]);
  try {
    await stat(file);
  } catch {
    return new Response("Coursebook not built", { status: 503 });
  }

  const pdf = await readFile(file);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${FILES[edition]}"`,
      // Personalised by role, so never let a shared cache hold it.
      "Cache-Control": "private, no-store",
    },
  });
}
