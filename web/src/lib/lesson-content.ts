import { marked } from "marked";
import { STAGE0_UNIT_MD } from "@/content/stage0-content";
import {
  FINISHED_LESSON_MD as STAGE0_LESSONS,
  WRAPPER_MD as STAGE0_WRAPPERS,
} from "@/content/materials-stage0";
import {
  FINISHED_LESSON_MD as STAGE1_LESSONS,
  WRAPPER_MD as STAGE1_WRAPPERS,
} from "@/content/materials-stage1";
import {
  FINISHED_LESSON_MD as STAGE2_LESSONS,
  WRAPPER_MD as STAGE2_WRAPPERS,
} from "@/content/materials-stage2";
import { isStageId, type StageId } from "@/lib/lessons";

marked.setOptions({ gfm: true });

const LESSONS: Record<StageId, Record<string, string>> = {
  s0: STAGE0_LESSONS,
  s1: STAGE1_LESSONS,
  s2: STAGE2_LESSONS,
};
const WRAPPERS: Record<StageId, Record<string, string>> = {
  s0: STAGE0_WRAPPERS,
  s1: STAGE1_WRAPPERS,
  s2: STAGE2_WRAPPERS,
};

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

function stageForLesson(lessonId: string): StageId | null {
  const match = /^(s\d+)-u\d+-l\d+$/i.exec(lessonId);
  const stage = match?.[1].toLowerCase();
  return stage && isStageId(stage) ? stage : null;
}

function getFinishedStudentMarkdown(lessonId: string): string | null {
  const stage = stageForLesson(lessonId);
  if (!stage) return null;
  const raw = LESSONS[stage][lessonId.toLowerCase()];
  return raw ? stripTeacherBlocks(raw) : null;
}

function stage0UnitKeyForLesson(lessonId: string): string | null {
  const match = lessonId.match(/^s0-(u\d+)-l\d+$/i);
  return match ? match[1].toLowerCase() : null;
}

/** Stage-0 blueprint fallback retained for unfinished legacy material. Stages 1–2 are complete. */
export function getLessonMarkdown(lessonId: string): string | null {
  const key = stage0UnitKeyForLesson(lessonId);
  if (!key) return null;
  const md = STAGE0_UNIT_MD[key];
  if (!md) return null;

  const tag = lessonId.toUpperCase();
  const lines = md.split("\n");
  const startIdx = lines.findIndex((line) => line.startsWith(`## ${tag}`));
  if (startIdx === -1) return null;

  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      endIdx = i;
      break;
    }
  }

  const section = lines.slice(startIdx, endIdx);
  while (section.length) {
    const last = section[section.length - 1].trim();
    if (last === "" || last === "---") section.pop();
    else break;
  }
  return section.length ? section.join("\n") : null;
}

export function hasFinishedLesson(lessonId: string): boolean {
  const stage = stageForLesson(lessonId);
  return stage ? !!LESSONS[stage][lessonId.toLowerCase()] : false;
}

export async function renderLessonHtml(lessonId: string): Promise<string | null> {
  const md = getFinishedStudentMarkdown(lessonId) ?? getLessonMarkdown(lessonId);
  return md == null ? null : await marked.parse(md);
}

export function hasWrapperPage(stageId: StageId, pageId: string): boolean {
  return !!WRAPPERS[stageId][pageId];
}

export async function renderWrapperHtml(stageId: StageId, pageId: string): Promise<string | null> {
  const raw = WRAPPERS[stageId][pageId];
  return raw ? await marked.parse(stripTeacherBlocks(raw)) : null;
}

export function unitFrontMatterId(unitKey: string): string | null {
  const match = unitKey.match(/^u(\d+)$/i);
  return match ? `unit${match[1]}-front-matter` : null;
}
