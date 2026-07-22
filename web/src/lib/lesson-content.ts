import { marked } from "marked";
import { STAGE0_UNIT_MD } from "@/content/stage0-content";

// Renders real Stage-0 curriculum content (authored in curriculum/stage0/*.md and
// embedded server-side via stage0-content.ts) for a single lesson in the portal.
// Content stays server-side — only the rendered HTML for the requested lesson is sent.

marked.setOptions({ gfm: true });

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

/** Render a lesson's markdown to sanitized-enough HTML for server rendering. */
export async function renderLessonHtml(lessonId: string): Promise<string | null> {
  const md = getLessonMarkdown(lessonId);
  if (md == null) return null;
  const html = await marked.parse(md);
  return html;
}
