import { marked } from "marked";
import { STAGE0_UNIT_MD } from "@/content/stage0-content";
import { FINISHED_LESSON_MD, WRAPPER_MD } from "@/content/materials-stage0";

// Renders lesson content for the portal. Prefers FINISHED material (materials/… — the
// Empire Student's/Teacher's single source) when it exists for a lesson; otherwise falls
// back to the raw curriculum blueprint (curriculum/stage0/*.md via stage0-content.ts).
// Content stays server-side — only the rendered Student's-Edition HTML for the requested
// lesson is sent (the [!TEACHER] overlay is stripped before rendering).

marked.setOptions({ gfm: true });

/**
 * Remove the Teacher's-Edition overlay so learners only see the Student's Edition.
 * Teacher blocks are markdown blockquotes whose first line is `> [!TEACHER]`; we drop
 * the whole contiguous blockquote (and one trailing blank line).
 */
function stripTeacherBlocks(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (/^>\s*\[!TEACHER\]/i.test(lines[i])) {
      i++;
      while (i < lines.length && lines[i].startsWith(">")) i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  return out.join("\n");
}

/** Finished Student's-Edition markdown for a lesson, if we've produced it. */
function getFinishedStudentMarkdown(lessonId: string): string | null {
  const raw = FINISHED_LESSON_MD[lessonId.toLowerCase()];
  return raw ? stripTeacherBlocks(raw) : null;
}

function unitKeyForLesson(lessonId: string): string | null {
  // "s0-u1-l01" -> "u1"
  const m = lessonId.match(/^s0-(u\d+)-l\d+$/i);
  return m ? m[1].toLowerCase() : null;
}

/** Extract the markdown section for a single lesson (heading + body up to the next `## `). */
export function getLessonMarkdown(lessonId: string): string | null {
  const key = unitKeyForLesson(lessonId);
  if (!key) return null;
  const md = STAGE0_UNIT_MD[key];
  if (!md) return null;

  const tag = lessonId.toUpperCase(); // e.g. S0-U1-L01
  const lines = md.split("\n");
  const startIdx = lines.findIndex((l) => l.startsWith(`## ${tag}`));
  if (startIdx === -1) return null;

  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      endIdx = i;
      break;
    }
  }

  const section = lines.slice(startIdx, endIdx);
  // Trim trailing blank lines and horizontal rules left from the section break.
  while (section.length) {
    const last = section[section.length - 1].trim();
    if (last === "" || last === "---") section.pop();
    else break;
  }
  return section.length ? section.join("\n") : null;
}

/** True when a finished Empire lesson exists (vs. only the raw blueprint). */
export function hasFinishedLesson(lessonId: string): boolean {
  return !!FINISHED_LESSON_MD[lessonId.toLowerCase()];
}

/**
 * Render a lesson to HTML for the portal (Student's Edition).
 * Prefers finished Empire material (teacher overlay stripped); falls back to the blueprint.
 */
export async function renderLessonHtml(lessonId: string): Promise<string | null> {
  const finished = getFinishedStudentMarkdown(lessonId);
  const md = finished ?? getLessonMarkdown(lessonId);
  if (md == null) return null;
  const html = await marked.parse(md);
  return html;
}

/* ---------------------------------------------------------------------------
 * Wrapper pages — the stage front matter, the glossary, and each unit's
 * campaign front matter.
 *
 * These are part of the coursebook and always were: the PDF opens every unit
 * with its wrapper. They were simply never wired into the portal, so a student
 * on the site got the lessons without the framing the book gives them.
 * ------------------------------------------------------------------------- */

/** e.g. "unit3-front-matter", "stage0-glossary". */
export function hasWrapperPage(pageId: string): boolean {
  return !!WRAPPER_MD[pageId];
}

export async function renderWrapperHtml(pageId: string): Promise<string | null> {
  const raw = WRAPPER_MD[pageId];
  if (!raw) return null;
  // Same Student's-Edition rule as lessons: the teacher overlay never ships.
  return await marked.parse(stripTeacherBlocks(raw));
}

/** Unit front matter for a dashboard unit key ("u3" -> "unit3-front-matter"). */
export function unitFrontMatterId(unitKey: string): string | null {
  const m = unitKey.match(/^u(\d+)$/i);
  return m ? `unit${m[1]}-front-matter` : null;
}
