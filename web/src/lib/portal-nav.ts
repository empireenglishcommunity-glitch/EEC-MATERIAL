import type { StageId } from "@/lib/lessons";

/**
 * Stage-scoped portal paths. Stage 0 keeps its original canonical URLs so every
 * existing link, bookmark, and operational check keeps working; Stage 1 (and any
 * future stage) lives under /portal/stages/{stage}. Lesson pages are shared
 * because lesson IDs are already globally unique (s0-… vs s1-…).
 */
export function stageNav(locale: string, stageId: StageId) {
  const base = stageId === "s0" ? `/${locale}/portal` : `/${locale}/portal/stages/${stageId}`;
  const coursebook = stageId === "s0" ? `/api/coursebook` : `/api/coursebook/${stageId}`;
  return {
    dashboard: base,
    start: `${base}/start`,
    glossary: `${base}/glossary`,
    accentLab: `${base}/accent-lab`,
    unit: (unitId: string) => `${base}/units/${unitId}`,
    quiz: (unitId: string) => `${base}/quiz/${unitId}`,
    lesson: (lessonId: string) => `/${locale}/portal/lessons/${lessonId}`,
    coursebookStudent: `${coursebook}/student`,
    coursebookTeacher: `${coursebook}/teacher`,
  };
}
