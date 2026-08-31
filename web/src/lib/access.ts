import { getStageLessonIds, isStageId, type StageId } from "@/lib/lessons";
import { isTeacher, getUserProgress, type User } from "@/lib/store";

// Stage progression order. A stage's prerequisite is the stage before it.
const STAGE_ORDER: StageId[] = ["s0", "s1", "s2", "s3"];

/** True when every lesson of a stage is marked complete. */
export function hasCompletedStage(stageId: StageId, doneLessonIds: string[]): boolean {
  const done = new Set(doneLessonIds);
  return getStageLessonIds(stageId).every((id) => done.has(id));
}

/** The stage that must be completed before this one, or null for the first stage. */
export function prerequisiteStage(stageId: StageId): StageId | null {
  const i = STAGE_ORDER.indexOf(stageId);
  return i > 0 ? STAGE_ORDER[i - 1] : null;
}

/**
 * Access rule (synchronous — caller supplies the full progress list):
 *   - Stage 0 is always open.
 *   - Teachers see every stage.
 *   - An explicit entitlement (`availableStages`) opens that stage — the
 *     placement path, and how a teacher grants access without full completion.
 *   - Otherwise the stage opens once its prerequisite stage is fully completed.
 * Fails closed: anything not matched above is locked.
 */
export function canAccessStage(
  user: Pick<User, "role" | "availableStages">,
  stageId: StageId,
  doneLessonIds: string[],
): boolean {
  if (stageId === "s0") return true;
  if (isTeacher(user)) return true;
  if (user.availableStages?.includes(stageId)) return true;
  const prereq = prerequisiteStage(stageId);
  return prereq ? hasCompletedStage(prereq, doneLessonIds) : false;
}

/**
 * Async gate for routes and APIs: loads the user's progress and applies the
 * rule above. This is the real enforcement boundary — UI hiding is cosmetic.
 */
export async function userCanAccessStage(
  user: Pick<User, "id" | "role" | "availableStages">,
  stageId: StageId,
): Promise<boolean> {
  if (stageId === "s0") return true;
  if (isTeacher(user)) return true;
  if (user.availableStages?.includes(stageId)) return true;
  const prereq = prerequisiteStage(stageId);
  if (!prereq) return false;
  const done = await getUserProgress(user.id);
  return hasCompletedStage(prereq, done);
}

/** Stage a lesson id belongs to ("s1-u3-l02" -> "s1"). */
export function stageOfLessonId(lessonId: string): StageId | null {
  const m = /^(s\d+)-u\d+-l\d+$/i.exec(lessonId);
  const s = m?.[1].toLowerCase();
  return s && isStageId(s) ? s : null;
}

/**
 * Stage a quiz key belongs to ("s2-u3" -> "s2"). Stage 0 keeps its legacy
 * unqualified "uN" keys, so anything without a recognised stage prefix is s0.
 */
export function stageOfQuizKey(quizKey: string): StageId {
  const s = /^(s\d+)-u\d+$/i.exec(quizKey)?.[1].toLowerCase();
  return s && isStageId(s) ? s : "s0";
}
